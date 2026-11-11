# Area clienti Selfsight: guida all'installazione

L'area clienti è un sito statico pubblicato su GitHub Pages che usa Supabase per gli accessi, il database e l'archivio dei documenti. Il cliente entra con email e password, aggiorna l'avanzamento dei punti norma e carica i documenti. Solo la consulente può approvarli, rimandarli indietro con una nota o dichiararli non applicabili. Ogni azione finisce in un registro che nessuno può modificare a mano.

Se `config.js` è vuoto il portale parte in modalità demo, utile per provarlo prima di collegarlo.

## 1. Creare il progetto Supabase

1. Registrati su supabase.com e crea un nuovo progetto. Come regione scegli **Central EU (Frankfurt)**, così dati e documenti restano nell'Unione europea.
2. Annota la password del database in un posto sicuro (serve solo in casi eccezionali).

Il piano gratuito basta per iniziare (1 GB di file). Un progetto gratuito che resta inutilizzato per una settimana viene messo in pausa e si riattiva dal pannello: se l'area clienti diventa uno strumento di lavoro quotidiano conviene passare al piano a pagamento, che include anche i backup automatici.

## 2. Creare il database

1. Apri **SQL Editor**, clicca **New query**, incolla tutto il contenuto di `supabase/schema.sql` e premi **Run**.
2. Lo script crea tabelle, regole di accesso, controlli e l'archivio `documenti`. Si può rilanciare senza danni.

## 3. Impostare gli accessi

1. In **Authentication > Sign In / Providers** disattiva **Allow new users to sign up**: così nessuno può registrarsi da solo e gli utenti li crei solo tu.
2. In **Authentication > URL Configuration** imposta come **Site URL** l'indirizzo del portale (ad esempio `https://clienti.selfsight.it`) e aggiungilo anche tra i **Redirect URLs**.
3. In **Authentication > Emails > SMTP Settings** configura l'invio delle email con la tua casella (ad esempio Google Workspace). Senza questa impostazione Supabase invia le email di invito e di recupero password solo ai membri del tuo team, non ai clienti.

## 4. Creare il tuo utente da consulente

1. In **Authentication > Users** clicca **Add user > Create new user**, inserisci la tua email e una password robusta e spunta **Auto Confirm User**.
2. Torna in **SQL Editor** e lancia questa riga con la tua email:

```sql
update public.profiles set role = 'admin', full_name = 'Veronica Paolucci'
where email = 'tua-email@esempio.it';
```

## 5. Collegare il sito a Supabase

1. In **Project Settings > API** (oppure **API Keys**) copia il **Project URL** e la chiave **anon public**. Se il progetto mostra le nuove chiavi, puoi usare la **publishable** oppure la chiave anon che trovi nella scheda **Legacy API keys**.
2. Incollali in `config.js`.

La chiave anon è pensata per stare nel sito ed è visibile a chiunque: i dati sono protetti dalle regole del database, verificate una per una. La chiave **service_role** (o **secret**) non va mai inserita nel sito né condivisa.

## 6. Pubblicare su GitHub Pages

1. Crea un repository, ad esempio `area-clienti`, e carica nella radice tutti i file di questa cartella (`index.html`, `app.js`, `config.js`, `style.css`, `CNAME`, `.nojekyll` e le cartelle `fonts`, `norme`, `vendor`, `supabase`).
2. Il repository può essere pubblico, perché contiene solo il codice: dati e documenti stanno su Supabase. Se preferisci tenerlo privato ti serve un piano GitHub a pagamento.
3. In **Settings > Pages** scegli il branch `main` e la cartella radice. Il dominio `clienti.selfsight.it` è già indicato nel file `CNAME`: se vuoi un indirizzo diverso modifica quel file.
4. Nel DNS di selfsight.it aggiungi un record CNAME con host `clienti` che punta a `tuonomeutente.github.io`, poi attiva **Enforce HTTPS**.

## 7. Aggiungere un cliente

1. In Supabase, **Authentication > Users > Add user**. Puoi scegliere **Send invitation**, che manda al cliente un'email per impostare la password (serve lo SMTP del punto 3), oppure **Create new user** con una password provvisoria che gli comunichi tu e che lui cambierà con «Password dimenticata».
2. Entra nel portale: l'utente compare nell'elenco del modulo **Nuovo progetto**. Crea il progetto scegliendo la norma (27001 o 9001) e assegnalo al cliente.
3. Puoi assegnare più utenti dello stesso cliente al progetto dalla sezione **Accesso del cliente** nella panoramica.

## 8. Togliere l'accesso

Hai tre livelli, dal più leggero al più drastico.

1. **Sospendi accesso** sul progetto: il cliente non vede più quel progetto né i suoi file, mentre tu conservi tutto e puoi riattivarlo.
2. **Togli accesso** su un singolo utente nella panoramica del progetto.
3. In Supabase, **Authentication > Users**, puoi eliminare l'utente: non potrà più nemmeno accedere.

## Come funziona il flusso dei documenti

Il cliente porta un documento da «Da fare» a «In bozza» e poi a «In revisione», caricando ogni volta una nuova versione: le versioni precedenti restano nello storico. La consulente lo approva, oppure lo rimanda indietro con una nota che il cliente vede e non può modificare. Un documento approvato può solo essere ripresentato in revisione, quindi ogni modifica successiva passa di nuovo da te. Questi vincoli sono applicati dal database e non solo dall'interfaccia.

## Protezione dei dati

Nell'area clienti transitano documenti dei clienti. Supabase agisce come tuo fornitore di servizi: conviene scaricare e conservare il suo DPA (accordo ex art. 28 GDPR, disponibile nella documentazione legale di Supabase), richiamarlo nell'incarico con il cliente e indicare l'area clienti nella tua informativa.
