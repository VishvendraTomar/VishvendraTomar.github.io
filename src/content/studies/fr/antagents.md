---
slug: antagents
title: Ant Agents
summary: "Vendredi après-midi. Des feuilles de temps manquent encore. Quelqu’un doit écrire à chaque personne, puis relancer lundi. J’ai construit le système qui le fait aujourd’hui avec des agents IA, pour plus de 300 salariés."
figure: automation
order: 2
updated: 2026-11-20
stack: [AWS, MCP, Exécution durable]
before:
  - "L’onboarding, les contrôles de conformité du télétravail et les relances de feuilles de temps se faisaient à la main, par e-mail."
  - "Les processus prenaient des jours."
  - "Les échecs étaient fréquents."
after:
  - "Plus de 20 workflows en production sur le moteur que j’ai construit, pour plus de 300 salariés."
  - "Des processus qui prenaient des jours se terminent dans la journée."
  - "Les échecs sont passés de fréquents à quasi nuls."
eyebrow: Moteur d’agents durable
tagline: "Des agents IA qui finissent le travail, même après une panne."
highlights:
  - title: "Reprendre, pas recommencer"
    text: "Un worker plante à l’étape 4 sur 7. Un autre reprend à l’étape 4. Rien ne tourne deux fois."
  - title: "Rejouer chaque échec"
    text: "Chaque réponse du modèle est enregistrée. Une exécution échouée se rejoue à l’identique, étape par étape."
  - title: "Du contexte, pas l’historique"
    text: "Les coûts ont grimpé quand chaque étape recevait tout l’historique. Désormais, chaque étape reçoit seulement l’utile."
  - title: "Des garde-fous en couches"
    text: "Permissions, limites, contrôles, validation humaine et journal d’audit. Un prompt demande ; un garde-fou impose."
---
## Mon rôle

J’étais seul responsable de l’infrastructure des agents et de la modélisation, et j’ai construit l’essentiel du backend. Les business analysts assemblaient des processus à partir d’agents existants. Les développeurs pouvaient ajouter un nouvel agent quand un processus avait besoin d’une capacité supplémentaire. La plateforme tournait en interne sur AWS, et les agents accédaient aux autres systèmes via des outils MCP.

## Le problème

Intégrer un nouvel arrivant, vérifier la conformité du télétravail, courir après les feuilles de temps manquantes : tout cela reposait sur des personnes qui écrivaient des e-mails. Chaque processus prenait des jours, parce que chaque étape attendait que quelqu’un pense à la suivante.

Confier ce travail à des agents LLM apporte trois nouveaux problèmes. Un agent peut dériver. Une exécution peut planter en plein milieu. Et une exécution peut coûter bien plus que prévu, sans que personne ne le remarque avant la facture. Le moteur existe pour rendre ces trois points fiables.

## Un workflow de bout en bout

Quand un salarié ignore une relance de feuille de temps, un agent lit ses commits GitHub de la semaine via un outil MCP. Il en tire un brouillon de saisie et l’envoie à une personne pour validation. Personne n’a à relancer qui que ce soit, et rien n’est déposé sans un oui.

## Une panne à l’étape 4 sur 7

Un workflow peut attendre des personnes entre deux étapes, et pendant ce temps les workers redémarrent, sont redéployés ou tombent. Si la machine qui exécute un workflow meurt à l’étape 4 sur 7, tout recommencer n’est pas acceptable : l’étape 2 a déjà envoyé un e-mail à quelqu’un.

Chaque étape terminée est sauvegardée avec son résultat. Quand un worker disparaît, un autre reprend l’exécution, charge le dernier point de sauvegarde et repart à l’étape 4. Les étapes 1 à 3 ne sont pas refaites. La simulation ci-dessus montre les deux cas.

> **Décision.** Séparer l’état d’un workflow en cours du contexte fourni à un appel de modèle. Un processus peut avoir un long historique alors que l’agent suivant n’en a besoin que d’une petite partie.

## Déboguer un modèle qui ne répond jamais deux fois pareil

Un modèle d’IA peut répondre différemment à chaque fois. Un échec ne se reproduit donc souvent pas quand on réessaie. Cela complique le débogage. Le moteur enregistre donc chaque sortie du modèle et chaque résultat d’outil au fil de l’exécution.

Pour déboguer, je rejoue l’exécution à partir de cet enregistrement. Les mêmes entrées produisent le même chemin, étape par étape, sans appeler le modèle ni toucher aux vrais systèmes. Un échec survenu une fois peut être étudié autant de fois que nécessaire.

## Le pic de coûts

À un moment, les coûts ont fortement augmenté. Chaque étape envoyait au modèle toujours plus de texte, en grande partie inutile. On parle de contexte gonflé : tout l’historique du workflow partait avec chaque appel.

La solution a été un context builder. Il assemble, à partir de l’état du workflow, seulement ce dont l’étape suivante a besoin, au lieu de transmettre tout l’historique. C’est la décision ci-dessus, mise en pratique.

## Les garde-fous sont des couches, pas un prompt

Un prompt demande ; un garde-fou impose. Dire à un modèle « ne dépose rien sans validation » est une requête. Le moteur en fait une règle :

- **Permissions d’outils.** Chaque agent ne peut appeler que les outils que son workflow autorise.
- **Limites.** Les exécutions sont bornées : un agent égaré s’arrête au lieu de tourner en boucle.
- **Validation de schéma.** Une sortie du modèle qui ne respecte pas la structure attendue est rejetée avant d’atteindre un autre système.
- **Approbation humaine.** Les actions qui comptent attendent une personne.
- **Journal d’audit.** Chaque étape, chaque appel d’outil et chaque décision est enregistré.

## Là où les personnes restaient impliquées

Un processus préparait des informations de facturation qu’une personne devait valider. Cette frontière comptait : automatiser la préparation évitait des relances, tout en laissant la décision finale à la personne responsable.

## Ce que je ferais autrement

J’ai écrit moi-même la couche d’exécution durable : points de sauvegarde, reprise des exécutions abandonnées. Aujourd’hui, je m’appuierais sur un moteur d’exécution durable existant et je consacrerais ce temps aux parties propres aux agents : construction du contexte, garde-fous et rejeu.
