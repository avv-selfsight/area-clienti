/* Area clienti Selfsight: applicazione */
(function(){
"use strict";
const CFG = window.PORTAL_CONFIG || {};
const DEMO = !CFG.supabaseUrl || /[?&]demo\b/.test(location.search) || window.PORTAL_DEMO === true;

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const normTxt = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const fmtDate = d => { try { return new Date(d).toLocaleString("it-IT",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}); } catch(e){ return ""; } };
const fmtDay = d => { try { return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); } catch(e){ return ""; } };
const fmtSize = n => !n ? "" : n < 1024*1024 ? Math.round(n/1024)+" KB" : (n/1048576).toFixed(1)+" MB";

const ITEM_ST = ["Da fare","In corso","Fatto","Non applicabile"];
const DOC_ST = {da_fare:"Da fare",bozza:"In bozza",in_revisione:"In revisione",da_rivedere:"Da rivedere",approvato:"Approvato",non_applicabile:"Non applicabile"};
const NORM_NAME = {"27001":"ISO/IEC 27001","9001":"ISO 9001"};

/* ---------- dati delle norme ---------- */
function N(code){
  const n = window.NORME[code];
  if(!n._ready){
    n.ITEMS = n.C.concat(n.A||[]).concat(n.X||[]).concat((n.L||[]).filter(x => !x.guide));
    n.BY = {}; n.ITEMS.forEach(i => n.BY[i.id] = i); n.D.forEach(d => { d.kind = "d"; n.BY[d.id] = d; });
    n.DOCS = n.D.filter(d => !d.common);
    n.USES = {}; n.ITEMS.forEach(i => (i.d||[]).forEach(d => (n.USES[d] = n.USES[d] || []).push(i.id)));
    n._ready = true;
  }
  return n;
}
const codeOf = (n, x) => x.kind === "l" ? x.code : x.kind === "x" ? (x.code === (n.GLAB||{})[x.g] ? x.code : (n.GLAB[x.g]+" "+x.code)) : x.id;
function groupLabel(n, g){ if(g === "L") return n.GROUPS[g]; if(g.startsWith("X")) return "ISO/IEC "+n.GLAB[g]+" · "+n.GROUPS[g]; return g.startsWith("A.") ? "Allegato A · "+n.GROUPS[g] : g.startsWith("Q")||g.startsWith("D") ? "" : "Clausola "+g+" · "+n.GROUPS[g]; }

/* =====================================================================
   Accesso ai dati: Supabase reale oppure demo in memoria
   ===================================================================== */
function realApi(){
  const sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);
  const chk = r => { if(r.error) throw r.error; return r.data; };
  return {
    demo:false,
    async session(){ const { data } = await sb.auth.getSession(); return data.session; },
    onAuth(cb){ sb.auth.onAuthStateChange((ev, s) => cb(ev, s)); },
    async signIn(email, password){ chk(await sb.auth.signInWithPassword({ email, password })); },
    async signOut(){ await sb.auth.signOut(); },
    async resetPassword(email){ chk(await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname })); },
    async updatePassword(password){ chk(await sb.auth.updateUser({ password })); },
    async me(){ const { data:{ user } } = await sb.auth.getUser(); if(!user) return null; return chk(await sb.from("profiles").select("*").eq("id", user.id).single()); },
    async projects(){ return chk(await sb.from("projects").select("*, project_members(user_id)").order("created_at", { ascending:false })); },
    async clients(){ return chk(await sb.from("profiles").select("*").eq("role","client").order("email")); },
    async profiles(ids){ if(!ids.length) return []; return chk(await sb.from("profiles").select("id,email,full_name,role").in("id", ids)); },
    async summary(){ const [it, dc] = await Promise.all([sb.from("item_status").select("project_id,status"), sb.from("doc_status").select("project_id,status")]); return { items: chk(it), docs: chk(dc) }; },
    async createProject(name, norm, userId){ const p = chk(await sb.from("projects").insert({ name, norm }).select().single()); if(userId) chk(await sb.from("project_members").insert({ project_id:p.id, user_id:userId })); return p; },
    async setActive(id, active){ chk(await sb.from("projects").update({ active }).eq("id", id)); },
    async addMember(pid, uid){ chk(await sb.from("project_members").insert({ project_id:pid, user_id:uid })); },
    async removeMember(pid, uid){ chk(await sb.from("project_members").delete().eq("project_id", pid).eq("user_id", uid)); },
    async setName(uid, full_name){ chk(await sb.from("profiles").update({ full_name }).eq("id", uid)); },
    async load(pid){
      const q = t => sb.from(t).select("*").eq("project_id", pid);
      const [items, docs, files, comments, activity, members] = await Promise.all([
        q("item_status"), q("doc_status"), q("doc_files").order("created_at",{ascending:false}),
        q("comments").order("created_at"), q("activity").order("created_at",{ascending:false}).limit(500),
        sb.from("project_members").select("user_id").eq("project_id", pid)]);
      return { items:chk(items), docs:chk(docs), files:chk(files), comments:chk(comments), activity:chk(activity), members:chk(members) };
    },
    async setItem(pid, item, status){ chk(await sb.from("item_status").upsert({ project_id:pid, item_id:item, status })); },
    async setDoc(pid, doc, status, note){ const row = { project_id:pid, doc_id:doc, status }; if(note !== undefined) row.review_note = note; chk(await sb.from("doc_status").upsert(row)); },
    async upload(pid, doc, file){
      const safe = file.name.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^\w.\-]+/g,"_").slice(-120);
      const path = pid + "/" + doc + "/" + Date.now() + "_" + safe;
      chk(await sb.storage.from("documenti").upload(path, file, { contentType: file.type || "application/octet-stream" }));
      chk(await sb.from("doc_files").insert({ project_id:pid, doc_id:doc, path, name:file.name, size:file.size }));
    },
    async fileUrl(path, name){ return chk(await sb.storage.from("documenti").createSignedUrl(path, 300, { download: name || true })).signedUrl; },
    async comment(pid, ref, body){ chk(await sb.from("comments").insert({ project_id:pid, ref, body })); }
  };
}

function demoApi(){
  const ADM = "u-adm", CLI = "u-cli";
  const st = {
    cur: ADM,
    profiles: [
      { id:ADM, email:"consulente@selfsight.it", full_name:"Consulente (demo)", role:"admin" },
      { id:CLI, email:"referente@esempio.it", full_name:"Referente cliente (demo)", role:"client" },
      { id:"u-cli2", email:"it@altra-azienda.it", full_name:"Altro cliente (demo)", role:"client" }
    ],
    projects: [
      { id:"p-1", name:"Esempio S.r.l. (demo)", norm:"27001", active:true, created_at:"2026-10-01T09:00:00Z" },
      { id:"p-2", name:"Altra Azienda S.p.A. (demo)", norm:"9001", active:true, created_at:"2026-09-12T09:00:00Z" }
    ],
    members: [{ project_id:"p-1", user_id:CLI }, { project_id:"p-2", user_id:"u-cli2" }],
    items: [], docs: [], files: [], comments: [], activity: [], seq: 1
  };
  const now = () => new Date().toISOString();
  const isAdm = () => st.profiles.find(p => p.id === st.cur).role === "admin";
  const canAccess = pid => isAdm() || st.members.some(m => m.project_id === pid && m.user_id === st.cur && st.projects.find(p => p.id === pid).active);
  const log = (pid, ref, action, detail, uid, at) => st.activity.unshift({ id:st.seq++, project_id:pid, user_id:uid||st.cur, ref, action, detail:String(detail), created_at:at||now() });
  const guard = pid => { if(!canAccess(pid)) throw new Error("Accesso non consentito a questo progetto"); };
  // dati di esempio
  const seed = (pid, uid, t, fn) => { const save = st.cur; st.cur = uid; fn(); st.cur = save; st.activity[0] && (st.activity[0].created_at = t); };
  const at = h => new Date(Date.now() - h*3600e3).toISOString();
  [["4.1",2],["4.2",2],["4.3",2],["5.1",1],["5.2",2],["6.1.2",1],["A.5.9",2],["A.5.15",1]].forEach(([i,s],k) => { st.items.push({ project_id:"p-1", item_id:i, status:s, updated_by:CLI, updated_at:at(90-k) }); log("p-1", i, "item", s, CLI, at(90-k)); });
  const D = (doc, status, note, uid, h) => { let r = st.docs.find(x => x.project_id === "p-1" && x.doc_id === doc); if(!r){ r = { project_id:"p-1", doc_id:doc }; st.docs.push(r); } Object.assign(r, { status, review_note:note||null, updated_by:uid, updated_at:at(h), reviewed_by: note||status==="approvato" ? ADM : null, reviewed_at: note||status==="approvato" ? at(h) : null }); log("p-1", doc, "doc", status, uid, at(h)); };
  const F = (doc, name, h) => { st.files.unshift({ id:"f"+st.seq++, project_id:"p-1", doc_id:doc, path:"demo/"+name, name, size:48213+st.seq*731, uploaded_by:CLI, created_at:at(h) }); log("p-1", doc, "file", name, CLI, at(h)); };
  F("D01","Analisi contesto_v1.docx",80); D("D01","in_revisione",null,CLI,79); D("D01","approvato",null,ADM,60);
  F("D02","Politica sicurezza_v2.pdf",30); D("D02","in_revisione",null,CLI,29);
  F("D04","Analisi rischi.xlsx",50); D("D04","in_revisione",null,CLI,49);
  D("D04","da_rivedere","Mancano i criteri di accettazione del rischio e i titolari per gli asset IT. Integrate la metodologia e ricaricate il file.",ADM,26);
  D("D06","bozza",null,CLI,8);
  st.comments.push({ id:"c1", project_id:"p-1", ref:"D04", body:"Mancano i criteri di accettazione: vi ho lasciato la nota sul documento.", user_id:ADM, created_at:at(26) });
  log("p-1","D04","comment","Mancano i criteri di accettazione: vi ho lasciato la nota sul documento.",ADM,at(26));
  st.comments.push({ id:"c2", project_id:"p-1", ref:"D04", body:"Ricevuto, li aggiungiamo entro venerdì.", user_id:CLI, created_at:at(20) });
  log("p-1","D04","comment","Ricevuto, li aggiungiamo entro venerdì.",CLI,at(20));
  [["4.1",2],["4.2",2],["5.1.1",1]].forEach(([i,s]) => st.items.push({ project_id:"p-2", item_id:i, status:s, updated_by:"u-cli2", updated_at:at(200) }));
  st.docs.push({ project_id:"p-2", doc_id:"Q03", status:"in_revisione", updated_by:"u-cli2", updated_at:at(5) });
  st.activity.sort((a,b) => a.created_at < b.created_at ? 1 : -1);
  const clone = o => JSON.parse(JSON.stringify(o));

  return {
    demo:true,
    setUser(uid){ st.cur = uid; },
    get cur(){ return st.cur; },
    async session(){ return { user:{ id:st.cur } }; },
    onAuth(){},
    async signIn(){}, async signOut(){}, async resetPassword(){}, async updatePassword(){},
    async me(){ return clone(st.profiles.find(p => p.id === st.cur)); },
    async projects(){ return clone(st.projects.filter(p => canAccess(p.id)).map(p => Object.assign({}, p, { project_members: st.members.filter(m => m.project_id === p.id).map(m => ({ user_id:m.user_id })) }))); },
    async clients(){ return clone(st.profiles.filter(p => p.role === "client")); },
    async profiles(ids){ return clone(st.profiles.filter(p => ids.includes(p.id))); },
    async summary(){ return { items: clone(st.items.filter(r => canAccess(r.project_id))), docs: clone(st.docs.filter(r => canAccess(r.project_id))) }; },
    async createProject(name, norm, userId){ if(!isAdm()) throw new Error("Operazione riservata alla consulente"); const p = { id:"p-"+(st.seq++), name, norm, active:true, created_at:now() }; st.projects.unshift(p); if(userId) st.members.push({ project_id:p.id, user_id:userId }); return clone(p); },
    async setActive(id, active){ if(!isAdm()) throw new Error("Operazione riservata alla consulente"); st.projects.find(p => p.id === id).active = active; },
    async addMember(pid, uid){ if(!isAdm()) throw new Error("Operazione riservata alla consulente"); if(!st.members.some(m => m.project_id === pid && m.user_id === uid)) st.members.push({ project_id:pid, user_id:uid }); },
    async removeMember(pid, uid){ if(!isAdm()) throw new Error("Operazione riservata alla consulente"); st.members = st.members.filter(m => !(m.project_id === pid && m.user_id === uid)); },
    async setName(uid, name){ if(!isAdm()) throw new Error("Operazione riservata alla consulente"); st.profiles.find(p => p.id === uid).full_name = name; },
    async load(pid){ guard(pid); const f = a => clone(a.filter(r => r.project_id === pid)); return { items:f(st.items), docs:f(st.docs), files:f(st.files), comments:f(st.comments), activity:f(st.activity), members:f(st.members) }; },
    async setItem(pid, item, status){ guard(pid); let r = st.items.find(x => x.project_id === pid && x.item_id === item); const changed = !r || r.status !== status; if(!r){ r = { project_id:pid, item_id:item }; st.items.push(r); } Object.assign(r, { status, updated_by:st.cur, updated_at:now() }); if(changed) log(pid, item, "item", status); },
    async setDoc(pid, doc, status, note){
      guard(pid);
      let r = st.docs.find(x => x.project_id === pid && x.doc_id === doc);
      const old = r ? r.status : null;
      if(!isAdm()){
        if(["approvato","da_rivedere","non_applicabile"].includes(status) && status !== old) throw new Error("Solo la consulente può approvare un documento, rimandarlo indietro o dichiararlo non applicabile");
        if(["approvato","non_applicabile"].includes(old) && status !== old && status !== "in_revisione") throw new Error("Un documento approvato si può solo ripresentare in revisione");
        note = undefined;
      }
      if(!r){ r = { project_id:pid, doc_id:doc, review_note:null }; st.docs.push(r); }
      r.status = status; r.updated_by = st.cur; r.updated_at = now();
      if(note !== undefined) r.review_note = note;
      if(isAdm() && ["approvato","da_rivedere","non_applicabile"].includes(status) && status !== old){ r.reviewed_by = st.cur; r.reviewed_at = now(); }
      if(status !== old) log(pid, doc, "doc", status);
    },
    async upload(pid, doc, file){ guard(pid); st.files.unshift({ id:"f"+st.seq++, project_id:pid, doc_id:doc, path:"demo/"+file.name, name:file.name, size:file.size, uploaded_by:st.cur, created_at:now() }); log(pid, doc, "file", file.name); },
    async fileUrl(){ throw new Error("Nella demo i file non si possono scaricare"); },
    async comment(pid, ref, body){ guard(pid); st.comments.push({ id:"c"+st.seq++, project_id:pid, ref, body, user_id:st.cur, created_at:now() }); log(pid, ref, "comment", body.slice(0,140)); }
  };
}

const api = DEMO ? demoApi() : realApi();

/* =====================================================================
   Stato dell'interfaccia
   ===================================================================== */
const S = { screen:"loading", me:null, projects:[], clients:[], summary:null, pid:null, project:null, data:null,
  tab:"panoramica", cur:null, curDoc:null, q:"", open:{}, people:{}, armed:null, recovery:false, busy:false, mobileDetail:false };

function toast(msg, kind){
  const t = document.createElement("div"); t.className = "toast " + (kind||""); t.textContent = msg;
  $("#toasts").appendChild(t); setTimeout(() => t.remove(), kind === "err" ? 6500 : 3200);
}
function errMsg(e){
  const m = (e && (e.message || e.error_description)) || String(e);
  if(/Invalid login credentials/i.test(m)) return "Email o password non corretti.";
  if(/Email not confirmed/i.test(m)) return "L'indirizzo email non è ancora stato confermato.";
  if(/row-level security|permission denied|violates row-level/i.test(m)) return "Operazione non consentita per il tuo profilo o per questo progetto.";
  if(/duplicate key/i.test(m)) return "L'elemento esiste già.";
  if(/Failed to fetch|NetworkError/i.test(m)) return "Connessione non riuscita: controlla la rete e riprova.";
  return m;
}
async function run(fn, okMsg){
  if(S.busy) return; S.busy = true; document.body.classList.add("busy");
  try { await fn(); if(okMsg) toast(okMsg); }
  catch(e){ console.error(e); toast(errMsg(e), "err"); }
  finally { S.busy = false; document.body.classList.remove("busy"); }
}
const isAdmin = () => S.me && S.me.role === "admin";
const who = id => { const p = S.people[id]; return p ? (p.full_name || p.email) : (id ? "Utente rimosso" : "Sistema"); };

async function loadPeople(ids){
  const miss = [...new Set(ids.filter(Boolean))].filter(id => !S.people[id]);
  if(!miss.length) return;
  (await api.profiles(miss)).forEach(p => S.people[p.id] = p);
}

/* ---------- avvio ---------- */
async function boot(){
  if(DEMO) document.body.classList.add("demo");
  if(!DEMO){
    api.onAuth((ev) => { if(ev === "PASSWORD_RECOVERY"){ S.recovery = true; S.screen = "recovery"; render(); } if(ev === "SIGNED_OUT"){ S.me = null; S.screen = "login"; render(); } });
    if(/type=recovery/.test(location.hash)) S.recovery = true;
  }
  await enter();
}
async function enter(){
  try {
    const s = await api.session();
    if(!s){ S.screen = S.recovery ? "recovery" : "login"; render(); return; }
    if(S.recovery){ S.screen = "recovery"; render(); return; }
    S.me = await api.me(); S.people[S.me.id] = S.me;
    await home();
  } catch(e){ console.error(e); S.screen = "login"; render(); toast(errMsg(e), "err"); }
}
async function home(){
  S.project = null; S.pid = null; S.data = null;
  S.projects = await api.projects();
  if(isAdmin()){
    [S.clients, S.summary] = await Promise.all([api.clients(), api.summary()]);
    S.clients.forEach(c => S.people[c.id] = c);
    S.screen = "dashboard";
  } else if(S.projects.length === 1){ await openProject(S.projects[0].id); return; }
  else S.screen = "clienthome";
  render();
}
async function openProject(pid, keepTab){
  const p = S.projects.find(x => x.id === pid) || (await api.projects()).find(x => x.id === pid);
  if(!p){ toast("Progetto non disponibile", "err"); return home(); }
  S.pid = pid; S.project = p;
  S.data = await api.load(pid);
  const ids = [].concat(S.data.activity.map(a => a.user_id), S.data.files.map(f => f.uploaded_by), S.data.comments.map(c => c.user_id), S.data.members.map(m => m.user_id), S.data.docs.map(d => d.reviewed_by));
  await loadPeople(ids);
  const n = N(p.norm);
  if(!keepTab){ S.tab = "panoramica"; S.cur = n.ITEMS[0].id; S.curDoc = n.DOCS[0].id; S.q = ""; S.mobileDetail = false; }
  S.screen = "project"; render();
}
async function refresh(){ if(S.pid) await openProject(S.pid, true); else await home(); }

/* ---------- utilità di stato ---------- */
const itemSt = id => { const r = S.data.items.find(x => x.item_id === id); return r ? r.status : 0; };
const docRow = id => S.data.docs.find(x => x.doc_id === id);
const docSt = id => { const r = docRow(id); return r ? r.status : "da_fare"; };
function progress(n, data){
  const its = n.ITEMS.filter(i => !i.guide), done = its.filter(i => { const r = data.items.find(x => x.item_id === i.id); return r && (r.status === 2 || r.status === 3); }).length;
  const docs = n.DOCS, dSt = id => { const r = data.docs.find(x => x.doc_id === id); return r ? r.status : "da_fare"; };
  const appr = docs.filter(d => dSt(d.id) === "approvato").length, na = docs.filter(d => dSt(d.id) === "non_applicabile").length;
  return { done, total:its.length, appr, dtotal:docs.length - na,
    review: docs.filter(d => dSt(d.id) === "in_revisione"), fix: docs.filter(d => dSt(d.id) === "da_rivedere") };
}
const pct = (a,b) => b ? Math.round(a/b*100) : 0;
const bar = (a,b) => `<div class="bar"><i style="width:${pct(a,b)}%"></i></div>`;
const dot = s => `<span class="dot s${s}" title="${ITEM_ST[s]}"></span>`;
const pill = s => `<span class="pill ds-${s}">${DOC_ST[s]}</span>`;

/* =====================================================================
   Rendering
   ===================================================================== */
function render(){
  const app = $("#app");
  if(S.screen === "loading"){ app.innerHTML = `<div class="center"><p class="muted">Caricamento…</p></div>`; return; }
  if(S.screen === "login" || S.screen === "forgot" || S.screen === "recovery"){ app.innerHTML = renderAuth(); bindAuth(); return; }
  app.innerHTML = renderTop() + `<main class="wrap-main">${
    S.screen === "dashboard" ? renderDashboard() :
    S.screen === "clienthome" ? renderClientHome() : renderProject()}</main>` + renderFoot();
  bindAfter();
}

function renderAuth(){
  const f = S.screen;
  const body = f === "login" ? `
      <label class="fld"><span>Email</span><input id="a-email" type="email" autocomplete="username" required></label>
      <label class="fld"><span>Password</span><input id="a-pw" type="password" autocomplete="current-password" required></label>
      <button class="btn primary wide" type="submit">Accedi</button>
      <button class="linkbtn" type="button" data-act="forgot">Password dimenticata?</button>`
    : f === "forgot" ? `
      <p class="muted">Inserisci la tua email: riceverai un link per impostare una nuova password.</p>
      <label class="fld"><span>Email</span><input id="a-email" type="email" autocomplete="username" required></label>
      <button class="btn primary wide" type="submit">Invia il link</button>
      <button class="linkbtn" type="button" data-act="tologin">Torna all'accesso</button>`
    : `
      <p class="muted">Scegli la nuova password, di almeno 10 caratteri.</p>
      <label class="fld"><span>Nuova password</span><input id="a-pw" type="password" autocomplete="new-password" minlength="10" required></label>
      <label class="fld"><span>Ripeti la password</span><input id="a-pw2" type="password" autocomplete="new-password" minlength="10" required></label>
      <button class="btn primary wide" type="submit">Salva la password</button>`;
  return `<div class="center"><form class="authcard" id="authform" novalidate>
    <div class="brandmark"><span class="mk">Selfsight</span><span>Area clienti</span></div>
    <h1>${f === "login" ? "Accedi al tuo progetto" : f === "forgot" ? "Recupera la password" : "Imposta una nuova password"}</h1>
    ${body}
    <p class="tiny">L'accesso è riservato ai clienti dello studio. Le credenziali sono personali e non vanno condivise.</p>
  </form></div><div id="toasts"></div>`;
}
function bindAuth(){
  const f = $("#authform"); if(!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    if(S.screen === "login") run(async () => { await api.signIn($("#a-email").value.trim(), $("#a-pw").value); await enter(); });
    else if(S.screen === "forgot") run(async () => { await api.resetPassword($("#a-email").value.trim()); S.screen = "login"; render(); }, "Se l'indirizzo è registrato riceverai a breve un'email.");
    else run(async () => {
      const a = $("#a-pw").value, b = $("#a-pw2").value;
      if(a.length < 10) throw new Error("La password deve avere almeno 10 caratteri.");
      if(a !== b) throw new Error("Le due password non coincidono.");
      await api.updatePassword(a); S.recovery = false; history.replaceState(null, "", location.pathname); await enter();
    }, "Password aggiornata.");
  });
  const e = $("#a-email"); if(e) e.focus(); else { const p = $("#a-pw"); if(p) p.focus(); }
}

function renderTop(){
  const crumbs = S.screen === "project" ? `<span class="sep">/</span><span class="crumbp">${esc(S.project.name)}</span>` : "";
  const back = (S.screen === "project" && (isAdmin() || S.projects.length > 1)) ? `<button class="btn ghost sm" data-act="home">← Progetti</button>` : "";
  const demo = DEMO ? `<div class="demobar"><span><b>Demo</b> · i dati sono di esempio e si azzerano ricaricando la pagina.</span>
      <span class="seg">Vedi come <button data-act="as" data-u="u-adm" aria-pressed="${api.cur==="u-adm"}">Consulente</button><button data-act="as" data-u="u-cli" aria-pressed="${api.cur==="u-cli"}">Cliente</button></span></div>` : "";
  return `${demo}<header class="topbar"><div class="tb-in">
    <div class="tb-l"><span class="brandmark sm"><span class="mk">Selfsight</span><span>Area clienti</span></span>${crumbs}</div>
    <div class="tb-r">${back}<span class="me">${esc(S.me.full_name || S.me.email)}<small>${isAdmin() ? "Consulente" : "Cliente"}</small></span>
    ${DEMO ? "" : `<button class="btn ghost sm" data-act="logout">Esci</button>`}</div></div></header>`;
}
function renderFoot(){ return `<footer class="foot"><span>Area clienti Selfsight. I contenuti sono sintesi operative e non riproducono il testo delle norme.</span></footer><div id="toasts"></div>`; }

/* ---------- dashboard della consulente ---------- */
function renderDashboard(){
  const sum = S.summary || { items:[], docs:[] };
  const cards = S.projects.map(p => {
    const n = N(p.norm), d = { items: sum.items.filter(r => r.project_id === p.id), docs: sum.docs.filter(r => r.project_id === p.id) };
    const pr = progress(n, d);
    const mem = (p.project_members||[]).map(m => esc(who(m.user_id))).join(", ") || "<em>nessun utente cliente</em>";
    const armed = S.armed === "act-"+p.id;
    return `<article class="pcard ${p.active ? "" : "off"}">
      <div class="pc-h"><h3>${esc(p.name)}</h3><span class="pill norm">${NORM_NAME[p.norm]}</span>${p.active ? `<span class="pill ok">Attivo</span>` : `<span class="pill na">Accesso sospeso</span>`}</div>
      <p class="muted sm">Utenti: ${mem}</p>
      <div class="kv"><span>Punti norma completati</span><b>${pr.done}/${pr.total}</b></div>${bar(pr.done, pr.total)}
      <div class="kv"><span>Documenti approvati</span><b>${pr.appr}/${pr.dtotal}</b></div>${bar(pr.appr, pr.dtotal)}
      <div class="pc-alerts">${pr.review.length ? `<span class="pill ds-in_revisione">${pr.review.length} da revisionare</span>` : ""}${pr.fix.length ? `<span class="pill ds-da_rivedere">${pr.fix.length} rimandati al cliente</span>` : ""}</div>
      <div class="pc-a"><button class="btn primary sm" data-act="open" data-p="${p.id}">Apri</button>
        <button class="btn ghost sm ${armed ? "danger" : ""}" data-act="toggleactive" data-p="${p.id}">${p.active ? (armed ? "Conferma sospensione" : "Sospendi accesso") : (armed ? "Conferma riattivazione" : "Riattiva accesso")}</button></div>
    </article>`;
  }).join("");
  const opts = S.clients.map(c => `<option value="${c.id}">${esc(c.full_name ? c.full_name+" · "+c.email : c.email)}</option>`).join("");
  return `<section class="block"><div class="block-h"><h2>Progetti</h2><button class="btn ghost sm" data-act="refresh">Aggiorna</button></div>
    ${cards ? `<div class="pgrid">${cards}</div>` : `<p class="empty">Non ci sono ancora progetti. Creane uno qui sotto.</p>`}</section>
    <section class="block"><h2>Nuovo progetto</h2>
      <form class="newp" id="newp">
        <label class="fld"><span>Cliente o progetto</span><input id="np-name" required maxlength="200" placeholder="Ad esempio Rossi S.r.l., certificazione 2027"></label>
        <label class="fld"><span>Norma</span><select id="np-norm"><option value="27001">ISO/IEC 27001 (con 27017 e 27018)</option><option value="9001">ISO 9001:2026</option></select></label>
        <label class="fld"><span>Utente cliente</span><select id="np-user"><option value="">Lo assegno dopo</option>${opts}</select></label>
        <button class="btn primary" type="submit">Crea il progetto</button>
      </form>
      <p class="tiny">Gli utenti cliente si creano dal pannello di Supabase (Authentication, Add user) e compaiono subito in questo elenco.</p>
    </section>`;
}

function renderClientHome(){
  if(!S.projects.length) return `<section class="block center-b"><h2>Nessun progetto attivo</h2><p class="muted">Al momento non hai progetti accessibili. Se pensi che sia un errore, contatta la consulente dello studio.</p></section>`;
  return `<section class="block"><h2>I tuoi progetti</h2><div class="pgrid">${S.projects.map(p => `<article class="pcard"><div class="pc-h"><h3>${esc(p.name)}</h3><span class="pill norm">${NORM_NAME[p.norm]}</span></div><div class="pc-a"><button class="btn primary sm" data-act="open" data-p="${p.id}">Apri</button></div></article>`).join("")}</div></section>`;
}

/* ---------- progetto ---------- */
function renderProject(){
  const n = N(S.project.norm), pr = progress(n, S.data);
  const tabs = [["panoramica","Panoramica"],["norma","Punti norma"],["documenti","Documenti"],["attivita","Attività"]];
  const head = `<div class="ph"><div><h1>${esc(S.project.name)}</h1><p class="muted">${NORM_NAME[S.project.norm]}${S.project.active ? "" : " · <b class=\"warn-t\">accesso del cliente sospeso</b>"}</p></div>
    <div class="ph-k"><div><b>${pct(pr.done, pr.total)}%</b><span>punti completati</span></div><div><b>${pr.appr}/${pr.dtotal}</b><span>documenti approvati</span></div></div></div>
    <nav class="ptabs" role="tablist">${tabs.map(([k,l]) => `<button role="tab" data-act="tab" data-t="${k}" aria-selected="${S.tab===k}">${l}${k==="documenti" && (isAdmin() ? pr.review.length : pr.fix.length) ? `<span class="cnt-b">${isAdmin() ? pr.review.length : pr.fix.length}</span>` : ""}</button>`).join("")}<button class="btn ghost sm rt" data-act="refresh">Aggiorna</button></nav>`;
  let body = "";
  if(S.tab === "panoramica") body = renderOverview(n, pr);
  else if(S.tab === "norma") body = renderNorma(n);
  else if(S.tab === "documenti") body = renderDocs(n);
  else body = renderActivity(n, S.data.activity);
  return head + body;
}

function renderOverview(n, pr){
  const adm = isAdmin();
  const list = (arr, empty, withNote) => arr.length ? `<ul class="olist">${arr.map(d => { const r = docRow(d.id); return `<li><button class="lk" data-act="godoc" data-d="${d.id}"><code>${d.id}</code><span>${esc(d.n)}</span></button>${withNote && r && r.review_note ? `<p class="note-s">${esc(r.review_note)}</p>` : ""}</li>`; }).join("")}</ul>` : `<p class="empty">${empty}</p>`;
  const phases = (n.PHASES||[]).map((p,ix) => { const ok = p.ids.filter(id => [2,3].includes(itemSt(id))).length; return `<div class="ophase"><div class="kv"><span>${ix+1}. ${esc(p.n)}</span><b>${ok}/${p.ids.length}</b></div>${bar(ok, p.ids.length)}</div>`; }).join("");
  const members = S.data.members.map(m => m.user_id);
  const access = adm ? `<section class="block"><h2>Accesso del cliente</h2>
      <ul class="mlist">${members.map(u => `<li><span>${esc(who(u))}<small>${esc((S.people[u]||{}).email||"")}</small></span><button class="btn ghost sm ${S.armed==="rm-"+u ? "danger" : ""}" data-act="rmmember" data-u="${u}">${S.armed==="rm-"+u ? "Conferma rimozione" : "Togli accesso"}</button></li>`).join("") || `<li class="muted">Nessun utente cliente assegnato.</li>`}</ul>
      <form class="inline" id="addmember"><select id="am-user"><option value="">Aggiungi un utente cliente…</option>${(S.clients||[]).filter(c => !members.includes(c.id)).map(c => `<option value="${c.id}">${esc(c.full_name ? c.full_name+" · "+c.email : c.email)}</option>`).join("")}</select><button class="btn ghost sm" type="submit">Aggiungi</button></form>
      <div class="pc-a"><button class="btn ghost sm ${S.armed==="act-"+S.pid ? "danger" : ""}" data-act="toggleactive" data-p="${S.pid}">${S.project.active ? (S.armed==="act-"+S.pid ? "Conferma sospensione" : "Sospendi l'accesso al progetto") : (S.armed==="act-"+S.pid ? "Conferma riattivazione" : "Riattiva l'accesso")}</button></div>
      <p class="tiny">Sospendendo il progetto il cliente non vede più nulla, mentre tu conservi dati, file e storico.</p></section>` : "";
  return `<div class="ogrid">
    <section class="block"><h2>${adm ? "Da revisionare" : "Da correggere"}</h2>${adm ? list(pr.review, "Nessun documento in attesa di revisione.") : list(pr.fix, "Nessun documento rimandato indietro.", true)}</section>
    <section class="block"><h2>${adm ? "Rimandati al cliente" : "In revisione dalla consulente"}</h2>${adm ? list(pr.fix, "Nessun documento in attesa di correzioni.", true) : list(pr.review, "Nessun documento in revisione.")}</section>
    <section class="block"><h2>Avanzamento per fase</h2>${phases}</section>
    <section class="block"><h2>Ultime attività</h2>${renderActivityList(n, S.data.activity.slice(0,8))}<button class="linkbtn" data-act="tab" data-t="attivita">Tutte le attività</button></section>
    ${access}
  </div>`;
}

/* ---------- punti norma ---------- */
function matchItem(i){
  if(!S.q) return true;
  const hay = normTxt([i.id, i.code, i.t, i.c, i.p, i.ap, i.ref].filter(Boolean).join(" "));
  return normTxt(S.q).split(/\s+/).filter(Boolean).every(w => hay.includes(w));
}
function renderNorma(n){
  const groups = {}; n.ITEMS.forEach(i => (groups[i.g] = groups[i.g] || []).push(i));
  const curG = (n.BY[S.cur]||{}).g;
  const tree = Object.keys(n.GROUPS).map(g => {
    const list = (groups[g]||[]).filter(matchItem); if(!list.length) return "";
    const open = S.q || g === curG || (S.open[g] !== undefined ? S.open[g] : !(g.startsWith("A.") || g.startsWith("X") || g === "L"));
    const done = list.filter(i => !i.guide && [2,3].includes(itemSt(i.id))).length, tot = list.filter(i => !i.guide).length;
    return `<details class="grp" data-g="${g}" ${open ? "open" : ""}><summary><span class="n">${esc(g === "L" ? "§" : ((n.GLAB||{})[g] || g))}</span>${esc(n.GROUPS[g])}<span class="cnt">${done}/${tot}</span></summary>${list.map(i => `<button class="it" data-act="item" data-i="${i.id}" aria-current="${i.id===S.cur}">${i.guide ? `<span class="dot hid"></span>` : dot(itemSt(i.id))}<span class="code">${esc(i.code || i.id.replace("A.",""))}</span><span class="tt">${esc(i.t)}</span></button>`).join("")}</details>`;
  }).join("");
  return `<div class="split ${S.mobileDetail ? "show-detail" : ""}"><aside class="side"><div class="side-h"><input id="q" type="search" placeholder="Cerca un punto o un controllo…" value="${esc(S.q)}" autocomplete="off"></div><nav class="tree">${tree || `<p class="empty">Nessun risultato.</p>`}</nav></aside>
    <section class="detail">${renderItem(n, n.BY[S.cur])}</section></div>`;
}
function renderItem(n, i){
  if(!i) return "";
  const order = n.ITEMS, ix = order.indexOf(i), prev = order[ix-1], next = order[ix+1];
  const st = itemSt(i.id), r = S.data.items.find(x => x.item_id === i.id);
  const docs = (i.d||[]).map(id => { const d = n.BY[id]; return d ? `<button class="dcard" data-act="godoc" data-d="${id}"><span class="ic"></span><span><b>${esc(d.n)}</b><small>${id}</small></span>${pill(docSt(id))}</button>` : ""; }).join("");
  const evid = i.e1 ? `<div class="stg"><div><em>STAGE 1</em>${esc(i.e1)}</div><div><em>STAGE 2</em>${esc(i.e2)}</div></div>` : (i.e ? `<p>${esc(i.e)}</p>` : "");
  const roles = (i.kind === "x" && (i.csc || i.csp)) ? `<section class="sec"><h3>Cliente e fornitore cloud</h3><div class="stg"><div><em>CLIENTE (CSC)</em>${esc(i.csc||"")}</div><div><em>FORNITORE (CSP)</em>${esc(i.csp||"")}</div></div></section>` : "";
  const diff = (i.kind === "a" && (i.csc || i.csp || i.c18)) ? `<section class="sec diffbox"><h3>Differenziale 27017 e 27018</h3>${i.csc||i.csp ? `<div class="stg"><div><em>CLIENTE CLOUD</em>${esc(i.csc||"Nessuna indicazione aggiuntiva.")}</div><div><em>FORNITORE CLOUD</em>${esc(i.csp||"Nessuna indicazione aggiuntiva.")}</div></div>` : ""}${i.c18 ? `<p style="margin-top:8px"><b>27018.</b> ${esc(i.c18)}</p>` : ""}</section>` : "";
  return `<article class="card">
    <button class="btn ghost sm backm" data-act="backlist">← Elenco</button>
    <div class="crumb">${esc(groupLabel(n, i.g))}</div>
    <div class="hd"><div class="bigcode">${esc(i.code || i.id)}</div><h2>${esc(i.t)}</h2></div>
    <div class="stbar">${i.guide ? `<span class="pill">Scheda di spiegazione</span>` : `<label>Stato <select id="st-item" data-i="${i.id}">${ITEM_ST.map((l,k) => `<option value="${k}" ${k===st?"selected":""}>${l}</option>`).join("")}</select></label>`}
      ${r && r.updated_by ? `<span class="tiny">Ultima modifica: ${esc(who(r.updated_by))}, ${fmtDate(r.updated_at)}</span>` : ""}</div>
    <div class="cols">
      <div>
        ${i.kind === "l" ? `<section class="sec"><h3>Riferimento</h3><p><span class="pill">${esc(i.ref)}</span></p></section>` : ""}
        ${i.ap ? `<section class="sec"><h3>A chi si applica</h3><p class="note">${esc(i.ap)}</p></section>` : ""}
        <section class="sec"><h3>${i.kind === "l" ? "Cosa prevede" : "Cosa chiede"}</h3><p>${esc(i.c)}</p></section>
        ${roles}
        ${i.p ? `<section class="sec"><h3>In pratica</h3><p class="note">${esc(i.p)}</p></section>` : ""}
        ${i.cli ? `<section class="sec"><h3>Se sei il cliente del servizio</h3><p>${esc(i.cli)}</p></section>` : ""}
        ${i.nv ? `<section class="sec"><h3>Cosa cambia con la 2026</h3><p class="note y">${esc(i.nv)}</p></section>` : ""}
        ${i.err ? `<section class="sec"><h3>Errore frequente</h3><p class="warn">${esc(i.err)}</p></section>` : ""}
        ${i.q ? `<section class="sec"><h3>Domanda tipica dell'auditor</h3><p class="ask">«${esc(i.q)}»</p></section>` : ""}
      </div>
      <div>
        ${docs ? `<section class="sec"><h3>Dove va</h3><div class="docs">${docs}</div></section>` : ""}
        ${evid ? `<section class="sec"><h3>Evidenze per l'auditor</h3>${evid}</section>` : ""}
        ${i.kind === "l" && (i.l||[]).length ? `<section class="sec"><h3>Punti norma collegati</h3><div class="links">${i.l.map(id => n.BY[id]).filter(Boolean).map(x => `<button class="lk" data-act="goitem" data-i="${x.id}">${x.guide ? "" : dot(itemSt(x.id))}<code>${esc(codeOf(n,x))}</code><span>${esc(x.t)}</span></button>`).join("")}</div></section>` : ""}
        ${i.integ ? `<section class="sec"><h3>Nel sistema integrato con la 27001</h3><p>${esc(i.integ)}</p></section>` : ""}
      </div>
    </div>
    ${diff}
    ${i.ev ? `<section class="sec diffbox"><h3>Cosa chiede l'ente</h3><div class="stg">${["s1","s2"].map(st => `<div><em>${st === "s1" ? "STAGE 1 · ESAME DOCUMENTALE" : "STAGE 2 · VERIFICA IN SEDE"}</em><ul class="evl">${i.ev[st].map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div></section>` : ""}
    ${renderComments(i.id)}
    <div class="nav"><button data-act="item" data-i="${prev?prev.id:""}" ${prev?"":"disabled"}><small>Precedente</small><b>${prev?esc((prev.code||prev.id)+" "+prev.t):"Inizio"}</b></button>
      <button data-act="item" data-i="${next?next.id:""}" ${next?"":"disabled"}><small>Successivo</small><b>${next?esc((next.code||next.id)+" "+next.t):"Fine"}</b></button></div>
  </article>`;
}

/* ---------- documenti ---------- */
function renderDocs(n){
  const list = n.D.map(d => d.common ? `<button class="it" data-act="doc" data-d="${d.id}" aria-current="${d.id===S.curDoc}"><span class="dot hid"></span><span class="code">${d.id}</span><span class="tt">${esc(d.n)}</span></button>`
    : `<button class="it" data-act="doc" data-d="${d.id}" aria-current="${d.id===S.curDoc}"><span class="dot ds-${docSt(d.id)}"></span><span class="code">${d.id}</span><span class="tt">${esc(d.n)}<br>${pill(docSt(d.id))}</span></button>`).join("");
  return `<div class="split ${S.mobileDetail ? "show-detail" : ""}"><aside class="side"><nav class="tree"><details class="grp" open><summary>Documenti del sistema<span class="cnt">${progress(n,S.data).appr}/${progress(n,S.data).dtotal}</span></summary>${list}</details></nav></aside>
    <section class="detail">${renderDoc(n, n.BY[S.curDoc])}</section></div>`;
}
function renderDoc(n, d){
  if(!d) return "";
  const ix = n.D.indexOf(d), prev = n.D[ix-1], next = n.D[ix+1];
  const navb = `<div class="nav"><button data-act="doc" data-d="${prev?prev.id:""}" ${prev?"":"disabled"}><small>Precedente</small><b>${prev?esc(prev.id+" "+prev.n):"Inizio"}</b></button><button data-act="doc" data-d="${next?next.id:""}" ${next?"":"disabled"}><small>Successivo</small><b>${next?esc(next.id+" "+next.n):"Fine"}</b></button></div>`;
  if(d.common){
    const C = n.COMMON;
    return `<article class="card"><button class="btn ghost sm backm" data-act="backlist">← Elenco</button><div class="crumb">Documento del sistema</div><div class="hd"><div class="bigcode">${d.id}</div><h2>${esc(d.n)}</h2></div>
      <section class="sec"><h3>Gerarchia</h3><ol class="dstr">${C.levels.map(([t,x]) => `<li><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol></section>
      <section class="sec"><h3>Cartiglio</h3><p>${C.header.map(esc).join(", ")}.</p></section>
      <section class="sec"><h3>Struttura tipo di una procedura</h3><ol class="dstr">${C.proc.map(([t,x]) => `<li><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol></section>
      ${navb}</article>`;
  }
  const r = docRow(d.id), st = r ? r.status : "da_fare", adm = isAdmin();
  const files = S.data.files.filter(f => f.doc_id === d.id);
  const used = (n.USES[d.id]||[]).map(id => n.BY[id]).filter(Boolean);
  const done = used.filter(x => [2,3].includes(itemSt(x.id))).length;
  // azioni disponibili
  let acts = "";
  if(adm){
    acts = `${st !== "approvato" ? `<button class="btn primary sm" data-act="dst" data-s="approvato">Approva</button>` : ""}
      <button class="btn ghost sm" data-act="askfix">Chiedi modifiche</button>
      ${st !== "non_applicabile" ? `<button class="btn ghost sm" data-act="dst" data-s="non_applicabile">Non applicabile</button>` : ""}
      ${["approvato","non_applicabile","da_rivedere","in_revisione"].includes(st) ? `<button class="btn ghost sm" data-act="dst" data-s="bozza">Riporta in bozza</button>` : ""}`;
  } else {
    if(["approvato","non_applicabile"].includes(st)) acts = `<button class="btn ghost sm" data-act="dst" data-s="in_revisione">Ripresenta in revisione</button>`;
    else acts = `${st !== "bozza" ? `<button class="btn ghost sm" data-act="dst" data-s="bozza">Segna in bozza</button>` : ""}
      ${st !== "in_revisione" ? `<button class="btn primary sm" data-act="dst" data-s="in_revisione">Invia in revisione</button>` : `<span class="tiny">In attesa della revisione della consulente.</span>`}`;
  }
  const fixForm = adm && S.armed === "fix-"+d.id ? `<form class="fixform" id="fixform"><label class="fld"><span>Cosa deve correggere il cliente</span><textarea id="fix-note" rows="3" required maxlength="2000">${esc(r && r.review_note || "")}</textarea></label><div class="pc-a"><button class="btn primary sm" type="submit">Rimanda al cliente</button><button class="btn ghost sm" type="button" data-act="cancel">Annulla</button></div></form>` : "";
  const reviewBox = r && r.review_note && ["da_rivedere"].includes(st) ? `<div class="revnote"><b>Nota della consulente</b><p>${esc(r.review_note)}</p>${r.reviewed_at ? `<small>${esc(who(r.reviewed_by))}, ${fmtDate(r.reviewed_at)}</small>` : ""}</div>` : "";
  const approvedBox = st === "approvato" && r ? `<div class="okbox">Approvato da ${esc(who(r.reviewed_by))}${r.reviewed_at ? ", "+fmtDate(r.reviewed_at) : ""}.</div>` : "";
  const table = d.col && d.col.length ? `<details class="more"><summary>Colonne della tabella o del registro</summary><div class="tblw"><table><thead><tr>${d.col.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead></table></div></details>` : "";
  return `<article class="card">
    <button class="btn ghost sm backm" data-act="backlist">← Elenco</button>
    <div class="crumb">Documento del sistema</div>
    <div class="hd"><div class="bigcode">${d.id}</div><h2>${esc(d.n)}</h2></div>
    <div class="stbar">${pill(st)}${d.o ? `<span class="pill doc">Informazione documentata obbligatoria</span>` : ""}<span class="tiny">Punti collegati completati ${done}/${used.length}</span></div>
    ${reviewBox}${approvedBox}
    <div class="acts">${acts}</div>${fixForm}
    <div class="cols">
      <div>
        <section class="sec"><h3>Versioni caricate</h3>
          ${files.length ? `<ul class="flist">${files.map((f,k) => `<li><span class="fi">${k===0 ? `<span class="pill ok">Ultima</span>` : ""}<b>${esc(f.name)}</b><small>${esc(who(f.uploaded_by))} · ${fmtDate(f.created_at)}${f.size ? " · "+fmtSize(f.size) : ""}</small></span><button class="btn ghost sm" data-act="dl" data-f="${esc(f.path)}" data-n="${esc(f.name)}">Scarica</button></li>`).join("")}</ul>` : `<p class="empty">Nessun file caricato.</p>`}
          <form class="upl" id="uplform"><input type="file" id="upl-file" required><button class="btn ghost sm" type="submit">Carica una nuova versione</button></form>
          <p class="tiny">Massimo 50 MB per file. Ogni caricamento si aggiunge allo storico senza sostituire le versioni precedenti.</p>
        </section>
        <section class="sec"><h3>Cosa contiene</h3><p>${esc(d.c)}</p></section>
        ${d.str ? `<section class="sec"><h3>Come strutturarlo</h3><ol class="dstr">${d.str.map(([t,x]) => `<li><div><b>${esc(t)}</b><span>${esc(x)}</span></div></li>`).join("")}</ol></section>` : ""}
        ${table}
      </div>
      <div>
        <section class="sec"><h3>Scheda</h3><dl class="facts"><dt>Formato</dt><dd>${esc(d.f||"")}</dd><dt>Approva</dt><dd>${esc(d.a||"")}</dd><dt>Riesame</dt><dd>${esc(d.r||"")}</dd></dl></section>
        <section class="sec"><h3>Consiglio</h3><p class="note">${esc(d.t)}</p></section>
        ${d.err ? `<section class="sec"><h3>Errore da evitare</h3><p class="warn">${esc(d.err)}</p></section>` : ""}
        ${used.length ? `<section class="sec"><h3>Punti collegati</h3><div class="links">${used.map(x => `<button class="lk" data-act="goitem" data-i="${x.id}">${dot(itemSt(x.id))}<code>${esc(codeOf(n,x))}</code><span>${esc(x.t)}</span></button>`).join("")}</div></section>` : ""}
      </div>
    </div>
    ${renderComments(d.id)}
    ${navb}
  </article>`;
}

/* ---------- commenti e attività ---------- */
function renderComments(ref){
  const cs = S.data.comments.filter(c => c.ref === ref);
  return `<section class="sec comments"><h3>Commenti</h3>
    ${cs.length ? `<ul class="clist">${cs.map(c => `<li class="${(S.people[c.user_id]||{}).role === "admin" ? "adm" : ""}"><div class="ch"><b>${esc(who(c.user_id))}</b><small>${fmtDate(c.created_at)}</small></div><p>${esc(c.body)}</p></li>`).join("")}</ul>` : `<p class="empty">Nessun commento.</p>`}
    <form class="cform" data-ref="${esc(ref)}"><textarea rows="2" maxlength="4000" placeholder="Scrivi un commento…" required></textarea><button class="btn ghost sm" type="submit">Invia</button></form></section>`;
}
function actText(n, a){
  const x = n.BY[a.ref], label = x ? (x.kind === "d" ? a.ref+" "+x.n : codeOf(n,x)+" "+x.t) : (a.ref||"");
  const W = `<b>${esc(who(a.user_id))}</b>`;
  if(a.action === "item") return `${W} ha segnato ${esc(label)} come «${ITEM_ST[+a.detail]||a.detail}»`;
  if(a.action === "doc") return `${W} ha portato ${esc(label)} in «${DOC_ST[a.detail]||a.detail}»`;
  if(a.action === "file") return `${W} ha caricato una versione di ${esc(label)}: ${esc(a.detail)}`;
  if(a.action === "comment") return `${W} ha commentato ${esc(label)}: «${esc(a.detail)}»`;
  return `${W}: ${esc(a.action)} ${esc(label)}`;
}
function renderActivityList(n, list){
  if(!list.length) return `<p class="empty">Ancora nessuna attività.</p>`;
  return `<ul class="alist">${list.map(a => `<li><span class="when">${fmtDate(a.created_at)}</span><span>${actText(n,a)}</span></li>`).join("")}</ul>`;
}
function renderActivity(n, list){
  if(!list.length) return `<section class="block"><p class="empty">Ancora nessuna attività.</p></section>`;
  const days = {}; list.forEach(a => { const k = (a.created_at||"").slice(0,10); (days[k] = days[k] || []).push(a); });
  return `<section class="block">${Object.keys(days).map(k => `<h3 class="day">${fmtDay(days[k][0].created_at)}</h3>${renderActivityList(n, days[k])}`).join("")}</section>`;
}

/* =====================================================================
   Eventi
   ===================================================================== */
function bindAfter(){
  const q = $("#q");
  if(q){ q.addEventListener("input", e => { S.q = e.target.value; const pos = e.target.selectionStart; render(); const nq = $("#q"); nq.focus(); nq.setSelectionRange(pos,pos); }); }
  document.querySelectorAll("details.grp[data-g]").forEach(d => d.addEventListener("toggle", () => { S.open[d.dataset.g] = d.open; }));
  const si = $("#st-item"); if(si) si.addEventListener("change", e => run(async () => { await api.setItem(S.pid, e.target.dataset.i, +e.target.value); await refresh(); }));
  const np = $("#newp"); if(np) np.addEventListener("submit", e => { e.preventDefault(); run(async () => { const name = $("#np-name").value.trim(); if(!name) throw new Error("Indica il nome del cliente o del progetto."); await api.createProject(name, $("#np-norm").value, $("#np-user").value || null); await home(); }, "Progetto creato."); });
  const am = $("#addmember"); if(am) am.addEventListener("submit", e => { e.preventDefault(); const u = $("#am-user").value; if(!u) return; run(async () => { await api.addMember(S.pid, u); await refresh(); }, "Utente aggiunto al progetto."); });
  const up = $("#uplform"); if(up) up.addEventListener("submit", e => { e.preventDefault(); const f = $("#upl-file").files[0]; if(!f) return; run(async () => {
      if(f.size > 50*1024*1024) throw new Error("Il file supera i 50 MB.");
      await api.upload(S.pid, S.curDoc, f);
      if(!isAdmin() && ["da_fare"].includes(docSt(S.curDoc))) await api.setDoc(S.pid, S.curDoc, "bozza");
      await refresh(); }, "File caricato."); });
  const ff = $("#fixform"); if(ff) ff.addEventListener("submit", e => { e.preventDefault(); const note = $("#fix-note").value.trim(); if(!note){ toast("Scrivi cosa deve correggere il cliente.", "err"); return; } run(async () => { await api.setDoc(S.pid, S.curDoc, "da_rivedere", note); S.armed = null; await refresh(); }, "Documento rimandato al cliente."); });
  document.querySelectorAll("form.cform").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); const t = f.querySelector("textarea"); const body = t.value.trim(); if(!body) return; run(async () => { await api.comment(S.pid, f.dataset.ref, body); await refresh(); }, "Commento inviato."); }));
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if(!b || b.disabled) return;
  const a = b.dataset.act;
  if(a !== "toggleactive" && a !== "rmmember") S.armed = (a === "askfix") ? S.armed : null;
  switch(a){
    case "forgot": S.screen = "forgot"; render(); break;
    case "tologin": S.screen = "login"; render(); break;
    case "logout": run(async () => { await api.signOut(); S.me = null; S.screen = "login"; render(); }); break;
    case "home": run(home); break;
    case "refresh": run(refresh, "Aggiornato."); break;
    case "open": run(() => openProject(b.dataset.p)); break;
    case "as": run(async () => { api.setUser(b.dataset.u); S.me = await api.me(); S.people[S.me.id] = S.me; const keep = S.pid; await home(); if(keep && S.screen !== "project" && S.projects.some(p => p.id === keep)) await openProject(keep); }); break;
    case "tab": S.tab = b.dataset.t; S.mobileDetail = false; render(); window.scrollTo({top:0}); break;
    case "item": if(b.dataset.i){ S.cur = b.dataset.i; S.mobileDetail = true; render(); scrollDetail(); } break;
    case "doc": if(b.dataset.d){ S.curDoc = b.dataset.d; S.mobileDetail = true; render(); scrollDetail(); } break;
    case "godoc": S.tab = "documenti"; S.curDoc = b.dataset.d; S.mobileDetail = true; render(); scrollDetail(); break;
    case "goitem": S.tab = "norma"; S.cur = b.dataset.i; S.mobileDetail = true; render(); scrollDetail(); break;
    case "backlist": S.mobileDetail = false; render(); window.scrollTo({top:0}); break;
    case "dst": run(async () => { await api.setDoc(S.pid, S.curDoc, b.dataset.s); await refresh(); }, "Stato del documento aggiornato."); break;
    case "askfix": S.armed = "fix-"+S.curDoc; render(); { const t = $("#fix-note"); if(t) t.focus(); } break;
    case "cancel": S.armed = null; render(); break;
    case "dl": run(async () => { const url = await api.fileUrl(b.dataset.f, b.dataset.n); const l = document.createElement("a"); l.href = url; l.target = "_blank"; l.rel = "noopener"; document.body.appendChild(l); l.click(); l.remove(); }); break;
    case "toggleactive": {
      const id = b.dataset.p, key = "act-"+id;
      if(S.armed !== key){ S.armed = key; render(); setTimeout(() => { if(S.armed === key){ S.armed = null; render(); } }, 5000); break; }
      S.armed = null; const p = S.projects.find(x => x.id === id);
      run(async () => { await api.setActive(id, !p.active); if(S.pid) { S.projects = await api.projects(); await refresh(); } else await home(); }, p.active ? "Accesso del cliente sospeso." : "Accesso riattivato.");
      break; }
    case "rmmember": {
      const key = "rm-"+b.dataset.u;
      if(S.armed !== key){ S.armed = key; render(); setTimeout(() => { if(S.armed === key){ S.armed = null; render(); } }, 5000); break; }
      S.armed = null; run(async () => { await api.removeMember(S.pid, b.dataset.u); await refresh(); }, "Accesso dell'utente rimosso.");
      break; }
  }
});
function scrollDetail(){ if(window.matchMedia("(max-width: 900px)").matches) window.scrollTo({top:0}); else { const d = document.querySelector(".detail"); if(d && d.getBoundingClientRect().top < 0) d.scrollIntoView({block:"start"}); } }
document.addEventListener("visibilitychange", () => { if(document.visibilityState === "visible" && S.me && !S.busy && !DEMO) refresh().catch(() => {}); });

boot();
})();
