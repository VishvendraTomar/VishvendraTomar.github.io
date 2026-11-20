import type { Lang } from './config';

const en = {
  meta: { title: 'Vishvendra Tomar | Making unreliable systems dependable', description: 'Vishvendra Tomar makes unreliable systems dependable: government filings that can’t be lost, durable AI agents, and payroll that recalculates to the cent.' },
  nav: { label: 'Main navigation', work: 'Work', cases: 'Case studies', experience: 'Experience', about: 'About', talk: 'Work with me', home: 'Vishvendra Tomar — home' },
  hero: {
    overline: 'VISHVENDRA TOMAR / BACKEND & AGENT INFRASTRUCTURE',
    l1: 'I make', l2: 'unreliable systems', l3: 'dependable',
    body: 'I’m Vishvendra Tomar, an engineer. I build systems that keep working when things go wrong. Government filings that can’t be lost. AI agents that don’t crash or overspend. Payroll that is right to the cent.',
    cta: 'Book a 15-minute call', cta2: 'See what broke', exploreAria: 'Explore selected work', proofLabel: 'Results',
    proof: [['125,000+', 'shifts on the staffing backend, up from about 10,000'], ['1,000+', 'companies served by that platform'], ['20+', 'live agent workflows for 300+ employees'], ['≈0', 'agent failures, down from frequent']],
    end: 'GOVERNMENT FILINGS / AI AGENTS / PAYROLL', scroll: 'SCROLL TO EXPLORE ↓',
  },
  work: {
    overline: 'SELECTED WORK', h2a: 'Proof is in', h2b: 'the work.', intro: 'Real problems I helped solve. Not just a list of tools.',
    seeBroke: 'See what broke', full: 'Full case study', seeBrokeAria: 'See what broke in', fullAria: 'Read the case study:',
    all: 'All case studies ↗', gallery: 'Architecture gallery ↗', disclaimer: 'Commercial projects are discussed without publishing private code or confidential information.', caption: 'VISHVENDRA / SELECTED WORK',
  },
  projects: {
    'workforce-infrastructure': { eyebrow: 'GOVERNMENT FILINGS / PAYROLL', name: 'Workforce infrastructure', short: 'A government system that goes down. Filings that can’t fail.', detail: 'Staffing agencies must register each worker with the government before every shift. The old system lost filings and needed manual reruns. I built most of the backend and worked on the Flutter app. Nothing is lost or filed twice now. It grew from about 10,000 to 125,000+ shifts and 1,000+ companies.' },
    antagents: { eyebrow: 'DURABLE AGENT RUNTIME', name: 'Ant Agents', short: 'AI agents that finish the job, even after a crash.', detail: 'Onboarding and timesheet chasing used to run on email. I built the system that runs them with AI agents. I owned the agent infrastructure and the modelling alone. 20+ workflows now serve 300+ employees. Work that took days now takes less than a day. Failures went from frequent to near zero.' },
    'dealroom-ai': { eyebrow: 'HACKATHON / TEAM ACHIEVEMENT', name: 'Dealroom.ai', short: 'From client documents to a draft sales proposal.', detail: 'A 24-hour hackathon, and our team placed second. Several AI agents turned a client brief into a sales proposal. Another team later added the prototype to the GeekyAnts website.', recognition: '2ND PLACE · TEAM' },
  } as Record<string, { eyebrow: string; name: string; short: string; detail: string; recognition?: string }>,
  art: {
    sysLabel: 'WORKFLOW / 01', sysLight: 'REGISTRATION', sysN1: 'SHIFT<br/>CHANGE', sysN2: 'FILING<br/>QUEUE', sysS1: 'ACCEPTED · RETRIED · DEAD-LETTER', sysS2: 'NOTHING SILENTLY DROPPED',
    flowLabel: 'WORKFLOW / 7 STEPS', flowLight: 'CRASH AT 04', flowSteps13: 'STEPS 01–03', flowCheck: 'CHECKPOINTED', flowLost: '04 · WORKER LOST', flowResumed: '04 · RESUMED', flowSteps57: 'STEPS 05–07', flowS1: 'NO STEP REDONE', flowS2: 'ANOTHER WORKER RESUMES',
    propLabel: 'PROPOSAL AUTOMATION', propLight: 'TEAM / 02', prop1: 'DOCUMENT INTAKE', prop2: 'REQUIREMENTS ANALYSIS', prop2s: 'AGENT WORKFLOW DESIGN', prop3: 'INTERACTIVE PROPOSAL', prop3s: 'PRODUCT CONCEPT',
  },
  cases: { overline: 'CASE STUDIES', h2a: 'What broke,', h2b: 'and the fix.', intro: 'Every project here had something break. See what broke and how I fixed it. Then try breaking it yourself.', tabs: 'Case studies', readFull: 'Read the full case study' },
  inside: {
    overline: 'INTERACTIVE EXPLORATION', h2a: 'Inside the', h2b: 'system.', intro: 'Tap a part to see how an AI support answer is built.',
    kicker: 'ARCHITECTURE EXPLORER', id: 'REFERENCE DESIGN / NOT A LIVE SERVICE', mapLabel: 'AI CUSTOMER SUPPORT / REQUEST LIFECYCLE', groupLabel: 'Explore architecture components',
    nodes: [['Customer request', 'Entry & identity'], ['FastAPI orchestration', 'Context & routing'], ['Policy retrieval', 'Approved knowledge'], ['Live user context', 'Permission-aware data'], ['Model + guardrails', 'Grounded answer or escalation']],
    component: 'COMPONENT', prev: 'Previous architecture component', next: 'Next architecture component',
    bottom1: 'INTERACTIVE CONCEPT / BASED ON AI SUPPORT INFRASTRUCTURE WORK', bottom2: 'BUILT TO EXPLAIN THE THINKING, NOT EXPOSE PRIVATE SYSTEMS',
    steps: [
      { type: 'INPUT LAYER', title: 'Start with a real question.', description: 'A support request enters the system. Before generating an answer, the application has to establish who is asking and what information may be used.', principle: 'DESIGN PRINCIPLE / IDENTITY FIRST' },
      { type: 'ORCHESTRATION', title: 'One place to coordinate.', description: 'FastAPI coordinates the request: checks identity, decides what information is needed and routes work between retrieval, context and approved tools.', principle: 'DESIGN PRINCIPLE / CONTROLLED FLOW' },
      { type: 'KNOWLEDGE RETRIEVAL', title: 'Ground answers in policy.', description: 'Retrieval finds relevant, approved documentation. Versioning and citations help the application distinguish supported answers from guesses.', principle: 'DESIGN PRINCIPLE / EVIDENCE OVER GUESSWORK' },
      { type: 'AUTHORIZED CONTEXT', title: 'Know the user, safely.', description: 'Live account state can change. Fetch only information the requester is allowed to see rather than relying on stale conversation memory.', principle: 'DESIGN PRINCIPLE / LEAST PRIVILEGE' },
      { type: 'RESPONSE SAFETY', title: 'An answer must earn trust.', description: 'The model uses evidence and context to draft a response. Validation, guardrails and escalation paths handle uncertainty or sensitive actions.', principle: 'DESIGN PRINCIPLE / VERIFY OR ESCALATE' },
    ],
  },
  about: {
    overline: 'HOW I THINK', h2a: 'Beyond the', h2b: 'happy path.', intro: 'Good engineering shows up when things go wrong.',
    leadPre: 'I care about the gaps', leadEm: 'between', leadPost: 'systems. That is where most failures happen.',
    right: 'A government system times out. A worker crashes halfway through a task. A pay rule changes mid-month. I design for these cases first. Retries never create duplicates. Workflows resume where they stopped. Limits keep a model from going too far. A prompt asks; a guardrail enforces.',
    github: 'Explore my GitHub',
    caps: [['Backend', 'Python, FastAPI, Node.js, TypeScript'], ['Data & jobs', 'PostgreSQL, Redis, Celery, Firestore'], ['Agent infrastructure', 'Durable workflows, MCP tools, guardrails, replay'], ['Delivery', 'Docker, observability, Flutter, CI/CD']],
  },
  exp: {
    overline: 'EXPERIENCE', h2a: 'Built through', h2b: 'experience.',
    deel: { dates: 'OCT — NOV 2026', title: 'Full-stack Developer · Deel', kind: 'BACKEND / APPLIED AI', detail: 'I worked on AI customer support. One system sent each question to the right specialist agent. Every answer passed a check before reaching the customer. When it failed, a person took over.', type: 'AI SUPPORT SYSTEMS' },
    geeky: { dates: 'MAY 2024 — OCT 2026', intro: 'I joined as Software Engineer I and progressed to Software Engineer III.' },
    roles: [
      ['MAY — OCT 2026', 'Software Engineer III', 'Owned backend modernization and complex business workflows: modular FastAPI services, background execution, compliance integrations, and relational data modelling.'],
      ['MAY 2025 — APR 2026', 'Software Engineer II', 'Expanded into backend architecture, distributed workflows and AI integrations. Worked across production systems and agent-based automation, taking on increasingly independent delivery.'],
      ['MAY 2024 — MAY 2025', 'Software Engineer I', 'Built backend APIs and AI-assisted developer features, including code analysis and retrieval workflows. Learned how to take features from prototype to usable team tools.'],
    ],
    impactTitle: 'BEYOND SHIPPING CODE', articlesTitle: 'Technical articles',
    impacts: [['GeekWiz Rising Star', 'A GeekyAnts award for project contributions and growth.'], ['Hackathon · 2nd place', 'Team achievement building Dealroom.ai.'], ['Hiring & knowledge sharing', 'Participated in technical interviews and team engineering discussions.']],
  },
  contact: { overline: 'CONTACT', h2a: 'Have a filing, payroll or agent system that keeps breaking?', h2b: 'Let’s talk.', body: 'Available for contract work with European teams building workforce, compliance and AI-agent systems.', cta: 'Book a 15-minute call', secondary: 'Also open to full-time roles.', about: 'ABOUT', writing: 'WRITING', contact: 'CONTACT' },
  footer: { designed: 'DESIGNED WITH INTENTION', top: 'BACK TO TOP ↑' },
};
export type HomeText = typeof en;

const de: HomeText = {
  meta: { title: 'Vishvendra Tomar | Unzuverlässige Systeme verlässlich machen', description: 'Vishvendra Tomar macht unzuverlässige Systeme verlässlich: Behördenmeldungen, die nicht verloren gehen, robuste KI-Agenten und Lohnabrechnungen, die auf den Cent stimmen.' },
  nav: { label: 'Hauptnavigation', work: 'Arbeiten', cases: 'Fallstudien', experience: 'Erfahrung', about: 'Über mich', talk: 'Zusammenarbeit', home: 'Vishvendra Tomar – Startseite' },
  hero: {
    overline: 'VISHVENDRA TOMAR / BACKEND- & AGENTEN-INFRASTRUKTUR',
    l1: 'Ich mache', l2: 'unzuverlässige Systeme', l3: 'verlässlich',
    body: 'Ich bin Vishvendra Tomar, Engineer. Ich baue Systeme, die weiterlaufen, wenn etwas schiefgeht. Behördenmeldungen, die nicht verloren gehen. KI-Agenten, die nicht abstürzen und kein Budget sprengen. Lohnabrechnungen, die auf den Cent stimmen.',
    cta: '15-Minuten-Gespräch buchen', cta2: 'Was schiefging', exploreAria: 'Ausgewählte Arbeiten ansehen', proofLabel: 'Ergebnisse',
    proof: [['125.000+', 'Schichten auf dem neuen Backend, ausgehend von rund 10.000'], ['1.000+', 'Unternehmen auf dieser Plattform'], ['20+', 'produktive Agenten-Workflows für 300+ Mitarbeitende'], ['≈0', 'Agenten-Ausfälle – vorher an der Tagesordnung']],
    end: 'BEHÖRDENMELDUNGEN / KI-AGENTEN / LOHNABRECHNUNG', scroll: 'WEITER SCROLLEN ↓',
  },
  work: {
    overline: 'AUSGEWÄHLTE ARBEITEN', h2a: 'Der Beweis', h2b: 'liegt im Detail.', intro: 'Echte Probleme, die ich mitgelöst habe. Nicht bloß eine Liste von Tools.',
    seeBroke: 'Was schiefging', full: 'Ganze Fallstudie', seeBrokeAria: 'Was schiefging bei', fullAria: 'Fallstudie lesen:',
    all: 'Alle Fallstudien ↗', gallery: 'Architektur-Galerie ↗', disclaimer: 'Kundenprojekte werden beschrieben, ohne privaten Code oder vertrauliche Informationen zu veröffentlichen.', caption: 'VISHVENDRA / AUSGEWÄHLTE ARBEITEN',
  },
  projects: {
    'workforce-infrastructure': { eyebrow: 'BEHÖRDENMELDUNGEN / LOHNABRECHNUNG', name: 'Personaleinsatz-Infrastruktur', short: 'Ein Behördensystem, das ausfällt. Meldungen, die nicht scheitern dürfen.', detail: 'Personaldienstleister müssen jede Arbeitskraft vor jeder Schicht bei der Behörde anmelden. Das alte System verlor Meldungen und brauchte manuelle Wiederholungen. Ich habe den Großteil des Backends gebaut und an der Flutter-App mitgearbeitet. Heute geht nichts verloren und nichts wird doppelt gemeldet. Die Plattform wuchs von rund 10.000 auf über 125.000 Schichten und mehr als 1.000 Unternehmen.' },
    antagents: { eyebrow: 'ROBUSTE AGENTEN-LAUFZEITUMGEBUNG', name: 'Ant Agents', short: 'KI-Agenten, die ihre Arbeit beenden – auch nach einem Absturz.', detail: 'Onboarding und das Nachfassen von Stundenzetteln liefen per E-Mail. Ich habe das System gebaut, das diese Abläufe mit KI-Agenten erledigt. Die Agenten-Infrastruktur und die Modellierung habe ich allein verantwortet. Über 20 Workflows dienen heute mehr als 300 Mitarbeitenden. Was Tage dauerte, dauert jetzt weniger als einen Tag. Ausfälle sanken von häufig auf nahezu null.' },
    'dealroom-ai': { eyebrow: 'HACKATHON / TEAMERFOLG', name: 'Dealroom.ai', short: 'Von Kundendokumenten zum Entwurf eines Vertriebsangebots.', detail: 'Ein 24-Stunden-Hackathon, unser Team wurde Zweiter. Mehrere KI-Agenten machten aus einem Kundenbriefing ein Vertriebsangebot. Ein anderes Team hat den Prototyp später in die GeekyAnts-Website übernommen.', recognition: '2. PLATZ · TEAM' },
  },
  art: {
    sysLabel: 'WORKFLOW / 01', sysLight: 'ANMELDUNG', sysN1: 'SCHICHT-<br/>ÄNDERUNG', sysN2: 'MELDE-<br/>QUEUE', sysS1: 'ANGENOMMEN · WIEDERHOLT · DEAD-LETTER', sysS2: 'NICHTS GEHT STILL VERLOREN',
    flowLabel: 'WORKFLOW / 7 SCHRITTE', flowLight: 'ABSTURZ BEI 04', flowSteps13: 'SCHRITTE 01–03', flowCheck: 'GESICHERT', flowLost: '04 · WORKER WEG', flowResumed: '04 · FORTGESETZT', flowSteps57: 'SCHRITTE 05–07', flowS1: 'KEIN SCHRITT DOPPELT', flowS2: 'EIN ANDERER WORKER MACHT WEITER',
    propLabel: 'ANGEBOTSAUTOMATISIERUNG', propLight: 'TEAM / 02', prop1: 'DOKUMENTEN-EINGANG', prop2: 'ANFORDERUNGSANALYSE', prop2s: 'AGENTEN-WORKFLOW-DESIGN', prop3: 'INTERAKTIVES ANGEBOT', prop3s: 'PRODUKTKONZEPT',
  },
  cases: { overline: 'FALLSTUDIEN', h2a: 'Was kaputtging,', h2b: 'und die Lösung.', intro: 'In jedem Projekt hier ist etwas kaputtgegangen. Sehen Sie, was schiefging und wie ich es gelöst habe. Dann versuchen Sie selbst, es kaputtzumachen.', tabs: 'Fallstudien', readFull: 'Ganze Fallstudie lesen' },
  inside: {
    overline: 'INTERAKTIV ERKUNDEN', h2a: 'Ein Blick', h2b: 'ins System.', intro: 'Tippen Sie auf einen Teil und sehen Sie, wie eine KI-Support-Antwort entsteht.',
    kicker: 'ARCHITEKTUR-EXPLORER', id: 'REFERENZDESIGN / KEIN LIVE-DIENST', mapLabel: 'KI-KUNDENSUPPORT / LEBENSZYKLUS EINER ANFRAGE', groupLabel: 'Architekturkomponenten erkunden',
    nodes: [['Kundenanfrage', 'Eingang & Identität'], ['FastAPI-Orchestrierung', 'Kontext & Routing'], ['Richtlinien-Suche', 'Freigegebenes Wissen'], ['Aktueller Nutzerkontext', 'Berechtigungsbewusste Daten'], ['Modell + Guardrails', 'Belegte Antwort oder Eskalation']],
    component: 'KOMPONENTE', prev: 'Vorherige Komponente', next: 'Nächste Komponente',
    bottom1: 'INTERAKTIVES KONZEPT / BASIERT AUF ARBEIT AN KI-SUPPORT-INFRASTRUKTUR', bottom2: 'ERKLÄRT DAS DENKEN, NICHT PRIVATE SYSTEME',
    steps: [
      { type: 'EINGANGSSCHICHT', title: 'Mit einer echten Frage beginnen.', description: 'Eine Support-Anfrage kommt ins System. Bevor eine Antwort entsteht, muss die Anwendung klären, wer fragt und welche Informationen verwendet werden dürfen.', principle: 'DESIGNPRINZIP / IDENTITÄT ZUERST' },
      { type: 'ORCHESTRIERUNG', title: 'Ein Ort für die Koordination.', description: 'FastAPI koordiniert die Anfrage: prüft die Identität, entscheidet, welche Informationen nötig sind, und verteilt die Arbeit auf Suche, Kontext und freigegebene Tools.', principle: 'DESIGNPRINZIP / KONTROLLIERTER ABLAUF' },
      { type: 'WISSENSSUCHE', title: 'Antworten auf Richtlinien stützen.', description: 'Die Suche findet relevante, freigegebene Dokumentation. Versionierung und Quellenangaben helfen, belegte Antworten von Vermutungen zu unterscheiden.', principle: 'DESIGNPRINZIP / BELEGE STATT RATEN' },
      { type: 'BERECHTIGTER KONTEXT', title: 'Den Nutzer kennen – sicher.', description: 'Der Kontostatus kann sich ändern. Abgerufen wird nur, was die anfragende Person sehen darf, statt sich auf veralteten Gesprächsverlauf zu verlassen.', principle: 'DESIGNPRINZIP / MINIMALE RECHTE' },
      { type: 'ANTWORTSICHERHEIT', title: 'Eine Antwort muss Vertrauen verdienen.', description: 'Das Modell entwirft eine Antwort aus Belegen und Kontext. Validierung, Guardrails und Eskalationswege fangen Unsicherheit und heikle Aktionen ab.', principle: 'DESIGNPRINZIP / PRÜFEN ODER ESKALIEREN' },
    ],
  },
  about: {
    overline: 'WIE ICH DENKE', h2a: 'Jenseits', h2b: 'des Idealfalls.', intro: 'Gute Technik zeigt sich, wenn etwas schiefgeht.',
    leadPre: 'Mich interessieren die Lücken', leadEm: 'zwischen', leadPost: 'Systemen. Dort passieren die meisten Fehler.',
    right: 'Ein Behördensystem läuft in einen Timeout. Ein Worker stürzt mitten in einer Aufgabe ab. Eine Lohnregel ändert sich mitten im Monat. Für diese Fälle entwerfe ich zuerst. Wiederholungen erzeugen nie Duplikate. Workflows machen dort weiter, wo sie stehen geblieben sind. Grenzen halten ein Modell im Rahmen. Ein Prompt bittet; eine Guardrail setzt durch.',
    github: 'Mein GitHub ansehen',
    caps: [['Backend', 'Python, FastAPI, Node.js, TypeScript'], ['Daten & Jobs', 'PostgreSQL, Redis, Celery, Firestore'], ['Agenten-Infrastruktur', 'Robuste Workflows, MCP-Tools, Guardrails, Replay'], ['Auslieferung', 'Docker, Observability, Flutter, CI/CD']],
  },
  exp: {
    overline: 'ERFAHRUNG', h2a: 'Gewachsen', h2b: 'durch Erfahrung.',
    deel: { dates: 'OKT — NOV 2026', title: 'Full-Stack-Entwickler · Deel', kind: 'BACKEND / ANGEWANDTE KI', detail: 'Ich habe am KI-Kundensupport gearbeitet. Ein System leitete jede Frage an den passenden spezialisierten Agenten weiter. Jede Antwort wurde geprüft, bevor sie die Kundschaft erreichte. Scheiterte die Prüfung, übernahm ein Mensch.', type: 'KI-SUPPORT-SYSTEME' },
    geeky: { dates: 'MAI 2024 — OKT 2026', intro: 'Eingestiegen als Software Engineer I, aufgestiegen zum Software Engineer III.' },
    roles: [
      ['MAI — OKT 2026', 'Software Engineer III', 'Verantwortlich für Backend-Modernisierung und komplexe Geschäftsprozesse: modulare FastAPI-Services, Hintergrundverarbeitung, Compliance-Integrationen und relationale Datenmodellierung.'],
      ['MAI 2025 — APR 2026', 'Software Engineer II', 'Ausbau in Backend-Architektur, verteilte Workflows und KI-Integrationen. Arbeit an Produktivsystemen und agentenbasierter Automatisierung mit zunehmend eigenständiger Auslieferung.'],
      ['MAI 2024 — MAI 2025', 'Software Engineer I', 'Backend-APIs und KI-gestützte Entwickler-Features gebaut, darunter Codeanalyse und Retrieval-Workflows. Gelernt, Features vom Prototyp zum nutzbaren Team-Werkzeug zu bringen.'],
    ],
    impactTitle: 'MEHR ALS CODE AUSLIEFERN', articlesTitle: 'Fachartikel',
    impacts: [['GeekWiz Rising Star', 'Eine GeekyAnts-Auszeichnung für Projektbeiträge und Entwicklung.'], ['Hackathon · 2. Platz', 'Teamerfolg mit Dealroom.ai.'], ['Recruiting & Wissensaustausch', 'An technischen Interviews und Engineering-Diskussionen im Team beteiligt.']],
  },
  contact: { overline: 'KONTAKT', h2a: 'Ihr Melde-, Lohn- oder Agentensystem fällt immer wieder aus?', h2b: 'Lassen Sie uns sprechen.', body: 'Verfügbar für Vertragsprojekte mit europäischen Teams, die Systeme für Personaleinsatz, Compliance und KI-Agenten bauen.', cta: '15-Minuten-Gespräch buchen', secondary: 'Auch offen für Festanstellungen.', about: 'ÜBER MICH', writing: 'ARTIKEL', contact: 'KONTAKT' },
  footer: { designed: 'MIT ABSICHT GESTALTET', top: 'NACH OBEN ↑' },
};

const fr: HomeText = {
  meta: { title: 'Vishvendra Tomar | Rendre fiables les systèmes qui ne le sont pas', description: 'Vishvendra Tomar rend fiables les systèmes qui ne le sont pas : des déclarations administratives qui ne se perdent pas, des agents IA robustes et une paie juste au centime près.' },
  nav: { label: 'Navigation principale', work: 'Projets', cases: 'Études de cas', experience: 'Parcours', about: 'À propos', talk: 'Travailler ensemble', home: 'Vishvendra Tomar — accueil' },
  hero: {
    overline: 'VISHVENDRA TOMAR / BACKEND & INFRASTRUCTURE D’AGENTS',
    l1: 'Je rends', l2: 'les systèmes fragiles', l3: 'fiables',
    body: 'Je suis Vishvendra Tomar, ingénieur. Je construis des systèmes qui tiennent quand les choses tournent mal. Des déclarations administratives qui ne se perdent pas. Des agents IA qui ne plantent pas et ne dépassent pas le budget. Une paie juste au centime près.',
    cta: 'Réserver un appel de 15 minutes', cta2: 'Ce qui a cassé', exploreAria: 'Voir une sélection de projets', proofLabel: 'Résultats',
    proof: [['125 000+', 'prestations sur le nouveau backend, contre environ 10 000 au départ'], ['1 000+', 'entreprises servies par cette plateforme'], ['20+', 'workflows d’agents en production pour plus de 300 salariés'], ['≈0', 'échec d’agent, alors qu’ils étaient fréquents']],
    end: 'DÉCLARATIONS / AGENTS IA / PAIE', scroll: 'FAITES DÉFILER ↓',
  },
  work: {
    overline: 'PROJETS CHOISIS', h2a: 'La preuve,', h2b: 'c’est le travail.', intro: 'De vrais problèmes que j’ai aidé à résoudre. Pas juste une liste d’outils.',
    seeBroke: 'Ce qui a cassé', full: 'Étude de cas complète', seeBrokeAria: 'Ce qui a cassé dans', fullAria: 'Lire l’étude de cas :',
    all: 'Toutes les études de cas ↗', gallery: 'Galerie d’architecture ↗', disclaimer: 'Les projets clients sont présentés sans publier de code privé ni d’informations confidentielles.', caption: 'VISHVENDRA / PROJETS CHOISIS',
  },
  projects: {
    'workforce-infrastructure': { eyebrow: 'DÉCLARATIONS / PAIE', name: 'Infrastructure RH', short: 'Un système public qui tombe. Des déclarations qui ne doivent pas échouer.', detail: 'Les agences d’intérim doivent déclarer chaque travailleur avant chaque prestation. L’ancien système perdait des déclarations et demandait des relances manuelles. J’ai construit l’essentiel du backend et travaillé sur l’application Flutter. Désormais, rien n’est perdu ni déclaré deux fois. La plateforme est passée d’environ 10 000 à plus de 125 000 prestations et plus de 1 000 entreprises.' },
    antagents: { eyebrow: 'MOTEUR D’AGENTS DURABLE', name: 'Ant Agents', short: 'Des agents IA qui finissent le travail, même après une panne.', detail: 'L’onboarding et les relances de feuilles de temps passaient par e-mail. J’ai construit le système qui les confie à des agents IA. J’étais seul responsable de l’infrastructure des agents et de la modélisation. Plus de 20 workflows servent aujourd’hui plus de 300 salariés. Ce qui prenait des jours prend moins d’une journée. Les échecs sont passés de fréquents à quasi nuls.' },
    'dealroom-ai': { eyebrow: 'HACKATHON / RÉUSSITE D’ÉQUIPE', name: 'Dealroom.ai', short: 'Des documents client à un projet de proposition commerciale.', detail: 'Un hackathon de 24 heures, et notre équipe a fini deuxième. Plusieurs agents IA transformaient un brief client en proposition commerciale. Une autre équipe a ensuite intégré le prototype au site de GeekyAnts.', recognition: '2E PLACE · ÉQUIPE' },
  },
  art: {
    sysLabel: 'WORKFLOW / 01', sysLight: 'DÉCLARATION', sysN1: 'CHANGEMENT<br/>DE PRESTATION', sysN2: 'FILE DE<br/>DÉCLARATIONS', sysS1: 'ACCEPTÉE · RELANCÉE · DEAD-LETTER', sysS2: 'RIEN NE DISPARAÎT EN SILENCE',
    flowLabel: 'WORKFLOW / 7 ÉTAPES', flowLight: 'PANNE À 04', flowSteps13: 'ÉTAPES 01–03', flowCheck: 'SAUVEGARDÉES', flowLost: '04 · WORKER PERDU', flowResumed: '04 · REPRISE', flowSteps57: 'ÉTAPES 05–07', flowS1: 'AUCUNE ÉTAPE REFAITE', flowS2: 'UN AUTRE WORKER REPREND',
    propLabel: 'AUTOMATISATION DES PROPOSITIONS', propLight: 'ÉQUIPE / 02', prop1: 'RÉCEPTION DES DOCUMENTS', prop2: 'ANALYSE DES BESOINS', prop2s: 'CONCEPTION DU WORKFLOW D’AGENTS', prop3: 'PROPOSITION INTERACTIVE', prop3s: 'CONCEPT PRODUIT',
  },
  cases: { overline: 'ÉTUDES DE CAS', h2a: 'Ce qui a cassé,', h2b: 'et la solution.', intro: 'Dans chaque projet ici, quelque chose a cassé. Voyez quoi, et comment je l’ai réparé. Puis essayez de le casser vous-même.', tabs: 'Études de cas', readFull: 'Lire l’étude de cas complète' },
  inside: {
    overline: 'EXPLORATION INTERACTIVE', h2a: 'Au cœur', h2b: 'du système.', intro: 'Touchez une partie pour voir comment se construit une réponse du support IA.',
    kicker: 'EXPLORATEUR D’ARCHITECTURE', id: 'CONCEPTION DE RÉFÉRENCE / PAS UN SERVICE EN LIGNE', mapLabel: 'SUPPORT CLIENT IA / CYCLE DE VIE D’UNE DEMANDE', groupLabel: 'Explorer les composants de l’architecture',
    nodes: [['Demande client', 'Entrée et identité'], ['Orchestration FastAPI', 'Contexte et routage'], ['Recherche de règles', 'Connaissances validées'], ['Contexte utilisateur', 'Données selon les droits'], ['Modèle + garde-fous', 'Réponse étayée ou escalade']],
    component: 'COMPOSANT', prev: 'Composant précédent', next: 'Composant suivant',
    bottom1: 'CONCEPT INTERACTIF / INSPIRÉ D’UN TRAVAIL SUR L’INFRASTRUCTURE DE SUPPORT IA', bottom2: 'POUR EXPLIQUER LA DÉMARCHE, PAS EXPOSER DES SYSTÈMES PRIVÉS',
    steps: [
      { type: 'COUCHE D’ENTRÉE', title: 'Partir d’une vraie question.', description: 'Une demande de support entre dans le système. Avant de générer une réponse, l’application doit établir qui demande et quelles informations peuvent être utilisées.', principle: 'PRINCIPE / L’IDENTITÉ D’ABORD' },
      { type: 'ORCHESTRATION', title: 'Un seul point de coordination.', description: 'FastAPI coordonne la demande : vérifie l’identité, décide des informations nécessaires et répartit le travail entre recherche, contexte et outils autorisés.', principle: 'PRINCIPE / FLUX MAÎTRISÉ' },
      { type: 'RECHERCHE DE CONNAISSANCES', title: 'Ancrer les réponses dans les règles.', description: 'La recherche trouve la documentation pertinente et validée. Versions et citations aident à distinguer une réponse étayée d’une supposition.', principle: 'PRINCIPE / DES PREUVES, PAS DES SUPPOSITIONS' },
      { type: 'CONTEXTE AUTORISÉ', title: 'Connaître l’utilisateur, en sécurité.', description: 'L’état d’un compte peut changer. On ne récupère que ce que le demandeur a le droit de voir, sans se fier à un historique de conversation périmé.', principle: 'PRINCIPE / MOINDRE PRIVILÈGE' },
      { type: 'SÛRETÉ DES RÉPONSES', title: 'Une réponse doit mériter la confiance.', description: 'Le modèle rédige une réponse à partir de preuves et du contexte. Validation, garde-fous et escalade gèrent l’incertitude et les actions sensibles.', principle: 'PRINCIPE / VÉRIFIER OU ESCALADER' },
    ],
  },
  about: {
    overline: 'MA FAÇON DE PENSER', h2a: 'Au-delà', h2b: 'du cas idéal.', intro: 'La bonne ingénierie se révèle quand les choses tournent mal.',
    leadPre: 'Ce qui m’intéresse, ce sont les zones', leadEm: 'entre', leadPost: 'les systèmes. C’est là que naissent la plupart des pannes.',
    right: 'Un système public expire. Un worker plante au milieu d’une tâche. Une règle de paie change en cours de mois. Je conçois d’abord pour ces cas-là. Les relances ne créent jamais de doublon. Les workflows reprennent là où ils se sont arrêtés. Des limites empêchent un modèle d’aller trop loin. Un prompt demande ; un garde-fou impose.',
    github: 'Voir mon GitHub',
    caps: [['Backend', 'Python, FastAPI, Node.js, TypeScript'], ['Données et tâches', 'PostgreSQL, Redis, Celery, Firestore'], ['Infrastructure d’agents', 'Workflows durables, outils MCP, garde-fous, rejeu'], ['Livraison', 'Docker, observabilité, Flutter, CI/CD']],
  },
  exp: {
    overline: 'PARCOURS', h2a: 'Construit par', h2b: 'l’expérience.',
    deel: { dates: 'OCT. — NOV. 2026', title: 'Développeur full-stack · Deel', kind: 'BACKEND / IA APPLIQUÉE', detail: 'J’ai travaillé sur le support client par IA. Un système confiait chaque question au bon agent spécialisé. Chaque réponse était vérifiée avant d’atteindre le client. En cas d’échec, une personne prenait le relais.', type: 'SYSTÈMES DE SUPPORT IA' },
    geeky: { dates: 'MAI 2024 — OCT. 2026', intro: 'Arrivé comme Software Engineer I, devenu Software Engineer III.' },
    roles: [
      ['MAI — OCT. 2026', 'Software Engineer III', 'Responsable de la modernisation du backend et de processus métier complexes : services FastAPI modulaires, traitements en arrière-plan, intégrations de conformité et modélisation relationnelle.'],
      ['MAI 2025 — AVR. 2026', 'Software Engineer II', 'Élargissement vers l’architecture backend, les workflows distribués et les intégrations IA. Travail sur des systèmes en production et de l’automatisation par agents, avec une autonomie croissante.'],
      ['MAI 2024 — MAI 2025', 'Software Engineer I', 'Développement d’API backend et de fonctionnalités IA pour développeurs, dont l’analyse de code et des workflows de recherche. Appris à amener une fonctionnalité du prototype à l’outil d’équipe.'],
    ],
    impactTitle: 'AU-DELÀ DU CODE', articlesTitle: 'Articles techniques',
    impacts: [['GeekWiz Rising Star', 'Une distinction GeekyAnts pour mes contributions aux projets et ma progression.'], ['Hackathon · 2e place', 'Réussite d’équipe avec Dealroom.ai.'], ['Recrutement et partage', 'Participation aux entretiens techniques et aux discussions d’ingénierie.']],
  },
  contact: { overline: 'CONTACT', h2a: 'Un système de déclarations, de paie ou d’agents qui casse sans cesse ?', h2b: 'Parlons-en.', body: 'Disponible en freelance pour des équipes européennes qui construisent des systèmes RH, de conformité et d’agents IA.', cta: 'Réserver un appel de 15 minutes', secondary: 'Également ouvert à un poste à temps plein.', about: 'À PROPOS', writing: 'ARTICLES', contact: 'CONTACT' },
  footer: { designed: 'CONÇU AVEC INTENTION', top: 'HAUT DE PAGE ↑' },
};

const nl: HomeText = {
  meta: { title: 'Vishvendra Tomar | Onbetrouwbare systemen betrouwbaar maken', description: 'Vishvendra Tomar maakt onbetrouwbare systemen betrouwbaar: overheidsaangiftes die niet verloren gaan, robuuste AI-agents en loonverwerking die tot op de cent klopt.' },
  nav: { label: 'Hoofdnavigatie', work: 'Werk', cases: 'Casestudy’s', experience: 'Ervaring', about: 'Over mij', talk: 'Samenwerken', home: 'Vishvendra Tomar — home' },
  hero: {
    overline: 'VISHVENDRA TOMAR / BACKEND- & AGENT-INFRASTRUCTUUR',
    l1: 'Ik maak', l2: 'onbetrouwbare systemen', l3: 'betrouwbaar',
    body: 'Ik ben Vishvendra Tomar, engineer. Ik bouw systemen die blijven werken als het misgaat. Overheidsaangiftes die niet verloren gaan. AI-agents die niet crashen of over budget gaan. Loonverwerking die tot op de cent klopt.',
    cta: 'Plan een gesprek van 15 minuten', cta2: 'Wat er misging', exploreAria: 'Bekijk geselecteerd werk', proofLabel: 'Resultaten',
    proof: [['125.000+', 'shifts op de nieuwe backend, vanaf zo’n 10.000'], ['1.000+', 'bedrijven op dat platform'], ['20+', 'live agent-workflows voor 300+ medewerkers'], ['≈0', 'agent-fouten, waar die eerst vaak voorkwamen']],
    end: 'OVERHEIDSAANGIFTES / AI-AGENTS / LOONVERWERKING', scroll: 'SCROL VERDER ↓',
  },
  work: {
    overline: 'GESELECTEERD WERK', h2a: 'Het bewijs', h2b: 'zit in het werk.', intro: 'Echte problemen die ik heb helpen oplossen. Niet zomaar een lijst tools.',
    seeBroke: 'Wat er misging', full: 'Volledige casestudy', seeBrokeAria: 'Wat er misging bij', fullAria: 'Lees de casestudy:',
    all: 'Alle casestudy’s ↗', gallery: 'Architectuurgalerij ↗', disclaimer: 'Klantprojecten worden besproken zonder privécode of vertrouwelijke informatie te publiceren.', caption: 'VISHVENDRA / GESELECTEERD WERK',
  },
  projects: {
    'workforce-infrastructure': { eyebrow: 'OVERHEIDSAANGIFTES / LOONVERWERKING', name: 'Personeelsinfrastructuur', short: 'Een overheidssysteem dat uitvalt. Aangiftes die niet mogen mislukken.', detail: 'Uitzendbureaus moeten elke werknemer vóór elke shift bij de overheid aangeven. Het oude systeem verloor aangiftes en vroeg handmatig herhalen. Ik bouwde het grootste deel van de backend en werkte mee aan de Flutter-app. Nu gaat er niets verloren en wordt niets dubbel aangegeven. Het platform groeide van zo’n 10.000 naar 125.000+ shifts en 1.000+ bedrijven.' },
    antagents: { eyebrow: 'ROBUUSTE AGENT-RUNTIME', name: 'Ant Agents', short: 'AI-agents die hun werk afmaken, ook na een crash.', detail: 'Onboarding en het najagen van urenstaten liepen via e-mail. Ik bouwde het systeem dat dit met AI-agents doet. Ik was alleen verantwoordelijk voor de agent-infrastructuur en de modellering. Meer dan 20 workflows bedienen nu 300+ medewerkers. Wat dagen duurde, duurt nu minder dan een dag. Fouten gingen van vaak naar bijna nul.' },
    'dealroom-ai': { eyebrow: 'HACKATHON / TEAMPRESTATIE', name: 'Dealroom.ai', short: 'Van klantdocumenten naar een eerste versie van een offerte.', detail: 'Een hackathon van 24 uur, en ons team werd tweede. Meerdere AI-agents maakten van een klantbriefing een commerciële offerte. Een ander team nam het prototype later op in de website van GeekyAnts.', recognition: '2E PLAATS · TEAM' },
  },
  art: {
    sysLabel: 'WORKFLOW / 01', sysLight: 'AANGIFTE', sysN1: 'SHIFT-<br/>WIJZIGING', sysN2: 'AANGIFTE-<br/>WACHTRIJ', sysS1: 'AANVAARD · OPNIEUW · DEAD-LETTER', sysS2: 'NIETS VERDWIJNT ONGEMERKT',
    flowLabel: 'WORKFLOW / 7 STAPPEN', flowLight: 'CRASH BIJ 04', flowSteps13: 'STAPPEN 01–03', flowCheck: 'OPGESLAGEN', flowLost: '04 · WORKER WEG', flowResumed: '04 · HERVAT', flowSteps57: 'STAPPEN 05–07', flowS1: 'GEEN STAP OPNIEUW', flowS2: 'EEN ANDERE WORKER GAAT VERDER',
    propLabel: 'OFFERTE-AUTOMATISERING', propLight: 'TEAM / 02', prop1: 'DOCUMENTEN INLEZEN', prop2: 'BEHOEFTEANALYSE', prop2s: 'ONTWERP AGENT-WORKFLOW', prop3: 'INTERACTIEVE OFFERTE', prop3s: 'PRODUCTCONCEPT',
  },
  cases: { overline: 'CASESTUDY’S', h2a: 'Wat er brak,', h2b: 'en de oplossing.', intro: 'In elk project hier ging iets stuk. Zie wat er misging en hoe ik het oploste. Probeer het daarna zelf stuk te maken.', tabs: 'Casestudy’s', readFull: 'Lees de volledige casestudy' },
  inside: {
    overline: 'INTERACTIEF VERKENNEN', h2a: 'Binnen in', h2b: 'het systeem.', intro: 'Tik op een onderdeel en zie hoe een AI-supportantwoord tot stand komt.',
    kicker: 'ARCHITECTUURVERKENNER', id: 'REFERENTIEONTWERP / GEEN LIVE DIENST', mapLabel: 'AI-KLANTENSERVICE / LEVENSLOOP VAN EEN VRAAG', groupLabel: 'Architectuuronderdelen verkennen',
    nodes: [['Klantvraag', 'Binnenkomst & identiteit'], ['FastAPI-orchestratie', 'Context & routering'], ['Beleid opzoeken', 'Goedgekeurde kennis'], ['Actuele gebruikerscontext', 'Data volgens rechten'], ['Model + guardrails', 'Onderbouwd antwoord of escalatie']],
    component: 'ONDERDEEL', prev: 'Vorig onderdeel', next: 'Volgend onderdeel',
    bottom1: 'INTERACTIEF CONCEPT / GEBASEERD OP WERK AAN AI-SUPPORTINFRASTRUCTUUR', bottom2: 'OM HET DENKWERK UIT TE LEGGEN, NIET OM PRIVÉSYSTEMEN TE TONEN',
    steps: [
      { type: 'INVOERLAAG', title: 'Begin bij een echte vraag.', description: 'Een supportvraag komt het systeem binnen. Voordat er een antwoord komt, moet de applicatie vaststellen wie vraagt en welke informatie gebruikt mag worden.', principle: 'ONTWERPPRINCIPE / EERST IDENTITEIT' },
      { type: 'ORCHESTRATIE', title: 'Eén plek die coördineert.', description: 'FastAPI coördineert de vraag: controleert de identiteit, bepaalt welke informatie nodig is en verdeelt het werk over zoeken, context en toegestane tools.', principle: 'ONTWERPPRINCIPE / GECONTROLEERDE FLOW' },
      { type: 'KENNIS OPZOEKEN', title: 'Antwoorden onderbouwen met beleid.', description: 'Zoeken levert relevante, goedgekeurde documentatie op. Versies en bronvermelding helpen onderbouwde antwoorden te onderscheiden van gokken.', principle: 'ONTWERPPRINCIPE / BEWIJS BOVEN GOKWERK' },
      { type: 'TOEGESTANE CONTEXT', title: 'Ken de gebruiker, veilig.', description: 'De status van een account kan veranderen. Haal alleen op wat de vrager mag zien, in plaats van te vertrouwen op een verouderd gespreksgeheugen.', principle: 'ONTWERPPRINCIPE / MINIMALE RECHTEN' },
      { type: 'VEILIGE ANTWOORDEN', title: 'Een antwoord moet vertrouwen verdienen.', description: 'Het model stelt een antwoord op uit bewijs en context. Validatie, guardrails en escalatie vangen onzekerheid en gevoelige acties op.', principle: 'ONTWERPPRINCIPE / CONTROLEER OF ESCALEER' },
    ],
  },
  about: {
    overline: 'HOE IK DENK', h2a: 'Verder dan', h2b: 'het ideale pad.', intro: 'Goede techniek laat zich zien als het misgaat.',
    leadPre: 'Ik let op de gaten', leadEm: 'tussen', leadPost: 'systemen. Daar gaat het meestal mis.',
    right: 'Een overheidssysteem geeft een time-out. Een worker crasht halverwege een taak. Een loonregel verandert midden in de maand. Voor die gevallen ontwerp ik eerst. Herhalingen maken nooit dubbels. Workflows gaan verder waar ze stopten. Limieten houden een model binnen de lijntjes. Een prompt vraagt; een guardrail dwingt af.',
    github: 'Bekijk mijn GitHub',
    caps: [['Backend', 'Python, FastAPI, Node.js, TypeScript'], ['Data & jobs', 'PostgreSQL, Redis, Celery, Firestore'], ['Agent-infrastructuur', 'Robuuste workflows, MCP-tools, guardrails, replay'], ['Oplevering', 'Docker, observability, Flutter, CI/CD']],
  },
  exp: {
    overline: 'ERVARING', h2a: 'Gebouwd op', h2b: 'ervaring.',
    deel: { dates: 'OKT — NOV 2026', title: 'Full-stack developer · Deel', kind: 'BACKEND / TOEGEPASTE AI', detail: 'Ik werkte aan AI-klantenservice. Eén systeem stuurde elke vraag naar de juiste gespecialiseerde agent. Elk antwoord werd gecontroleerd voordat het de klant bereikte. Lukte dat niet, dan nam een mens het over.', type: 'AI-SUPPORTSYSTEMEN' },
    geeky: { dates: 'MEI 2024 — OKT 2026', intro: 'Begonnen als Software Engineer I, doorgegroeid tot Software Engineer III.' },
    roles: [
      ['MEI — OKT 2026', 'Software Engineer III', 'Verantwoordelijk voor backendmodernisering en complexe bedrijfsprocessen: modulaire FastAPI-services, achtergrondverwerking, compliance-koppelingen en relationele datamodellering.'],
      ['MEI 2025 — APR 2026', 'Software Engineer II', 'Doorgegroeid naar backendarchitectuur, gedistribueerde workflows en AI-integraties. Werkte aan productiesystemen en automatisering met agents, steeds zelfstandiger.'],
      ['MEI 2024 — MEI 2025', 'Software Engineer I', 'Bouwde backend-API’s en AI-functies voor ontwikkelaars, waaronder codeanalyse en zoekworkflows. Leerde features van prototype tot bruikbare teamtool te brengen.'],
    ],
    impactTitle: 'MEER DAN CODE OPLEVEREN', articlesTitle: 'Technische artikelen',
    impacts: [['GeekWiz Rising Star', 'Een GeekyAnts-onderscheiding voor projectbijdragen en groei.'], ['Hackathon · 2e plaats', 'Teamprestatie met Dealroom.ai.'], ['Werving & kennisdeling', 'Nam deel aan technische interviews en engineeringdiscussies in het team.']],
  },
  contact: { overline: 'CONTACT', h2a: 'Een aangifte-, loon- of agentsysteem dat steeds stukgaat?', h2b: 'Laten we praten.', body: 'Beschikbaar voor opdrachten bij Europese teams die systemen bouwen voor personeelsplanning, compliance en AI-agents.', cta: 'Plan een gesprek van 15 minuten', secondary: 'Ook open voor een vaste functie.', about: 'OVER MIJ', writing: 'ARTIKELEN', contact: 'CONTACT' },
  footer: { designed: 'MET AANDACHT ONTWORPEN', top: 'TERUG NAAR BOVEN ↑' },
};

const it: HomeText = {
  meta: { title: 'Vishvendra Tomar | Rendere affidabili i sistemi inaffidabili', description: 'Vishvendra Tomar rende affidabili i sistemi inaffidabili: comunicazioni obbligatorie che non si perdono, agenti IA robusti e buste paga corrette al centesimo.' },
  nav: { label: 'Navigazione principale', work: 'Lavori', cases: 'Casi di studio', experience: 'Esperienza', about: 'Chi sono', talk: 'Lavoriamo insieme', home: 'Vishvendra Tomar — home' },
  hero: {
    overline: 'VISHVENDRA TOMAR / BACKEND E INFRASTRUTTURA PER AGENTI',
    l1: 'Rendo affidabili', l2: 'i sistemi', l3: 'inaffidabili',
    body: 'Sono Vishvendra Tomar, ingegnere. Costruisco sistemi che continuano a funzionare quando qualcosa va storto. Comunicazioni obbligatorie che non si perdono. Agenti IA che non si bloccano e non sforano il budget. Buste paga corrette al centesimo.',
    cta: 'Prenota una chiamata di 15 minuti', cta2: 'Cosa si è rotto', exploreAria: 'Guarda i lavori selezionati', proofLabel: 'Risultati',
    proof: [['125.000+', 'turni sul nuovo backend, partendo da circa 10.000'], ['1.000+', 'aziende servite dalla piattaforma'], ['20+', 'workflow di agenti in produzione per oltre 300 dipendenti'], ['≈0', 'errori degli agenti, prima frequenti']],
    end: 'COMUNICAZIONI OBBLIGATORIE / AGENTI IA / BUSTE PAGA', scroll: 'SCORRI ↓',
  },
  work: {
    overline: 'LAVORI SELEZIONATI', h2a: 'La prova', h2b: 'è nel lavoro.', intro: 'Problemi reali che ho aiutato a risolvere. Non solo un elenco di strumenti.',
    seeBroke: 'Cosa si è rotto', full: 'Caso di studio completo', seeBrokeAria: 'Cosa si è rotto in', fullAria: 'Leggi il caso di studio:',
    all: 'Tutti i casi di studio ↗', gallery: 'Galleria dell’architettura ↗', disclaimer: 'I progetti per clienti sono descritti senza pubblicare codice privato o informazioni riservate.', caption: 'VISHVENDRA / LAVORI SELEZIONATI',
  },
  projects: {
    'workforce-infrastructure': { eyebrow: 'COMUNICAZIONI OBBLIGATORIE / BUSTE PAGA', name: 'Infrastruttura per il personale', short: 'Un sistema pubblico che cade. Comunicazioni che non possono fallire.', detail: 'Le agenzie per il lavoro devono registrare ogni lavoratore prima di ogni turno. Il vecchio sistema perdeva comunicazioni e richiedeva rinvii manuali. Ho costruito gran parte del backend e ho lavorato all’app Flutter. Ora nulla si perde e nulla viene inviato due volte. La piattaforma è passata da circa 10.000 a oltre 125.000 turni e più di 1.000 aziende.' },
    antagents: { eyebrow: 'RUNTIME DURABILE PER AGENTI', name: 'Ant Agents', short: 'Agenti IA che finiscono il lavoro, anche dopo un crash.', detail: 'Onboarding e solleciti dei timesheet passavano per email. Ho costruito il sistema che li affida ad agenti IA. Ero l’unico responsabile dell’infrastruttura degli agenti e della modellazione. Oltre 20 workflow servono oggi più di 300 dipendenti. Ciò che richiedeva giorni ora richiede meno di un giorno. Gli errori sono passati da frequenti a quasi zero.' },
    'dealroom-ai': { eyebrow: 'HACKATHON / RISULTATO DI SQUADRA', name: 'Dealroom.ai', short: 'Dai documenti del cliente a una bozza di proposta commerciale.', detail: 'Un hackathon di 24 ore, e il nostro team è arrivato secondo. Più agenti IA trasformavano il brief di un cliente in una proposta commerciale. Un altro team ha poi integrato il prototipo nel sito di GeekyAnts.', recognition: '2° POSTO · TEAM' },
  },
  art: {
    sysLabel: 'WORKFLOW / 01', sysLight: 'REGISTRAZIONE', sysN1: 'MODIFICA<br/>TURNO', sysN2: 'CODA<br/>INVII', sysS1: 'ACCETTATA · RIPETUTA · DEAD-LETTER', sysS2: 'NIENTE SPARISCE IN SILENZIO',
    flowLabel: 'WORKFLOW / 7 PASSI', flowLight: 'CRASH AL 04', flowSteps13: 'PASSI 01–03', flowCheck: 'SALVATI', flowLost: '04 · WORKER PERSO', flowResumed: '04 · RIPRESO', flowSteps57: 'PASSI 05–07', flowS1: 'NESSUN PASSO RIPETUTO', flowS2: 'UN ALTRO WORKER RIPRENDE',
    propLabel: 'AUTOMAZIONE DELLE PROPOSTE', propLight: 'TEAM / 02', prop1: 'ACQUISIZIONE DOCUMENTI', prop2: 'ANALISI DEI REQUISITI', prop2s: 'DESIGN DEL WORKFLOW DI AGENTI', prop3: 'PROPOSTA INTERATTIVA', prop3s: 'CONCEPT DI PRODOTTO',
  },
  cases: { overline: 'CASI DI STUDIO', h2a: 'Cosa si è rotto,', h2b: 'e la soluzione.', intro: 'In ogni progetto qui qualcosa si è rotto. Guarda cosa e come l’ho risolto. Poi prova a romperlo tu.', tabs: 'Casi di studio', readFull: 'Leggi il caso di studio completo' },
  inside: {
    overline: 'ESPLORAZIONE INTERATTIVA', h2a: 'Dentro', h2b: 'il sistema.', intro: 'Tocca una parte e scopri come nasce una risposta dell’assistenza IA.',
    kicker: 'ESPLORATORE DELL’ARCHITETTURA', id: 'DESIGN DI RIFERIMENTO / NON È UN SERVIZIO ATTIVO', mapLabel: 'ASSISTENZA CLIENTI IA / CICLO DI VITA DI UNA RICHIESTA', groupLabel: 'Esplora i componenti dell’architettura',
    nodes: [['Richiesta del cliente', 'Ingresso e identità'], ['Orchestrazione FastAPI', 'Contesto e instradamento'], ['Ricerca delle policy', 'Conoscenza approvata'], ['Contesto utente attuale', 'Dati secondo i permessi'], ['Modello + guardrail', 'Risposta fondata o escalation']],
    component: 'COMPONENTE', prev: 'Componente precedente', next: 'Componente successivo',
    bottom1: 'CONCEPT INTERATTIVO / BASATO SUL LAVORO SULL’INFRASTRUTTURA DI SUPPORTO IA', bottom2: 'PER SPIEGARE IL RAGIONAMENTO, NON PER ESPORRE SISTEMI PRIVATI',
    steps: [
      { type: 'LIVELLO DI INGRESSO', title: 'Partire da una domanda reale.', description: 'Una richiesta di assistenza entra nel sistema. Prima di generare una risposta, l’applicazione deve stabilire chi chiede e quali informazioni può usare.', principle: 'PRINCIPIO / PRIMA L’IDENTITÀ' },
      { type: 'ORCHESTRAZIONE', title: 'Un unico punto di coordinamento.', description: 'FastAPI coordina la richiesta: verifica l’identità, decide quali informazioni servono e smista il lavoro tra ricerca, contesto e strumenti autorizzati.', principle: 'PRINCIPIO / FLUSSO CONTROLLATO' },
      { type: 'RICERCA DELLA CONOSCENZA', title: 'Basare le risposte sulle policy.', description: 'La ricerca trova documentazione pertinente e approvata. Versioni e citazioni aiutano a distinguere una risposta fondata da un’ipotesi.', principle: 'PRINCIPIO / PROVE, NON IPOTESI' },
      { type: 'CONTESTO AUTORIZZATO', title: 'Conoscere l’utente, in sicurezza.', description: 'Lo stato di un account può cambiare. Si recupera solo ciò che il richiedente può vedere, senza affidarsi a una memoria di conversazione superata.', principle: 'PRINCIPIO / MINIMO PRIVILEGIO' },
      { type: 'SICUREZZA DELLE RISPOSTE', title: 'Una risposta deve guadagnarsi fiducia.', description: 'Il modello redige una risposta da prove e contesto. Validazione, guardrail ed escalation gestiscono incertezza e azioni delicate.', principle: 'PRINCIPIO / VERIFICA O ESCALATION' },
    ],
  },
  about: {
    overline: 'COME RAGIONO', h2a: 'Oltre', h2b: 'il caso ideale.', intro: 'La buona ingegneria si vede quando qualcosa va storto.',
    leadPre: 'Mi interessano i vuoti', leadEm: 'tra', leadPost: 'i sistemi. È lì che nasce la maggior parte dei guasti.',
    right: 'Un sistema pubblico va in timeout. Un worker si blocca a metà di un’attività. Una regola retributiva cambia a metà mese. Progetto prima di tutto per questi casi. I tentativi ripetuti non creano mai duplicati. I workflow riprendono da dove si erano fermati. I limiti impediscono a un modello di spingersi troppo oltre. Un prompt chiede; un guardrail impone.',
    github: 'Guarda il mio GitHub',
    caps: [['Backend', 'Python, FastAPI, Node.js, TypeScript'], ['Dati e job', 'PostgreSQL, Redis, Celery, Firestore'], ['Infrastruttura per agenti', 'Workflow durabili, strumenti MCP, guardrail, replay'], ['Rilascio', 'Docker, osservabilità, Flutter, CI/CD']],
  },
  exp: {
    overline: 'ESPERIENZA', h2a: 'Costruito', h2b: 'con l’esperienza.',
    deel: { dates: 'OTT — NOV 2026', title: 'Sviluppatore full-stack · Deel', kind: 'BACKEND / IA APPLICATA', detail: 'Ho lavorato all’assistenza clienti con IA. Un sistema affidava ogni domanda all’agente specializzato giusto. Ogni risposta veniva verificata prima di arrivare al cliente. Se non passava, subentrava una persona.', type: 'SISTEMI DI SUPPORTO IA' },
    geeky: { dates: 'MAG 2024 — OTT 2026', intro: 'Sono entrato come Software Engineer I e sono cresciuto fino a Software Engineer III.' },
    roles: [
      ['MAG — OTT 2026', 'Software Engineer III', 'Responsabile della modernizzazione del backend e di processi aziendali complessi: servizi FastAPI modulari, elaborazione in background, integrazioni di conformità e modellazione relazionale dei dati.'],
      ['MAG 2025 — APR 2026', 'Software Engineer II', 'Esteso il lavoro ad architettura backend, workflow distribuiti e integrazioni IA. Ho lavorato su sistemi in produzione e automazione con agenti, con consegne sempre più autonome.'],
      ['MAG 2024 — MAG 2025', 'Software Engineer I', 'Ho costruito API backend e funzionalità IA per sviluppatori, tra cui analisi del codice e workflow di ricerca. Ho imparato a portare una funzionalità dal prototipo a strumento utile per il team.'],
    ],
    impactTitle: 'OLTRE IL CODICE', articlesTitle: 'Articoli tecnici',
    impacts: [['GeekWiz Rising Star', 'Un riconoscimento di GeekyAnts per i contributi ai progetti e la crescita.'], ['Hackathon · 2° posto', 'Risultato di squadra con Dealroom.ai.'], ['Selezione e condivisione', 'Partecipazione a colloqui tecnici e discussioni di ingegneria nel team.']],
  },
  contact: { overline: 'CONTATTI', h2a: 'Un sistema di comunicazioni, paghe o agenti che continua a rompersi?', h2b: 'Parliamone.', body: 'Disponibile per contratti con team europei che costruiscono sistemi per il personale, la conformità e gli agenti IA.', cta: 'Prenota una chiamata di 15 minuti', secondary: 'Aperto anche a ruoli a tempo pieno.', about: 'CHI SONO', writing: 'ARTICOLI', contact: 'CONTATTI' },
  footer: { designed: 'PROGETTATO CON INTENZIONE', top: 'TORNA SU ↑' },
};

export const home: Record<Lang, HomeText> = { en, de, fr, nl, it };
