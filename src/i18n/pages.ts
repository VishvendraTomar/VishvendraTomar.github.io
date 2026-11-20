import type { Lang } from './config';

export const MAIL = 'vishvendratomar29@gmail.com';
export const CALL_HREF = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('15-minute call');

type Pages = {
  nav: { workWithMe: string; countries: string };
  bookCall: string;
  fullTime: string;
  casePage: { tryDemo: string; updated: string; countries: string };
  contact: { lede: string; body: string };
  wwm: {
    title: string; description: string; heading: string; lede: string;
    doH: string; do: [string, string][];
    howH: string; how: [string, string, string][];
    practicalH: string; practical: [string, string][];
    startH: string; start: [string, string][];
    countriesLink: string;
  };
  countries: {
    title: string; description: string; heading: string; lede: string;
    colCountry: string; colRule: string; rows: [string, string, string][];
    caption: string; sources: string; after: string; caseLink: string; wwmLink: string;
  };
};

export const pages: Record<Lang, Pages> = {
  en: {
    nav: { workWithMe: 'Work with me', countries: 'Other countries' },
    bookCall: 'Book a 15-minute call',
    fullTime: 'Also open to full-time roles.',
    casePage: { tryDemo: 'Try the demo', updated: 'Last updated', countries: 'See the same problem in other countries' },
    contact: { lede: 'I work on contract with European teams. Workforce, compliance and AI-agent systems.', body: 'Tell me where your system keeps breaking. We start with a 15-minute call.' },
    wwm: {
      title: 'Work with me', description: 'Contract backend work for European staffing and workforce-software teams: government filings, attendance, pay rules and reliable AI agents.',
      heading: 'Work with me', lede: 'I help European staffing and workforce-software teams. I fix the systems that must not fail.',
      doH: 'What I do',
      do: [
        ['Per-shift government filings', 'Workers registered before each shift. Retries, status checks, no duplicates.'],
        ['Attendance verification', 'Clock-ins that are hard to fake. NFC, venue Wi-Fi and location together.'],
        ['Wage and compliance rules', 'Pay rules stored with their dates. Old payslips always recalculate the same.'],
        ['Reliable AI agents', 'Agents that resume after a crash, stay within limits and ask before acting.'],
      ],
      howH: 'How we can work',
      how: [
        ['Fixed-price pilot', '2–4 weeks', 'One problem, one agreed result. The easiest way to start.'],
        ['Part-time contract', 'Some days each week', 'Ongoing work next to your team, on a fixed number of days.'],
        ['Full-time contract', 'Every working day', 'I work as part of your team, full time, on contract.'],
      ],
      practicalH: 'Practical details',
      practical: [
        ['Location', 'Based in Bengaluru, India. I work remotely.'],
        ['Hours', 'Available 09:00–17:00 CET.'],
        ['Language', 'English.'],
        ['Billing', 'Invoiced as a contractor.'],
      ],
      startH: 'How it starts',
      start: [
        ['A 15-minute call', 'You tell me what keeps breaking. I tell you honestly if I can help.'],
        ['A written scope', 'For the pilot: the problem, the result, the timeline and a fixed price.'],
        ['We start', 'Short updates as we go. You see progress every week.'],
      ],
      countriesLink: 'Filing rules in Belgium, Austria, France, Italy and Hungary',
    },
    countries: {
      title: 'The same problem in other countries', description: 'Per-shift worker registration rules in Belgium, Austria, France, Italy and Hungary, in plain words.',
      heading: 'The same problem in other countries', lede: 'The rule changes by country. The hard part stays the same. A worker must be registered before work starts.',
      colCountry: 'Country', colRule: 'What must happen',
      rows: [
        ['Belgium', 'Dimona', 'Register each worker before every shift starts.'],
        ['Austria', 'ÖGK via ELDA', 'Register casual workers for each working day, before work starts.'],
        ['France', 'DPAE', 'File a DPAE before each extra shift starts.'],
        ['Italy', 'Intermittent work notice', 'Send a notice before each on-call shift starts.'],
        ['Hungary', 'EFO', 'Register simplified employment before the worker starts.'],
      ],
      caption: 'Rules summarised for orientation, not legal advice.',
      sources: 'Official sources',
      after: 'Each rule needs the same backend care. Filings must be sent on time, never lost and never duplicated. Changes and cancellations must be tracked until the government answers.',
      caseLink: 'How I built this for Belgium', wwmLink: 'Work with me',
    },
  },
  de: {
    nav: { workWithMe: 'Zusammenarbeit', countries: 'Andere Länder' },
    bookCall: '15-Minuten-Gespräch buchen',
    fullTime: 'Auch offen für Festanstellungen.',
    casePage: { tryDemo: 'Demo ausprobieren', updated: 'Zuletzt aktualisiert', countries: 'Dasselbe Problem in anderen Ländern' },
    contact: { lede: 'Ich arbeite auf Vertragsbasis mit europäischen Teams. Systeme für Personaleinsatz, Compliance und KI-Agenten.', body: 'Erzählen Sie mir, wo Ihr System immer wieder ausfällt. Wir beginnen mit einem 15-Minuten-Gespräch.' },
    wwm: {
      title: 'Zusammenarbeit', description: 'Backend-Arbeit auf Vertragsbasis für europäische Personaldienstleister und HR-Software-Teams: Behördenmeldungen, Anwesenheit, Lohnregeln und verlässliche KI-Agenten.',
      heading: 'Zusammenarbeit', lede: 'Ich unterstütze europäische Personaldienstleister und HR-Software-Teams. Ich repariere Systeme, die nicht ausfallen dürfen.',
      doH: 'Was ich mache',
      do: [
        ['Behördenmeldungen pro Schicht', 'Anmeldung vor jeder Schicht. Wiederholungen, Statusprüfung, keine Duplikate.'],
        ['Anwesenheitsprüfung', 'Einstempeln, das schwer zu fälschen ist. NFC, WLAN vor Ort und Standort zusammen.'],
        ['Lohn- und Compliance-Regeln', 'Lohnregeln mit Gültigkeitsdatum. Alte Abrechnungen ergeben immer denselben Betrag.'],
        ['Verlässliche KI-Agenten', 'Agenten, die nach einem Absturz weitermachen, Grenzen einhalten und vor dem Handeln fragen.'],
      ],
      howH: 'Wie wir zusammenarbeiten können',
      how: [
        ['Pilotprojekt zum Festpreis', '2–4 Wochen', 'Ein Problem, ein vereinbartes Ergebnis. Der einfachste Einstieg.'],
        ['Teilzeit-Vertrag', 'Einige Tage pro Woche', 'Laufende Arbeit neben Ihrem Team, an festen Tagen.'],
        ['Vollzeit-Vertrag', 'Jeden Arbeitstag', 'Ich arbeite als Teil Ihres Teams, in Vollzeit, auf Vertragsbasis.'],
      ],
      practicalH: 'Praktisches',
      practical: [
        ['Standort', 'Bengaluru, Indien. Ich arbeite remote.'],
        ['Zeiten', 'Erreichbar von 09:00 bis 17:00 Uhr MEZ.'],
        ['Sprache', 'Englisch.'],
        ['Abrechnung', 'Auf Rechnung als Auftragnehmer.'],
      ],
      startH: 'So fängt es an',
      start: [
        ['Ein 15-Minuten-Gespräch', 'Sie erzählen mir, was immer wieder ausfällt. Ich sage Ihnen ehrlich, ob ich helfen kann.'],
        ['Ein schriftlicher Umfang', 'Für das Pilotprojekt: Problem, Ergebnis, Zeitplan und Festpreis.'],
        ['Wir starten', 'Kurze Updates unterwegs. Sie sehen jede Woche Fortschritt.'],
      ],
      countriesLink: 'Melderegeln in Belgien, Österreich, Frankreich, Italien und Ungarn',
    },
    countries: {
      title: 'Dasselbe Problem in anderen Ländern', description: 'Regeln zur Anmeldung von Arbeitskräften pro Einsatz in Belgien, Österreich, Frankreich, Italien und Ungarn – in einfachen Worten.',
      heading: 'Dasselbe Problem in anderen Ländern', lede: 'Die Regel ändert sich von Land zu Land. Das Schwierige bleibt gleich. Eine Arbeitskraft muss vor Arbeitsbeginn angemeldet sein.',
      colCountry: 'Land', colRule: 'Was passieren muss',
      rows: [
        ['Belgien', 'Dimona', 'Jede Arbeitskraft vor jeder Schicht anmelden.'],
        ['Österreich', 'ÖGK über ELDA', 'Fallweise Beschäftigte für jeden Arbeitstag vor Arbeitsbeginn anmelden.'],
        ['Frankreich', 'DPAE', 'Vor jedem Extra-Einsatz eine DPAE abgeben.'],
        ['Italien', 'Meldung bei Arbeit auf Abruf', 'Vor jedem Einsatz auf Abruf eine Meldung senden.'],
        ['Ungarn', 'EFO', 'Vereinfachte Beschäftigung vor Arbeitsbeginn anmelden.'],
      ],
      caption: 'Regeln zur Orientierung zusammengefasst, keine Rechtsberatung.',
      sources: 'Offizielle Quellen',
      after: 'Jede Regel braucht dieselbe Sorgfalt im Backend. Meldungen müssen rechtzeitig raus, dürfen nie verloren gehen und nie doppelt sein. Änderungen und Absagen müssen verfolgt werden, bis die Behörde antwortet.',
      caseLink: 'Wie ich das für Belgien gebaut habe', wwmLink: 'Zusammenarbeit',
    },
  },
  fr: {
    nav: { workWithMe: 'Travailler ensemble', countries: 'Autres pays' },
    bookCall: 'Réserver un appel de 15 minutes',
    fullTime: 'Également ouvert à un poste à temps plein.',
    casePage: { tryDemo: 'Essayer la démo', updated: 'Dernière mise à jour', countries: 'Le même problème dans d’autres pays' },
    contact: { lede: 'Je travaille en freelance avec des équipes européennes. Systèmes RH, de conformité et d’agents IA.', body: 'Dites-moi où votre système casse sans cesse. On commence par un appel de 15 minutes.' },
    wwm: {
      title: 'Travailler ensemble', description: 'Missions backend en freelance pour les équipes européennes d’intérim et de logiciels RH : déclarations administratives, présence, règles de paie et agents IA fiables.',
      heading: 'Travailler ensemble', lede: 'J’aide les équipes européennes d’intérim et de logiciels RH. Je répare les systèmes qui ne doivent pas tomber.',
      doH: 'Ce que je fais',
      do: [
        ['Déclarations par prestation', 'Travailleurs déclarés avant chaque prestation. Relances, vérification du statut, aucun doublon.'],
        ['Contrôle de présence', 'Des pointages difficiles à falsifier. NFC, Wi-Fi du site et localisation ensemble.'],
        ['Règles de paie et de conformité', 'Des règles de paie datées. Une ancienne fiche se recalcule toujours à l’identique.'],
        ['Agents IA fiables', 'Des agents qui reprennent après une panne, respectent des limites et demandent avant d’agir.'],
      ],
      howH: 'Comment travailler ensemble',
      how: [
        ['Pilote à prix fixe', '2 à 4 semaines', 'Un problème, un résultat convenu. La façon la plus simple de commencer.'],
        ['Contrat à temps partiel', 'Quelques jours par semaine', 'Un travail suivi aux côtés de votre équipe, sur des jours fixes.'],
        ['Contrat à temps plein', 'Chaque jour ouvré', 'Je travaille au sein de votre équipe, à temps plein, en freelance.'],
      ],
      practicalH: 'Infos pratiques',
      practical: [
        ['Lieu', 'Basé à Bangalore, en Inde. Je travaille à distance.'],
        ['Horaires', 'Disponible de 9 h à 17 h (heure d’Europe centrale).'],
        ['Langue', 'Anglais.'],
        ['Facturation', 'Facturé en tant que prestataire indépendant.'],
      ],
      startH: 'Comment ça commence',
      start: [
        ['Un appel de 15 minutes', 'Vous me dites ce qui casse. Je vous dis franchement si je peux aider.'],
        ['Un périmètre écrit', 'Pour le pilote : le problème, le résultat, le calendrier et un prix fixe.'],
        ['On démarre', 'De courts points d’étape. Vous voyez l’avancement chaque semaine.'],
      ],
      countriesLink: 'Règles de déclaration en Belgique, Autriche, France, Italie et Hongrie',
    },
    countries: {
      title: 'Le même problème dans d’autres pays', description: 'Les règles de déclaration des travailleurs par prestation en Belgique, Autriche, France, Italie et Hongrie, en termes simples.',
      heading: 'Le même problème dans d’autres pays', lede: 'La règle change d’un pays à l’autre. La difficulté reste la même. Un travailleur doit être déclaré avant de commencer.',
      colCountry: 'Pays', colRule: 'Ce qui doit se passer',
      rows: [
        ['Belgique', 'Dimona', 'Déclarer chaque travailleur avant chaque prestation.'],
        ['Autriche', 'ÖGK via ELDA', 'Déclarer les travailleurs occasionnels pour chaque jour travaillé, avant le début.'],
        ['France', 'DPAE', 'Faire une DPAE avant chaque prestation d’extra.'],
        ['Italie', 'Avis de travail intermittent', 'Envoyer un avis avant chaque prestation sur appel.'],
        ['Hongrie', 'EFO', 'Déclarer l’emploi simplifié avant que le travailleur commence.'],
      ],
      caption: 'Règles résumées à titre indicatif, pas un conseil juridique.',
      sources: 'Sources officielles',
      after: 'Chaque règle demande le même soin côté backend. Les déclarations doivent partir à temps, sans perte ni doublon. Les changements et annulations doivent être suivis jusqu’à la réponse de l’administration.',
      caseLink: 'Comment je l’ai construit pour la Belgique', wwmLink: 'Travailler ensemble',
    },
  },
  nl: {
    nav: { workWithMe: 'Samenwerken', countries: 'Andere landen' },
    bookCall: 'Plan een gesprek van 15 minuten',
    fullTime: 'Ook open voor een vaste functie.',
    casePage: { tryDemo: 'Probeer de demo', updated: 'Laatst bijgewerkt', countries: 'Hetzelfde probleem in andere landen' },
    contact: { lede: 'Ik werk op opdrachtbasis met Europese teams. Systemen voor personeelsplanning, compliance en AI-agents.', body: 'Vertel me waar uw systeem steeds stukgaat. We beginnen met een gesprek van 15 minuten.' },
    wwm: {
      title: 'Samenwerken', description: 'Backendopdrachten voor Europese uitzend- en HR-softwareteams: overheidsaangiftes, aanwezigheid, loonregels en betrouwbare AI-agents.',
      heading: 'Samenwerken', lede: 'Ik help Europese uitzend- en HR-softwareteams. Ik maak systemen in orde die niet mogen falen.',
      doH: 'Wat ik doe',
      do: [
        ['Overheidsaangiftes per shift', 'Werknemers aangegeven vóór elke shift. Nieuwe pogingen, statuscontrole, geen dubbels.'],
        ['Aanwezigheidscontrole', 'Inklokken dat moeilijk te vervalsen is. NFC, wifi van de locatie en positie samen.'],
        ['Loon- en complianceregels', 'Loonregels met hun datum. Oude loonstroken komen altijd op hetzelfde uit.'],
        ['Betrouwbare AI-agents', 'Agents die na een crash verdergaan, binnen limieten blijven en vragen voor ze handelen.'],
      ],
      howH: 'Hoe we kunnen samenwerken',
      how: [
        ['Pilot tegen vaste prijs', '2–4 weken', 'Eén probleem, één afgesproken resultaat. De makkelijkste start.'],
        ['Deeltijdse opdracht', 'Enkele dagen per week', 'Doorlopend werk naast uw team, op vaste dagen.'],
        ['Voltijdse opdracht', 'Elke werkdag', 'Ik werk als deel van uw team, voltijds, op opdrachtbasis.'],
      ],
      practicalH: 'Praktisch',
      practical: [
        ['Locatie', 'Gevestigd in Bengaluru, India. Ik werk op afstand.'],
        ['Uren', 'Bereikbaar van 09:00 tot 17:00 CET.'],
        ['Taal', 'Engels.'],
        ['Facturatie', 'Gefactureerd als zelfstandige.'],
      ],
      startH: 'Hoe het begint',
      start: [
        ['Een gesprek van 15 minuten', 'U vertelt wat er steeds misgaat. Ik zeg eerlijk of ik kan helpen.'],
        ['Een schriftelijke scope', 'Voor de pilot: het probleem, het resultaat, de planning en een vaste prijs.'],
        ['We beginnen', 'Korte updates onderweg. U ziet elke week vooruitgang.'],
      ],
      countriesLink: 'Aangifteregels in België, Oostenrijk, Frankrijk, Italië en Hongarije',
    },
    countries: {
      title: 'Hetzelfde probleem in andere landen', description: 'Regels voor het aangeven van werknemers per inzet in België, Oostenrijk, Frankrijk, Italië en Hongarije, in gewone woorden.',
      heading: 'Hetzelfde probleem in andere landen', lede: 'De regel verschilt per land. Het moeilijke deel blijft hetzelfde. Een werknemer moet aangegeven zijn voordat het werk begint.',
      colCountry: 'Land', colRule: 'Wat er moet gebeuren',
      rows: [
        ['België', 'Dimona', 'Elke werknemer aangeven vóór elke shift.'],
        ['Oostenrijk', 'ÖGK via ELDA', 'Gelegenheidswerkers aanmelden voor elke werkdag, vóór de start.'],
        ['Frankrijk', 'DPAE', 'Een DPAE indienen vóór elke extra-shift.'],
        ['Italië', 'Melding bij oproepwerk', 'Een melding sturen vóór elke oproepshift.'],
        ['Hongarije', 'EFO', 'Vereenvoudigde tewerkstelling aanmelden voordat de werknemer begint.'],
      ],
      caption: 'Regels samengevat ter oriëntatie, geen juridisch advies.',
      sources: 'Officiële bronnen',
      after: 'Elke regel vraagt dezelfde zorg in de backend. Aangiftes moeten op tijd vertrekken, nooit verloren gaan en nooit dubbel zijn. Wijzigingen en annuleringen moeten gevolgd worden tot de overheid antwoordt.',
      caseLink: 'Hoe ik dit voor België bouwde', wwmLink: 'Samenwerken',
    },
  },
  it: {
    nav: { workWithMe: 'Lavoriamo insieme', countries: 'Altri paesi' },
    bookCall: 'Prenota una chiamata di 15 minuti',
    fullTime: 'Aperto anche a ruoli a tempo pieno.',
    casePage: { tryDemo: 'Prova la demo', updated: 'Ultimo aggiornamento', countries: 'Lo stesso problema in altri paesi' },
    contact: { lede: 'Lavoro a contratto con team europei. Sistemi per il personale, la conformità e gli agenti IA.', body: 'Dimmi dove il tuo sistema continua a rompersi. Si parte da una chiamata di 15 minuti.' },
    wwm: {
      title: 'Lavoriamo insieme', description: 'Lavoro backend a contratto per team europei di agenzie per il lavoro e software HR: comunicazioni obbligatorie, presenze, regole retributive e agenti IA affidabili.',
      heading: 'Lavoriamo insieme', lede: 'Aiuto i team europei di agenzie per il lavoro e software HR. Sistemo i sistemi che non possono fallire.',
      doH: 'Cosa faccio',
      do: [
        ['Comunicazioni per ogni turno', 'Lavoratori registrati prima di ogni turno. Tentativi ripetuti, verifica dello stato, nessun duplicato.'],
        ['Verifica delle presenze', 'Timbrature difficili da falsificare. NFC, Wi-Fi della sede e posizione insieme.'],
        ['Regole retributive e di conformità', 'Regole salvate con la loro data. Le vecchie buste paga si ricalcolano sempre uguali.'],
        ['Agenti IA affidabili', 'Agenti che riprendono dopo un crash, restano nei limiti e chiedono prima di agire.'],
      ],
      howH: 'Come possiamo lavorare',
      how: [
        ['Pilota a prezzo fisso', '2–4 settimane', 'Un problema, un risultato concordato. Il modo più semplice per iniziare.'],
        ['Contratto part-time', 'Alcuni giorni a settimana', 'Lavoro continuativo accanto al tuo team, in giorni fissi.'],
        ['Contratto full-time', 'Ogni giorno lavorativo', 'Lavoro come parte del tuo team, a tempo pieno, a contratto.'],
      ],
      practicalH: 'Dettagli pratici',
      practical: [
        ['Sede', 'Bengaluru, India. Lavoro da remoto.'],
        ['Orari', 'Disponibile dalle 09:00 alle 17:00 CET.'],
        ['Lingua', 'Inglese.'],
        ['Fatturazione', 'Fatturo come professionista esterno.'],
      ],
      startH: 'Come si comincia',
      start: [
        ['Una chiamata di 15 minuti', 'Mi dici cosa continua a rompersi. Ti dico onestamente se posso aiutare.'],
        ['Un perimetro scritto', 'Per il pilota: il problema, il risultato, i tempi e un prezzo fisso.'],
        ['Si parte', 'Brevi aggiornamenti strada facendo. Vedi i progressi ogni settimana.'],
      ],
      countriesLink: 'Regole di comunicazione in Belgio, Austria, Francia, Italia e Ungheria',
    },
    countries: {
      title: 'Lo stesso problema in altri paesi', description: 'Le regole per registrare i lavoratori a ogni turno in Belgio, Austria, Francia, Italia e Ungheria, in parole semplici.',
      heading: 'Lo stesso problema in altri paesi', lede: 'La regola cambia da paese a paese. La parte difficile resta uguale. Un lavoratore deve essere registrato prima di iniziare.',
      colCountry: 'Paese', colRule: 'Cosa deve succedere',
      rows: [
        ['Belgio', 'Dimona', 'Registrare ogni lavoratore prima di ogni turno.'],
        ['Austria', 'ÖGK tramite ELDA', 'Registrare i lavoratori occasionali per ogni giornata, prima dell’inizio.'],
        ['Francia', 'DPAE', 'Presentare una DPAE prima di ogni turno da extra.'],
        ['Italia', 'Comunicazione per lavoro intermittente', 'Inviare una comunicazione prima di ogni turno a chiamata.'],
        ['Ungheria', 'EFO', 'Registrare il lavoro semplificato prima che il lavoratore inizi.'],
      ],
      caption: 'Regole riassunte a scopo orientativo, non consulenza legale.',
      sources: 'Fonti ufficiali',
      after: 'Ogni regola richiede la stessa cura nel backend. Le comunicazioni devono partire in tempo, senza perdite né duplicati. Modifiche e annullamenti vanno seguiti finché l’amministrazione risponde.',
      caseLink: 'Come l’ho costruito per il Belgio', wwmLink: 'Lavoriamo insieme',
    },
  },
};

export const countrySources: [string, string][] = [
  ['Belgium · socialsecurity.be', 'https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/obligations/obligations_nsso/dimona/occasionalsdimona.html'],
  ['Austria · ELDA', 'https://www.elda.at/cdscontent/?contentid=10007.838879&portal=eldaportal'],
  ['France · service-public.gouv.fr (DPAE)', 'https://www.service-public.gouv.fr/entreprendre/vosdroits/R57098'],
  ['France · service-public.gouv.fr (extra)', 'https://www.service-public.gouv.fr/particuliers/vosdroits/F33693'],
  ['Italy · lavoro.gov.it', 'https://www.lavoro.gov.it/temi-e-priorita/rapporti-di-lavoro-e-relazioni-industriali/focus-on/disciplina-rapporto-lavoro/pagine/lavoro-intermittente'],
  ['Hungary · nav.gov.hu', 'https://nav.gov.hu/'],
];
