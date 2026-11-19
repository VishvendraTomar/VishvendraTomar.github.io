---
slug: antagents
title: Ant Agents
summary: "Un runtime durabile per agenti LLM in GeekyAnts. Ha sostituito onboarding, controlli di conformità e solleciti dei timesheet fatti via email, e oggi gestisce oltre 20 workflow per più di 300 dipendenti."
figure: automation
order: 2
stack: [AWS, MCP, Durable execution]
before:
  - "Onboarding, controlli di conformità sul lavoro da remoto e solleciti dei timesheet si facevano a mano, via email."
  - "I processi richiedevano giorni."
  - "Gli errori erano frequenti."
after:
  - "Oltre 20 workflow in produzione per più di 300 dipendenti."
  - "Processi che richiedevano giorni si chiudono in giornata."
  - "Gli errori sono passati da frequenti a quasi zero."
eyebrow: Runtime durabile per agenti
tagline: "Gli agenti LLM deragliano, si bloccano e bruciano soldi. Questi no."
highlights:
  - title: Riprendere, non ricominciare
    text: Un worker muore al passo 4 di 7. Un altro riprende dal checkpoint senza rifare i passi 1–3.
  - title: Replay deterministico
    text: Gli output registrati di modello e strumenti riproducono esattamente un’esecuzione fallita, così un errore isolato si può studiare.
  - title: Contesto, non cronologia
    text: Un picco di costi veniva da un contesto gonfiato. Un context builder ora dà a ogni passo solo ciò che gli serve.
  - title: Guardrail a livelli
    text: Permessi sugli strumenti, limiti, controlli di schema, approvazione umana e log di audit. Un prompt chiede; un guardrail impone.
---
## Il mio ruolo

Ero l’unico responsabile dell’infrastruttura degli agenti e della modellazione, e ho costruito gran parte del backend. I business analyst componevano i processi a partire da agenti esistenti. Gli sviluppatori potevano aggiungere un nuovo agente quando un processo aveva bisogno di un’altra capacità. La piattaforma girava internamente su AWS e gli agenti raggiungevano gli altri sistemi tramite strumenti MCP.

## Il problema

Inserire un nuovo collega, verificare la conformità del lavoro da remoto e rincorrere i timesheet mancanti: tutto passava da persone che scrivevano email. Ogni processo richiedeva giorni, perché ogni passo aspettava che qualcuno si ricordasse del successivo.

Affidare questo lavoro ad agenti LLM porta tre problemi nuovi. Un agente può deragliare. Un’esecuzione può bloccarsi a metà. E un’esecuzione può costare molto più del dovuto, senza che nessuno se ne accorga fino alla fattura. Il runtime esiste per rendere affidabili queste tre cose.

## Un workflow dall’inizio alla fine

Quando un dipendente ignora un sollecito per il timesheet, un agente legge tramite uno strumento MCP i suoi commit GitHub della settimana. Da lì redige la voce del timesheet e manda la bozza a una persona per l’approvazione. Nessuno deve rincorrere nessuno, e niente viene registrato senza un sì.

## Un crash al passo 4 di 7

Un workflow può aspettare delle persone tra un passo e l’altro, e nel frattempo i worker si riavviano, vengono ridistribuiti o cadono. Se la macchina che esegue un workflow muore al passo 4 di 7, ricominciare da capo non è accettabile: il passo 2 ha già mandato un’email a qualcuno.

Ogni passo completato viene salvato con il suo risultato come checkpoint. Quando un worker sparisce, un altro prende l’esecuzione, carica l’ultimo checkpoint e riprende dal passo 4. I passi 1–3 non vengono rieseguiti. La simulazione qui sopra mostra entrambe le versioni.

> **Decisione.** Tenere lo stato di un workflow in corso separato dal contesto passato a una chiamata al modello. Un processo può avere una lunga storia anche quando il prossimo agente ne usa solo una piccola parte.

## Fare debug di un modello che non risponde mai due volte uguale

Una chiamata a un LLM non è deterministica. Quando un’esecuzione fallisce, richiamare il modello raramente riproduce l’errore. Per questo il runtime registra ogni output del modello e ogni risultato degli strumenti durante l’esecuzione.

Per il debug riproduco l’esecuzione da quella registrazione. Gli stessi input producono lo stesso percorso, passo dopo passo, senza chiamare il modello né toccare sistemi reali. Un errore accaduto una volta si può studiare tutte le volte che serve.

## Il picco di costi

A un certo punto i costi sono saliti di colpo. La causa era un contesto gonfiato: ogni passo inviava al modello una parte sempre più grande della storia del workflow, in gran parte irrilevante per il passo in corso.

La soluzione è stata un context builder. Compone dallo stato del workflow solo ciò che serve al passo successivo, invece di passare tutta la storia. È la decisione qui sopra, messa in pratica.

## I guardrail sono livelli, non un prompt

Un prompt chiede; un guardrail impone. Dire a un modello «non registrare nulla senza approvazione» è una richiesta. Il runtime la trasforma in una regola:

- **Permessi sugli strumenti.** Ogni agente può chiamare solo gli strumenti concessi dal suo workflow.
- **Limiti.** Le esecuzioni hanno un tetto, così un agente confuso si ferma invece di girare a vuoto.
- **Controlli di schema.** L’output del modello che non rispetta la struttura attesa viene scartato prima di raggiungere un altro sistema.
- **Approvazione umana.** Le azioni importanti aspettano una persona.
- **Log di audit.** Ogni passo, chiamata a strumento e decisione viene registrato.

## Dove le persone restavano coinvolte

Un processo preparava informazioni di fatturazione che una persona doveva approvare. Quel confine contava: automatizzare la preparazione risparmiava solleciti, lasciando la decisione finale alla persona responsabile.

## Cosa farei diversamente

Il livello di durable execution l’ho scritto io: checkpoint, presa in carico delle esecuzioni abbandonate e loro ripresa. Oggi partirei da un motore di durable execution esistente e dedicherei quel tempo alle parti specifiche degli agenti: costruzione del contesto, guardrail e replay.
