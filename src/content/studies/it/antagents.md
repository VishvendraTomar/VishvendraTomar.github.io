---
slug: antagents
title: Ant Agents
summary: "Venerdì pomeriggio. Mancano di nuovo dei timesheet. Qualcuno deve scrivere a ogni persona e sollecitarla di nuovo lunedì. Ho costruito il sistema che ora lo fa con agenti IA, per oltre 300 dipendenti."
figure: automation
order: 2
updated: 2026-11-20
stack: [AWS, MCP, Durable execution]
before:
  - "Onboarding, controlli di conformità sul lavoro da remoto e solleciti dei timesheet si facevano a mano, via email."
  - "I processi richiedevano giorni."
  - "Gli errori erano frequenti."
after:
  - "Oltre 20 workflow in produzione sul runtime che ho costruito, per più di 300 dipendenti."
  - "Processi che richiedevano giorni si chiudono in giornata."
  - "Gli errori sono passati da frequenti a quasi zero."
eyebrow: Runtime durabile per agenti
tagline: "Agenti IA che finiscono il lavoro, anche dopo un crash."
highlights:
  - title: "Riprendere, non ricominciare"
    text: "Un worker si blocca al passo 4 di 7. Un altro riprende dal passo 4. Niente viene eseguito due volte."
  - title: "Rivedere ogni errore"
    text: "Ogni risposta del modello viene registrata. Un’esecuzione fallita si può riprodurre esattamente, passo dopo passo."
  - title: "Contesto, non cronologia"
    text: "I costi sono saliti quando ogni passo riceveva tutta la storia. Ora ogni passo riceve solo ciò che gli serve."
  - title: "Guardrail a livelli"
    text: "Permessi, limiti, controlli, approvazione umana e log di audit. Un prompt chiede; un guardrail impone."
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

Un modello di IA può rispondere ogni volta in modo diverso. Un errore quindi spesso non si ripete quando si riprova. Questo rende difficile il debug. Per questo il runtime registra ogni output del modello e ogni risultato degli strumenti durante l’esecuzione.

Per il debug riproduco l’esecuzione da quella registrazione. Gli stessi input producono lo stesso percorso, passo dopo passo, senza chiamare il modello né toccare sistemi reali. Un errore accaduto una volta si può studiare tutte le volte che serve.

## Il picco di costi

A un certo punto i costi sono saliti di colpo. Ogni passo inviava al modello sempre più testo, in gran parte inutile. Si parla di contesto gonfiato: tutta la storia del workflow partiva con ogni chiamata.

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
