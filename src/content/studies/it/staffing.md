---
slug: workforce-infrastructure
title: Una piattaforma belga per il lavoro somministrato
summary: "Sono le 05:45. Un lavoratore si dà malato; il turno inizia alle 06:00. Un collega può sostituirlo, ma la registrazione a sistema riporta il nome di chi ha appena chiamato. Il responsabile ha quindici minuti per registrare il sostituto prima dell’inizio del lavoro."
figure: registration
order: 1
stack: [Python, FastAPI, PostgreSQL, Celery, Flutter]
updated: 2026-11-20
before:
  - "La prima versione del fondatore girava su Cloud Functions e Firestore."
  - "Le comunicazioni Dimona fallite venivano ripetute a mano."
  - "Circa 10.000 turni, e il sistema faticava già a reggere."
after:
  - "Nessuna comunicazione persa, nessun duplicato, nessun rinvio manuale."
  - "Ogni comunicazione finisce accettata, ripetuta o affidata a una persona."
  - "Oltre 125.000 turni sono passati dal backend che ho costruito in gran parte. La piattaforma è cresciuta a più di 1.000 aziende."
eyebrow: Comunicazioni obbligatorie / Buste paga
tagline: "Un sistema pubblico che cade. Comunicazioni che non possono fallire."
highlights:
  - title: "Tre uscite"
    text: "Ogni comunicazione finisce accettata, ripetuta o a una persona. Nessuna si perde in silenzio."
  - title: "Sicura da ripetere"
    text: "Una comunicazione inviata due volte viene riconosciuta. L’amministrazione non riceve mai un duplicato."
  - title: "Chiedere prima di inviare"
    text: "Dopo un crash, il sistema chiede prima se la comunicazione è arrivata. Poi decide."
  - title: "Paghe che si ricalcolano"
    text: "Le regole retributive sono salvate con la loro data. Le vecchie buste paga danno sempre lo stesso importo."
---
## Il mio ruolo

Uno dei due ingegneri della piattaforma. Il fondatore guidava il prodotto. Ho costruito gran parte del backend e ho lavorato all’app Flutter.

Ho lavorato al progetto per circa un anno e mezzo in GeekyAnts, da remoto da Bengaluru, con circa 20 giorni in Belgio per il rilascio finale. La mia parte comprendeva la registrazione Dimona, la verifica delle presenze e le regole che trasformano le ore in paghe, fatture e comunicazioni.

## Tre uscite, niente sparisce in silenzio

Ogni comunicazione finisce in esattamente uno di tre posti: viene accettata, viene ripetuta, oppure arriva in una dead-letter queue dove una persona la prende in carico. Non esiste un altro esito, quindi nessuna comunicazione può sparire di nascosto.

<div class="exits" role="img" aria-label="Una comunicazione va a Dimona e finisce in uno di tre posti: accettata, ripetuta più tardi o nella dead-letter queue per una persona.">
  <span class="exits-source">Comunicazione → Dimona</span>
  <div class="exits-list">
    <span class="exit-ok"><b>Accettata</b> Registrazione confermata e salvata.</span>
    <span class="exit-retry"><b>Ripetuta</b> Errore temporaneo. Torna in coda dopo un’attesa.</span>
    <span class="exit-dlq"><b>Dead-letter queue</b> Errore permanente o tentativi esauriti. Una persona viene avvisata.</span>
  </div>
</div>

## Rendere una comunicazione sicura da ripetere

La prima versione contava su qualcuno che notasse una comunicazione fallita e la rilanciasse. Il rifacimento ha reso sicura la ripetizione, così il sistema può farla da solo.

- **Consegna almeno una volta, più idempotenza.** La coda può consegnare due volte la stessa attività: è il prezzo per non perderne mai una. Ogni comunicazione ha un’identità, quindi un secondo tentativo viene riconosciuto invece di creare una registrazione doppia.
- **Errori temporanei e permanenti sono problemi diversi.** Un timeout o un servizio irraggiungibile meritano un nuovo tentativo. Una comunicazione respinta per il suo contenuto verrà respinta di nuovo: va subito a una persona invece di consumare tentativi.
- **Dopo un crash, chiedere prima di inviare.** Un submitter può morire dopo aver inviato una comunicazione e prima di salvare la risposta. Il tentativo successivo verifica prima lo stato presso l’amministrazione e invia di nuovo solo se nulla è stato accettato.
- **Backoff con jitter.** Quando il servizio pubblico torna attivo, un’ondata di comunicazioni in coda non deve farlo cadere di nuovo. I tentativi aspettano ogni volta di più, con una parte casuale per distribuirsi.

## Tre decisioni quando un turno cambia

### Un altro lavoratore è un’altra comunicazione

**Decisione.** In caso di sostituzione, verificare l’idoneità del sostituto, annullare l’assegnazione uscente e crearne una per chi subentra. Riconciliare la registrazione del lavoratore uscente con il lavoro che resta. Nell’esempio qui sopra il periodo originale è ora vuoto.

**Perché.** Stessa sede, stesso orario e stessa mansione non cambiano il nome registrato presso l’amministrazione. Annullare in blocco un intero periodo registrato potrebbe anche togliere la copertura ad altro lavoro.

**Costo.** Il responsabile vede una sola sostituzione. Il backend deve seguire due assegnazioni, e un annullamento riuscito non dice nulla sull’esito della comunicazione per il sostituto.

### L’annullamento può arrivare prima della risposta

**Decisione.** Se un turno viene annullato mentre la sua comunicazione è in corso, si continua a seguire la risposta dell’amministrazione. Noto l’esito, si confronta il periodo accettato con il lavoro ancora pianificato. Se è vuoto, si invia un annullamento e si segue anche quella risposta.

**Perché.** Cancellare il turno in locale non ritira una comunicazione già accettata. Inviare una correzione mentre l’esito originale è ignoto lascia due richieste da sbrogliare.

**Costo.** «Annullato» può essere vero sul calendario mentre la correzione esterna è ancora in sospeso. Il sistema deve portare quel lavoro aperto attraverso più di una risposta.

### Un timeout lascia una domanda aperta

**Decisione.** Se la comunicazione ha una ricevuta, se ne verifica lo stato. Se un nuovo invio viene segnalato come duplicato, lo si riconcilia con la registrazione esistente quando si può stabilire una corrispondenza. I tentativi esauriti finiscono in una dead-letter queue. Le operations ricevono un segnale quando la gestione automatica non riesce a chiudere la comunicazione.

**Perché.** L’amministrazione potrebbe aver accettato la richiesta poco prima che la connessione cadesse. Un nuovo invio potrebbe ripetere un’azione già efficace.

**Costo.** Verificare l’esito aggiunge una chiamata. Parcheggiare una comunicazione irrisolta lascia a qualcuno del lavoro da indagare. Entrambi i costi sono preferibili a dire a un responsabile che un lavoratore non confermato è registrato.

## Cosa rende difficile falsificare una timbratura

Un PIN condiviso si può passare a un altro. Un QR code statico si può copiare. Una posizione dà un contesto geografico, ma da sola non dimostra che qualcuno abbia interagito con il punto di timbratura della sede.

Ho costruito il controllo attorno a un tocco NFC sicuro, al Wi-Fi della sede e alla posizione. Il tocco prova un’interazione fisica, il Wi-Fi aggiunge un contesto di rete locale, la posizione colloca il dispositivo. Copiare un solo valore lascia inspiegate le altre osservazioni. Nella simulazione, prove incoerenti bloccano la timbratura prima che qualsiasi ora arrivi alle buste paga.

Il costo si vede anche in una sede reale: un lavoratore onesto può avere una posizione imprecisa o nessun segnale di rete. Per questo le tre osservazioni hanno ruoli distinti nel controllo.

## Paghe che si ricalcolano sempre uguali

Le ore lavorate diventano due cose: la paga del lavoratore e la fattura al cliente. Entrambe nascono dallo stesso registro presenze, ma rispondono a domande diverse.

Le regole retributive cambiano: tariffe, maggiorazioni, soglie di legge. Ho salvato le regole come dati con una data di decorrenza invece di scriverle nel codice. Una busta paga si calcola con le regole valide il giorno in cui si è lavorato. Ricalcolare una busta paga dell’anno scorso dà lo stesso importo di allora, anche se nel frattempo le regole sono cambiate.

Il denaro non viene mai salvato come numero in virgola mobile. Gli importi sono decimali esatti, perché l’arrotondamento in virgola mobile fa slittare qualche centesimo tra busta paga e fattura.

Per le operazioni esposte tramite MCP, i controlli di business restavano nel livello di dominio: anche una richiesta da un agente doveva rispettare le regole del lavoro somministrato.

## La scala, onestamente

La piattaforma è partita da circa **10.000 turni**, e il vecchio sistema faticava già. Sul nuovo backend è cresciuta fino a **oltre 125.000 turni** e **più di 1.000 aziende**.

Sono numeri della piattaforma, non solo miei. Il fondatore guidava il prodotto e l’azienda. La mia parte era il backend su cui giravano quei turni.

Il traffico era modesto. La parte difficile era la correttezza: una comunicazione doppia, una registrazione persa o una busta paga sbagliata sono un problema a qualsiasi volume.

## Lo stesso problema in altri paesi

Altri paesi hanno lo stesso problema con regole diverse. Austria, Francia, Italia e Ungheria richiedono tutte una registrazione prima dell’inizio del lavoro. [Confronta le regole](/it/countries/).
