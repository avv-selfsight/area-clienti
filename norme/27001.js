window.NORME = window.NORME || {};
window.NORME["27001"] = (function(){
/* ===================== DATI ===================== */
const GROUPS = {
  "4":"Contesto dell'organizzazione","5":"Leadership","6":"Pianificazione","7":"Supporto",
  "8":"Attività operative","9":"Valutazione delle prestazioni","10":"Miglioramento",
  "A.5":"Controlli organizzativi","A.6":"Controlli sulle persone","A.7":"Controlli fisici","A.8":"Controlli tecnologici"
};

const C = []; // clausole
function cl(id,t,o){ C.push(Object.assign({id,t,kind:"c",g:id.split(".")[0]},o)); }

cl("4.1","Comprendere l'organizzazione e il suo contesto",{m:false,
 c:"L'organizzazione individua i fattori interni ed esterni che incidono sul suo scopo e sulla capacità del sistema di gestione di raggiungere i risultati attesi. Con l'emendamento del 2024 deve anche stabilire se il cambiamento climatico è un tema rilevante per lei.",
 p:"Si traduce in un'analisi di contesto (spesso una tabella SWOT o PESTEL) che descrive mercato, normative applicabili, tecnologie usate, organizzazione interna e dipendenze dai fornitori. Il documento non è obbligatorio per norma, però l'auditor si aspetta di vederlo perché da qui discendono i rischi e il campo di applicazione.",
 e1:"Analisi del contesto aggiornata, compresa la valutazione sul cambiamento climatico anche quando la conclusione è che il tema non è rilevante.",
 e2:"I fattori indicati devono ritrovarsi nel registro dei rischi e la direzione deve saperli spiegare durante l'intervista.",
 err:"Copiare un'analisi generica che potrebbe valere per qualsiasi azienda, oppure dimenticare la riga sul clima introdotta dall'emendamento 1:2024.",
 q:"Quali cambiamenti esterni degli ultimi dodici mesi hanno avuto effetto sulla sicurezza delle vostre informazioni?",
 d:["D01"],l:["4.2","4.3","6.1.1","9.3"],x:[]});
cl("4.2","Comprendere le esigenze e le aspettative delle parti interessate",{m:false,
 c:"L'organizzazione individua le parti interessate rilevanti per il sistema, i loro requisiti e quali di questi requisiti intende gestire attraverso il sistema di gestione. L'emendamento del 2024 precisa che tra i requisiti possono rientrare anche quelli legati al clima.",
 p:"Si prepara una tabella con clienti, dipendenti, fornitori, autorità, soci e assicurazioni, indicando per ciascuno cosa si aspetta in termini di sicurezza e come l'azienda risponde. I requisiti legali individuati qui alimentano il registro delle prescrizioni previsto dal controllo A.5.31.",
 e1:"Tabella delle parti interessate con i requisiti di ciascuna e la modalità di risposta dell'azienda.",
 e2:"L'auditor cerca riscontro dei requisiti dichiarati in contratti, nomine e procedure scelti a campione.",
 err:"Elencare le parti interessate senza scrivere quali requisiti hanno, oppure senza indicare quali requisiti l'azienda ha deciso di gestire.",
 q:"Quali requisiti di sicurezza vi chiedono i clienti principali e dove li ritrovo nel sistema?",
 d:["D01","D24"],l:["4.1","4.3","6.1.1","A.5.31"],x:[]});
cl("4.3","Determinare il campo di applicazione del sistema",{m:true,
 c:"L'organizzazione stabilisce i confini e l'applicabilità del sistema considerando contesto, requisiti delle parti interessate e interfacce con le attività svolte da altri. Il campo di applicazione deve essere disponibile come informazione documentata.",
 p:"Lo scope indica sedi, processi, servizi e tecnologie coperti e motiva le eventuali esclusioni. Va scritto con attenzione perché compare sul certificato e l'ente lo usa per calcolare i giorni di audit.",
 e1:"Scope firmato e coerente con quanto dichiarato nella domanda all'ente di certificazione.",
 e2:"Le attività osservate in sede rientrano nello scope e le interfacce con soggetti terzi risultano gestite.",
 err:"Scrivere uno scope troppo vago, del tipo «tutte le attività aziendali», oppure troppo ristretto rispetto a ciò che il cliente vende come certificato.",
 q:"Perché questa sede o questo servizio sono rimasti fuori dal campo di applicazione?",
 d:["D01","D06"],l:["4.1","4.2","4.4","6.1.3"],x:[]});
cl("4.4","Sistema di gestione per la sicurezza delle informazioni",{m:false,
 c:"L'organizzazione stabilisce, attua, mantiene e migliora in modo continuo il sistema di gestione, compresi i processi necessari e le loro interazioni.",
 p:"Serve una mappa dei processi del sistema, eventualmente integrata con la ISO 9001, che mostri come si collegano analisi dei rischi, gestione documentale, audit e riesame. Spesso basta un diagramma inserito nel manuale o nella politica.",
 e1:"Mappa dei processi o descrizione sintetica di come funziona il sistema.",
 e2:"I processi descritti funzionano nella realtà e producono registrazioni.",
 err:"Presentare un insieme di documenti scollegati senza mostrare come il sistema funziona nel suo complesso.",
 q:"Mi mostra come passate da un rischio individuato a un controllo attuato e poi verificato?",
 d:["D01","D23"],l:["4.3","6.1.1","9.1","10.1"],x:[]});
cl("5.1","Leadership e impegno",{m:false,
 c:"L'alta direzione dimostra leadership assicurando politica e obiettivi coerenti con la strategia, integrando i requisiti nei processi aziendali, rendendo disponibili le risorse e promuovendo il miglioramento continuo.",
 p:"Si dimostra con i fatti. La direzione partecipa al riesame, approva budget e piani, firma la politica e risponde in prima persona durante la riunione di apertura dell'audit.",
 e1:"Politica firmata dalla direzione e verbale di riesame con le decisioni assunte.",
 e2:"L'auditor intervista la direzione e controlla che le risorse promesse siano state assegnate.",
 err:"Delegare tutto al consulente o al responsabile IT, con una direzione che non conosce il sistema.",
 q:"Quali risorse avete stanziato quest'anno per la sicurezza delle informazioni e chi le ha approvate?",
 d:["D02","D21"],l:["5.2","5.3","7.1","9.3","A.5.4"],x:["NIS2 art. 20 (responsabilità degli organi di gestione)"]});
cl("5.2","Politica",{m:true,
 c:"L'alta direzione stabilisce una politica adeguata allo scopo dell'organizzazione, che contiene gli obiettivi o ne fornisce il quadro e include l'impegno a soddisfare i requisiti applicabili e a migliorare in modo continuo. La politica è documentata, comunicata all'interno e messa a disposizione delle parti interessate.",
 p:"Nelle aziende certificate in modo integrato si redige un'unica politica per qualità e sicurezza delle informazioni. Va firmata, datata e pubblicata, ad esempio sul sito o in bacheca, e riesaminata ogni anno.",
 e1:"Politica firmata e datata, con la prova della pubblicazione.",
 e2:"Il personale intervistato sa dove trovarla e ne conosce i contenuti essenziali.",
 err:"Usare una politica generica senza impegni riconoscibili, oppure dimenticare di comunicarla.",
 q:"Dove ha letto la politica per la sicurezza e cosa le chiede di fare nel suo lavoro?",
 d:["D02"],l:["5.1","6.2","7.3","7.4","A.5.1"],x:[]});
cl("5.3","Ruoli, responsabilità e autorità nell'organizzazione",{m:false,
 c:"L'alta direzione assegna e comunica responsabilità e autorità per i ruoli rilevanti, in particolare per assicurare che il sistema sia conforme alla norma e per riferire alla direzione sulle sue prestazioni.",
 p:"Si nomina un responsabile del sistema di gestione e si formalizzano gli altri ruoli (amministratore di sistema, referente privacy, DPO se presente, referente per gli incidenti) nell'organigramma e in lettere di incarico interne.",
 e1:"Organigramma aggiornato e nomine interne firmate.",
 e2:"Le persone nominate conoscono i propri compiti e li svolgono.",
 err:"Lasciare l'organigramma fermo a una versione superata dopo uscite o cambi di ruolo.",
 q:"Chi la sostituisce nella gestione degli incidenti quando lei è in ferie?",
 d:["D03"],l:["5.1","7.2","A.5.2","A.5.3"],x:[]});
cl("6.1.1","Azioni per affrontare rischi e opportunità: generalità",{m:false,
 c:"Nel pianificare il sistema l'organizzazione considera contesto e parti interessate e individua rischi e opportunità da affrontare per ottenere i risultati attesi, prevenire effetti indesiderati e migliorare. Pianifica poi le azioni e il modo di valutarne l'efficacia.",
 p:"Oltre ai rischi sulle informazioni della 6.1.2 esiste un livello di rischi e opportunità del sistema stesso, come la dipendenza da una sola persona competente o la possibilità di usare la certificazione per partecipare a gare. Nel sistema integrato si gestiscono nello stesso registro della ISO 9001.",
 e1:"Registro dei rischi e delle opportunità del sistema con le azioni pianificate.",
 e2:"Le azioni pianificate risultano eseguite e la loro efficacia è stata valutata.",
 err:"Ignorare le opportunità e limitarsi alla sola analisi tecnica dei rischi.",
 q:"Quali opportunità avete individuato e cosa state facendo per coglierle?",
 d:["D04"],l:["4.1","4.2","6.1.2","6.1.3","9.3"],x:[]});
cl("6.1.2","Valutazione del rischio relativo alla sicurezza delle informazioni",{m:true,
 c:"L'organizzazione definisce e applica un processo di valutazione del rischio che fissa i criteri di accettazione, produce risultati coerenti e confrontabili, individua i rischi per riservatezza, integrità e disponibilità con i rispettivi titolari, li analizza e li pondera rispetto ai criteri.",
 p:"Si sceglie una metodologia, spesso una matrice probabilità per impatto su scala da 1 a 5, e la si applica agli asset dell'inventario. Ogni rischio ha un titolare, cioè la persona che ha l'autorità per decidere come trattarlo.",
 e1:"Metodologia documentata con i criteri di accettazione e registro dei rischi compilato.",
 e2:"I rischi vengono aggiornati dopo incidenti o cambiamenti e i titolari sanno spiegarli.",
 err:"Usare un'analisi dei rischi presa da un modello, senza legame con l'inventario e con le minacce reali dell'azienda.",
 q:"Qual è la vostra soglia di accettazione del rischio e chi l'ha approvata?",
 d:["D04","D13"],l:["6.1.1","6.1.3","8.2","A.5.9","A.5.7"],x:["GDPR art. 32","NIS2 art. 21.2 lett. a"]});
cl("6.1.3","Trattamento del rischio relativo alla sicurezza delle informazioni",{m:true,
 c:"L'organizzazione sceglie le opzioni di trattamento, individua i controlli necessari, li confronta con l'Allegato A per verificare di non averne trascurato nessuno, redige la Dichiarazione di Applicabilità e prepara un piano di trattamento che i titolari dei rischi approvano insieme ai rischi residui.",
 p:"Da qui nascono due documenti chiave. Il piano di trattamento dice chi fa cosa ed entro quando, mentre la SoA elenca tutti i 93 controlli indicando se si applicano, perché, e se sono già attuati. Il file della SoA si chiama sempre «SoA-Dichiarazione di Applicabilità_Rev.» seguito dal numero, senza il nome dell'azienda.",
 e1:"SoA completa di giustificazioni e stato di attuazione, piano di trattamento approvato dai titolari dei rischi.",
 e2:"I controlli che la SoA dichiara attuati esistono nella realtà e l'auditor li verifica a campione.",
 err:"Escludere controlli senza motivazione oppure dichiarare attuato un controllo che è soltanto pianificato.",
 q:"Perché avete escluso il controllo A.8.4 e dove è scritta la motivazione?",
 d:["D05","D06"],l:["6.1.2","8.3","4.3","A.5.1"],x:[]});
cl("6.2","Obiettivi per la sicurezza delle informazioni e pianificazione per conseguirli",{m:true,
 c:"L'organizzazione fissa obiettivi coerenti con la politica, misurabili quando possibile, monitorati, comunicati e aggiornati, e pianifica come raggiungerli stabilendo azioni, risorse, responsabili, scadenze e modalità di valutazione dei risultati.",
 p:"Si scelgono pochi obiettivi concreti, come la percentuale di personale formato, i tempi di applicazione delle patch critiche o il numero di test di ripristino riusciti, ciascuno con un indicatore e un responsabile.",
 e1:"Elenco degli obiettivi con indicatori, responsabili e scadenze.",
 e2:"Gli indicatori sono stati misurati e i risultati discussi nel riesame.",
 err:"Fissare obiettivi che nessuno misura, come accade spesso con indicatori scritti all'inizio e mai rilevati.",
 q:"Mi mostra l'ultimo valore misurato di questo indicatore e chi lo ha rilevato?",
 d:["D07"],l:["5.2","9.1","9.3"],x:[]});
cl("6.3","Pianificazione delle modifiche",{m:false,n:true,
 c:"Quando l'organizzazione decide di modificare il sistema di gestione, la modifica viene svolta in modo pianificato.",
 p:"Un cambio di sede, una migrazione in cloud o una riorganizzazione si affrontano con una breve valutazione preventiva degli effetti sul sistema e sui rischi, che viene registrata e approvata.",
 e1:"Procedura o modulo per la gestione delle modifiche al sistema.",
 e2:"Le modifiche recenti risultano documentate con la valutazione preventiva.",
 err:"Scoprire in audit che l'azienda ha cambiato fornitore cloud senza aggiornare analisi dei rischi e SoA.",
 q:"Qual è stata l'ultima modifica rilevante al sistema e come l'avete pianificata?",
 d:["D27","D21"],l:["8.1","9.3","A.5.8","A.8.32"],x:[]});
cl("7.1","Risorse",{m:false,
 c:"L'organizzazione individua e mette a disposizione le risorse necessarie per stabilire, attuare, mantenere e migliorare il sistema di gestione.",
 p:"Si dimostra con un budget o un piano delle risorse (persone, strumenti, consulenze e formazione) approvato in sede di riesame.",
 e1:"Indicazione delle risorse nel verbale di riesame o in un piano dedicato.",
 e2:"Le risorse previste sono state rese disponibili.",
 err:"Dichiarare risorse adeguate mentre una sola persona gestisce tutta l'IT senza alcun sostituto.",
 q:"Chi gestisce i sistemi se il vostro tecnico non è disponibile?",
 d:["D21"],l:["5.1","9.3"],x:[]});
cl("7.2","Competenza",{m:true,
 c:"L'organizzazione stabilisce le competenze necessarie per chi lavora sotto il suo controllo e incide sulla sicurezza, si assicura che siano possedute grazie a istruzione, formazione o esperienza, interviene dove mancano e conserva evidenza delle competenze.",
 p:"Per ogni ruolo chiave si definisce il profilo richiesto e lo si confronta con CV, attestati e formazione svolta. Le lacune si colmano con il piano di formazione.",
 e1:"Matrice delle competenze per ruolo e piano di formazione.",
 e2:"CV, attestati e registri di formazione delle persone scelte a campione.",
 err:"Raccogliere attestati sparsi senza confrontarli con le competenze richieste dal ruolo.",
 q:"Quali competenze servono per amministrare il firewall e come dimostrate che il tecnico le possiede?",
 d:["D08","D25"],l:["5.3","7.3","A.6.3"],x:["NIS2 art. 20.2 (formazione degli organi di gestione)"]});
cl("7.3","Consapevolezza",{m:false,
 c:"Chi lavora sotto il controllo dell'organizzazione conosce la politica, il proprio contributo all'efficacia del sistema e le conseguenze del mancato rispetto dei requisiti.",
 p:"Si realizza con una sessione introduttiva per i nuovi ingressi e con richiami periodici. L'auditor la verifica facendo domande a persone scelte a caso.",
 e1:"Programma di sensibilizzazione e materiali usati.",
 e2:"L'auditor intervista il personale e verifica che sappia cosa fare se riceve una mail sospetta o perde un dispositivo.",
 err:"Svolgere la formazione una sola volta all'avvio del progetto senza ripeterla negli anni successivi.",
 q:"Cosa fa se riceve una mail che le chiede di cambiare le coordinate bancarie di un fornitore?",
 d:["D25","D02"],l:["5.2","7.2","A.6.3","A.6.4"],x:["NIS2 art. 21.2 lett. g"]});
cl("7.4","Comunicazione",{m:false,
 c:"L'organizzazione stabilisce cosa comunicare, quando, a chi, chi comunica e come, per le comunicazioni interne ed esterne rilevanti per il sistema.",
 p:"Una semplice matrice delle comunicazioni indica ad esempio chi parla con i clienti in caso di incidente e chi tiene i rapporti con le autorità.",
 e1:"Matrice delle comunicazioni interne ed esterne.",
 e2:"Evidenze delle comunicazioni svolte, come mail o verbali.",
 err:"Lasciare indefinito chi è autorizzato a parlare all'esterno durante un incidente.",
 q:"Chi informa i clienti se il vostro servizio resta fermo per un attacco?",
 d:["D15","D03"],l:["5.2","A.5.5","A.5.24"],x:[]});
cl("7.5.1","Informazioni documentate: generalità",{m:false,
 c:"Il sistema comprende le informazioni documentate richieste dalla norma e quelle che l'organizzazione ritiene necessarie per la sua efficacia.",
 p:"La quantità di documenti dipende da dimensioni e complessità dell'azienda. Conviene tenere un elenco dei documenti del sistema con revisione e responsabile, in modo da sapere sempre quali sono in vigore.",
 e1:"Elenco dei documenti del sistema con lo stato di revisione.",
 e2:"I documenti in uso nei reparti corrispondono alle versioni in vigore.",
 err:"Produrre documenti che nessuno usa solo perché presenti in un modello.",
 q:"Come fa un collega a sapere qual è l'ultima versione della procedura di backup?",
 d:["D23"],l:["7.5.2","7.5.3","A.5.37"],x:[]});
cl("7.5.2","Creazione e aggiornamento",{m:false,
 c:"Quando crea o aggiorna informazioni documentate l'organizzazione cura identificazione e descrizione (titolo, data, autore o numero di riferimento), formato e supporto, riesame e approvazione.",
 p:"Ogni documento ha un cartiglio con codice, revisione, data, redattore e approvatore. Anche il nome del file segue una regola fissa, come accade per la SoA che si chiama sempre «SoA-Dichiarazione di Applicabilità_Rev.» seguito dal numero.",
 e1:"Documenti con intestazione completa e firma di approvazione.",
 e2:"Lo storico delle revisioni è tracciato.",
 err:"Lasciare documenti senza data o senza approvazione, oppure tenere più versioni dello stesso file in cartelle diverse.",
 q:"Chi ha approvato questa revisione e quando?",
 d:["D23","D06"],l:["7.5.1","7.5.3"],x:[]});
cl("7.5.3","Controllo delle informazioni documentate",{m:false,
 c:"Le informazioni documentate sono disponibili dove e quando servono e protette da perdita di riservatezza, uso improprio o perdita di integrità. L'organizzazione ne gestisce distribuzione, accesso, archiviazione, modifiche, conservazione ed eliminazione, comprese quelle di origine esterna.",
 p:"Si stabilisce dove stanno i documenti, ad esempio una cartella condivisa con permessi in sola lettura per le versioni approvate, chi può modificarli e per quanto tempo si conservano le registrazioni.",
 e1:"Procedura di gestione documentale.",
 e2:"Permessi delle cartelle coerenti con la procedura e tempi di conservazione rispettati.",
 err:"Archiviare i documenti approvati in cartelle che chiunque può modificare.",
 q:"Chi può modificare i documenti approvati in questa cartella?",
 d:["D23"],l:["7.5.2","A.5.33","A.8.13"],x:[]});
cl("8.1","Pianificazione e controllo operativi",{m:true,
 c:"L'organizzazione pianifica, attua e controlla i processi necessari a soddisfare i requisiti e ad attuare le azioni della clausola 6, stabilendo criteri per i processi. Controlla le modifiche pianificate, valuta le conseguenze di quelle impreviste e tiene sotto controllo processi, prodotti e servizi forniti dall'esterno.",
 p:"È la clausola che rende operativo quanto pianificato, perché le procedure dell'Allegato A vengono applicate e producono registrazioni. Comprende anche il controllo sui fornitori esterni che svolgono attività rilevanti per la sicurezza.",
 e1:"Procedure operative approvate.",
 e2:"Registrazioni operative come log, moduli compilati o ticket che provano l'applicazione delle procedure.",
 err:"Avere procedure perfette sulla carta senza alcuna registrazione che ne dimostri l'applicazione.",
 q:"Mi mostra le registrazioni dell'ultimo mese che provano l'esecuzione dei backup?",
 d:["D12","D16","D27"],l:["6.1.3","6.3","A.5.19","A.5.37"],x:[]});
cl("8.2","Valutazione del rischio relativo alla sicurezza delle informazioni",{m:true,
 c:"La valutazione del rischio viene eseguita a intervalli pianificati e quando si propongono o si verificano modifiche significative, conservando i risultati.",
 p:"Si aggiorna l'analisi almeno una volta l'anno e ogni volta che cambia qualcosa di rilevante, come un nuovo servizio o un incidente grave.",
 e1:"Analisi dei rischi con la data dell'ultima esecuzione.",
 e2:"Rivalutazioni svolte dopo modifiche o incidenti.",
 err:"Presentare all'audit di sorveglianza la stessa analisi dei rischi dell'anno precedente.",
 q:"Quando avete aggiornato l'ultima volta l'analisi dei rischi e per quale motivo?",
 d:["D04"],l:["6.1.2","6.3","A.5.27"],x:[]});
cl("8.3","Trattamento del rischio relativo alla sicurezza delle informazioni",{m:true,
 c:"Il piano di trattamento del rischio viene attuato e i risultati vengono conservati.",
 p:"Si verifica che le azioni del piano siano state completate nei tempi previsti e si aggiornano di conseguenza la SoA e i rischi residui.",
 e1:"Piano di trattamento con lo stato di avanzamento.",
 e2:"Evidenze delle azioni completate e SoA aggiornata.",
 err:"Lasciare il piano di trattamento fermo alla prima stesura.",
 q:"Quali azioni del piano risultano in ritardo e cosa avete deciso?",
 d:["D05","D06"],l:["6.1.3","8.2"],x:[]});
cl("9.1","Monitoraggio, misurazione, analisi e valutazione",{m:true,
 c:"L'organizzazione stabilisce cosa monitorare e misurare, con quali metodi, quando e chi lo fa, chi analizza i risultati, e valuta prestazioni ed efficacia del sistema.",
 p:"Si collega agli obiettivi della 6.2. Per ciascun indicatore si fissano frequenza di misura e responsabile, e i risultati vengono portati al riesame.",
 e1:"Piano di monitoraggio con indicatori, metodi e frequenze.",
 e2:"Misurazioni effettuate e analizzate nel tempo.",
 err:"Misurare senza analizzare i risultati, oppure non misurare affatto gli indicatori dichiarati.",
 q:"Come è andato questo indicatore negli ultimi due trimestri?",
 d:["D07","D21"],l:["6.2","9.3","A.5.36"],x:["NIS2 art. 21.2 lett. f"]});
cl("9.2","Audit interno",{m:true,
 c:"L'organizzazione svolge audit interni a intervalli pianificati per verificare che il sistema sia conforme ai propri requisiti e alla norma e che sia attuato efficacemente. Definisce un programma con frequenza, metodi, responsabilità e criteri, sceglie auditor obiettivi e imparziali e riferisce i risultati alla direzione.",
 p:"Prima dello Stage 1 deve esserci almeno un audit interno completo su tutte le clausole e su tutti i controlli applicabili. L'auditor interno non può verificare il proprio lavoro, per questo spesso l'incarico va a un consulente esterno.",
 e1:"Programma di audit e report del primo audit interno completo.",
 e2:"Rilievi dell'audit gestiti con azioni correttive.",
 err:"Arrivare allo Stage 1 senza audit interno, che è la causa più frequente di rinvio della certificazione.",
 q:"Chi ha svolto l'audit interno e come avete garantito la sua indipendenza?",
 d:["D20"],l:["9.3","10.2","A.5.35"],x:[]});
cl("9.3","Riesame di direzione",{m:true,
 c:"L'alta direzione riesamina il sistema a intervalli pianificati considerando lo stato delle azioni precedenti, le modifiche del contesto e delle esigenze delle parti interessate, le prestazioni (non conformità, monitoraggi, audit, obiettivi), i riscontri ricevuti, i risultati della valutazione dei rischi e le opportunità di miglioramento. Gli esiti comprendono decisioni sul miglioramento e sulle modifiche da apportare.",
 p:"Si tiene almeno una volta l'anno e, prima dello Stage 1, dopo l'audit interno. Il verbale segue punto per punto gli input della norma e chiude con decisioni a cui sono associati risorse e responsabili.",
 e1:"Verbale di riesame firmato che copre tutti gli input richiesti.",
 e2:"Le decisioni prese nel riesame sono state attuate.",
 err:"Redigere un verbale generico che salta alcuni input obbligatori, come i risultati della valutazione dei rischi.",
 q:"Quali decisioni ha preso la direzione nell'ultimo riesame e a che punto sono?",
 d:["D21"],l:["5.1","6.1.1","9.1","9.2","10.1"],x:[]});
cl("10.1","Miglioramento continuo",{m:false,
 c:"L'organizzazione migliora in modo continuo l'idoneità, l'adeguatezza e l'efficacia del sistema di gestione.",
 p:"Si dimostra con miglioramenti concreti nel tempo, che nascono da audit, incidenti, riesami e suggerimenti del personale e vengono raccolti in un registro.",
 e1:"Registro dei miglioramenti o sezione dedicata nel verbale di riesame.",
 e2:"Miglioramenti attuati tra un audit e il successivo.",
 err:"Confondere il miglioramento con la sola chiusura delle non conformità.",
 q:"Cosa avete migliorato quest'anno senza che ve lo chiedesse un audit?",
 d:["D22","D21"],l:["9.3","10.2"],x:[]});
cl("10.2","Non conformità e azioni correttive",{m:true,
 c:"Quando si verifica una non conformità l'organizzazione reagisce per correggerla e gestirne le conseguenze, valuta se eliminarne le cause, attua le azioni necessarie, ne riesamina l'efficacia e, se serve, modifica il sistema. Conserva evidenza della natura delle non conformità, delle azioni intraprese e dei risultati.",
 p:"Il registro delle non conformità riporta descrizione, correzione immediata, analisi delle cause (ad esempio con il metodo dei 5 perché), azione correttiva, responsabile, scadenza e verifica di efficacia.",
 e1:"Registro delle non conformità e delle azioni correttive.",
 e2:"Azioni chiuse con la verifica di efficacia documentata.",
 err:"Chiudere le non conformità con la sola correzione, senza analizzarne le cause.",
 q:"Come avete verificato che questa azione correttiva abbia funzionato?",
 d:["D22"],l:["9.2","10.1","A.5.27"],x:[]});

const A = []; // allegato A
function k(id,t,c,p,e,d,l,x,n){ A.push({id,t,c,p,e,d,l,x:x||[],n:!!n,kind:"a",g:id.split(".").slice(0,2).join(".")}); }

/* --- A.5 organizzativi --- */
k("A.5.1","Politiche per la sicurezza delle informazioni",
 "La direzione approva una politica generale e le politiche tematiche, le comunica al personale e alle parti interessate e le riesamina a intervalli pianificati o quando cambia qualcosa di significativo.",
 "Oltre alla politica generale della clausola 5.2 servono politiche tematiche su accessi, backup, crittografia e uso accettabile. Nelle piccole realtà possono stare dentro il regolamento informatico e il documento dei controlli informatici.",
 "Politiche approvate e datate, prova della diffusione (mail o firma per presa visione) e traccia del riesame annuale.",
 ["D02","D10","D12"],["5.2","7.3","A.5.4","A.5.36","A.6.3"],["NIS2 art. 21.2 lett. a"]);
k("A.5.2","Ruoli e responsabilità per la sicurezza delle informazioni",
 "Le responsabilità per la sicurezza delle informazioni sono definite e assegnate in base alle esigenze dell'organizzazione.",
 "Accanto all'organigramma serve un mansionario o una matrice che indichi chi è responsabile del sistema di gestione, degli accessi, dei backup e degli incidenti, con i rispettivi sostituti.",
 "Organigramma firmato e matrice delle responsabilità con le nomine interne per i ruoli chiave.",
 ["D03"],["5.3","A.5.3","A.5.4","A.6.2"]);
k("A.5.3","Separazione dei compiti",
 "Compiti e aree di responsabilità in conflitto tra loro vengono tenuti separati.",
 "Nelle PMI la separazione completa è spesso impossibile, quindi si documentano i casi in cui una persona cumula ruoli incompatibili (ad esempio chi chiede e chi approva un accesso) e si prevede un controllo compensativo, come il riesame periodico da parte della direzione.",
 "Matrice dei ruoli con le incompatibilità evidenziate e registrazione dei controlli compensativi.",
 ["D03","D12"],["A.5.2","A.5.18","A.8.2"]);
k("A.5.4","Responsabilità della direzione",
 "La direzione richiede a tutto il personale di applicare la sicurezza secondo le politiche e le procedure stabilite.",
 "Si dimostra con comunicazioni firmate dalla direzione, con gli obblighi di sicurezza inseriti nei contratti e con la partecipazione attiva al riesame.",
 "Comunicazioni interne della direzione e verbale di riesame con decisioni concrete.",
 ["D02","D21"],["5.1","A.5.1","A.6.2"]);
k("A.5.5","Contatti con le autorità",
 "L'organizzazione stabilisce e mantiene i contatti con le autorità competenti.",
 "Basta un elenco aggiornato con Garante privacy, ACN e CSIRT Italia, Polizia Postale, vigili del fuoco e autorità di settore, indicando in quali casi vanno contattate e da chi.",
 "Elenco dei contatti datato e richiamato dalla procedura incidenti.",
 ["D15","D24"],["A.5.6","A.5.24","A.5.26","7.4"],["GDPR art. 33","NIS2 art. 23"]);
k("A.5.6","Contatti con gruppi specialistici",
 "L'organizzazione mantiene contatti con gruppi di interesse, forum e associazioni professionali che si occupano di sicurezza.",
 "In audit si dimostra con l'iscrizione alle newsletter di ACN, CSIRT Italia o di altri enti specializzati e con la partecipazione a webinar e community di settore.",
 "Iscrizioni attive alle newsletter di sicurezza, che l'auditor chiede di vedere in Stage 2, e attestati di partecipazione agli eventi.",
 ["D25"],["A.5.5","A.5.7","A.6.3"]);
k("A.5.7","Threat intelligence",
 "Le informazioni sulle minacce vengono raccolte e analizzate per produrre conoscenza utile alla protezione.",
 "Per una PMI significa leggere in modo sistematico bollettini e avvisi (CSIRT Italia, produttori dei software in uso), valutare se riguardano i propri sistemi e registrare cosa si è deciso di fare.",
 "Registro delle segnalazioni ricevute con la valutazione di impatto e le azioni conseguenti.",
 ["D12","D25"],["A.5.6","A.8.8","6.1.2"],[],true);
k("A.5.8","Sicurezza delle informazioni nella gestione dei progetti",
 "La sicurezza delle informazioni è integrata nella gestione dei progetti.",
 "Ogni nuovo progetto, come un nuovo gestionale o una migrazione in cloud, passa da una breve valutazione dei rischi di sicurezza all'avvio, con una checklist da conservare nel fascicolo del progetto.",
 "Checklist di sicurezza compilate su almeno un progetto recente.",
 ["D12","D04"],["6.3","A.8.25","A.8.26"]);
k("A.5.9","Inventario delle informazioni e degli altri asset associati",
 "L'organizzazione redige e mantiene un inventario delle informazioni e degli altri asset associati, ciascuno con un proprietario.",
 "Comprende hardware, software, servizi cloud e archivi di dati, con proprietario, ubicazione e classificazione. È la base da cui parte l'analisi dei rischi.",
 "Inventario con la data dell'ultima revisione, coerente con quanto l'auditor trova a campione in sede.",
 ["D13"],["6.1.2","A.5.10","A.5.11","A.5.12"],["NIS2 art. 21.2 lett. i"]);
k("A.5.10","Utilizzo accettabile delle informazioni e degli altri asset associati",
 "Le regole per l'uso accettabile delle informazioni e degli asset sono individuate, documentate e attuate.",
 "Coincide con il regolamento per l'uso delle risorse informatiche, che disciplina posta, internet, dispositivi personali, strumenti di intelligenza artificiale e social network e richiama i limiti al controllo dei lavoratori.",
 "Regolamento consegnato con firma per presa visione di ogni dipendente e collaboratore.",
 ["D10"],["A.5.9","A.6.2","A.6.7","A.8.1"],["L. 300/1970 art. 4 (Statuto dei lavoratori)"]);
k("A.5.11","Restituzione degli asset",
 "Personale e terze parti restituiscono gli asset dell'organizzazione alla cessazione o alla modifica del rapporto.",
 "Serve una checklist di uscita che elenchi dispositivi, badge e chiavi da riconsegnare e gli account da disattivare, firmata alla consegna.",
 "Checklist di uscita firmate per le cessazioni recenti.",
 ["D08","D13"],["A.6.5","A.5.18"]);
k("A.5.12","Classificazione delle informazioni",
 "Le informazioni sono classificate in base alle esigenze di riservatezza, integrità e disponibilità e ai requisiti delle parti interessate.",
 "Bastano pochi livelli comprensibili, ad esempio pubblico, interno, riservato e strettamente riservato, con esempi concreti per ciascuno, così il personale sa come trattare ogni documento.",
 "Schema di classificazione approvato e asset dell'inventario con il livello assegnato.",
 ["D14","D13"],["A.5.13","A.5.14","A.8.12"]);
k("A.5.13","Etichettatura delle informazioni",
 "L'organizzazione sviluppa e attua procedure per etichettare le informazioni secondo lo schema di classificazione adottato.",
 "Si applica con intestazioni sui documenti riservati e con le etichette di sensibilità di Microsoft 365 o Google Workspace, quando disponibili.",
 "Documenti scelti a campione etichettati secondo lo schema.",
 ["D14"],["A.5.12","A.5.14"]);
k("A.5.14","Trasferimento delle informazioni",
 "Esistono regole, procedure o accordi per ogni modalità di trasferimento delle informazioni, sia all'interno sia verso l'esterno.",
 "Si stabilisce come si inviano dati riservati (allegati cifrati, link con scadenza, PEC), come si usano chiavette e servizi di condivisione e cosa prevedono gli accordi con clienti e fornitori.",
 "Regole di trasferimento nel regolamento informatico e clausole negli accordi con le controparti.",
 ["D10","D14"],["A.5.12","A.6.6","A.8.24"]);
k("A.5.15","Controllo degli accessi",
 "Le regole per l'accesso fisico e logico a informazioni e asset sono stabilite e attuate in base ai requisiti di business e di sicurezza.",
 "La politica degli accessi si fonda sui principi del minimo privilegio e della necessità di sapere e indica chi autorizza gli accessi e con quale procedura.",
 "Politica degli accessi approvata e richieste di accesso autorizzate, verificate a campione.",
 ["D12"],["A.5.16","A.5.17","A.5.18","A.8.2","A.8.3"],["NIS2 art. 21.2 lett. i"]);
k("A.5.16","Gestione delle identità",
 "Il ciclo di vita completo delle identità viene gestito.",
 "Ogni persona ha un'utenza personale, mentre le utenze condivise o di servizio sono censite, motivate e assegnate a un responsabile.",
 "Elenco delle utenze con l'evidenza di quelle di servizio e della relativa giustificazione.",
 ["D12"],["A.5.15","A.5.18"]);
k("A.5.17","Informazioni di autenticazione",
 "L'assegnazione e la gestione delle informazioni di autenticazione avvengono con un processo controllato, che comprende le istruzioni al personale.",
 "Comprende le regole sulle password, l'uso di un password manager e l'autenticazione a più fattori, insieme alle istruzioni consegnate agli utenti.",
 "Configurazione delle policy sulle password nei sistemi e istruzioni fornite agli utenti.",
 ["D10","D12"],["A.5.15","A.8.5"],["NIS2 art. 21.2 lett. j"]);
k("A.5.18","Diritti di accesso",
 "I diritti di accesso sono assegnati, riesaminati, modificati e rimossi secondo la politica degli accessi.",
 "Gli auditor controllano soprattutto il riesame periodico, per cui almeno una volta l'anno qualcuno verifica chi ha accesso a cosa e ne lascia traccia.",
 "Verbale o export del riesame periodico degli accessi e prova della rimozione degli accessi delle persone uscite.",
 ["D12"],["A.5.11","A.5.15","A.6.5","A.8.2"]);
k("A.5.19","Sicurezza delle informazioni nelle relazioni con i fornitori",
 "Processi e procedure gestiscono i rischi di sicurezza legati all'uso di prodotti e servizi dei fornitori.",
 "Si parte dall'elenco dei fornitori rilevanti per la sicurezza, si valuta ciascuno con un questionario o in base alle certificazioni che possiede e si decide il livello di controllo da applicare.",
 "Elenco dei fornitori con la classificazione di criticità e le valutazioni compilate.",
 ["D16"],["A.5.20","A.5.21","A.5.22","A.5.23","8.1"],["NIS2 art. 21.2 lett. d","GDPR art. 28"]);
k("A.5.20","Indirizzare la sicurezza delle informazioni negli accordi con i fornitori",
 "I requisiti di sicurezza pertinenti sono stabiliti e concordati con ogni fornitore in base al tipo di rapporto.",
 "Nei contratti entrano riservatezza, notifica degli incidenti, diritto di audit, sub-fornitori e restituzione dei dati, oltre alla nomina a responsabile ex art. 28 GDPR quando il fornitore tratta dati personali.",
 "Contratti e nomine a responsabile del trattamento firmati per i fornitori critici.",
 ["D16","D18","D09"],["A.5.19","A.5.34","A.8.21"],["GDPR art. 28"]);
k("A.5.21","Gestione della sicurezza delle informazioni nella filiera ICT",
 "Esistono processi per gestire i rischi legati alla catena di fornitura di prodotti e servizi ICT.",
 "Riguarda la provenienza di software e hardware, i sub-fornitori dei fornitori IT e la verifica che i componenti critici siano supportati e aggiornati.",
 "Valutazioni dei fornitori IT con l'indicazione dei loro sub-fornitori principali.",
 ["D16"],["A.5.19","A.5.20","A.8.8"],["NIS2 art. 21.2 lett. d"]);
k("A.5.22","Monitoraggio, riesame e gestione dei cambiamenti dei servizi dei fornitori",
 "L'organizzazione monitora, riesamina e valuta con regolarità le prassi di sicurezza dei fornitori e gestisce le modifiche dei loro servizi.",
 "Una rivalutazione annuale dei fornitori critici, con la verifica degli SLA e degli incidenti avvenuti, chiude il cerchio iniziato con la selezione.",
 "Rivalutazioni datate e note sugli eventuali disservizi gestiti.",
 ["D16"],["A.5.19","9.1"]);
k("A.5.23","Sicurezza delle informazioni per l'utilizzo di servizi cloud",
 "Acquisizione, uso, gestione e uscita dai servizi cloud seguono processi definiti secondo i requisiti di sicurezza dell'organizzazione.",
 "Per ogni servizio cloud (Microsoft 365, Google Workspace, gestionali in SaaS) si valutano ubicazione dei dati, responsabilità condivise, certificazioni del provider e strategia di uscita.",
 "Elenco dei servizi cloud con la valutazione e il piano di uscita per quelli critici.",
 ["D16","D12"],["A.5.19","A.5.20","A.8.13"],["ISO/IEC 27017 e 27018"],true);
k("A.5.24","Pianificazione e preparazione della gestione degli incidenti",
 "L'organizzazione si prepara a gestire gli incidenti definendo processi, ruoli e responsabilità.",
 "La procedura incidenti indica chi riceve le segnalazioni, chi decide, come si comunica e quali tempi rispettare, compresi quelli del GDPR e della NIS2.",
 "Procedura approvata con i ruoli nominativi e i contatti di emergenza.",
 ["D15"],["A.5.5","A.5.25","A.5.26","A.5.27","A.6.8","7.4"],["GDPR artt. 33-34","NIS2 art. 23","NIS2 art. 21.2 lett. b"]);
k("A.5.25","Valutazione e decisione sugli eventi relativi alla sicurezza delle informazioni",
 "Gli eventi di sicurezza vengono valutati per decidere se classificarli come incidenti.",
 "Servono criteri semplici di gravità e un registro in cui annotare anche gli eventi poi ritenuti non rilevanti, perché l'auditor vuole vedere il ragionamento seguito.",
 "Registro degli eventi e degli incidenti con la classificazione e la motivazione.",
 ["D15"],["A.5.24","A.5.26","A.8.16"]);
k("A.5.26","Risposta agli incidenti relativi alla sicurezza delle informazioni",
 "La risposta agli incidenti segue le procedure documentate.",
 "La risposta comprende contenimento, eradicazione e ripristino, oltre alla valutazione sulla notifica al Garante entro 72 ore e, per i soggetti NIS2, alla preallerta al CSIRT Italia entro 24 ore.",
 "Schede incidente compilate oppure, in assenza di incidenti reali, il verbale di una simulazione.",
 ["D15"],["A.5.5","A.5.25","A.5.27","A.5.28"],["GDPR art. 33","NIS2 art. 23"]);
k("A.5.27","Apprendimento dagli incidenti",
 "Le conoscenze ricavate dagli incidenti vengono usate per rafforzare e migliorare i controlli.",
 "Ogni incidente chiuso produce una breve analisi delle cause e, quando serve, un'azione correttiva o un aggiornamento dell'analisi dei rischi.",
 "Analisi post-incidente collegata al registro delle azioni correttive.",
 ["D15","D22"],["A.5.26","6.1.2","8.2","10.2"]);
k("A.5.28","Raccolta di evidenze",
 "Le evidenze legate agli eventi di sicurezza vengono identificate, raccolte, acquisite e conservate secondo procedure stabilite.",
 "Si indica come conservare log, screenshot e copie forensi senza alterarli, mantenendo la catena di custodia nel caso servano in giudizio.",
 "Istruzioni nella procedura incidenti e modulo per la catena di custodia.",
 ["D15"],["A.5.26","A.8.15","A.8.17"]);
k("A.5.29","Sicurezza delle informazioni durante un'interruzione",
 "L'organizzazione pianifica come mantenere la sicurezza delle informazioni a un livello adeguato durante un'interruzione.",
 "Il piano di continuità prevede che i controlli di sicurezza restino attivi anche nelle modalità di emergenza, ad esempio quando si lavora da una sede alternativa o con procedure manuali.",
 "Piano di continuità con la sezione dedicata alla sicurezza in emergenza.",
 ["D17"],["A.5.30","A.8.13","A.8.14"],["NIS2 art. 21.2 lett. c"]);
k("A.5.30","Preparazione ICT per la continuità operativa",
 "La prontezza dei sistemi ICT viene pianificata, attuata, mantenuta e verificata in base agli obiettivi di continuità.",
 "Si fissano RTO e RPO per i sistemi critici e li si verifica con test di ripristino. Gli esiti dei test si possono registrare con un modulo, anche un Google Form, da mostrare in audit.",
 "Business impact analysis con RTO e RPO ed esiti dei test di ripristino.",
 ["D17"],["A.5.29","A.8.13","A.8.14"],["NIS2 art. 21.2 lett. c"],true);
k("A.5.31","Requisiti legali, statutari, regolamentari e contrattuali",
 "I requisiti legali, statutari, regolamentari e contrattuali pertinenti vengono individuati, documentati e tenuti aggiornati.",
 "Il registro delle prescrizioni elenca GDPR e Codice privacy, NIS2 e d.lgs. 138/2024 se applicabili, Statuto dei lavoratori, AI Act e obblighi contrattuali verso i clienti, indicando come l'azienda li rispetta.",
 "Registro delle prescrizioni datato e riesaminato.",
 ["D24"],["4.2","A.5.32","A.5.33","A.5.34"],["GDPR","NIS2 / d.lgs. 138/2024","AI Act (Reg. UE 2024/1689)"]);
k("A.5.32","Diritti di proprietà intellettuale",
 "L'organizzazione attua procedure per tutelare i diritti di proprietà intellettuale.",
 "Si gestiscono le licenze software, si evita il software non autorizzato e si regola nei contratti la titolarità di quanto prodotto da dipendenti e collaboratori.",
 "Elenco delle licenze coerente con l'inventario software e clausole sulla titolarità nei contratti.",
 ["D13","D10"],["A.5.31","A.8.19"]);
k("A.5.33","Protezione delle registrazioni",
 "Le registrazioni sono protette da perdita, distruzione, falsificazione, accessi e rilasci non autorizzati.",
 "Riguarda i documenti con valore probatorio o legale, come contratti, registri e log, per i quali si definiscono tempi di conservazione e modalità di archiviazione sicure.",
 "Tabella dei tempi di conservazione e archivi protetti.",
 ["D23","D24"],["7.5.3","A.5.31","A.8.13"]);
k("A.5.34","Privacy e protezione dei dati personali",
 "L'organizzazione individua e soddisfa i requisiti sulla tutela della privacy e dei dati personali previsti da leggi, regolamenti e contratti.",
 "Qui confluisce la documentazione GDPR: registro dei trattamenti, informative, nomine dei responsabili, DPIA dove necessarie, gestione dei data breach e contratto con il DPO se nominato.",
 "Registro dei trattamenti, informative e nomine firmate, che l'ente chiede già in Stage 1.",
 ["D18"],["A.5.20","A.5.24","A.5.31","A.8.11"],["GDPR artt. 5, 24, 28, 30, 32, 35"]);
k("A.5.35","Riesame indipendente della sicurezza delle informazioni",
 "L'approccio alla sicurezza e la sua attuazione vengono riesaminati in modo indipendente a intervalli pianificati o dopo modifiche significative.",
 "Lo soddisfa un audit interno affidato a una persona indipendente dalle attività verificate, così come un penetration test o un assessment svolto da terzi.",
 "Report dell'audit indipendente o dell'assessment esterno.",
 ["D20"],["9.2","A.5.36","A.8.34"]);
k("A.5.36","Conformità alle politiche, regole e norme per la sicurezza delle informazioni",
 "Il rispetto delle politiche, delle regole e delle norme di sicurezza viene riesaminato con regolarità.",
 "I responsabili verificano periodicamente che le regole siano applicate nelle loro aree, con controlli a campione registrati.",
 "Checklist di verifica periodica o report dei controlli di conformità.",
 ["D20","D12"],["A.5.1","A.5.35","9.1"]);
k("A.5.37","Procedure operative documentate",
 "Le procedure operative delle strutture di elaborazione delle informazioni sono documentate e rese disponibili a chi ne ha bisogno.",
 "Si documentano le attività tecniche ripetitive o critiche, come backup e ripristino, creazione delle utenze e aggiornamenti, anche in forma di istruzioni brevi.",
 "Istruzioni operative aggiornate e accessibili al personale IT.",
 ["D12"],["7.5.1","8.1","A.8.13","A.8.32"]);

/* --- A.6 persone --- */
k("A.6.1","Screening",
 "I candidati vengono verificati prima dell'assunzione e poi con regolarità, in modo proporzionato al ruolo e nel rispetto delle leggi.",
 "In Italia lo screening incontra limiti precisi (art. 8 dello Statuto dei lavoratori e art. 10 GDPR sui dati giudiziari), quindi si verifica solo ciò che è lecito, come CV, titoli e referenze, chiedendo certificati penali soltanto dove una norma lo consente.",
 "Procedura di selezione e checklist di verifica compilate per le assunzioni recenti.",
 ["D08"],["A.6.2","A.5.31"],["L. 300/1970 art. 8","GDPR art. 10"]);
k("A.6.2","Termini e condizioni di impiego",
 "I contratti di lavoro indicano le responsabilità del personale e dell'organizzazione in materia di sicurezza delle informazioni.",
 "Si inseriscono clausole di riservatezza e il richiamo al regolamento informatico nella lettera di assunzione o in un addendum firmato.",
 "Contratti o addendum firmati con le clausole di sicurezza.",
 ["D08","D09","D10"],["A.5.10","A.6.4","A.6.6"]);
k("A.6.3","Consapevolezza, istruzione e formazione sulla sicurezza delle informazioni",
 "Personale e parti interessate ricevono consapevolezza, istruzione e formazione adeguate, con aggiornamenti regolari su politiche e procedure.",
 "Serve un piano annuale con sessioni di base per tutti, approfondimenti per i ruoli tecnici e campagne di phishing simulato, accompagnato da registri di presenza e test di verifica.",
 "Piano di formazione, fogli presenza, attestati e risultati delle simulazioni.",
 ["D25","D08"],["7.2","7.3","A.5.6"],["NIS2 art. 21.2 lett. g","NIS2 art. 20.2"]);
k("A.6.4","Processo disciplinare",
 "Esiste un processo disciplinare formalizzato e comunicato per chi viola la politica di sicurezza.",
 "Si collega al codice disciplinare del CCNL applicato, che va reso noto con l'affissione o le altre forme previste dall'art. 7 dello Statuto dei lavoratori.",
 "Richiamo al sistema disciplinare nel regolamento informatico e prova della sua pubblicazione.",
 ["D08","D10"],["A.5.10","A.6.2"],["L. 300/1970 art. 7"]);
k("A.6.5","Responsabilità dopo la cessazione o il cambio di impiego",
 "Le responsabilità di sicurezza che restano valide dopo la cessazione o il cambio di ruolo vengono definite, comunicate e fatte rispettare.",
 "Chi lascia l'azienda firma il promemoria degli obblighi di riservatezza ancora vigenti e il suo accesso viene chiuso il giorno dell'uscita.",
 "Checklist di uscita firmata e log della disattivazione dell'account.",
 ["D08","D09"],["A.5.11","A.5.18","A.6.6"]);
k("A.6.6","Accordi di riservatezza o di non divulgazione",
 "Gli accordi di riservatezza riflettono le esigenze di protezione delle informazioni e vengono firmati dal personale e dalle parti interessate pertinenti.",
 "Il modello di accordo di riservatezza si usa sia per il personale interno sia per le terze parti, con le varianti necessarie, e va riesaminato periodicamente.",
 "NDA firmati da tutto il personale e dai fornitori che accedono a informazioni riservate.",
 ["D09"],["A.5.14","A.5.20","A.6.2","A.6.5"]);
k("A.6.7","Lavoro da remoto",
 "Quando il personale lavora da remoto si applicano misure di sicurezza per proteggere le informazioni consultate, trattate o conservate fuori sede.",
 "L'accordo individuale di smart working richiama le regole di sicurezza: VPN, dispositivo aziendale, divieto di reti pubbliche non protette e custodia dei documenti.",
 "Accordi di smart working firmati e configurazione della VPN o dell'accesso remoto.",
 ["D19","D10"],["A.5.10","A.7.9","A.8.1","A.8.20"],["L. 81/2017 artt. 18-23 (lavoro agile)"]);
k("A.6.8","Segnalazione degli eventi relativi alla sicurezza delle informazioni",
 "Il personale dispone di un canale per segnalare tempestivamente gli eventi di sicurezza osservati o sospettati.",
 "Basta un indirizzo mail dedicato o un modulo semplice, purché tutti lo conoscano e sappiano cosa segnalare, come una mail di phishing o lo smarrimento di un dispositivo.",
 "Canale di segnalazione attivo e segnalazioni ricevute riportate nel registro.",
 ["D15","D10"],["A.5.24","A.5.25","A.6.3"]);

/* --- A.7 fisici --- */
k("A.7.1","Perimetri di sicurezza fisica",
 "I perimetri di sicurezza vengono definiti e usati per proteggere le aree che contengono informazioni e altri asset.",
 "Si individuano le zone (area aperta al pubblico, uffici, sala server o armadio di rete) e si descrivono porte, serrature e allarmi che le delimitano.",
 "Planimetria con le aree e descrizione delle protezioni.",
 ["D11"],["A.7.2","A.7.3"]);
k("A.7.2","Controlli fisici degli accessi",
 "Le aree sicure sono protette da controlli d'ingresso e punti di accesso adeguati.",
 "Badge, chiavi numerate e registro dei visitatori sono i controlli più comuni. Conta soprattutto sapere chi ha le chiavi e assicurarsi che gli ospiti siano accompagnati.",
 "Registro di consegna di chiavi o badge e registro dei visitatori.",
 ["D11"],["A.7.1","A.7.4","A.7.6"]);
k("A.7.3","Rendere sicuri uffici, locali e strutture",
 "La sicurezza fisica di uffici, locali e strutture viene progettata e attuata.",
 "Comprende la chiusura dei locali, la protezione degli archivi cartacei e l'attenzione a ciò che è visibile dall'esterno.",
 "Descrizione delle misure nel documento dei controlli fisici e verifica in sede durante lo Stage 2.",
 ["D11"],["A.7.1","A.7.7"]);
k("A.7.4","Monitoraggio della sicurezza fisica",
 "I locali vengono monitorati in modo continuo per rilevare accessi fisici non autorizzati.",
 "Si usano allarmi antintrusione e videosorveglianza, quest'ultima nel rispetto dell'art. 4 dello Statuto (accordo sindacale o autorizzazione dell'Ispettorato del lavoro) e del GDPR, con informativa e cartelli.",
 "Contratto di vigilanza o dell'allarme e documentazione della videosorveglianza.",
 ["D11","D18"],["A.7.2","A.5.34"],["L. 300/1970 art. 4","GDPR art. 13"],true);
k("A.7.5","Protezione contro le minacce fisiche e ambientali",
 "Si progetta e attua la protezione da minacce fisiche e ambientali come incendi, allagamenti e altri eventi naturali o dolosi.",
 "Si verificano estintori, rilevatori e la posizione dei server rispetto al rischio di allagamento, collegandosi al DVR per la sicurezza sul lavoro e alla valutazione sul clima della clausola 4.1.",
 "Verifiche periodiche degli impianti antincendio e valutazione dei rischi ambientali.",
 ["D11"],["4.1","A.7.8","A.7.11"]);
k("A.7.6","Lavoro in aree sicure",
 "Si definiscono e attuano misure di sicurezza per chi lavora nelle aree sicure.",
 "Per la sala server si stabilisce chi può entrare e si prevede che i tecnici esterni siano sempre accompagnati.",
 "Regole di accesso alla sala server e registro degli ingressi.",
 ["D11"],["A.7.2","A.7.13"]);
k("A.7.7","Scrivania pulita e schermo pulito",
 "Si definiscono e fanno rispettare regole di scrivania pulita per documenti e supporti e di schermo pulito per i dispositivi.",
 "Si impostano il blocco automatico dello schermo dopo pochi minuti e l'obbligo di riporre i documenti riservati a fine giornata. L'auditor lo verifica spesso girando per gli uffici.",
 "Regola inserita nel regolamento informatico e blocco dello schermo configurato nei sistemi.",
 ["D10","D11"],["A.7.3","A.8.1"]);
k("A.7.8","Collocazione e protezione delle apparecchiature",
 "Le apparecchiature sono collocate in modo sicuro e protetto.",
 "Server e apparati di rete stanno in locali o armadi chiusi, lontani da fonti di calore e da tubazioni e non accessibili al pubblico.",
 "Verifica in sede e descrizione nel documento dei controlli fisici.",
 ["D11"],["A.7.5","A.7.11","A.7.12"]);
k("A.7.9","Sicurezza degli asset all'esterno delle sedi",
 "Gli asset utilizzati fuori dalle sedi dell'organizzazione sono protetti.",
 "Per portatili e smartphone aziendali si prevedono cifratura del disco, custodia durante i viaggi e una procedura da seguire in caso di furto.",
 "Regole nel regolamento informatico e cifratura attiva sui portatili.",
 ["D10","D12"],["A.6.7","A.7.10","A.8.1"]);
k("A.7.10","Supporti di memorizzazione",
 "I supporti di memorizzazione sono gestiti per tutto il loro ciclo di vita secondo lo schema di classificazione e i requisiti di gestione.",
 "Si regolano l'uso di chiavette e dischi esterni e la distruzione sicura dei supporti a fine vita, prevedendo la cifratura quando contengono dati riservati.",
 "Regole sui supporti e certificati di distruzione.",
 ["D10","D12"],["A.5.12","A.7.14","A.8.10"]);
k("A.7.11","Utenze di supporto",
 "Le strutture di elaborazione delle informazioni sono protette da interruzioni di corrente e da altri guasti dei servizi di supporto.",
 "Si installano gruppi di continuità su server e apparati di rete e si valuta una connettività di riserva per i servizi critici.",
 "UPS installati con test periodici e contratti di connettività.",
 ["D11","D17"],["A.7.8","A.8.14"]);
k("A.7.12","Sicurezza dei cablaggi",
 "I cavi che trasportano energia, dati o servizi di supporto sono protetti da intercettazioni, interferenze o danni.",
 "Nelle PMI si traduce in cablaggi ordinati e canalizzati e nella disattivazione delle prese di rete inutilizzate nelle aree accessibili al pubblico.",
 "Verifica visiva in sede.",
 ["D11"],["A.7.8","A.8.20"]);
k("A.7.13","Manutenzione delle apparecchiature",
 "Le apparecchiature sono manutenute correttamente per garantirne disponibilità, integrità e riservatezza.",
 "Si tiene traccia degli interventi e, prima di mandare un dispositivo in assistenza, si valuta se cancellarne i dati.",
 "Registro delle manutenzioni e contratti di assistenza.",
 ["D11","D13"],["A.7.6","A.7.14"]);
k("A.7.14","Dismissione sicura o riutilizzo delle apparecchiature",
 "Prima della dismissione o del riutilizzo si verifica che dati sensibili e software in licenza siano stati rimossi o sovrascritti in modo sicuro.",
 "Serve una procedura di cancellazione certificata o di distruzione fisica, con un verbale per ogni dispositivo dismesso.",
 "Verbali o certificati di distruzione e inventario aggiornato.",
 ["D12","D13"],["A.5.9","A.7.10","A.8.10"]);

/* --- A.8 tecnologici --- */
k("A.8.1","Dispositivi endpoint degli utenti",
 "Le informazioni archiviate, elaborate o accessibili tramite i dispositivi degli utenti sono protette.",
 "Riguarda portatili, smartphone e tablet, aziendali e personali, che devono avere cifratura, blocco, antimalware e aggiornamenti, possibilmente con una gestione centralizzata (MDM).",
 "Elenco dei dispositivi con lo stato di cifratura e di aggiornamento, oppure la console MDM se presente.",
 ["D12","D10"],["A.6.7","A.7.9","A.8.7"]);
k("A.8.2","Diritti di accesso privilegiati",
 "L'assegnazione e l'uso dei diritti di accesso privilegiati sono limitati e gestiti.",
 "Gli amministratori usano un'utenza dedicata, distinta da quella di tutti i giorni e protetta da MFA, e l'elenco degli amministratori viene riesaminato più spesso degli altri accessi. In Italia si aggiunge il provvedimento del Garante sugli amministratori di sistema, con nomina individuale, elenco aggiornato e log degli accessi.",
 "Elenco delle utenze privilegiate con l'ultimo riesame e nomine degli amministratori di sistema.",
 ["D12","D03"],["A.5.3","A.5.15","A.5.18","A.8.5","A.8.15","A.8.18"],["Provv. Garante 27/11/2008 (amministratori di sistema)"]);
k("A.8.3","Limitazione dell'accesso alle informazioni",
 "L'accesso alle informazioni e alle funzioni applicative è limitato secondo la politica degli accessi.",
 "Cartelle condivise, gestionali e CRM hanno profili per ruolo, così ciascuno vede solo ciò che serve al suo lavoro.",
 "Matrice ruoli e permessi o export dei profili applicativi.",
 ["D12"],["A.5.15","A.8.2","A.8.11"]);
k("A.8.4","Accesso al codice sorgente",
 "L'accesso in lettura e scrittura al codice sorgente, agli strumenti di sviluppo e alle librerie software è gestito in modo appropriato.",
 "Si applica a chi sviluppa software, con repository ad accessi nominativi, protezione dei branch principali e revisione delle modifiche. Chi non sviluppa lo esclude nella SoA motivando.",
 "Configurazione del repository ed elenco degli accessi.",
 ["D26","D06"],["A.8.25","A.8.28","A.8.32"]);
k("A.8.5","Autenticazione sicura",
 "Tecnologie e procedure di autenticazione sicura sono adottate in base alle restrizioni di accesso e alla politica sugli accessi.",
 "Oggi l'auditor si aspetta l'autenticazione a più fattori almeno su posta, accessi remoti, servizi cloud e utenze amministrative.",
 "Report o schermate che mostrano l'MFA attiva.",
 ["D12"],["A.5.17","A.8.2"],["NIS2 art. 21.2 lett. j"]);
k("A.8.6","Gestione della capacità",
 "L'uso delle risorse è monitorato e adeguato ai requisiti di capacità attuali e previsti.",
 "Si controllano spazio disco, licenze, banda e prestazioni dei servizi critici, con soglie di allarme dove possibile.",
 "Report di monitoraggio o alert configurati.",
 ["D12"],["A.8.14","A.8.16"]);
k("A.8.7","Protezione contro il malware",
 "La protezione contro il malware è attuata e supportata da un'adeguata consapevolezza degli utenti.",
 "Si installano antimalware o EDR su endpoint e server e si affianca la protezione tecnica con la formazione sul phishing.",
 "Console dell'antimalware con lo stato dei dispositivi.",
 ["D12"],["A.6.3","A.8.1","A.8.23"]);
k("A.8.8","Gestione delle vulnerabilità tecniche",
 "Si raccolgono informazioni sulle vulnerabilità dei sistemi in uso, si valuta l'esposizione e si adottano misure appropriate.",
 "Il patch management prevede tempi definiti per le vulnerabilità critiche, affiancati da scansioni periodiche e da un vulnerability assessment almeno annuale sui sistemi esposti.",
 "Report delle scansioni e registro delle patch applicate.",
 ["D12"],["A.5.7","A.5.21","A.8.9","A.8.32"],["NIS2 art. 21.2 lett. e"]);
k("A.8.9","Gestione della configurazione",
 "Le configurazioni di hardware, software, servizi e reti, comprese quelle di sicurezza, sono stabilite, documentate, attuate, monitorate e riesaminate.",
 "Si definiscono configurazioni standard (baseline) per postazioni, server e firewall e si registrano le modifiche.",
 "Baseline documentate e registro delle modifiche di configurazione.",
 ["D12"],["A.8.19","A.8.20","A.8.32"],[],true);
k("A.8.10","Cancellazione delle informazioni",
 "Le informazioni archiviate in sistemi, dispositivi o altri supporti vengono cancellate quando non sono più necessarie.",
 "Si collega ai tempi di conservazione del GDPR, stabilendo quando cancellare i dati e con quale metodo, anche nei servizi cloud e nei backup.",
 "Tabella dei tempi di conservazione ed evidenze delle cancellazioni eseguite.",
 ["D18","D12"],["A.5.33","A.5.34","A.7.14"],["GDPR art. 5.1 lett. e","GDPR art. 17"],true);
k("A.8.11","Mascheramento dei dati",
 "I dati vengono mascherati secondo la politica di controllo degli accessi, i requisiti di business e la normativa applicabile.",
 "Si applicano pseudonimizzazione o anonimizzazione nei test, negli export e nei report, in modo che ciascuno veda solo i dati necessari.",
 "Esempi di dataset mascherati o configurazioni di mascheramento.",
 ["D12","D18"],["A.5.34","A.8.3","A.8.33"],["GDPR artt. 25 e 32"],true);
k("A.8.12","Prevenzione della fuga di dati",
 "Misure di prevenzione della fuga di dati si applicano a sistemi, reti e dispositivi che trattano informazioni sensibili.",
 "Nelle PMI si parte dalle funzioni DLP già incluse in Microsoft 365 o Google Workspace, dal blocco delle chiavette USB e dalle regole sull'uso di servizi personali e di intelligenza artificiale.",
 "Policy DLP configurate o regole equivalenti documentate.",
 ["D12","D10"],["A.5.12","A.5.14","A.8.23"],[],true);
k("A.8.13","Backup delle informazioni",
 "Le copie di backup di informazioni, software e sistemi sono mantenute e verificate regolarmente secondo la politica di backup.",
 "La regola 3-2-1 con una copia offline o immutabile protegge anche dal ransomware. L'auditor chiede quasi sempre la prova dell'ultimo test di ripristino.",
 "Politica di backup con i log dei job e il verbale dell'ultimo test di ripristino.",
 ["D12","D17"],["A.5.29","A.5.30","A.8.14"],["NIS2 art. 21.2 lett. c"]);
k("A.8.14","Ridondanza delle strutture di elaborazione delle informazioni",
 "Le strutture di elaborazione hanno una ridondanza sufficiente a soddisfare i requisiti di disponibilità.",
 "Dove l'analisi dei rischi lo giustifica si prevedono dischi in RAID, server o connessioni di riserva e servizi cloud ad alta disponibilità.",
 "Schema dell'infrastruttura con le componenti ridondate.",
 ["D12","D17"],["A.5.30","A.7.11","A.8.13"]);
k("A.8.15","Logging",
 "I log che registrano attività, eccezioni, guasti e altri eventi rilevanti sono prodotti, conservati, protetti e analizzati.",
 "Si stabilisce quali log attivare (accessi, amministratori, firewall, posta), per quanto conservarli e chi li analizza. Per gli amministratori di sistema il Garante chiede log degli accessi inalterabili e conservati per almeno sei mesi.",
 "Configurazione dei log ed esempi di analisi o di alert.",
 ["D12"],["A.5.28","A.8.2","A.8.16","A.8.17"],["Provv. Garante 27/11/2008 (amministratori di sistema)"]);
k("A.8.16","Attività di monitoraggio",
 "Reti, sistemi e applicazioni sono monitorati per individuare comportamenti anomali, intervenendo per valutare possibili incidenti.",
 "Può essere un SIEM, un servizio MDR esterno o, nelle realtà piccole, l'analisi periodica degli alert di firewall e antimalware affidata a un responsabile definito.",
 "Report di monitoraggio e alert gestiti.",
 ["D12"],["A.5.25","A.8.6","A.8.15"],[],true);
k("A.8.17","Sincronizzazione degli orologi",
 "Gli orologi dei sistemi sono sincronizzati con fonti temporali approvate.",
 "Basta configurare un server NTP comune, perché senza orari coerenti i log perdono valore in caso di indagine.",
 "Configurazione NTP di server e apparati.",
 ["D12"],["A.5.28","A.8.15"]);
k("A.8.18","Utilizzo di programmi di utilità privilegiati",
 "L'uso di programmi in grado di aggirare i controlli di sistema e applicativi è limitato e controllato.",
 "Riguarda strumenti come PowerShell, software di amministrazione remota o di recupero password, da riservare agli amministratori.",
 "Restrizioni sugli strumenti ed elenco di chi può usarli.",
 ["D12"],["A.8.2","A.8.19"]);
k("A.8.19","Installazione del software sui sistemi operativi",
 "Procedure e misure gestiscono in modo sicuro l'installazione di software sui sistemi operativi.",
 "Gli utenti non hanno diritti di amministratore sulle postazioni e il software si installa solo da un elenco approvato.",
 "Elenco del software autorizzato e configurazione dei permessi locali.",
 ["D12","D10"],["A.5.32","A.8.9","A.8.18"]);
k("A.8.20","Sicurezza delle reti",
 "Reti e dispositivi di rete sono protetti, gestiti e controllati per proteggere le informazioni nei sistemi e nelle applicazioni.",
 "Si mantengono un firewall configurato e aggiornato e uno schema di rete documentato, consentendo l'accesso remoto solo tramite VPN.",
 "Schema di rete e regole del firewall riesaminate.",
 ["D12"],["A.6.7","A.7.12","A.8.21","A.8.22"]);
k("A.8.21","Sicurezza dei servizi di rete",
 "Meccanismi di sicurezza, livelli di servizio e requisiti dei servizi di rete sono individuati, attuati e monitorati.",
 "Riguarda connettività, DNS e servizi di rete gestiti da terzi, i cui SLA e le cui misure di sicurezza vanno inseriti nei contratti.",
 "Contratti con gli operatori e relativi SLA.",
 ["D16","D12"],["A.5.20","A.8.20"]);
k("A.8.22","Segregazione delle reti",
 "Gruppi di servizi, utenti e sistemi sono separati all'interno delle reti dell'organizzazione.",
 "La separazione minima prevede una rete ospiti distinta e una VLAN dedicata a server o a dispositivi IoT come stampanti e telecamere.",
 "Schema di rete con le VLAN.",
 ["D12"],["A.8.20","A.8.31"]);
k("A.8.23","Filtraggio web",
 "L'accesso ai siti web esterni è gestito per ridurre l'esposizione a contenuti malevoli.",
 "Si usa il filtro del firewall o un DNS protetto per bloccare le categorie pericolose e i siti malevoli noti.",
 "Configurazione del filtro web con le categorie bloccate.",
 ["D12","D10"],["A.8.7","A.8.12"],[],true);
k("A.8.24","Utilizzo della crittografia",
 "Si definiscono e attuano regole per l'uso efficace della crittografia, compresa la gestione delle chiavi.",
 "Si indica dove si cifra (dischi dei portatili, backup, connessioni, allegati riservati) e chi custodisce le chiavi di ripristino.",
 "Politica di crittografia e prova della cifratura attiva.",
 ["D12"],["A.5.14","A.8.1","A.8.13"],["NIS2 art. 21.2 lett. h","GDPR art. 32"]);
k("A.8.25","Ciclo di vita dello sviluppo sicuro",
 "Si stabiliscono e applicano regole per lo sviluppo sicuro di software e sistemi.",
 "Si applica a chi sviluppa internamente o fa sviluppare, con una politica di sviluppo sicuro che copre requisiti, codifica, test e rilascio. Chi non sviluppa lo esclude nella SoA motivando.",
 "Politica di sviluppo sicuro ed evidenze sul ciclo di rilascio.",
 ["D26","D06"],["A.5.8","A.8.26","A.8.28","A.8.29","A.8.31"],["NIS2 art. 21.2 lett. e"]);
k("A.8.26","Requisiti di sicurezza delle applicazioni",
 "I requisiti di sicurezza vengono individuati, specificati e approvati quando si sviluppano o si acquisiscono applicazioni.",
 "Anche chi compra un software sul mercato fissa requisiti minimi (MFA, log, cifratura, ubicazione dei dati) e li verifica prima della scelta.",
 "Requisiti di sicurezza nei capitolati o nelle checklist di acquisto.",
 ["D26","D16"],["A.5.8","A.5.23","A.8.25"]);
k("A.8.27","Principi di architettura e ingegneria dei sistemi sicuri",
 "Principi di ingegneria dei sistemi sicuri vengono stabiliti, documentati e applicati in ogni attività di sviluppo.",
 "Principi come la difesa in profondità e la sicurezza per impostazione predefinita entrano nelle linee guida di progettazione.",
 "Linee guida architetturali documentate.",
 ["D26"],["A.8.25","A.8.28"],["GDPR art. 25"]);
k("A.8.28","Codifica sicura",
 "Nello sviluppo del software si applicano i principi di codifica sicura.",
 "Si adottano linee guida come OWASP e strumenti di analisi del codice e delle librerie di terze parti.",
 "Report degli strumenti di analisi e linee guida adottate.",
 ["D26"],["A.8.4","A.8.25","A.8.29"],[],true);
k("A.8.29","Test di sicurezza nello sviluppo e nell'accettazione",
 "I processi di test di sicurezza sono definiti e attuati nel ciclo di sviluppo.",
 "Prima del rilascio si eseguono test di sicurezza proporzionati, fino al penetration test per le applicazioni esposte su internet.",
 "Piani e risultati dei test.",
 ["D26"],["A.8.28","A.8.31","A.8.33"]);
k("A.8.30","Sviluppo affidato all'esterno",
 "L'organizzazione dirige, monitora e riesamina le attività di sviluppo affidate all'esterno.",
 "Il contratto con lo sviluppatore esterno comprende requisiti di sicurezza, proprietà del codice, test e diritto di verifica.",
 "Contratti con le clausole di sicurezza e verbali di accettazione.",
 ["D16","D26"],["A.5.20","A.8.25"]);
k("A.8.31","Separazione degli ambienti di sviluppo, test e produzione",
 "Gli ambienti di sviluppo, di test e di produzione sono separati e protetti.",
 "Si evita di sviluppare o testare direttamente in produzione e si limitano gli accessi all'ambiente di produzione.",
 "Schema degli ambienti e accessi distinti.",
 ["D26","D12"],["A.8.22","A.8.32","A.8.33"]);
k("A.8.32","Gestione dei cambiamenti",
 "Le modifiche alle strutture di elaborazione e ai sistemi informativi seguono procedure di gestione dei cambiamenti.",
 "Ogni modifica rilevante viene richiesta, valutata, approvata e registrata, con un piano di ritorno in caso di problemi.",
 "Registro dei cambiamenti con le approvazioni.",
 ["D27","D12"],["6.3","A.8.9","A.8.31"]);
k("A.8.33","Informazioni di test",
 "Le informazioni usate per i test sono selezionate, protette e gestite in modo appropriato.",
 "Si evita di copiare dati personali reali negli ambienti di test, oppure li si maschera prima di usarli.",
 "Regole sui dati di test ed esempi di dati mascherati.",
 ["D26","D18"],["A.8.11","A.8.31"]);
k("A.8.34","Protezione dei sistemi informativi durante gli audit",
 "Test di audit e altre attività di verifica sui sistemi operativi sono pianificati e concordati tra chi verifica e chi gestisce.",
 "Vulnerability assessment, penetration test e audit tecnici si concordano per tempi e perimetro, in modo da non compromettere i sistemi in produzione.",
 "Lettere di incarico o regole di ingaggio dei test.",
 ["D20","D12"],["A.5.35","A.8.8"]);

/* --- documenti dello studio --- */
const D = [
 {id:"D01",n:"Analisi del contesto, parti interessate e campo di applicazione",s:1,o:true,
  c:"Riporta i fattori interni ed esterni, la valutazione sul cambiamento climatico, la tabella delle parti interessate con i loro requisiti e lo scope del sistema con le esclusioni motivate.",
  t:"Lo scope deve coincidere parola per parola con quello comunicato all'ente di certificazione."},
 {id:"D02",n:"Politica per la sicurezza delle informazioni",s:1,o:true,
  c:"Politica generale firmata dalla direzione, spesso integrata con la qualità, con gli impegni richiesti dalla norma e il quadro per gli obiettivi.",
  t:"Pubblicala sul sito o in bacheca e conserva la prova della comunicazione al personale."},
 {id:"D03",n:"Organigramma, ruoli e responsabilità",s:1,o:false,
  c:"Organigramma con i ruoli del sistema, matrice delle responsabilità e nomine interne, comprese quelle degli amministratori di sistema e del referente per gli incidenti.",
  t:"Aggiornalo a ogni ingresso o uscita, perché è tra i primi documenti che l'auditor confronta con la realtà."},
 {id:"D04",n:"Metodologia e analisi dei rischi",s:1,o:true,
  c:"Metodologia con scale e criteri di accettazione e registro dei rischi per asset, minacce e vulnerabilità, con titolari e livello di rischio. Nel sistema integrato copre anche i rischi della ISO 9001.",
  t:"Collega ogni rischio a un asset dell'inventario e ai controlli dell'Allegato A che lo riducono."},
 {id:"D05",n:"Piano di trattamento dei rischi",s:1,o:true,
  c:"Azioni previste per ridurre i rischi sopra soglia, con responsabile, scadenza e stato, approvate dai titolari insieme ai rischi residui.",
  t:"Può essere un foglio del registro dei rischi, purché l'approvazione dei titolari sia evidente."},
 {id:"D06",n:"SoA, Dichiarazione di Applicabilità",s:1,o:true,
  c:"Tutti i 93 controlli dell'Allegato A con applicabilità, giustificazione dell'inclusione o dell'esclusione, stato di attuazione e documento che li attua.",
  t:"Il nome del file resta sempre «SoA-Dichiarazione di Applicabilità_Rev.» con il numero di revisione, senza il nome dell'azienda."},
 {id:"D07",n:"Obiettivi e indicatori di sicurezza",s:1,o:true,
  c:"Obiettivi con indicatore, valore atteso, responsabile, risorse e scadenza, insieme alle misurazioni periodiche.",
  t:"Pochi indicatori misurati con regolarità funzionano meglio di un elenco lungo rimasto sulla carta."},
 {id:"D08",n:"Gestione delle risorse umane",s:1,o:false,
  c:"Selezione e screening, clausole contrattuali, competenze richieste per ruolo, processo disciplinare e gestione della cessazione con la checklist di uscita.",
  t:"Allinea il richiamo disciplinare al CCNL applicato in azienda."},
 {id:"D09",n:"Accordo di riservatezza tra azienda e risorsa (template)",s:1,o:false,
  c:"Modello di NDA con le varianti per collaboratori e fornitori e gli obblighi che restano validi dopo la cessazione.",
  t:"Raccogli le firme di tutti prima dello Stage 2, collaboratori occasionali compresi."},
 {id:"D10",n:"Regolamento utilizzo risorse informatiche",s:1,o:false,
  c:"Regole di uso accettabile di posta, internet, dispositivi, cloud e strumenti di intelligenza artificiale, password e MFA, scrivania pulita, segnalazione degli eventi, controlli del datore di lavoro e sanzioni.",
  t:"Fallo firmare per presa visione e verificane la coerenza con l'art. 4 dello Statuto dei lavoratori."},
 {id:"D11",n:"Documento controlli fisici",s:1,o:false,
  c:"Perimetri e aree, controllo degli accessi e visitatori, allarmi e videosorveglianza, protezioni antincendio e ambientali, UPS e manutenzioni.",
  t:"Allega una planimetria semplice con le aree evidenziate."},
 {id:"D12",n:"Documento controlli informatici",s:1,o:false,
  c:"Accessi e identità, autenticazione, endpoint, malware, vulnerabilità e patch, configurazioni, backup, log e monitoraggio, reti, crittografia e procedure operative.",
  t:"È il documento che copre più controlli dell'Allegato A, per questo conviene dividerlo in capitoli che richiamano la numerazione dei controlli."},
 {id:"D13",n:"Gestione asset aziendali",s:1,o:false,
  c:"Inventario di hardware, software, servizi cloud e archivi di informazioni con proprietario, ubicazione, classificazione e licenze, più le regole di restituzione e dismissione.",
  t:"Fai in modo che l'inventario sia lo stesso elenco da cui parte l'analisi dei rischi."},
 {id:"D14",n:"Classificazione delle informazioni e strumenti",s:1,o:false,
  c:"Livelli di classificazione con esempi, regole di etichettatura e di trasferimento e strumenti da usare per ciascun livello.",
  t:"Quattro livelli bastano per quasi tutte le PMI."},
 {id:"D15",n:"Procedura gestione incidenti",s:1,o:false,
  c:"Ruoli, canali di segnalazione, criteri di classificazione, fasi di risposta, notifiche al Garante e, per i soggetti NIS2, al CSIRT Italia, raccolta delle evidenze e analisi post-incidente, con il registro degli eventi.",
  t:"Se non ci sono incidenti reali da mostrare, esegui almeno una simulazione prima dello Stage 2."},
 {id:"D16",n:"Valutazione fornitori ed elenco fornitori",s:1,o:false,
  c:"Elenco dei fornitori con la criticità, questionari o certificazioni raccolte, requisiti contrattuali di sicurezza, servizi cloud e rivalutazione periodica.",
  t:"Parti dai fornitori IT e da quelli che trattano dati personali per conto dell'azienda."},
 {id:"D17",n:"Business continuity",s:1,o:false,
  c:"Analisi di impatto, RTO e RPO, scenari, piano di ripristino, sicurezza in emergenza e test periodici registrati con un modulo, ad esempio un Google Form.",
  t:"Programma il primo test prima dello Stage 2 e conservane l'esito."},
 {id:"D18",n:"Documentazione privacy",s:1,o:false,
  c:"Registro dei trattamenti, informative per candidati, dipendenti e collaboratori, fornitori e clienti, nomine ex art. 28 firmate, nomina della società come responsabile quando è fornitrice di qualcuno, contratto e nomina del DPO se previsto.",
  t:"L'ente lo chiede già in Stage 1, quindi controlla che le nomine siano firmate da entrambe le parti."},
 {id:"D19",n:"Accordi di smart working",s:1,o:false,
  c:"Accordi individuali di lavoro agile con le regole di sicurezza per il lavoro da remoto.",
  t:"Richiama nell'accordo il regolamento informatico invece di ripeterne le regole."},
 {id:"D20",n:"Programma e report di audit interno",s:1,o:true,
  c:"Programma di audit, piano del singolo audit, checklist e report con i rilievi.",
  t:"Il report del primo audit interno completo è indispensabile per lo Stage 1."},
 {id:"D21",n:"Verbale di riesame della direzione",s:1,o:true,
  c:"Esame di tutti gli input richiesti dalla clausola 9.3 e decisioni con responsabili e risorse.",
  t:"Fissalo dopo l'audit interno, così il riesame può discuterne i risultati."},
 {id:"D22",n:"Registro non conformità e azioni correttive",s:2,o:true,
  c:"Non conformità, correzioni, analisi delle cause, azioni correttive, verifiche di efficacia e miglioramenti.",
  t:"Inserisci qui anche i rilievi dell'audit interno e quelli dell'ente di certificazione."},
 {id:"D23",n:"Gestione delle informazioni documentate",s:1,o:false,
  c:"Regole di codifica, revisione, approvazione, archiviazione, accesso e conservazione dei documenti, con l'elenco dei documenti in vigore.",
  t:"Una sola cartella condivisa con permessi impostati bene semplifica molto l'audit."},
 {id:"D24",n:"Registro delle prescrizioni legali e contrattuali",s:1,o:false,
  c:"Normative applicabili (GDPR, NIS2 se applicabile, Statuto dei lavoratori, AI Act e norme di settore) e obblighi contrattuali verso i clienti, con le modalità di adempimento e la data di verifica.",
  t:"Riesaminalo almeno una volta l'anno e ogni volta che esce una norma rilevante."},
 {id:"D25",n:"Piano di formazione e registri di consapevolezza",s:2,o:false,
  c:"Piano annuale, fogli presenza, attestati, risultati dei test e delle simulazioni di phishing, iscrizioni alle newsletter di sicurezza come quelle di ACN e CSIRT Italia per dimostrare l'aggiornamento continuo.",
  t:"In Stage 2 l'auditor chiede di vedere le iscrizioni alle newsletter, quindi falle fare per tempo."},
 {id:"D26",n:"Politica di sviluppo sicuro (se applicabile)",s:1,o:false,
  c:"Ciclo di sviluppo sicuro, requisiti, codifica, test, separazione degli ambienti, sviluppo esterno e gestione del codice sorgente.",
  t:"Serve solo se l'azienda sviluppa o fa sviluppare software. In caso contrario i controlli da A.8.25 ad A.8.31 si escludono nella SoA con una motivazione."},
 {id:"D27",n:"Gestione dei cambiamenti",s:2,o:false,
  c:"Modulo o registro per le modifiche al sistema di gestione (clausola 6.3) e per quelle tecniche (A.8.32), con valutazione, approvazione e piano di ritorno.",
  t:"Può confluire nel documento dei controlli informatici."}
];

const PHASES = [
 {n:"Fondamenta",d:"Si parte sempre da qui, perché contesto, scope e politica condizionano tutto il resto. Conviene chiudere questa fase prima di aprire la successiva.",
  ids:["4.1","4.2","4.3","4.4","5.1","5.2","5.3"]},
 {n:"Gestione del rischio",d:"È il cuore del sistema. Dall'inventario degli asset nasce l'analisi dei rischi, da cui discendono piano di trattamento, SoA e obiettivi.",
  ids:["A.5.9","6.1.1","6.1.2","6.1.3","6.2","6.3","8.2","8.3"]},
 {n:"Politiche e procedure",d:"È il blocco più corposo, perché traduce in regole i controlli scelti nella SoA. Qui servono il documento dei controlli informatici, quello dei controlli fisici e le procedure su fornitori, incidenti e continuità.",
  ids:["7.5.1","7.5.2","7.5.3","8.1","A.5.1","A.5.15","A.5.19","A.5.24","A.5.30","A.5.31","A.5.34","A.7.1","A.8.13","A.8.15","A.8.24"]},
 {n:"Persone e formazione",d:"Viene spesso sottovalutata, eppure in Stage 2 l'auditor intervista il personale e verifica firme, attestati e consapevolezza.",
  ids:["7.1","7.2","7.3","7.4","A.6.1","A.6.2","A.6.3","A.6.4","A.6.5","A.6.6","A.6.7","A.6.8"]},
 {n:"Obblighi di legge",d:"L'auditor verifica i requisiti cogenti come parte del sistema, perché la clausola 4.2 e il controllo A.5.31 chiedono di individuarli e rispettarli. Si parte dalla verifica di quali leggi si applicano, si annotano nel registro delle prescrizioni e si raccolgono le evidenze, come le nomine privacy, il DVR e gli accordi per i controlli a distanza.",
  ids:["L01", "L02", "L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14"]},
 {n:"Audit e miglioramento",d:"Chiude il ciclo PDCA. Senza almeno un audit interno completo e un riesame della direzione lo Stage 1 non può partire.",
  ids:["9.1","9.2","9.3","10.1","10.2"]},
 {n:"Estensioni cloud, se previste",d:"Solo per chi aggiunge al certificato la 27017 o la 27018. Si chiarisce il ruolo di cliente o fornitore, si estende la SoA e si adeguano i contratti, sfruttando il differenziale indicato nelle schede dei controlli.",
  ids:["X17.5.38","X17.5.39","X17.8.35","X17.8.36","X18.5","X18.6","X18.8","X18.13","X18.15"]}
];

const STAGE2 = [
 "Registri di formazione e risultati delle simulazioni di phishing",
 "Iscrizioni alle newsletter di sicurezza (ACN, CSIRT Italia) per dimostrare l'aggiornamento continuo",
 "Esiti dei test di backup e di continuità operativa",
 "Riesame periodico degli accessi e chiusura degli account delle persone uscite",
 "Valutazioni e rivalutazioni dei fornitori",
 "Registro degli eventi e degli incidenti, con almeno una simulazione se non ci sono incidenti reali",
 "NDA e regolamento informatico firmati da tutto il personale",
 "Evidenze degli obblighi di legge, come nomine privacy firmate, DVR aggiornato, attestati della formazione sulla sicurezza e designazioni degli amministratori di sistema",
 "Verbali di dismissione e distruzione dei dispositivi",
 "Misurazioni degli indicatori e azioni correttive chiuse con la verifica di efficacia"
];

/* --- struttura dei documenti --- */
const DS = {
 D01:{f:"Word, con tabelle per contesto e parti interessate",a:"Direzione",r:"Ogni anno nel riesame e a ogni modifica rilevante",
  str:[["Presentazione dell'organizzazione","Attività, sedi, numero di addetti e servizi offerti, in poche righe."],
   ["Fattori esterni","Normativa, mercato, tecnologia, minacce e fornitori critici, ciascuno con l'effetto sulla sicurezza e il modo in cui viene gestito."],
   ["Fattori interni","Organizzazione, competenze disponibili, infrastruttura IT e cultura aziendale sulla sicurezza."],
   ["Cambiamento climatico","Valutazione sulla rilevanza del tema con la motivazione, anche quando la conclusione è negativa."],
   ["Parti interessate e requisiti","Tabella con le colonne indicate qui sotto."],
   ["Campo di applicazione","Testo dello scope con sedi, processi, servizi, sistemi e interfacce con i fornitori."],
   ["Esclusioni","Ciò che resta fuori dallo scope e il motivo."]],
  col:["Parte interessata","Requisiti e aspettative","Legale o contrattuale","Gestito nel sistema (sì/no)","Come risponde l'azienda","Documento di riferimento"],
  err:"Scrivere lo scope come semplice elenco di attività, senza sedi, sistemi e interfacce con i fornitori."},
 D02:{f:"Word poi PDF firmato, una o due pagine",a:"Legale rappresentante",r:"Ogni anno nel riesame",
  str:[["Impegno della direzione","Perché l'azienda protegge le informazioni, collegato all'attività e ai clienti."],
   ["Principi","Come riservatezza, integrità e disponibilità si traducono nel contesto dell'azienda."],
   ["Quadro per gli obiettivi","Rinvio agli obiettivi misurabili e a chi li fissa."],
   ["Impegni richiesti dalla norma","Rispetto dei requisiti applicabili e miglioramento continuo, scritti in modo esplicito."],
   ["Politiche tematiche","Elenco con codice delle politiche che discendono da questa."],
   ["Ruoli","Chi è responsabile del sistema e quali obblighi ha tutto il personale."],
   ["Comunicazione e riesame","Dove è pubblicata e ogni quanto viene riesaminata."],
   ["Data e firma","Firma del legale rappresentante con la data di approvazione."]],
  col:[],err:"Superare le due pagine inserendo dettagli tecnici che appartengono alle procedure."},
 D03:{f:"Organigramma grafico e tabella in Word o Excel",a:"Direzione",r:"A ogni ingresso, uscita o cambio di ruolo",
  str:[["Organigramma","Struttura aziendale con i ruoli del sistema evidenziati."],
   ["Funzioni del sistema","Responsabile del sistema, amministratori di sistema, referente privacy o DPO, referente incidenti e responsabile fornitori, con nomi e sostituti."],
   ["Matrice delle responsabilità","Tabella attività per ruolo, con le colonne indicate qui sotto."],
   ["Incompatibilità","Ruoli cumulati in conflitto e controlli compensativi adottati (A.5.3)."],
   ["Allegati","Lettere di nomina interne firmate."]],
  col:["Attività","Responsabile","Approva","Consultato","Informato","Sostituto"],
  err:"Indicare i ruoli senza i sostituti, che l'auditor chiede quasi sempre."},
 D04:{f:"Word per la metodologia, Excel per il registro",a:"Direzione per i criteri, titolari dei rischi per i risultati",r:"Ogni anno e a ogni modifica significativa",
  str:[["Metodologia","Approccio scelto (per asset o per scenario), scale di probabilità e impatto con la descrizione di ogni valore, matrice e soglia di accettazione."],
   ["Catalogo di riferimento","Minacce e vulnerabilità tipiche da cui partire, adattate all'azienda."],
   ["Registro dei rischi","Foglio Excel con le colonne indicate qui sotto."],
   ["Rischi e opportunità del sistema","Sezione separata per i temi della clausola 6.1.1, come la dipendenza da singole persone."],
   ["Approvazione","Data di esecuzione e firma dei titolari dei rischi."]],
  col:["ID","Asset o processo","Minaccia","Vulnerabilità","R / I / D","Controlli esistenti","Probabilità 1-5","Impatto 1-5","Livello","Titolare","Decisione","Controlli Allegato A","Rischio residuo"],
  err:"Assegnare punteggi senza descrivere cosa significa ogni valore della scala, così i risultati non sono ripetibili."},
 D05:{f:"Excel, anche come foglio del registro dei rischi",a:"Titolari dei rischi",r:"Avanzamento ogni trimestre, revisione completa ogni anno",
  str:[["Rischi da trattare","Rischi sopra la soglia di accettazione ripresi dal registro."],
   ["Azioni","Una riga per azione con le colonne indicate qui sotto."],
   ["Rischi residui","Livello atteso dopo le azioni e accettazione formale dei titolari."]],
  col:["ID azione","Rischio collegato","Azione","Controllo Allegato A","Responsabile","Risorse","Scadenza","Stato","Residuo atteso","Accettato da e data"],
  err:"Dimenticare l'accettazione esplicita dei rischi residui da parte dei titolari."},
 D06:{f:"Excel, nome file «SoA-Dichiarazione di Applicabilità_Rev.» seguito dal numero",a:"Responsabile del sistema e direzione",r:"A ogni aggiornamento dei rischi e almeno ogni anno",
  str:[["Intestazione","Scope di riferimento, revisione, data e approvazione."],
   ["Tabella dei controlli","Una riga per ciascuno dei 93 controlli, con le colonne indicate qui sotto."],
   ["Controlli aggiuntivi","Eventuali controlli adottati che non compaiono nell'Allegato A."],
   ["Riepilogo","Numero di controlli applicati, esclusi e attuati."],
   ["Controlli 27017 e 27018","Se il certificato include le estensioni cloud, righe aggiuntive per i controlli della 27017:2026 e della 27018:2025 con la stessa struttura."]],
  col:["Controllo","Titolo","Applicabile","Motivo dell'inclusione","Motivo dell'esclusione","Stato di attuazione","Documento di riferimento","Responsabile"],
  err:"Scrivere «non applicabile» come motivazione, senza spiegare perché il controllo non serve."},
 D07:{f:"Excel",a:"Direzione",r:"Misure con la frequenza stabilita, analisi nel riesame",
  str:[["Obiettivi","Obiettivi collegati alla politica, pochi e concreti."],
   ["Indicatori","Formula, fonte del dato e valore atteso per ciascun obiettivo."],
   ["Piano di raggiungimento","Azioni, risorse, responsabili e scadenze."],
   ["Misurazioni","Valori rilevati nel tempo con il trend."]],
  col:["Obiettivo","Indicatore","Formula e fonte del dato","Target","Frequenza","Responsabile","Scadenza","Valori misurati","Esito"],
  err:"Definire un indicatore senza dire da dove si prende il dato."},
 D08:{f:"Word per la procedura, moduli in Word o Excel",a:"Direzione",r:"Ogni anno",
  str:[["Selezione e screening","Verifiche lecite previste per ciascun tipo di ruolo."],
   ["Ingresso","Contratto con le clausole di sicurezza, NDA, regolamento informatico e consegna degli asset."],
   ["Competenze e formazione","Profili di ruolo e matrice delle competenze."],
   ["Processo disciplinare","Rinvio al codice disciplinare del CCNL applicato."],
   ["Cambio di ruolo","Revisione degli accessi quando cambiano le mansioni."],
   ["Cessazione","Checklist di uscita, restituzione degli asset, chiusura degli account e promemoria degli obblighi residui."],
   ["Registrazioni","Elenco dei moduli usati e di dove vengono conservati."]],
  col:["Asset o accesso","Riconsegnato o disattivato","Data","Verificato da","Firma"],
  err:"Gestire le uscite a voce, senza una checklist firmata da mostrare all'auditor."},
 D09:{f:"Word, con una variante per il personale e una per i fornitori",a:"Firma dell'azienda e della risorsa",r:"Modello riesaminato ogni anno",
  str:[["Parti","Dati dell'azienda e della risorsa o del fornitore."],
   ["Informazioni riservate","Definizione chiara di cosa è riservato, con esempi."],
   ["Obblighi del ricevente","Uso limitato allo scopo, protezione e divieto di divulgazione."],
   ["Eccezioni","Informazioni già pubbliche o ordini delle autorità."],
   ["Durata","Validità degli obblighi anche dopo la fine del rapporto."],
   ["Restituzione e distruzione","Cosa fare con le informazioni alla cessazione."],
   ["Conseguenze della violazione","Responsabilità ed eventuali penali."],
   ["Legge applicabile, foro e firme","Indicazione della legge applicabile e del foro competente, seguita dalle firme."]],
  col:[],err:"Usare lo stesso testo per dipendenti e fornitori senza adattare durata e obblighi di restituzione."},
 D10:{f:"Word poi PDF, consegnato con firma per presa visione",a:"Direzione",r:"Ogni anno e quando cambiano strumenti o norme",
  str:[["Premessa e destinatari","A chi si applica e perché."],
   ["Dispositivi","Uso di dispositivi aziendali e personali."],
   ["Credenziali","Password, password manager e MFA."],
   ["Posta e internet","Uso consentito e comportamenti vietati."],
   ["Cloud e trasferimento dei file","Servizi ammessi e regole per condividere file."],
   ["Intelligenza artificiale","Strumenti autorizzati e dati che non vi si possono inserire."],
   ["Scrivania e schermo puliti","Regole per documenti e postazioni."],
   ["Supporti rimovibili","Chiavette e dischi esterni."],
   ["Lavoro da remoto","Regole fuori sede, con rinvio all'accordo di smart working."],
   ["Segnalazioni","Come e a chi segnalare un evento di sicurezza."],
   ["Controlli del datore di lavoro","Quali controlli sono possibili, nei limiti dell'art. 4 dello Statuto e con l'informativa."],
   ["Sanzioni","Rinvio al sistema disciplinare."],
   ["Presa visione","Spazio per la firma della risorsa."]],
  col:[],err:"Prevedere controlli sulle postazioni senza un'informativa adeguata ai lavoratori."},
 D11:{f:"Word con planimetria allegata",a:"Direzione",r:"Ogni anno e a ogni modifica dei locali",
  str:[["Sedi e aree","Planimetria con aree pubbliche, uffici e locali tecnici."],
   ["Perimetro e accessi","Porte, serrature, badge e chi possiede le chiavi."],
   ["Visitatori e fornitori","Registrazione e accompagnamento."],
   ["Allarmi e videosorveglianza","Impianti presenti e adempimenti collegati."],
   ["Antincendio e ambiente","Presidi e verifiche periodiche."],
   ["Apparecchiature","Collocazione, UPS e cablaggi."],
   ["Scrivania pulita e cartaceo","Custodia dei documenti."],
   ["Manutenzione e dismissione","Interventi e distruzione sicura."],
   ["Registrazioni","Registri tenuti e loro conservazione."]],
  col:["Data","Nome","Azienda","Motivo","Accompagnato da","Ingresso","Uscita"],
  err:"Descrivere misure fisiche che in sede non esistono, perché è la parte che l'auditor verifica a vista."},
 D12:{f:"Word, diviso in capitoli che richiamano i controlli",a:"Redatto dal responsabile IT, approvato dalla direzione",r:"Ogni anno e a ogni modifica dell'infrastruttura",
  str:[["Infrastruttura e rete","Schema di rete, firewall, segmentazione e accesso remoto (A.8.20, A.8.21, A.8.22)."],
   ["Accessi e identità","Assegnazione, riesame e revoca degli accessi, utenze privilegiate e MFA (da A.5.15 ad A.5.18, da A.8.2 ad A.8.5)."],
   ["Endpoint e malware","Configurazione dei dispositivi e protezione (A.8.1, A.8.7)."],
   ["Vulnerabilità e configurazioni","Patch con tempi definiti, baseline e software ammesso (A.8.8, A.8.9, A.8.19)."],
   ["Backup e ridondanza","Cosa si salva, dove, ogni quanto e come si testa il ripristino (A.8.13, A.8.14)."],
   ["Log e monitoraggio","Log attivati, conservazione, analisi e sincronizzazione degli orologi (da A.8.15 ad A.8.17)."],
   ["Crittografia","Dove si cifra e chi custodisce le chiavi (A.8.24)."],
   ["Filtraggio web e fuga di dati","Filtri e regole DLP (A.8.12, A.8.23)."],
   ["Cancellazione e mascheramento","Metodi e tempi (A.8.10, A.8.11)."],
   ["Servizi cloud","Servizi in uso e responsabilità condivise (A.5.23)."],
   ["Gestione dei cambiamenti","Richiesta, approvazione e registrazione delle modifiche (A.8.32)."],
   ["Procedure operative","Istruzioni per le attività ricorrenti (A.5.37)."]],
  col:[],err:"Scrivere regole generiche del tipo «i sistemi sono aggiornati» senza tempi, strumenti e responsabili."},
 D13:{f:"Excel per l'inventario, breve procedura in Word",a:"Responsabile del sistema",r:"A ogni acquisto o dismissione, verifica completa ogni anno",
  str:[["Regole","Chi aggiorna l'inventario e in quali occasioni."],
   ["Inventario","Foglio con le colonne indicate qui sotto."],
   ["Restituzione","Rinvio alla checklist di uscita."],
   ["Dismissione","Modalità di cancellazione o distruzione e verbale."]],
  col:["ID","Tipo","Descrizione","Proprietario","Ubicazione","Assegnatario","Classificazione","R / I / D","Licenza o contratto","Data di acquisto","Stato"],
  err:"Inventariare solo l'hardware, dimenticando dati e servizi cloud."},
 D14:{f:"Word con matrice di gestione",a:"Direzione",r:"Ogni anno",
  str:[["Livelli","Definizione di ogni livello con esempi concreti presi dall'azienda."],
   ["Chi classifica","Il proprietario dell'informazione e i criteri da usare."],
   ["Etichettatura","Come si segnalano i documenti riservati, su carta e in digitale."],
   ["Regole per livello","Matrice con le colonne indicate qui sotto."],
   ["Strumenti ammessi","Canali e servizi utilizzabili per ciascun livello."]],
  col:["Livello","Esempi","Chi può accedere","Archiviazione","Invio all'esterno","Stampa","Distruzione"],
  err:"Creare i livelli senza dire come si comportano le persone per ciascuno."},
 D15:{f:"Word per la procedura, Excel per il registro",a:"Direzione",r:"Ogni anno e dopo ogni incidente rilevante",
  str:[["Definizioni","Evento, incidente, violazione di dati personali e, per i soggetti NIS2, incidente significativo."],
   ["Ruoli e contatti","Chi gestisce, chi decide, contatti interni ed esterni."],
   ["Segnalazione","Canale e informazioni da riferire."],
   ["Classificazione","Criteri di gravità."],
   ["Risposta","Contenimento, eradicazione e ripristino."],
   ["Notifiche","Garante entro 72 ore e, per i soggetti NIS2, preallerta al CSIRT Italia entro 24 ore, notifica entro 72 ore e relazione finale entro un mese, oltre alle comunicazioni ai clienti."],
   ["Evidenze","Raccolta e conservazione con catena di custodia."],
   ["Chiusura","Analisi delle cause e lezioni apprese."],
   ["Registro","Foglio con le colonne indicate qui sotto."]],
  col:["ID","Data e ora","Segnalato da","Descrizione","Asset coinvolti","Classificazione","Dati personali","Notifiche","Azioni","Chiusura","Cause e lezioni apprese"],
  err:"Indicare i tempi di notifica senza stabilire chi decide se notificare."},
 D16:{f:"Word per la procedura, Excel per l'elenco, questionario in Word o modulo online",a:"Responsabile fornitori",r:"Rivalutazione ogni anno dei fornitori critici",
  str:[["Criteri di criticità","Quando un fornitore è rilevante per la sicurezza."],
   ["Valutazione iniziale","Questionario, certificazioni e verifiche prima della scelta."],
   ["Requisiti contrattuali","Clausole di sicurezza, notifica degli incidenti, audit e nomina ex art. 28."],
   ["Servizi cloud","Valutazione specifica e strategia di uscita."],
   ["Monitoraggio","Rivalutazione periodica e gestione dei disservizi."],
   ["Fine del rapporto","Restituzione dei dati e revoca degli accessi."]],
  col:["Fornitore","Servizio","Accesso a dati o sistemi","Nomina art. 28","Criticità","Certificazioni","Data valutazione","Esito","Prossima rivalutazione"],
  err:"Valutare i fornitori una sola volta all'ingresso senza mai rivalutarli."},
 D17:{f:"Word per il piano, Excel per la BIA, Google Form per i test",a:"Direzione",r:"Ogni anno, con almeno un test",
  str:[["Scopo e scenari","Eventi considerati, come ransomware, guasti o indisponibilità della sede."],
   ["Analisi di impatto (BIA)","Tabella con le colonne indicate qui sotto."],
   ["Dipendenze","Sistemi, fornitori e persone necessari per ogni processo."],
   ["Ruoli","Chi dichiara l'emergenza e chi coordina."],
   ["Strategie di ripristino","Soluzioni per rispettare RTO e RPO."],
   ["Sicurezza in emergenza","Controlli che restano attivi in modalità degradata."],
   ["Comunicazioni","Chi informa clienti, personale e autorità."],
   ["Test","Calendario delle prove ed esiti registrati con il modulo."]],
  col:["Processo","Responsabile","Impatto dell'interruzione","Tempo massimo tollerabile","RTO","RPO","Sistemi e fornitori","Soluzione di ripristino"],
  err:"Scrivere RTO e RPO senza aver mai provato un ripristino che li confermi."},
 D18:{f:"Excel per il registro, Word per informative e nomine",a:"Titolare del trattamento",r:"Ogni anno e a ogni nuovo trattamento",
  str:[["Registro dei trattamenti","Come titolare e, se l'azienda è fornitrice, anche come responsabile, con le colonne indicate qui sotto."],
   ["Informative","Candidati, dipendenti e collaboratori, fornitori, clienti."],
   ["Nomine ex art. 28","Una per ogni fornitore che tratta dati, firmata da entrambe le parti."],
   ["Nomina ricevuta","Atto con cui i clienti nominano l'azienda responsabile."],
   ["Designazioni del personale","Atti di designazione ex art. 29 GDPR e art. 2-quaterdecies del Codice, redatti come atto di nomina con le istruzioni."],
   ["DPO","Contratto e nomina, se previsto."],
   ["DPIA","Valutazioni d'impatto dove necessarie."],
   ["Violazioni","Procedura e registro dei data breach."]],
  col:["Trattamento","Finalità","Base giuridica","Interessati","Categorie di dati","Destinatari","Trasferimenti extra UE","Conservazione","Misure di sicurezza"],
  err:"Conservare nomine ex art. 28 firmate soltanto dall'azienda."},
 D19:{f:"Word, un accordo per ogni lavoratore",a:"Firma dell'azienda e del lavoratore",r:"Modello riesaminato ogni anno",
  str:[["Parti e durata","Accordo a termine o a tempo indeterminato."],
   ["Luogo e tempi","Giornate, fasce di reperibilità e diritto alla disconnessione."],
   ["Strumenti","Dispositivi assegnati e connessione."],
   ["Sicurezza delle informazioni","Rinvio al regolamento informatico e regole specifiche per il lavoro fuori sede."],
   ["Custodia","Documenti e dispositivi fuori sede."],
   ["Segnalazioni","Cosa fare in caso di furto o incidente."],
   ["Salute e sicurezza","Informativa sui rischi del lavoro agile."],
   ["Recesso e firme","Modalità di recesso e sottoscrizione."]],
  col:[],err:"Usare un accordo standard che non richiama le regole di sicurezza informatica."},
 D20:{f:"Excel per programma e checklist, Word per il report",a:"Responsabile del sistema",r:"Programma ogni anno",
  str:[["Programma","Periodo, aree, frequenza, auditor e criteri."],
   ["Piano del singolo audit","Date, persone da intervistare e documenti da esaminare."],
   ["Checklist","Una riga per requisito, con le colonne indicate qui sotto."],
   ["Report","Scope, metodo, campioni esaminati, rilievi classificati (non conformità maggiore, minore, osservazione, opportunità) e conclusione."]],
  col:["Requisito","Domanda","Evidenza esaminata","Esito","Note"],
  err:"Scrivere un report che non indica le evidenze esaminate, per cui gli esiti non sono verificabili."},
 D21:{f:"Word, firmato dai partecipanti",a:"Direzione",r:"Almeno ogni anno, dopo l'audit interno",
  str:[["Partecipanti e data","Elenco dei presenti e data della riunione."],
   ["Azioni precedenti","Stato delle decisioni del riesame precedente."],
   ["Modifiche","Cambiamenti di contesto e di esigenze delle parti interessate."],
   ["Prestazioni","Non conformità e azioni correttive, monitoraggi, risultati degli audit e degli obiettivi."],
   ["Riscontri","Segnalazioni e reclami delle parti interessate."],
   ["Rischi","Risultati della valutazione e stato del piano di trattamento."],
   ["Miglioramento","Opportunità individuate."],
   ["Decisioni","Miglioramenti, modifiche al sistema e risorse, con responsabili e scadenze."],
   ["Firme","Sottoscrizione della direzione."]],
  col:[],err:"Saltare uno degli input obbligatori, di solito i risultati della valutazione dei rischi."},
 D22:{f:"Excel",a:"Responsabile del sistema",r:"Aggiornato in continuo, analizzato nel riesame",
  str:[["Regole","Chi apre e chi chiude una non conformità e come si verifica l'efficacia."],
   ["Registro delle non conformità","Foglio con le colonne indicate qui sotto."],
   ["Registro dei miglioramenti","Miglioramenti attuati anche senza una non conformità."]],
  col:["ID","Data","Origine","Descrizione","Correzione","Analisi delle cause","Azione correttiva","Responsabile","Scadenza","Verifica di efficacia","Stato"],
  err:"Chiudere le non conformità con la sola correzione, senza analisi delle cause."},
 D23:{f:"Word per la procedura, Excel per l'elenco dei documenti",a:"Direzione",r:"Ogni anno",
  str:[["Gerarchia","Politiche, procedure, istruzioni e moduli."],
   ["Codifica e cartiglio","Regole per codici, revisioni e intestazione."],
   ["Redazione e approvazione","Chi scrive, chi verifica e chi approva."],
   ["Distribuzione e archiviazione","Dove si trovano i documenti e con quali permessi."],
   ["Modifiche","Come si aggiorna un documento e si traccia lo storico."],
   ["Documenti esterni","Norme e documenti di terzi tenuti sotto controllo."],
   ["Conservazione ed eliminazione","Tempi di conservazione delle registrazioni."],
   ["Elenco dei documenti in vigore","Foglio con le colonne indicate qui sotto."]],
  col:["Codice","Titolo","Revisione","Data","Responsabile","Dove si trova","Prossimo riesame"],
  err:"Tenere più versioni dello stesso documento senza indicare quale è in vigore."},
 D24:{f:"Excel",a:"Responsabile del sistema",r:"Ogni anno e a ogni nuova norma rilevante",
  str:[["Fonti monitorate","Dove e ogni quanto si controllano le novità normative."],
   ["Registro","Una riga per obbligo, con le colonne indicate qui sotto."],
   ["Obblighi contrattuali","Requisiti di sicurezza imposti dai clienti."]],
  col:["Norma","Articoli","Obbligo","Come si adempie","Responsabile","Ultima verifica","Esito"],
  err:"Elencare le norme senza indicare come l'azienda le rispetta."},
 D25:{f:"Excel per piano e registri, PDF per attestati",a:"Responsabile del sistema",r:"Piano ogni anno",
  str:[["Fabbisogno","Competenze da sviluppare per ruolo."],
   ["Piano annuale","Attività con le colonne indicate qui sotto."],
   ["Registri","Fogli presenza e attestati."],
   ["Simulazioni","Campagne di phishing e risultati."],
   ["Aggiornamento continuo","Newsletter e fonti seguite, con le iscrizioni attive."]],
  col:["Attività","Destinatari","Contenuti","Modalità","Docente","Data","Durata","Verifica dell'efficacia"],
  err:"Registrare le presenze senza verificare cosa le persone hanno appreso."},
 D26:{f:"Word",a:"Responsabile dello sviluppo",r:"Ogni anno",
  str:[["Ambito","Software sviluppato internamente o affidato all'esterno."],
   ["Requisiti di sicurezza","Come si definiscono e si approvano."],
   ["Progettazione","Principi di architettura sicura."],
   ["Codifica","Linee guida e controllo delle dipendenze."],
   ["Codice sorgente","Repository, accessi e revisione delle modifiche."],
   ["Test","Test di sicurezza e criteri di accettazione."],
   ["Ambienti e dati di test","Separazione e mascheramento."],
   ["Rilascio","Gestione dei cambiamenti in produzione."],
   ["Sviluppo esterno","Requisiti contrattuali e verifiche."]],
  col:[],err:"Scrivere la politica senza che il team di sviluppo la conosca o la applichi."},
 D27:{f:"Excel",a:"Responsabile del sistema o responsabile IT",r:"Aggiornato a ogni modifica",
  str:[["Regole","Quali modifiche passano dal registro e chi le approva."],
   ["Registro","Foglio con le colonne indicate qui sotto."]],
  col:["ID","Data richiesta","Richiedente","Descrizione","Tipo","Valutazione degli effetti","Approvato da","Data esecuzione","Piano di ritorno","Esito"],
  err:"Registrare la modifica solo dopo averla fatta, senza valutazione preventiva."}
};
D.forEach(d=>Object.assign(d,DS[d.id]||{}));
D.unshift({id:"D00",n:"Regole comuni a tutti i documenti",s:0,o:false,common:true,c:"",t:"",d:[]});

const COMMON = {
 levels:[["Politiche","Spiegano perché l'azienda protegge le informazioni e cosa si impegna a fare. Sono documenti brevi firmati dalla direzione."],
  ["Procedure","Stabiliscono chi fa cosa e quando, descrivendo un processo con le responsabilità e le registrazioni che produce."],
  ["Istruzioni operative","Descrivono passo per passo come si svolge un'attività tecnica precisa, come un ripristino da backup."],
  ["Moduli e registrazioni","Sono la prova che l'attività è stata svolta e diventano le evidenze dello Stage 2."]],
 header:["Codice","Titolo","Revisione","Data","Redatto da","Approvato da","Classificazione","Pagina x di y"],
 proc:[["Scopo","A cosa serve il documento, in due o tre righe."],
  ["Campo di applicazione","A quali attività, sedi e persone si applica."],
  ["Riferimenti","Punti norma e controlli dell'Allegato A attuati, oltre alle leggi collegate."],
  ["Termini e definizioni","Solo quelli necessari a capire il testo."],
  ["Responsabilità","Chi fa cosa, possibilmente in tabella."],
  ["Modalità operative","Il cuore del documento, scritto come sequenza di attività."],
  ["Registrazioni","Moduli e registri prodotti, con il luogo di conservazione e la durata."],
  ["Storico delle revisioni","Revisione, data, descrizione della modifica e approvazione."]],
 codes:[["POL","Politiche"],["PRO","Procedure"],["IO","Istruzioni operative"],["MOD","Moduli"],["REG","Registri"]]
};

/* --- estensioni 27017 e 27018 --- */
GROUPS["X17"]="Sicurezza nel cloud";
GROUPS["X18"]="Dati personali nel cloud";
const GLAB = {"X17":"27017","X18":"27018"};
const X = [];
function xi(id,code,t,o){ X.push(Object.assign({id,code,t,kind:"x",g:id.slice(0,3),m:false,n:false,x:[],l:[],d:[]},o)); }

xi("X17.0","27017","Cos'è la ISO/IEC 27017 e come si aggiunge alla 27001",{
 c:"La ISO/IEC 27017 integra i controlli della 27002 con indicazioni specifiche per i servizi cloud e distingue cosa deve fare il cliente che usa il cloud (CSC) da cosa deve fare il fornitore che lo eroga (CSP). La seconda edizione, pubblicata nel 2026, è allineata alla 27002:2022, sostituisce quella del 2015 e considera anche i partner del servizio cloud, come integratori e rivenditori.",
 p:"La 27017 non si certifica da sola e si aggiunge al certificato 27001 come estensione, verificata dall'ente nello stesso audit. Il lavoro consiste nel chiarire il proprio ruolo, aggiornare analisi dei rischi e SoA con i controlli cloud, integrare politiche e procedure con il differenziale indicato nelle schede dei controlli e adeguare i contratti.",
 e:"SoA estesa ai controlli cloud, matrice delle responsabilità condivise per ogni servizio e contratti con le clausole richieste.",
 err:"Dichiarare la 27017 senza chiarire se l'azienda opera come cliente, come fornitore o in entrambi i ruoli, perché i requisiti cambiano molto.",
 q:"Per questo servizio quali controlli sono a vostro carico e quali del fornitore, e dove è scritto?",
 d:["D28","D06"],l:["A.5.23","X17.5.38","X17.5.39","X17.8.35","X17.8.36","X17.R"],ref:"ISO/IEC 27017:2026"});
xi("X17.5.38","5.38","Ruoli e responsabilità condivisi nell'ambiente cloud",{
 c:"Le responsabilità per i ruoli di sicurezza condivisi tra cliente e fornitore sono assegnate a soggetti identificati, documentate, comunicate e attuate da entrambi.",
 csc:"Estende politiche e procedure in base ai servizi cloud che usa e rende gli utenti consapevoli del proprio ruolo.",
 csp:"Documenta e comunica le proprie capacità di sicurezza, i ruoli che assume e quelli che il cliente deve gestire, tenendo conto dei dati e delle applicazioni che custodisce.",
 e:"Matrice delle responsabilità condivise per ogni servizio, richiamata nel contratto.",
 err:"Affidarsi al modello di responsabilità condivisa pubblicato dal grande provider senza tradurlo in una matrice per i propri servizi e le proprie persone.",
 q:"Chi è responsabile dei backup di questo servizio, voi o il fornitore?",
 d:["D28"],l:["A.5.2","A.5.20","X17.5.39"],ref:"Edizione 2015: CLD.6.3.1"});
xi("X17.5.39","5.39","Accordi sui ruoli e le responsabilità del partner del servizio cloud",{
 c:"È un controllo nuovo della 2026. Quando nel servizio intervengono partner, come integratori, rivenditori o consulenti che configurano o gestiscono il cloud, i loro ruoli e responsabilità di sicurezza vanno concordati e documentati.",
 csc:"Individua i partner che operano sui propri servizi cloud, come il consulente che amministra il tenant di Microsoft 365, e formalizza con loro compiti, accessi e responsabilità.",
 csp:"Chiarisce nei rapporti con i partner che rivendono o gestiscono il servizio quali responsabilità restano al fornitore e quali passano al partner.",
 e:"Accordi con i partner che indicano ruoli, accessi e responsabilità.",
 err:"Dare a un consulente esterno l'accesso amministrativo al tenant senza alcun accordo scritto sui suoi compiti.",
 q:"Chi amministra il vostro tenant e quale accordo lo regola?",
 d:["D28","D16"],l:["A.5.20","A.5.21","A.8.2","X17.5.38"],ref:"Nuovo nell'edizione 2026"});
xi("X17.8.35","8.35","Segregazione negli ambienti di calcolo virtuali",{
 c:"L'ambiente virtuale di ogni cliente è protetto dagli altri clienti e dalle persone non autorizzate.",
 csc:"Verifica, con la documentazione o le certificazioni del fornitore, come viene garantito l'isolamento del proprio ambiente.",
 csp:"Separa logicamente dati, applicazioni, sistemi operativi, storage e rete tra i clienti e rispetto all'amministrazione interna, valutando anche i rischi del software eseguito dai clienti.",
 e:"Descrizione dell'architettura di isolamento e risultati di test o audit indipendenti.",
 err:"Dare per scontato l'isolamento tra clienti senza alcuna evidenza da mostrare.",
 q:"Come dimostrate che un cliente non può accedere ai dati di un altro?",
 d:["D12","D28"],l:["A.8.22","A.8.31","X18.14"],ref:"Edizione 2015: CLD.9.5.1"});
xi("X17.8.36","8.36","Rilevamento e prevenzione dell'uso non autorizzato dei servizi cloud",{
 c:"È un controllo nuovo della 2026, dedicato a individuare e prevenire l'uso non autorizzato dei servizi cloud.",
 csc:"Individua i servizi cloud usati senza autorizzazione (account personali, strumenti di intelligenza artificiale non approvati, condivisioni esterne) e gli usi anomali di quelli autorizzati.",
 csp:"Mette a disposizione strumenti per rilevare usi abusivi o anomali del servizio, come account compromessi o uso della piattaforma per attacchi.",
 e:"Elenco dei servizi cloud autorizzati, strumenti di rilevamento attivi e alert gestiti.",
 err:"Autorizzare alcuni servizi cloud senza controllare se il personale ne usa altri.",
 q:"Come scoprireste che un reparto usa un servizio cloud non autorizzato?",
 d:["D12","D10"],l:["A.5.23","A.8.12","A.8.16"],ref:"Nuovo nell'edizione 2026"});
xi("X17.R","2015","Controlli della 2015 confluiti nei controlli 27002",{
 c:"Nella 2026 i controlli cloud autonomi scendono da sette a quattro. Restituzione degli asset del cliente, hardening delle macchine virtuali, sicurezza delle operazioni amministrative, monitoraggio dei servizi cloud e allineamento tra reti virtuali e fisiche non sono più controlli a sé e si gestiscono nella guida estesa ai controlli 27002 corrispondenti.",
 p:"In questo navigatore ogni tema compare nella sezione «Differenziale 27017» del controllo dell'Allegato A più affine. Per la collocazione esatta fa fede la tabella di corrispondenza tra le due edizioni contenuta nella 27017:2026.",
 e:"Nella SoA e nei documenti i riferimenti CLD della 2015 vanno sostituiti con quelli della 2026.",
 err:"Lasciare nella SoA i codici CLD.12.4.5 o CLD.9.5.2 dopo il passaggio alla nuova edizione.",
 d:["D06"],l:["A.5.11","A.5.37","A.8.9","A.8.16","A.8.20"],ref:"CLD.8.1.5, CLD.9.5.2, CLD.12.1.5, CLD.12.4.5, CLD.13.1.4"});

xi("X18.0","27018","Cos'è la ISO/IEC 27018 e a chi si applica",{
 c:"La ISO/IEC 27018 aggiunge controlli e indicazioni per proteggere i dati personali nel cloud pubblico quando il fornitore li tratta come responsabile per conto dei clienti. La terza edizione è del 2025, è allineata alla 27002:2022 e ai principi privacy della ISO/IEC 29100 e mantiene i 25 controlli aggiuntivi dell'edizione precedente.",
 p:"Interessa i fornitori SaaS, PaaS e IaaS che ospitano dati personali dei clienti. Come la 27017 non si certifica da sola e si aggiunge al certificato 27001, estendendo la SoA con i controlli dell'Allegato A. Sul piano giuridico è una prova utile del rispetto degli obblighi del responsabile ex art. 28 GDPR, anche se non costituisce una certificazione ai sensi dell'art. 42.",
 cli:"Il cliente che sceglie un fornitore certificato 27018 deve comunque verificare che le misure bastino ai propri obblighi di titolare, perché la responsabilità verso il Garante e gli interessati resta sua.",
 e:"SoA estesa ai controlli 27018, contratto e DPA allineati ai controlli, registri delle divulgazioni, dei ripristini e degli utenti autorizzati.",
 err:"Puntare sulla 27018 quando l'azienda tratta i dati come titolare, caso per cui è più adatta la ISO/IEC 27701.",
 q:"In quali paesi possono trovarsi i dati dei vostri clienti, compresi quelli trattati dai sub-responsabili?",
 d:["D29","D18","D06"],l:["A.5.34","X18.5","X18.6","X18.8","X18.15"],x:["GDPR art. 28","GDPR art. 42"],
 ref:"Qui i controlli sono raggruppati per tema con il codice dell'edizione 2019. La corrispondenza con la numerazione 2025 è nell'Allegato B della norma."});
xi("X18.1","P01","Collaborazione per i diritti degli interessati",{
 c:"Il fornitore mette a disposizione del cliente gli strumenti per gestire le richieste di accesso, rettifica e cancellazione degli interessati.",
 p:"Il contratto descrive le funzioni e le informazioni che il fornitore offre, come l'esportazione o la cancellazione dei dati di un singolo interessato.",
 cli:"Verificare prima del contratto di poter rispondere alle richieste degli interessati con le funzioni del servizio.",
 e:"Funzioni documentate e clausola contrattuale corrispondente.",
 d:["D29"],l:["A.5.34"],x:["GDPR artt. 15-22","GDPR art. 28.3 lett. e"],ref:"Edizione 2019: A.2.1"});
xi("X18.2","P02","Finalità del trattamento e divieto di uso commerciale",{
 c:"I dati trattati per conto del cliente si usano solo secondo le sue istruzioni e non per marketing o pubblicità senza consenso esplicito, che non può essere una condizione per ricevere il servizio.",
 p:"Le istruzioni del cliente stanno nel contratto e il fornitore dimostra che nessun dato viene usato per finalità proprie, una verifica oggi rilevante anche per l'addestramento di modelli di intelligenza artificiale.",
 cli:"Controllare nel contratto e nelle condizioni d'uso che il fornitore non si riservi usi ulteriori dei dati.",
 e:"Clausole sulle istruzioni e sul divieto di uso commerciale.",
 d:["D29"],l:["A.5.34","A.5.20"],x:["GDPR art. 28.3 lett. a","GDPR art. 28.10"],ref:"Edizione 2019: A.3.1 e A.3.2"});
xi("X18.3","P03","Cancellazione dei file temporanei",{
 c:"I file e i documenti temporanei vengono cancellati o distrutti entro un periodo stabilito e documentato.",
 p:"Si attiva una pulizia periodica, possibilmente automatica, dei file temporanei non più necessari.",
 cli:"Chiedere quali dati temporanei genera il servizio e in quanto tempo vengono eliminati.",
 e:"Configurazione della pulizia periodica e periodo documentato.",
 d:["D12"],l:["A.8.10"],x:["GDPR art. 5.1 lett. c ed e"],ref:"Edizione 2019: A.5.1"});
xi("X18.4","P04","Richieste delle autorità e registro delle divulgazioni",{
 c:"Il fornitore avvisa il cliente delle richieste vincolanti di accesso ai dati da parte delle autorità, salvo divieto di legge, rifiuta quelle non vincolanti e registra ogni comunicazione di dati a terzi indicando quali dati, a chi e quando.",
 p:"Si preparano una procedura per le richieste delle autorità e un registro delle divulgazioni con la fonte e la base della richiesta.",
 cli:"Verificare la clausola sulle richieste delle autorità, rilevante soprattutto con fornitori soggetti a giurisdizioni extra UE.",
 e:"Procedura e registro delle divulgazioni.",
 d:["D29"],l:["A.5.5","A.5.31"],x:["GDPR art. 48"],ref:"Edizione 2019: A.6.1 e A.6.2"});
xi("X18.5","P05","Sub-responsabili",{
 c:"Il ricorso a sub-responsabili è comunicato al cliente prima dell'uso, con nomi, paesi e modo in cui sono vincolati, e i contratti con loro prevedono misure minime che non possono ridurre da soli.",
 p:"Si pubblica o si rende disponibile su richiesta l'elenco dei sub-responsabili e si avvisano i clienti di ogni modifica.",
 cli:"Ottenere l'elenco dei sub-responsabili e il diritto di opporsi alle modifiche.",
 e:"Elenco dei sub-responsabili, avvisi di modifica e contratti con obblighi equivalenti.",
 d:["D29","D16"],l:["A.5.20","A.5.21"],x:["GDPR art. 28.2 e 28.4"],ref:"Edizione 2019: A.8.1 e A.11.12"});
xi("X18.6","P06","Notifica delle violazioni di dati personali",{
 c:"Il fornitore avvisa prontamente il cliente di ogni accesso non autorizzato ai dati personali o alle apparecchiature che ne comporti perdita, divulgazione o alterazione.",
 p:"Il contratto fissa il ritardo massimo di notifica e le informazioni da fornire. Il registro delle violazioni riporta descrizione, periodo, conseguenze, chi ha segnalato e a chi, misure adottate, dati coinvolti e notifiche effettuate.",
 cli:"Verificare che il ritardo previsto dal contratto lasci il tempo di notificare al Garante entro 72 ore.",
 e:"Clausola con i tempi di notifica e registro delle violazioni.",
 d:["D29","D15"],l:["A.5.24","A.5.26"],x:["GDPR artt. 33-34","GDPR art. 28.3 lett. f"],ref:"Edizione 2019: A.10.1"});
xi("X18.7","P07","Conservazione delle politiche superate",{
 c:"Le copie delle politiche e delle procedure di sicurezza sostituite si conservano per un periodo stabilito e documentato.",
 p:"In assenza di altri obblighi la norma suggerisce almeno cinque anni, gestiti nell'archivio delle versioni superate.",
 e:"Archivio delle versioni superate con il periodo di conservazione.",
 d:["D23"],l:["A.5.33","7.5.3"],ref:"Edizione 2019: A.10.2"});
xi("X18.8","P08","Restituzione, trasferimento e cancellazione dei dati",{
 c:"Il fornitore ha una politica, nota al cliente, per restituire, trasferire o cancellare i dati personali anche presso i sub-responsabili e nei backup, con tempi definiti dopo la fine del contratto.",
 p:"Il contratto indica i formati di restituzione, i metodi di cancellazione e il periodo di conservazione prima della distruzione.",
 cli:"Pianificare l'uscita dal servizio verificando formati di esportazione e tempi di cancellazione.",
 e:"Politica di fine contratto e verbali di cancellazione.",
 d:["D29"],l:["A.5.11","A.8.10","X17.R"],x:["GDPR art. 28.3 lett. g"],ref:"Edizione 2019: A.10.3"});
xi("X18.9","P09","Riservatezza e documenti cartacei",{
 c:"Chi accede ai dati personali è vincolato alla riservatezza anche dopo la fine del rapporto, la stampa di documenti con dati personali è limitata e il materiale cartaceo si distrugge in modo sicuro.",
 p:"Gli accordi di riservatezza richiamano il divieto di usare i dati per scopi diversi dalle istruzioni del cliente e il regolamento interno limita le stampe.",
 e:"NDA firmati, regole sulle stampe e certificati di distruzione.",
 d:["D09","D10"],l:["A.6.6","A.7.7","A.7.14"],x:["GDPR art. 28.3 lett. b"],ref:"Edizione 2019: A.11.1, A.11.2 e A.11.7"});
xi("X18.10","P10","Registro dei ripristini",{
 c:"Esiste una procedura per il ripristino dei dati e ogni ripristino viene registrato con il responsabile e la descrizione dei dati ripristinati, compresi quelli ripristinati a mano.",
 p:"Al registro dei backup si aggiunge una sezione dedicata ai ripristini.",
 e:"Procedura e registro dei ripristini.",
 d:["D12"],l:["A.8.13"],ref:"Edizione 2019: A.11.3"});
xi("X18.11","P11","Supporti, dispositivi portatili e cifratura in transito",{
 c:"I supporti con dati personali che escono dalla sede richiedono autorizzazione e protezione, i supporti portatili non cifrati si usano solo se inevitabile documentandone l'uso, e i dati che viaggiano su reti pubbliche sono cifrati.",
 p:"Le regole si inseriscono nel regolamento informatico e nel documento dei controlli informatici.",
 e:"Autorizzazioni per i supporti, eccezioni documentate e configurazioni di cifratura.",
 d:["D10","D12"],l:["A.7.10","A.8.24"],x:["GDPR art. 32"],ref:"Edizione 2019: A.11.4, A.11.5 e A.11.6"});
xi("X18.12","P12","Utenze personali e registro degli utenti autorizzati",{
 c:"Ogni persona che accede ai dati ha un'utenza personale, si mantiene un registro aggiornato degli utenti autorizzati e le utenze disattivate non vengono riassegnate ad altri.",
 p:"Il registro degli utenti coincide con l'elenco delle utenze del controllo sulla gestione delle identità, con il divieto di riuso esplicitato.",
 e:"Registro degli utenti autorizzati e regole di gestione delle utenze.",
 d:["D12"],l:["A.5.16","A.5.18"],ref:"Edizione 2019: A.11.8, A.11.9 e A.11.10"});
xi("X18.13","P13","Misure contrattuali minime",{
 c:"Il contratto con il cliente indica le misure tecniche e organizzative minime, che il fornitore non può ridurre da solo, e prima del contratto il fornitore informa il cliente sugli aspetti del servizio rilevanti per la protezione dei dati.",
 p:"Le misure si allegano al DPA, richiamando i controlli 27001 e 27018 applicati.",
 cli:"Resta compito del cliente verificare che le misure bastino a rispettare i propri obblighi.",
 e:"Allegato delle misure al DPA.",
 d:["D29"],l:["A.5.20"],x:["GDPR art. 28.3 lett. c","GDPR art. 32"],ref:"Edizione 2019: A.11.11"});
xi("X18.14","P14","Spazio di archiviazione già utilizzato",{
 c:"Quando a un cliente viene assegnato spazio di archiviazione, i dati che vi risiedevano prima non devono essergli visibili.",
 p:"Si usano misure come l'azzeramento o la sovrascrittura dello spazio prima della riassegnazione.",
 e:"Descrizione tecnica della misura adottata.",
 d:["D12"],l:["A.8.10","X17.8.35"],ref:"Edizione 2019: A.11.13"});
xi("X18.15","P15","Localizzazione e destinazione dei dati",{
 c:"Il fornitore indica e documenta i paesi in cui i dati possono essere conservati, compresi quelli dei sub-responsabili e gli strumenti usati per i trasferimenti internazionali, e i dati trasmessi in rete raggiungono la destinazione prevista.",
 p:"L'elenco dei paesi è disponibile per i clienti e si aggiorna tempestivamente a ogni modifica.",
 cli:"Verificare paesi e garanzie per i trasferimenti fuori dal SEE, come clausole contrattuali standard, norme vincolanti d'impresa o decisioni di adeguatezza.",
 e:"Elenco dei paesi con le garanzie per i trasferimenti.",
 d:["D29"],l:["A.5.5","A.5.31"],x:["GDPR artt. 44-49"],ref:"Edizione 2019: A.12.1 e A.12.2"});

/* differenziale sui controlli dell'Allegato A */
["X17.0","X17.R","X18.0"].forEach(id=>{ const x=X.find(z=>z.id===id); if(x) x.guide=true; });
X.find(x=>x.id==="X17.0").l.push("X18.0"); X.find(x=>x.id==="X18.0").l.unshift("X17.0");
const DIFF = {
 "A.5.1":{csc:"Aggiunge una politica sull'uso del cloud che consideri dove stanno i dati, chi vi accede dal lato del fornitore, la condivisione dell'infrastruttura con altri clienti, gli amministratori con privilegi e i paesi in cui i dati possono essere conservati.",
  csp:"Integra la politica con i requisiti di sicurezza dei servizi, i rischi legati al personale interno, l'isolamento tra clienti e la virtualizzazione, l'accesso del personale ai dati dei clienti e le comunicazioni su cambiamenti e violazioni.",
  c18:"La politica contiene l'impegno a rispettare la normativa sui dati personali e i contratti, che ripartiscono le responsabilità tra fornitore, sub-responsabili e clienti."},
 "A.5.2":{csc:"Concorda con il fornitore la ripartizione dei ruoli di sicurezza e individua il contatto con il suo supporto.",csp:"Documenta la ripartizione dei ruoli con clienti, altri fornitori cloud e fornitori.",
  c18:"Il fornitore designa un punto di contatto per i clienti sul trattamento dei dati personali.",l17:["X17.5.38"]},
 "A.5.5":{csc:"Individua le autorità competenti tenendo conto anche della giurisdizione del fornitore.",csp:"Comunica ai clienti i paesi in cui possono essere conservati i loro dati.",l17:["X18.15"]},
 "A.5.9":{csc:"L'inventario comprende le informazioni conservate in cloud e il servizio in cui si trovano.",csp:"L'inventario distingue i dati forniti dai clienti dai dati derivati dal servizio, come log e statistiche d'uso."},
 "A.5.11":{csc:"Ottiene dal fornitore la descrizione del processo di fine contratto, con l'elenco degli asset da restituire, la cancellazione di tutte le copie e i tempi.",csp:"Indica nel contratto quali asset restituisce e rimuove e con quali tempi.",
  n17:"Nella 2015 era il controllo autonomo CLD.8.1.5.",l17:["X17.R","X18.8"]},
 "A.5.13":{csc:"Etichetta le informazioni anche nell'ambiente cloud, usando dove possibile le funzioni del fornitore.",csp:"Documenta le funzioni di classificazione ed etichettatura offerte ai clienti."},
 "A.5.14":{c18:"Quando i dati personali viaggiano su supporti fisici si tiene un registro con tipo di supporto, mittente e destinatario autorizzati, data e numero di supporti e, dove possibile, si cifrano."},
 "A.5.15":{csc:"La politica degli accessi indica i requisiti per ciascun servizio cloud usato."},
 "A.5.16":{csp:"Fornisce ai clienti funzioni di registrazione e cancellazione degli utenti, con le istruzioni d'uso.",
  c18:"Le procedure di registrazione considerano il caso di credenziali compromesse e il cliente può gestire gli accessi dei propri utenti.",l17:["X18.12"]},
 "A.5.17":{csc:"Verifica che le procedure del fornitore sulle credenziali soddisfino i propri requisiti.",csp:"Informa i clienti sulle procedure di gestione delle credenziali."},
 "A.5.18":{csp:"Fornisce funzioni per gestire i diritti di accesso degli utenti del cliente, preferibilmente compatibili con sistemi esterni di gestione delle identità come il single sign-on."},
 "A.5.19":{csc:"Inserisce il fornitore cloud come categoria nella politica sui fornitori."},
 "A.5.20":{csc:"Verifica che il contratto ripartisca malware, backup, crittografia, vulnerabilità, incidenti, test, audit, log, autenticazione e restituzione dei dati.",csp:"Indica nel contratto le misure di sicurezza che attua, che variano con il tipo di servizio.",
  c18:"Il contratto fissa misure minime che il fornitore non può ridurre da solo.",l17:["X17.5.38","X17.5.39","X18.13"]},
 "A.5.21":{csp:"Quando il servizio si appoggia su altri fornitori cloud, il livello di sicurezza verso i clienti resta almeno uguale e gli obiettivi di sicurezza vengono trasmessi lungo la filiera.",l17:["X18.5"]},
 "A.5.23":{n17:"La 27017 sviluppa in dettaglio questo controllo per clienti e fornitori: la panoramica spiega come aggiungerla al sistema.",l17:["X17.0","X17.8.36"]},
 "A.5.24":{csc:"Verifica come sono ripartite con il fornitore le responsabilità sugli incidenti.",csp:"Indica nel contratto quali incidenti notifica, con quali tempi, procedure e contatti.",
  c18:"Ogni incidente di sicurezza porta a valutare se si è verificata una violazione di dati personali.",l17:["X18.6"]},
 "A.5.28":{csc:"Concorda con il fornitore come rispondere alle richieste di evidenze digitali presenti nell'ambiente cloud.",csp:"Concorda con il cliente le stesse procedure."},
 "A.5.31":{csc:"Considera anche le leggi della giurisdizione del fornitore. La responsabilità della conformità resta del cliente e non si trasferisce al fornitore.",csp:"Informa i clienti sulle giurisdizioni che regolano il servizio, dà evidenza della propria conformità e descrive i controlli crittografici per le verifiche sulle norme in materia."},
 "A.5.32":{csc:"Verifica che le licenze software consentano l'uso in cloud, soprattutto dove il servizio scala su più core o sistemi.",csp:"Prevede un processo per gestire i reclami sulla proprietà intellettuale."},
 "A.5.33":{csc:"Chiede al fornitore come protegge le registrazioni legate all'uso del servizio.",csp:"Fornisce queste informazioni ai clienti.",
  c18:"Le versioni superate di politiche e procedure di sicurezza si conservano per un periodo definito, indicativamente almeno cinque anni.",l17:["X18.7"]},
 "A.5.34":{n18:"La 27018 sviluppa questo controllo per il fornitore di cloud pubblico che tratta dati personali come responsabile: la panoramica spiega quando si applica.",l17:["X18.0"]},
 "A.5.35":{csc:"Chiede evidenze indipendenti, come le certificazioni, che i controlli corrispondano a quanto dichiarato dal fornitore.",csp:"Se gli audit dei singoli clienti non sono praticabili, fornisce prima del contratto evidenze indipendenti o, in mancanza, i risultati di un'autovalutazione.",
  c18:"Le evidenze indipendenti sono disponibili ai potenziali clienti prima del contratto e per tutta la sua durata."},
 "A.5.37":{csc:"Documenta le operazioni amministrative critiche in cui un errore può causare danni irreparabili, come creare o cancellare server, reti e storage virtuali, chiudere il servizio o eseguire backup e ripristini, e prevede che un supervisore le controlli.",csp:"Fornisce ai clienti la documentazione sulle operazioni critiche e sulle relative procedure.",
  n17:"Nella 2015 era il controllo autonomo CLD.12.1.5.",l17:["X17.R"]},
 "A.6.3":{csc:"Aggiunge alla formazione l'uso dei servizi cloud, i rischi specifici e gli aspetti legali, coinvolgendo anche la direzione.",csp:"Forma il personale sulla gestione dei dati dei clienti e dei dati derivati dal servizio.",
  c18:"Il personale conosce le conseguenze di una violazione delle regole privacy per l'azienda, per sé stesso e per gli interessati."},
 "A.6.6":{c18:"Chi accede ai dati personali è vincolato alla riservatezza anche dopo la fine del rapporto.",l17:["X18.9"]},
 "A.6.8":{csc:"Chiede al fornitore i canali per segnalargli eventi, ricevere le sue segnalazioni e seguirne lo stato.",csp:"Mette a disposizione questi canali, con contatti e orari del servizio."},
 "A.7.10":{c18:"I supporti con dati personali che escono dalla sede richiedono autorizzazione e protezione, e quelli non cifrati si usano solo se inevitabile documentandone l'uso.",l17:["X18.11"]},
 "A.7.14":{csc:"Ottiene conferma che il fornitore abbia procedure per la dismissione sicura di apparecchiature e supporti.",csp:"Assicura la dismissione o il riutilizzo sicuro e tempestivo di apparecchiature, storage, file e memoria.",
  c18:"I supporti che potrebbero contenere dati personali si trattano come se li contenessero."},
 "A.8.2":{csc:"Usa l'autenticazione a più fattori per gli amministratori del servizio cloud.",csp:"Offre autenticazione forte per gli accessi amministrativi, anche con MFA di terze parti.",l17:["X17.5.39"]},
 "A.8.3":{csc:"Verifica di poter limitare l'accesso a servizi, funzioni e dati secondo la propria politica.",csp:"Fornisce controlli con cui il cliente limita gli accessi, con attenzione alle console amministrative e alle funzioni dell'hypervisor."},
 "A.8.5":{c18:"Il fornitore offre procedure di accesso sicuro per gli account che il cliente richiede per i propri utenti."},
 "A.8.6":{csc:"Verifica che la capacità concordata basti e monitora l'uso per prevedere i bisogni, tenendo conto dei limiti del proprio abbonamento.",csp:"Monitora la capacità complessiva per evitare incidenti dovuti a carenza di risorse."},
 "A.8.8":{csc:"Chiede al fornitore come gestisce le vulnerabilità e stabilisce quali sono di propria competenza.",csp:"Informa i clienti sulle vulnerabilità che possono avere effetto sui servizi."},
 "A.8.9":{csc:"Configura in modo sicuro le macchine virtuali che gestisce, lasciando attivi solo porte, protocolli e servizi necessari, con antimalware e log.",csp:"Applica lo stesso hardening alle macchine virtuali sotto la propria gestione.",
  n17:"Nella 2015 era il controllo autonomo CLD.9.5.2.",l17:["X17.R"]},
 "A.8.10":{c18:"I file temporanei si cancellano entro un periodo stabilito e lo spazio riassegnato a un cliente non deve mostrare i dati precedenti.",l17:["X18.3","X18.14"]},
 "A.8.11":{c18:"Quando l'uso di dati personali reali nei test non si può evitare, si valuta il rischio e si adottano misure per ridurlo."},
 "A.8.13":{csc:"Se il fornitore offre il backup ne chiede le specifiche e le verifica. Se non lo offre, il backup è a carico del cliente, come accade spesso negli IaaS.",csp:"Descrive ambito, frequenza, formati, cifratura, conservazione, verifiche di integrità, tempi e test di ripristino e ubicazione dei backup, con accesso sicuro e separato per ogni cliente.",
  c18:"Si mantengono più copie in luoghi diversi, la politica di backup prevede la cancellazione dei dati personali dai backup quando non servono più e i ripristini vengono registrati.",l17:["X18.10"]},
 "A.8.15":{csc:"Definisce i requisiti di log e verifica che il servizio li soddisfi, registrando anche le operazioni privilegiate delegate al cliente. Negli IaaS i log di macchine virtuali e applicazioni sono a carico del cliente.",csp:"Fornisce ai clienti capacità di logging.",
  c18:"I log si riesaminano con periodicità definita, registrano dove possibile chi ha modificato dati personali, si usano solo per le finalità previste e si cancellano dopo un periodo stabilito. Il cliente vede solo i log delle proprie attività."},
 "A.8.16":{csc:"Chiede quali capacità di monitoraggio offre ogni servizio.",csp:"Permette ai clienti di monitorare il proprio servizio, ad esempio per capire se viene usato per attacchi o se ci sono fughe di dati, limitando il monitoraggio alle istanze del singolo cliente.",
  n17:"Nella 2015 era il controllo autonomo CLD.12.4.5. Si collega al nuovo controllo 8.36 sull'uso non autorizzato dei servizi cloud.",l17:["X17.8.36","X17.R"]},
 "A.8.17":{csc:"Chiede quale riferimento orario usa il fornitore.",csp:"Spiega ai clienti come sincronizzare i propri orologi con quello del servizio."},
 "A.8.18":{csc:"Verifica che le utility usate non interferiscano con i controlli del servizio.",csp:"Limita al personale autorizzato le utility capaci di aggirare i controlli e ne riesamina l'uso."},
 "A.8.20":{csp:"Configura le reti virtuali in modo coerente con la politica di sicurezza delle reti fisiche, qualunque sia lo strumento usato per crearle.",
  n17:"Nella 2015 era il controllo autonomo CLD.13.1.4.",l17:["X17.R"]},
 "A.8.22":{csc:"Definisce i requisiti di isolamento dagli altri clienti e verifica che il fornitore li soddisfi.",csp:"Separa la rete dei clienti tra loro e dall'ambiente di amministrazione interna e, dove opportuno, aiuta il cliente a verificarlo.",l17:["X17.8.35"]},
 "A.8.24":{csc:"Applica la crittografia dove l'analisi dei rischi lo giustifica, verifica che le funzioni del fornitore coprano i dati a riposo e in transito, censisce le chiavi per servizio e non affida al fornitore le chiavi gestite con un sistema proprio.",csp:"Informa i clienti su quando usa la crittografia e su quali funzioni crittografiche mette a loro disposizione.",
  c18:"I dati personali che viaggiano su reti pubbliche vanno cifrati.",l17:["X18.11"]},
 "A.8.25":{csc:"Chiede al fornitore informazioni sulle sue pratiche di sviluppo sicuro, che pesano soprattutto nei servizi SaaS.",csp:"Fornisce queste informazioni nei limiti della propria politica di divulgazione."},
 "A.8.26":{csc:"Definisce i requisiti di sicurezza per ogni servizio cloud e verifica se il fornitore li soddisfa.",csp:"Descrive le proprie capacità di sicurezza senza dettagli utili agli attaccanti, riservando quelli più tecnici ai clienti sotto NDA."},
 "A.8.32":{csc:"La gestione dei cambiamenti considera anche le modifiche fatte dal fornitore.",csp:"Comunica ai clienti i cambiamenti che possono avere effetti negativi, con categoria, data, descrizione tecnica e avviso di inizio e fine."},
 "A.8.33":{c18:"Se non si può evitare di usare dati personali nei test, si valuta il rischio e si adottano misure per ridurlo."}
};
Object.entries(DIFF).forEach(([id,o])=>{ const a=A.find(z=>z.id===id); if(a) Object.assign(a,o); });

D.push(
 {id:"D28",n:"Matrice delle responsabilità condivise cloud (27017)",s:1,o:false,
  c:"Per ogni servizio cloud usato o erogato indica chi è responsabile di ciascun aspetto della sicurezza tra cliente, fornitore ed eventuali partner.",
  t:"Parti dal modello di responsabilità condivisa del provider e adattalo al modello di servizio (IaaS, PaaS o SaaS) e alle persone dell'azienda.",
  f:"Excel",a:"Responsabile del sistema",r:"A ogni nuovo servizio cloud e ogni anno",
  str:[["Servizi in perimetro","Elenco dei servizi cloud con il modello (IaaS, PaaS o SaaS) e il ruolo dell'azienda, cliente o fornitore."],
   ["Matrice","Una riga per area di controllo con le colonne indicate qui sotto."],
   ["Partner","Integratori, rivenditori o consulenti che operano sul servizio e i loro compiti (controllo 5.39 della 27017)."],
   ["Riferimenti contrattuali","Clausole del contratto che confermano la ripartizione."]],
  col:["Area di controllo","Controllo 27001 o 27017","Cliente","Fornitore","Partner","Evidenza","Clausola del contratto"],
  err:"Copiare la matrice del provider senza indicare chi, in azienda, svolge i compiti a carico del cliente."},
 {id:"D29",n:"Contratto cloud e DPA del fornitore (27017 e 27018)",s:1,o:false,
  c:"Clausole che il contratto e l'accordo ex art. 28 GDPR tra fornitore cloud e cliente devono contenere per soddisfare la 27017 e la 27018.",
  t:"Usa la stessa struttura sia quando l'azienda è fornitrice sia quando valuta il contratto di un provider: diventa la checklist di verifica.",
  f:"Word",a:"Legale rappresentante, con la firma di entrambe le parti",r:"Modello riesaminato ogni anno e a ogni rinnovo",
  str:[["Ruoli e responsabilità","Ripartizione dei compiti di sicurezza e punto di contatto per i dati personali."],
   ["Istruzioni e finalità","Trattamento solo su istruzione del cliente e divieto di uso commerciale senza consenso."],
   ["Misure di sicurezza","Allegato con le misure minime, non riducibili unilateralmente."],
   ["Sub-responsabili","Elenco, paesi, obblighi equivalenti e preavviso delle modifiche."],
   ["Localizzazione e trasferimenti","Paesi di conservazione e garanzie per i trasferimenti fuori dal SEE."],
   ["Incidenti e violazioni","Ritardo massimo di notifica, contenuto della notifica e contatti."],
   ["Richieste delle autorità","Avviso al cliente, rifiuto delle richieste non vincolanti e registro delle divulgazioni."],
   ["Diritti degli interessati","Funzioni e collaborazione per rispondere alle richieste."],
   ["Backup, log e monitoraggio","Specifiche dei backup, accesso ai log e capacità di monitoraggio."],
   ["Audit ed evidenze","Certificazioni e audit indipendenti disponibili."],
   ["Fine del contratto","Restituzione, trasferimento e cancellazione dei dati, compresi i backup, con i tempi."]],
  col:[],err:"Accettare le condizioni standard del provider senza verificare tempi di notifica delle violazioni e localizzazione dei dati."}
);

/* --- obblighi di legge collegati --- */
GROUPS["L"]="Obblighi di legge collegati";
GLAB["L"]="§";
const L = [
{
"id": "L00",
"code": "ENTE",
"t": "Cosa chiede l'ente sugli obblighi di legge",
"guide": true,
"ref": "",
"c": "Raccolta in un'unica lista dei documenti che l'ente di certificazione chiede per gli obblighi di legge, divisi tra Stage 1 e Stage 2.",
"d": [
"D24"
],
"l": [
"4.2",
"A.5.31",
"A.5.34"
],
"x": [],
"e": ""
},
{
"id": "L01",
"code": "GDPR",
"t": "Protezione dei dati personali",
"ref": "Reg. UE 2016/679 e D.Lgs. 196/2003",
"ap": "Si applica a tutte le organizzazioni che trattano dati personali di dipendenti, clienti o fornitori, quindi in pratica a tutte.",
"c": "Il titolare deve poter dimostrare di trattare i dati in modo lecito e sicuro. Servono il registro delle attività di trattamento, le informative agli interessati, gli atti di nomina dei responsabili esterni e di designazione delle persone autorizzate, la gestione delle violazioni di dati e, dove ricorrono i presupposti, la nomina del DPO e la valutazione d'impatto.",
"e": "Già in Stage 1 l'ente chiede il registro dei trattamenti, le informative per candidati, dipendenti e collaboratori, clienti e fornitori, le nomine ex art. 28 firmate da entrambe le parti, la nomina della società come responsabile quando tratta dati per conto dei clienti e, se previsto, contratto e nomina del DPO. In Stage 2 l'auditor verifica a campione che le misure dichiarate siano applicate.",
"err": "Presentare nomine ex art. 28 firmate solo dall'azienda, oppure un registro dei trattamenti fermo da anni che non riporta i nuovi gestionali e servizi cloud.",
"q": "Mi mostra la nomina a responsabile del fornitore che elabora le vostre paghe?",
"x": [
"GDPR artt. 5, 13-14, 28-30, 32-35",
"Provvedimenti del Garante privacy"
],
"d": [
"D18",
"D24"
],
"l": [
"A.5.34",
"A.5.31",
"A.5.24",
"A.8.10",
"4.2"
],
"ev": {
"s1": [
"Registro delle attività di trattamento come titolare e, se l'azienda tratta dati per conto dei clienti, come responsabile",
"Informative per dipendenti e collaboratori, candidati, clienti e fornitori, oltre a privacy e cookie policy del sito",
"Nomine ex art. 28 dei fornitori che trattano dati, firmate da entrambe le parti",
"Nomine ricevute dai clienti per i trattamenti svolti per loro conto",
"Designazioni del personale autorizzato al trattamento, con le istruzioni",
"Contratto e nomina del DPO con la comunicazione al Garante, quando la nomina è obbligatoria",
"Valutazioni d'impatto (DPIA) per i trattamenti che le richiedono",
"Procedura di gestione delle violazioni di dati personali"
],
"s2": [
"Registro delle violazioni, tenuto anche quando non ci sono stati eventi",
"Gestione delle richieste degli interessati, con le risposte date nei termini",
"Registri della formazione privacy del personale",
"Riscontro a campione tra misure dichiarate nel registro e misure applicate"
]
}
},
{
"id": "L02",
"code": "81/08",
"t": "Salute e sicurezza sul lavoro",
"ref": "D.Lgs. 81/2008",
"ap": "Si applica a tutte le organizzazioni con almeno un lavoratore, compresi i soggetti equiparati come tirocinanti e collaboratori.",
"c": "Il datore di lavoro valuta tutti i rischi e redige il documento di valutazione dei rischi (DVR), nomina il responsabile del servizio di prevenzione e protezione e, quando la sorveglianza sanitaria è obbligatoria, il medico competente. Designa inoltre gli addetti alle emergenze e forma i lavoratori. Quando affida lavori a ditte esterne all'interno dei propri locali deve anche gestire i rischi da interferenza.",
"e": "L'auditor chiede il DVR datato e firmato, la nomina dell'RSPP e, se previsto, del medico competente, gli attestati di formazione dei lavoratori e degli addetti antincendio e primo soccorso, i verbali delle prove di evacuazione e, dove richiesto, quello della riunione periodica. Per gli appalti interni può chiedere anche il DUVRI.",
"err": "Trattare la sicurezza sul lavoro come estranea alla certificazione, quando l'auditor la verifica come requisito cogente collegato all'ambiente di lavoro e alla protezione fisica.",
"q": "Quando avete aggiornato il DVR l'ultima volta e chi è il vostro RSPP?",
"x": [
"D.Lgs. 81/2008 artt. 17, 18, 26 e 37"
],
"d": [
"D11",
"D24"
],
"l": [
"A.7.5",
"A.5.31"
],
"ev": {
"s1": [
"Documento di valutazione dei rischi (DVR) con data certa e firme",
"Nomina dell'RSPP con l'attestato che ne prova i requisiti",
"Nomina del medico competente, quando è prevista la sorveglianza sanitaria",
"Elezione o designazione dell'RLS",
"Designazione degli addetti antincendio e primo soccorso",
"Piano di emergenza ed evacuazione, quando è obbligatorio"
],
"s2": [
"Attestati di formazione dei lavoratori, dei preposti e dei dirigenti, con gli aggiornamenti",
"Attestati degli addetti antincendio e primo soccorso in corso di validità",
"Verbale dell'ultima prova di evacuazione",
"Verbale della riunione periodica, nelle aziende con più di 15 lavoratori",
"Scadenzario delle visite mediche, senza esibire le cartelle sanitarie",
"DUVRI per i lavori affidati a ditte esterne nei propri locali",
"Verifiche periodiche di impianto elettrico, messa a terra ed estintori"
]
}
},
{
"id": "L03",
"code": "ART.4",
"t": "Controlli a distanza e videosorveglianza",
"ref": "L. 300/1970 artt. 4 e 8",
"ap": "Riguarda le organizzazioni con dipendenti che installano telecamere o usano strumenti da cui può derivare un controllo a distanza dell'attività dei lavoratori, come i sistemi di log e di monitoraggio delle postazioni.",
"c": "Gli impianti e gli strumenti da cui può derivare un controllo a distanza dei lavoratori si possono installare solo per esigenze organizzative e produttive, di sicurezza del lavoro o di tutela del patrimonio, previo accordo sindacale o, in mancanza, autorizzazione dell'Ispettorato del lavoro. Per gli strumenti usati per rendere la prestazione e per quelli di registrazione degli accessi e delle presenze l'accordo non serve, purché i lavoratori ricevano un'informazione adeguata sulle modalità d'uso e sui controlli possibili, nel rispetto della normativa privacy.",
"e": "L'auditor chiede l'accordo sindacale o l'autorizzazione dell'ITL per le telecamere con la relativa informativa, oltre al regolamento informatico consegnato ai lavoratori con la descrizione dei controlli possibili sugli strumenti aziendali.",
"err": "Attivare log e monitoraggio sulle postazioni per esigenze di sicurezza senza averne informato i lavoratori nel regolamento informatico.",
"q": "Avete l'autorizzazione per le telecamere che inquadrano il magazzino?",
"x": [
"L. 300/1970 artt. 4 e 8",
"D.Lgs. 196/2003 artt. 113-114"
],
"d": [
"D10",
"D11",
"D18"
],
"l": [
"A.7.4",
"A.5.10",
"A.8.15",
"A.8.16"
],
"ev": {
"s1": [
"Accordo sindacale o autorizzazione dell'Ispettorato del lavoro per la videosorveglianza",
"Informativa sulla videosorveglianza, sia con il cartello sia in forma estesa",
"Regolamento informatico con la descrizione dei controlli possibili su posta, internet e dispositivi",
"Tempi di conservazione di immagini e log, con la motivazione"
],
"s2": [
"Prova della consegna del regolamento informatico ai lavoratori",
"Cartelli informativi presenti prima delle zone riprese",
"Corrispondenza tra telecamere installate e quanto autorizzato"
]
}
},
{
"id": "L04",
"code": "ADS",
"t": "Amministratori di sistema",
"ref": "Provv. Garante 27 novembre 2008",
"ap": "Riguarda le organizzazioni che affidano a persone interne o esterne la gestione di sistemi, reti o banche dati con dati personali.",
"c": "Il titolare designa individualmente gli amministratori di sistema dopo averne valutato esperienza e affidabilità e tiene l'elenco aggiornato con le funzioni attribuite. Almeno una volta l'anno verifica il loro operato. Gli accessi logici degli amministratori vanno registrati con log completi e inalterabili, conservati per almeno sei mesi. Se il servizio è affidato a un fornitore esterno, l'elenco nominativo delle persone che amministrano i sistemi va comunque conservato.",
"e": "L'auditor chiede gli atti di designazione individuali, l'elenco aggiornato, il verbale della verifica annuale e la prova della raccolta dei log di accesso.",
"err": "Designare il fornitore IT come società senza ottenere i nomi delle persone che amministrano effettivamente i sistemi.",
"q": "Chi sono oggi i vostri amministratori di sistema e dove sono i log dei loro accessi?",
"x": [
"Provv. Garante 27/11/2008 e modifiche del 25/6/2009"
],
"d": [
"D03",
"D12"
],
"l": [
"A.8.2",
"A.8.15",
"A.5.18",
"A.5.20"
],
"ev": {
"s1": [
"Designazioni individuali degli amministratori di sistema, con le funzioni attribuite",
"Elenco aggiornato degli amministratori di sistema",
"Elenco nominativo delle persone del fornitore esterno che amministrano i sistemi",
"Descrizione di come vengono registrati gli accessi degli amministratori"
],
"s2": [
"Log degli accessi logici degli amministratori, conservati per almeno sei mesi",
"Verbale della verifica annuale sull'operato degli amministratori"
]
}
},
{
"id": "L05",
"code": "NIS2",
"t": "Sicurezza delle reti e dei sistemi (NIS2)",
"ref": "D.Lgs. 138/2024",
"ap": "Si applica ai soggetti essenziali e importanti dei settori elencati dal decreto, individuati in base al settore e alle dimensioni, oltre ai soggetti indicati dall'Agenzia per la cybersicurezza nazionale.",
"c": "Il soggetto si registra sulla piattaforma dell'ACN e aggiorna i propri dati ogni anno. Deve adottare misure di gestione del rischio informatico proporzionate e notificare gli incidenti significativi al CSIRT Italia. Gli organi di amministrazione approvano le misure e ne sono responsabili, e la norma richiede che seguano una formazione specifica.",
"e": "L'auditor chiede l'esito della verifica di applicabilità e, per i soggetti inclusi, la prova della registrazione sulla piattaforma ACN, la delibera degli organi di amministrazione sulle misure, la procedura di notifica degli incidenti con i tempi previsti e il piano di formazione degli amministratori.",
"err": "Dare per scontato di essere fuori dal perimetro senza documentare la verifica, oppure considerare la certificazione 27001 sufficiente per gli obblighi NIS2, che vanno gestiti a parte.",
"q": "Avete verificato se rientrate nella NIS2 e dove è documentato?",
"x": [
"D.Lgs. 138/2024",
"Determinazioni dell'ACN"
],
"d": [
"D24",
"D15"
],
"l": [
"4.2",
"5.1",
"A.5.24",
"A.5.26",
"A.5.19",
"A.5.31",
"A.6.3"
],
"ev": {
"s1": [
"Verifica di applicabilità documentata, con settore, dimensione ed esito",
"Prova della registrazione sulla piattaforma ACN e dell'aggiornamento annuale, per i soggetti inclusi",
"Designazione del punto di contatto e del suo sostituto",
"Delibera dell'organo di amministrazione che approva le misure di sicurezza",
"Procedura di notifica degli incidenti significativi al CSIRT Italia, con preallarme entro 24 ore, notifica entro 72 ore e relazione finale entro un mese",
"Mappatura delle misure di base stabilite dall'ACN sui controlli della SoA"
],
"s2": [
"Attestati della formazione seguita dagli organi di amministrazione",
"Registri della formazione del personale",
"Valutazioni di sicurezza dei fornitori ICT",
"Registro degli incidenti con le eventuali notifiche inviate"
]
}
},
{
"id": "L06",
"code": "WB",
"t": "Segnalazioni di illeciti (whistleblowing)",
"ref": "D.Lgs. 24/2023",
"ap": "Si applica agli enti privati che nell'ultimo anno hanno impiegato in media almeno 50 lavoratori, a quelli che hanno adottato un modello 231 e a quelli di alcuni settori regolati a prescindere dalle dimensioni.",
"c": "L'ente attiva un canale interno di segnalazione che garantisca la riservatezza del segnalante e ne affida la gestione a una persona o a un ufficio autonomo e formato. Deve poi dare riscontro alle segnalazioni nei tempi previsti e informare il personale su come segnalare.",
"e": "L'auditor chiede la procedura di segnalazione, la nomina del gestore del canale, l'informativa privacy con la valutazione d'impatto sul trattamento e la prova della pubblicazione delle informazioni, oltre alla consultazione delle rappresentanze sindacali prima dell'attivazione.",
"err": "Usare come canale una casella email letta da più persone, che non garantisce la riservatezza richiesta dalla norma.",
"q": "Come garantite la riservatezza di chi effettua una segnalazione?",
"x": [
"D.Lgs. 24/2023",
"Linee guida ANAC"
],
"d": [
"D24",
"D18"
],
"l": [
"A.5.31",
"A.5.34"
],
"ev": {
"s1": [
"Procedura o atto organizzativo sul canale di segnalazione",
"Nomina del gestore del canale, con la prova della formazione",
"Prova del confronto con le rappresentanze sindacali prima dell'attivazione",
"Valutazione d'impatto sul trattamento dei dati delle segnalazioni",
"Informativa privacy per segnalanti e persone coinvolte",
"Contratto e nomina ex art. 28 del fornitore della piattaforma, se esterna"
],
"s2": [
"Informazioni sul canale pubblicate sul sito e nei luoghi di lavoro",
"Registro delle segnalazioni con avviso di ricevimento entro 7 giorni e riscontro entro 3 mesi"
]
}
},
{
"id": "L07",
"code": "231",
"t": "Responsabilità amministrativa degli enti (modello 231)",
"ref": "D.Lgs. 231/2001",
"ap": "La sua adozione è facoltativa, anche se diventa in pratica necessaria quando la chiedono bandi, clienti o settori regolati.",
"c": "L'ente che adotta un modello di organizzazione e gestione idoneo e ne affida la vigilanza a un organismo autonomo può evitare la responsabilità per i reati presupposto commessi nel suo interesse. Tra questi rientrano i delitti informatici e i reati in materia di salute e sicurezza sul lavoro, entrambi collegati ai controlli dei sistemi di gestione.",
"e": "Quando il modello è stato adottato, l'auditor guarda la delibera di adozione, la parte speciale sui reati informatici, la nomina dell'organismo di vigilanza e i flussi informativi verso di esso. Se l'ente non ha un modello basta annotarlo nel registro delle prescrizioni.",
"err": "Tenere separati modello 231 e sistema ISO, duplicando procedure che potrebbero essere comuni.",
"q": "Avete un modello 231 e come si collega alle vostre procedure?",
"x": [
"D.Lgs. 231/2001 artt. 6, 24-bis, 25-septies e 25-novies"
],
"d": [
"D24"
],
"l": [
"A.5.31",
"5.1",
"A.5.32"
],
"ev": {
"s1": [
"Delibera di adozione del modello, se adottato",
"Parte generale e parti speciali sui reati informatici e sulla sicurezza sul lavoro",
"Nomina dell'organismo di vigilanza",
"Codice etico e sistema disciplinare",
"In assenza del modello, la valutazione annotata nel registro delle prescrizioni"
],
"s2": [
"Verbali dell'organismo di vigilanza",
"Flussi informativi verso l'organismo di vigilanza, compresi quelli sugli incidenti informatici",
"Registri della formazione sul modello"
]
}
},
{
"id": "L08",
"code": "AGILE",
"t": "Lavoro agile",
"ref": "L. 81/2017 artt. 18-23",
"ap": "Riguarda le organizzazioni che consentono ai dipendenti di lavorare in modalità agile.",
"c": "Il lavoro agile si fonda su un accordo individuale scritto che regola l'attività fuori sede, gli strumenti, i tempi di riposo e il diritto alla disconnessione. Il datore di lavoro comunica l'accordo al Ministero del lavoro e consegna ogni anno al lavoratore e al rappresentante per la sicurezza un'informativa scritta sui rischi. Resta inoltre responsabile della sicurezza e del buon funzionamento degli strumenti tecnologici che assegna.",
"e": "L'auditor chiede gli accordi individuali firmati, la ricevuta delle comunicazioni al Ministero, l'informativa sui rischi e le regole di sicurezza informatica per il lavoro da remoto.",
"err": "Usare un accordo standard che non richiama le regole sulla sicurezza delle informazioni fuori sede.",
"q": "Chi lavora da casa usa un dispositivo aziendale e una connessione protetta?",
"x": [
"L. 81/2017 artt. 18-23"
],
"d": [
"D19",
"D10"
],
"l": [
"A.6.7",
"A.7.9",
"A.8.1"
],
"ev": {
"s1": [
"Accordi individuali di lavoro agile firmati",
"Ricevute delle comunicazioni al Ministero del lavoro",
"Informativa scritta sui rischi consegnata ogni anno",
"Regole di sicurezza per il lavoro da remoto, nel regolamento informatico o nell'accordo"
],
"s2": [
"Verbali di consegna dei dispositivi aziendali",
"Evidenza delle connessioni protette e della configurazione dei dispositivi usati da remoto"
]
}
},
{
"id": "L09",
"code": "AI ACT",
"t": "Intelligenza artificiale",
"ref": "Reg. UE 2024/1689 e L. 132/2025",
"ap": "Riguarda le organizzazioni che sviluppano o usano sistemi di intelligenza artificiale, compresi gli assistenti generativi usati dal personale.",
"c": "Chi usa sistemi di IA deve garantire un livello sufficiente di alfabetizzazione del personale che li impiega ed evitare le pratiche vietate. Per i sistemi ad alto rischio si aggiungono gli obblighi del deployer. La legge italiana prevede inoltre che il datore di lavoro informi i lavoratori dell'uso di sistemi di IA nei casi previsti dalla normativa sulle informazioni dovute ai lavoratori.",
"e": "L'auditor chiede l'elenco degli strumenti di IA autorizzati, le regole d'uso nel regolamento informatico, le evidenze della formazione e, dove richiesta, l'informativa ai lavoratori.",
"err": "Lasciare che il personale usi assistenti di IA con account personali, inserendo dati aziendali e dei clienti senza alcuna regola.",
"q": "Quali strumenti di intelligenza artificiale usa il personale e con quali limiti sui dati?",
"x": [
"Reg. UE 2024/1689 art. 4",
"L. 132/2025 art. 11"
],
"d": [
"D10",
"D25"
],
"l": [
"A.5.10",
"A.5.31",
"A.6.3",
"A.8.12",
"X17.8.36"
],
"ev": {
"s1": [
"Inventario degli strumenti di IA in uso con la classificazione del rischio",
"Regole d'uso dell'IA con gli strumenti autorizzati e i dati che non si possono inserire",
"Valutazione dei fornitori di IA e delle loro condizioni sull'uso dei dati",
"Informativa ai lavoratori sull'uso di sistemi di IA, dove dovuta",
"Valutazione d'impatto sui diritti fondamentali, solo nei casi previsti dall'art. 27"
],
"s2": [
"Registri della formazione sull'alfabetizzazione in materia di IA",
"Riscontro a campione che il personale usa solo strumenti autorizzati"
]
}
},
{
"id": "L10",
"code": "L.633",
"t": "Diritto d'autore e licenze software",
"ref": "L. 633/1941",
"ap": "Si applica a tutte le organizzazioni che usano software, banche dati o contenuti protetti.",
"c": "Software e banche dati sono protetti dal diritto d'autore. L'uso di programmi senza licenza o oltre i limiti della licenza espone a responsabilità civile e penale e può far sorgere anche la responsabilità dell'ente ai sensi del D.Lgs. 231/2001.",
"e": "L'auditor chiede l'elenco delle licenze coerente con l'inventario software, le regole sull'installazione e le clausole sulla titolarità di quanto sviluppato da dipendenti e fornitori.",
"err": "Tenere un inventario software senza confrontarlo con le licenze effettivamente acquistate.",
"q": "Come verificate che ogni software installato abbia una licenza valida?",
"x": [
"L. 633/1941 artt. 64-bis e 171-bis"
],
"d": [
"D13",
"D10"
],
"l": [
"A.5.32",
"A.8.19",
"A.5.9"
],
"ev": {
"s1": [
"Elenco delle licenze software collegato all'inventario degli asset",
"Regola sull'installazione di software nel regolamento informatico",
"Clausole sulla titolarità di quanto sviluppato da dipendenti e fornitori"
],
"s2": [
"Confronto a campione tra software installato e licenze acquistate",
"Report dello strumento di inventario automatico, se presente"
]
}
},
{
"id": "L11",
"code": "ARCH.",
"t": "Conservazione dei documenti e delle registrazioni",
"ref": "Codice civile art. 2220 e D.Lgs. 82/2005",
"ap": "Si applica a tutte le organizzazioni per i documenti contabili e contrattuali e per le registrazioni con valore legale.",
"c": "Le scritture contabili, le fatture e la corrispondenza commerciale si conservano per dieci anni. I documenti informatici con valore legale vanno conservati secondo le regole del Codice dell'amministrazione digitale, spesso tramite un conservatore esterno. I tempi di legge vanno coordinati con quelli fissati per i dati personali, che non si possono conservare più del necessario.",
"e": "L'auditor chiede la tabella dei tempi di conservazione, il contratto con l'eventuale conservatore e la prova che gli archivi sono protetti da modifiche e cancellazioni.",
"err": "Fissare tempi di conservazione uguali per tutti i documenti, ignorando sia i termini di legge sia il principio di limitazione della conservazione.",
"q": "Per quanto tempo conservate i contratti con i clienti e dove?",
"x": [
"Codice civile art. 2220",
"D.Lgs. 82/2005 art. 44",
"GDPR art. 5.1 lett. e"
],
"d": [
"D23",
"D24"
],
"l": [
"A.5.33",
"7.5.3",
"A.8.10"
],
"ev": {
"s1": [
"Tabella dei tempi di conservazione per tipo di documento",
"Contratto con il conservatore e manuale di conservazione, se si usa la conservazione digitale",
"Regole di cancellazione al termine del periodo di conservazione"
],
"s2": [
"Evidenze delle cancellazioni periodiche",
"Prova che fatture e registri obbligatori sono in conservazione"
]
}
},
{
"id": "L12",
"code": "CRA",
"t": "Prodotti con elementi digitali (Cyber Resilience Act)",
"ref": "Reg. UE 2024/2847",
"ap": "Riguarda fabbricanti, importatori e distributori di prodotti hardware e software con elementi digitali immessi sul mercato dell'Unione.",
"c": "I prodotti vanno progettati in modo sicuro e devono ricevere aggiornamenti di sicurezza per tutto il periodo di supporto, con una gestione documentata delle vulnerabilità. Dall'11 settembre 2026 i fabbricanti devono segnalare le vulnerabilità sfruttate attivamente e gli incidenti gravi, mentre gli altri obblighi si applicano dall'11 dicembre 2027.",
"e": "L'auditor chiede il processo di gestione delle vulnerabilità, la politica di supporto dei prodotti, la procedura di segnalazione e la documentazione tecnica di sicurezza.",
"err": "Considerare il CRA una questione per chi produce hardware, quando riguarda anche il software venduto come prodotto.",
"q": "Come gestite e comunicate le vulnerabilità dei prodotti che vendete?",
"x": [
"Reg. UE 2024/2847 artt. 13-14"
],
"d": [
"D26",
"D15",
"D24"
],
"l": [
"A.8.25",
"A.8.8",
"A.5.24",
"A.5.31"
],
"ev": {
"s1": [
"Valutazione di applicabilità, cioè se l'azienda immette sul mercato prodotti con elementi digitali",
"Processo di gestione delle vulnerabilità e politica di divulgazione coordinata",
"Periodo di supporto dichiarato per ogni prodotto",
"Procedura di segnalazione delle vulnerabilità sfruttate attivamente e degli incidenti gravi"
],
"s2": [
"Distinta dei componenti software (SBOM) dei prodotti",
"Registro delle vulnerabilità gestite e degli aggiornamenti rilasciati",
"Documentazione tecnica di sicurezza dei prodotti"
]
}
},
{
"id": "L13",
"code": "DORA",
"t": "Resilienza operativa digitale nel settore finanziario (DORA)",
"ref": "Reg. UE 2022/2554",
"ap": "Riguarda banche, assicurazioni, intermediari e gli altri soggetti finanziari, oltre ai fornitori di servizi ICT che lavorano per loro e ricevono i requisiti tramite contratto.",
"c": "I soggetti finanziari applicano un quadro di gestione del rischio ICT e classificano e notificano gli incidenti gravi. Devono inoltre testare la propria resilienza e gestire i rischi dei fornitori ICT con contratti dal contenuto minimo stabilito dal regolamento e con un registro degli accordi.",
"e": "Per chi fornisce servizi ICT a soggetti finanziari, l'auditor guarda le clausole contrattuali previste dal DORA, la collaborazione su incidenti e test e i piani di uscita.",
"err": "Accettare dai clienti finanziari le clausole DORA senza verificare di poterle rispettare anche con i propri sub-fornitori.",
"q": "I vostri clienti bancari vi hanno chiesto di aderire a requisiti DORA?",
"x": [
"Reg. UE 2022/2554 artt. 28-30"
],
"d": [
"D16",
"D24"
],
"l": [
"A.5.19",
"A.5.20",
"A.5.21",
"A.5.24",
"A.5.30"
],
"ev": {
"s1": [
"Elenco dei clienti finanziari soggetti al DORA",
"Contratti con le clausole previste dall'art. 30",
"Piani di uscita e di supporto alla migrazione verso un altro fornitore",
"Procedura di comunicazione degli incidenti ai clienti finanziari"
],
"s2": [
"Evidenze della partecipazione ai test e agli audit richiesti dai clienti",
"Gestione dei sub-fornitori coerente con le clausole accettate"
]
}
},
{
"id": "L14",
"code": "RAEE",
"t": "Rifiuti e apparecchiature dismesse",
"ref": "D.Lgs. 152/2006 e D.Lgs. 49/2014",
"ap": "Si applica a tutte le organizzazioni che producono rifiuti, compresi i dispositivi elettronici dismessi.",
"c": "I rifiuti si affidano a soggetti autorizzati con la documentazione prevista per trasporto e smaltimento, mentre le apparecchiature elettriche ed elettroniche seguono il canale dei RAEE. Per i dispositivi informatici lo smaltimento va coordinato con la cancellazione sicura dei dati.",
"e": "L'auditor chiede i formulari o gli altri documenti di smaltimento, le autorizzazioni del soggetto incaricato e i verbali di cancellazione dei dati per i dispositivi dismessi.",
"err": "Consegnare PC e dischi al ritiro RAEE senza aver prima cancellato o distrutto i dati.",
"q": "Cosa succede ai vecchi portatili quando li sostituite?",
"x": [
"D.Lgs. 152/2006 parte IV",
"D.Lgs. 49/2014"
],
"d": [
"D13",
"D12"
],
"l": [
"A.7.14",
"A.7.10",
"A.8.10"
],
"ev": {
"s1": [
"Contratto con un'azienda autorizzata al ritiro dei rifiuti elettronici",
"Procedura di dismissione con la cancellazione sicura dei dati"
],
"s2": [
"Formulari di identificazione dei rifiuti o documenti di ritiro",
"Verbali o certificati di cancellazione o distruzione dei dati"
]
}
}
].map(o=>Object.assign({kind:"l",g:"L",m:false,n:false},o));


return {GROUPS:GROUPS, GLAB:(typeof GLAB!=="undefined"?GLAB:{}), C:C, A:A, X:(typeof X!=="undefined"?X:[]), L:(typeof L!=="undefined"?L:[]), D:D, PHASES:PHASES, STAGE2:STAGE2, COMMON:COMMON};
})();
