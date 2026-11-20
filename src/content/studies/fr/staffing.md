---
slug: workforce-infrastructure
title: Une plateforme d’intérim belge
summary: "Il est 05h45. Un travailleur se déclare malade ; la prestation commence à 06h00. Un collègue peut le remplacer, mais la déclaration enregistrée porte le nom de celui qui vient d’appeler. Le gestionnaire a quinze minutes pour déclarer le remplaçant avant le début du travail."
figure: registration
order: 1
stack: [Python, FastAPI, PostgreSQL, Celery, Flutter]
updated: 2026-11-20
before:
  - "La première version du fondateur tournait sur Cloud Functions et Firestore."
  - "Les déclarations Dimona échouées étaient relancées à la main."
  - "Environ 10 000 prestations, et le système peinait déjà à suivre."
after:
  - "Aucune déclaration perdue, aucun doublon, aucune relance manuelle."
  - "Chaque déclaration finit acceptée, relancée ou confiée à une personne."
  - "Plus de 125 000 prestations et 1 000 entreprises sur le nouveau backend."
eyebrow: Déclarations / Paie
tagline: "Un système public qui tombe. Des déclarations qui ne doivent pas échouer."
highlights:
  - title: "Trois issues"
    text: "Chaque déclaration finit acceptée, relancée ou chez une personne. Aucune ne se perd en silence."
  - title: "Sûre à répéter"
    text: "Une déclaration envoyée deux fois est reconnue. L’administration ne reçoit jamais de doublon."
  - title: "Demander avant d’envoyer"
    text: "Après une panne, le système demande d’abord si la déclaration est arrivée. Puis il décide."
  - title: "Une paie qui se recalcule"
    text: "Les règles de paie sont stockées avec leur date. Une ancienne fiche donne toujours le même montant."
---
## Mon rôle

L’un des deux ingénieurs de la plateforme. Le fondateur pilotait le produit. J’ai construit l’essentiel du backend et travaillé sur l’application Flutter.

J’ai passé environ un an et demi sur ce projet chez GeekyAnts, à distance depuis Bangalore, avec une vingtaine de jours en Belgique pour la livraison finale. Ma part couvrait la déclaration Dimona, la vérification des présences et les règles qui transforment des heures en salaires, factures et déclarations.

## Trois issues, rien ne disparaît en silence

Chaque déclaration finit à exactement un de ces trois endroits : elle est acceptée, elle est relancée, ou elle arrive dans une dead-letter queue où une personne la prend en charge. Il n’existe pas d’autre issue, donc aucune déclaration ne peut se perdre discrètement.

<div class="exits" role="img" aria-label="Une déclaration part vers Dimona et finit à l’un de trois endroits : acceptée, relancée plus tard, ou dans la dead-letter queue pour une personne.">
  <span class="exits-source">Déclaration → Dimona</span>
  <div class="exits-list">
    <span class="exit-ok"><b>Acceptée</b> Déclaration confirmée et enregistrée.</span>
    <span class="exit-retry"><b>Relancée</b> Échec temporaire. Retour dans la file après un délai.</span>
    <span class="exit-dlq"><b>Dead-letter queue</b> Erreur définitive ou relances épuisées. Une personne est alertée.</span>
  </div>
</div>

## Rendre une déclaration sûre à répéter

La première version comptait sur quelqu’un pour remarquer un échec et relancer. La refonte a rendu la répétition sûre, pour que le système puisse s’en charger seul.

- **Livraison « au moins une fois », plus idempotence.** La file peut livrer deux fois la même tâche : c’est le prix pour n’en perdre aucune. Chaque déclaration porte une identité, donc une seconde tentative est reconnue au lieu de créer un doublon.
- **Erreurs temporaires et définitives sont deux problèmes différents.** Un délai dépassé ou un service indisponible mérite une relance. Une déclaration rejetée pour son contenu sera rejetée à nouveau : elle part directement chez une personne au lieu de consommer des relances.
- **Après une panne, demander avant d’envoyer.** Un émetteur peut mourir après l’envoi et avant d’avoir enregistré la réponse. La tentative suivante consulte d’abord le statut auprès de l’administration, et ne renvoie que si rien n’a été accepté.
- **Backoff avec jitter.** Quand le service public revient, une rafale de déclarations en attente ne doit pas le refaire tomber. Les relances attendent un peu plus à chaque fois, avec une part d’aléatoire pour s’étaler.

## Trois décisions quand une prestation change

### Un autre travailleur, c’est une autre déclaration

**Décision.** Lors d’un remplacement, vérifier l’éligibilité du remplaçant, annuler l’affectation sortante et en créer une pour le nouveau. Rapprocher la déclaration du travailleur sortant du travail qui reste. Dans l’exemple ci-dessus, la période d’origine est désormais vide.

**Pourquoi.** Garder le même lieu, les mêmes horaires et le même poste ne change rien au nom inscrit auprès de l’administration. Annuler en bloc toute une période déclarée pourrait aussi supprimer la couverture d’autres prestations.

**Coût.** Le gestionnaire voit un seul remplacement. Le backend suit deux affectations, et une annulation réussie ne dit rien sur la réussite de la déclaration du remplaçant.

### L’annulation peut arriver avant la réponse

**Décision.** Quand une prestation est annulée pendant que sa déclaration est en cours, on continue de suivre la réponse de l’administration. Une fois le résultat connu, on compare la période acceptée au travail encore prévu. Si elle est vide, on envoie une annulation et on suit aussi sa réponse.

**Pourquoi.** Supprimer la prestation en local ne retire pas une déclaration déjà acceptée. Envoyer une correction tant que le résultat initial est inconnu laisse deux demandes à démêler.

**Coût.** « Annulée » peut être vrai dans le planning alors que la correction externe est encore en attente. Le système doit porter ce travail en suspens sur plus d’une réponse.

### Un délai dépassé laisse une question ouverte

**Décision.** Si la déclaration a un accusé de réception, on consulte son statut. Si un nouvel envoi est signalé comme doublon, on le rapproche de la déclaration existante quand une correspondance peut être établie. Les relances épuisées partent en dead-letter queue. Les opérations reçoivent un signal quand le traitement automatique ne peut pas conclure.

**Pourquoi.** L’administration a peut-être accepté la demande juste avant la coupure. Un nouvel envoi pourrait répéter une action déjà prise en compte.

**Coût.** Vérifier le résultat ajoute un aller-retour. Mettre de côté une déclaration non résolue laisse du travail d’enquête à quelqu’un. Les deux valent mieux que dire à un gestionnaire qu’un travailleur non confirmé est déclaré.

## Ce qui rend un pointage difficile à falsifier

Un code PIN partagé peut être transmis. Un QR code statique peut être copié. Une localisation donne un contexte géographique, mais ne prouve pas à elle seule que quelqu’un a interagi avec la borne du site.

J’ai construit le contrôle autour d’un badge NFC sécurisé, du Wi-Fi du site et de la localisation. Le badge prouve une interaction physique, le Wi-Fi ajoute un contexte réseau local, la localisation situe l’appareil. Copier une seule valeur laisse les autres observations inexpliquées. Dans la simulation, des indices incohérents bloquent le pointage avant que la moindre heure n’atteigne la paie.

Le coût se voit aussi sur un vrai site : un travailleur honnête peut avoir une localisation imprécise ou pas de réseau. C’est pourquoi les trois observations jouent des rôles distincts.

## Une paie qui se recalcule à l’identique

Les heures travaillées deviennent deux choses : le salaire du travailleur et la facture du client. Les deux viennent du même relevé de présence, mais répondent à des questions différentes.

Les règles de paie changent : taux, primes, seuils légaux. J’ai stocké les règles comme des données avec une date d’effet, au lieu de les écrire dans le code. Une fiche de paie est calculée avec les règles en vigueur le jour du travail. Recalculer une fiche de l’an dernier donne le même montant qu’à l’époque, même après l’évolution des règles.

L’argent n’est jamais stocké en virgule flottante. Les montants sont des décimaux exacts, car l’arrondi flottant fait dériver quelques centimes entre une fiche de paie et une facture.

Pour les opérations exposées via MCP, les contrôles métier restaient dans la couche domaine : une demande venant d’un agent devait elle aussi respecter les règles de l’intérim.

## L’échelle, honnêtement

La plateforme est partie d’environ **10 000 prestations**, et l’ancien système peinait déjà. Sur le nouveau backend, elle a atteint **plus de 125 000 prestations** et **plus de 1 000 entreprises**.

Le trafic restait modeste. La difficulté, c’était l’exactitude : une déclaration en double, une déclaration perdue ou une fiche de paie fausse posent problème à n’importe quel volume.

## Le même problème dans d’autres pays

D’autres pays ont le même problème avec d’autres règles. L’Autriche, la France, l’Italie et la Hongrie exigent toutes une déclaration avant le début du travail. [Voir les règles côte à côte](/fr/countries/).
