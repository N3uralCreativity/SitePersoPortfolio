Ok — voilà une **version longue**, avec **plus de détails pour chaque projet**, et en ajoutant aussi les **TP / SAÉ / livrables** que tu as faits avec moi (ou dont tu m’as parlé).
Je reste sur ce que tu as réellement décrit / demandé, sans inventer des features “sorties de nulle part”.

---

# A) Projets Roblox (jeux, systèmes, UI, plugin)

## 1) **Cell Wars (Roblox)**

### Objectif / idée

Jeu Roblox “gros projet”, inspiré d’un gameplay type **Agar.io** (croissance, stratégie, progression) + une vraie couche “jeu live” (UI, boutique, cosmétique, identité).

### Ce que tu as fait / demandé avec moi

* Texte “**development stopped** message” pour annoncer l’arrêt du dev (message d’au revoir propre).
* Création/itérations d’assets **icônes** (blanc, transparent, sans glow) + **bannières 16:9** + **icône 512×512** (page du jeu).
* Discussion sur le besoin de cohérence visuelle (présentation page jeu).

### Détails de codage (niveau architecture)

* **Client/Serveur Roblox** :

  * Client : UI, animations, affichage local, interactions (hover/click).
  * Serveur : validation des actions, gestion des achats/unlocks, logique gameplay “autoritaire”.
* **UI/UX** :

  * Organisation en frames (Menu, Shop, Inventory, Leaderboard, etc.).
  * États UI (ouvert/fermé), transitions.
  * Tweens (TweenService) pour feedback propre.
* **Cosmétiques / progression** (dans ce que tu as évoqué)

  * Skins / auras, shop, éléments de présentation.

### Livrables typiques que tu m’as demandé

* Textes in-game (message arrêt dev).
* Icons/branding (formats corrects Roblox).
* Conseils de structure côté scripts (plutôt que du code complet ici).

---

## 2) **SVH (Roblox) – Système de leaning contextuel “avancé”**

### Objectif / idée

Implémenter un système de **leaning automatique** très “pro” :

* détecter les murs/obstacles
* choisir la meilleure direction de lean
* transitions fluides
* debug/logs pour régler

### Ce que tu voulais précisément

* Le plus “**advanced possible**” : wall detection “intelligente”, 3rd person detection, calcul direction optimale, smooth, debug.

### Détails de codage (ce que ça implique en pratique)

* **Détection environnement** :

  * Raycasts/ShapeCasts depuis le personnage/caméra vers les côtés.
  * Pondération des résultats (distance libre, angle, couverture).
* **Choix direction** :

  * Calcul du “meilleur côté” en fonction des obstacles et de l’orientation caméra.
* **Animation/Blend** :

  * Tween ou interpolation progressive (CFrame, offsets, spring).
  * Éviter les snaps (arrondir, smoothing).
* **Debug** :

  * Logs (prints structurés), option de “Draw rays” visuel.
  * Modes debug activables/désactivables.

### Livrable que tu attendais

Un script “système complet”, réutilisable, réglable (paramètres), et stable.

---

## 3) **Le Barbu (Roblox) – Jeu de cartes 3D à 4 joueurs**

### Objectif / idée

Faire un jeu de cartes jouable avec :

* un **deck**
* une **main** pour chaque joueur
* sélection souris
* carte jouée visible par tous au centre
* règles du Barbu pour 4

### Ce que tu as demandé / décrit

* Chaque carte existe déjà en **model** (3D).
* Afficher les cartes **devant la caméra** et les faire toujours **face caméra**, et **seulement pour le joueur local** (front visible localement).
* Sélection via souris (double clic), puis jouer une carte et la rendre visible à tous au centre.
* Question sur le deck (cartes à retirer comme 2/3 selon variantes).

### Détails de codage (structure typique)

* **Gestion de main (client)** :

  * Calcul positions en arc/ligne devant la caméra.
  * Orientation cartes : `CFrame.lookAt` ou alignement vers caméra.
  * Front/back : soit textures locales, soit clones locaux, soit SurfaceGui local.
* **Interaction** :

  * Détection de clic (Mouse / UserInputService) + double-clic (timer).
  * Highlight/hover.
* **Réseau** :

  * RemoteEvent “PlayCard” → serveur valide → réplique état aux autres.
  * L’état réel du deck (ordre, pioche) côté serveur.
* **Table de jeu** :

  * Slot “centre” (carte jouée), slots pour plis, etc.

---

## 4) **Animations GUI Roblox (Tweens / micro-systèmes UI)**

### Objectif / idée

Faire des effets UI clean :

* cercle qui pulse depuis le centre
* transitions de transparence
* hover/click

### Ce que tu avais demandé

* Un cercle image qui **grandit** depuis le milieu, devient fullscreen, joue sur la transparence.
* Animations d’éléments GUI via tweens.

### Détails de codage

* TweenService avec :

  * Size/Position (scale)
  * ImageTransparency / BackgroundTransparency
  * EasingStyle/EasingDirection
* Boucles / séquences :

  * Tween “in” puis “out”
  * ou tween + `Completed:Wait()` pour enchaîner.

---

## 5) **Plugin Roblox Studio**

### Objectif / idée

Créer un plugin Roblox Studio et gérer des interactions “type UI/outils”.

### Ce que tu voulais

* Convertir certaines logiques LocalScript → Script côté plugin.
* Un template plugin : détecter interactions souris (hover/click) sur éléments.

### Détails de codage (plugin)

* `plugin:CreateToolbar()` + `toolbar:CreateButton()`
* Écoute événements plugin
* Interaction via `Mouse` fourni par plugin
* Gestion de sélection d’objets, survol, actions.

---

# B) Web / UI / branding (sites, assets, présentations)

## 6) **Atelier-Yo (site sculpteur Lionel Peron)**

### Objectif / idée

Site vitrine/portfolio moderne pour un sculpteur (identité simple, pro).

### Ce que tu as demandé avec moi

* **Favicon** simple “LP”, format correct, propre, pas prétentieux.
* Aide structure / stack (tu avais évoqué Next.js + Prisma/SQLite + Tailwind + PWA).
* Discussions infra (domain/DNS, GitHub Pages/Cloudflare/OVH selon tes setups).

### Détails (niveau projet)

* Front : pages portfolio, galerie, contact.
* Design : minimal, typographie lisible, branding “LP”.
* Déploiement :

  * domaine + sous-domaines
  * config CNAME / DNS
  * contraintes pages statiques/SSG selon hébergeur.

---

## 7) **Site retouche couture – Persona / UX**

### Objectif

Créer une persona réaliste pour guider la conception (clients, besoins, frustrations).

### Ce que tu avais fait

* Persona : profil, objectifs, irritants, habitudes.
* Utilisation : guider navigation site, pages services, messages, CTA.

---

## 8) **File explorer (index.html)**

### Objectif

Construire une page HTML structurée (navigation / affichage type explorateur).

### Détails

* HTML : structure sections / listes
* CSS : mise en page
* JS : interactions (filtrer, cliquer, afficher détails) si nécessaire

---

## 9) **Présentation Steam Store Page**

### Objectif

Présenter/Analyser la page Steam (découverte produits, bannières, navigation, reco).

### Détails livrables

* Slides structurées : sections (discoverability, personalized suggestions, navigation categories, UX).
* Approche : tu avais ciblé comment Steam garde l’utilisateur engagé.

---

# C) Python (outils, automatisation, scripts)

## 10) **MangaParkExporter (Python + UI)**

### Objectif

Exporter ta liste de suivis vers MAL (matching titres).

### Détails de codage

* UI Tkinter : boutons, champ cookie/session, logs
* Récupération :

  * parsing HTML / endpoints
  * normalisation titres
* Matching via API (type Jikan/MAL) :

  * recherche, comparaison, meilleure correspondance
* Export :

  * format CSV/JSON
  * erreurs gérées (introuvable, ambigu)

---

## 11) **Téléchargement d’images (scraping + déchiffrement automatique)**

### Objectif

Télécharger images depuis un site avec une étape de “décryption”, sans demander la clé à l’utilisateur.

### Détails de codage

* requests / sessions / headers
* parsing (BeautifulSoup ou équivalent)
* pipeline :

  1. récupérer page
  2. extraire liens chiffrés
  3. déchiffrer/transformer
  4. télécharger et nommer proprement
* robustesse :

  * retries
  * gestion erreurs 403/404
  * logs

---

## 12) **Convertisseur BMP → JPEG (Python)**

### Objectif

Réécrire proprement un script pour convertir sans bug (erreur “tuple index out of range”).

### Détails de codage

* Pillow :

  * ouverture image, conversion mode (RGB/RGBA)
  * sauvegarde JPEG avec qualité
* gestion batch (dossier)
* validations (fichiers non-images, corruptions)

---

## 13) **Script “debugger-like” Python (step + multi-fonctions)**

### Objectif

Simuler un système de pas-à-pas, et gérer plusieurs fonctions, avec contrôle “Start”.

### Détails de codage

* lecture/inspection du code
* gestion multi-fonctions :

  * repérage de blocs fonction
  * exécution contrôlée (selon ton implémentation)
* comportement demandé :

  * ne rien lancer tant que l’utilisateur n’a pas dit “start”
  * attendre **2 secondes** avant fermeture quoi qu’il arrive

---

# D) Java (TPs, SAÉ, algorithmique)

## 14) **SAÉ 1.01 – Canoë (calcul temps + pénalités + 2 manches)**

### Objectif

Aider des arbitres à saisir et calculer les résultats d’une course (2 rounds).

### Ce que tu avais déjà / demandé

* Fonction saisie :

  * temps
  * portes touchées
  * portes manquées
  * calcul pénalité
* Étape suivante :

  * stocker manche 1 + manche 2 pour un même compétiteur
  * tableau résultats + tableau numéros compétiteur alignés par index

### Détails de codage (classique BUT S1)

* tableaux synchronisés :

  * `int[] numCompetiteur`
  * `double[] resultatTotal` (ou 2 tableaux pour 2 manches)
* fonctions :

  * `saisirTemps()`, `calculerPenalite()`, `totalRound()`
* logique :

  * additionner/choisir meilleur temps selon règles (si demandé)
  * affichage final + tri/classement potentiels

---

## 15) **Projet Java “Sapins”**

### Objectif

Générer des sapins ASCII (plein, creux, couché) sous forme de `String`.

### Détails de codage

* boucles imbriquées
* gestion espaces/étoiles
* retour String (testable)
* variantes (plein/creux) : conditions sur bordures

---

## 16) **TP Java – qualité d’un générateur aléatoire**

### Objectif

Tester distribution de chiffres aléatoires par comptage.

### Détails

* `Random`
* compteur occurrences `int[10]`
* affichage fréquences, détection biais grossier

---

## 17) **TP Java – tableaux (inverser, doublons, max, etc.)**

### Objectif

Exercices de manipulation de tableaux, méthodes propres, style simple.

### Détails

* `eliminerDoublons` : logique de filtrage
* `inverserTableau` : swap symétrique
* indices du max : parcours + stockage indices
* contrainte de ton style :

  * pas de switch
  * pas d’outils “trop avancés”
  * code compréhensible BUT

---

## 18) **R2.01 Dev Objets – Hiérarchie de figures (héritage)**

### Objectif

Appliquer héritage/polymorphisme sur des formes 2D/3D.

### Détails de codage

* classes mères abstraites
* redéfinitions (`toString`, méthodes calcul)
* test central via `HeritageTestFG3D.java`

---

## 19) **R2.03 Qualité – TP Maven**

### Objectif

Créer projet Maven propre :

* classes `Main`, `InputParser`, `Student`
* tests unitaires
* JAR exécutable

### Détails

* génération archetype (avec ta commande Windows alternative)
* structure Maven standard
* JUnit (tests)
* packaging `mvn package`, jar runnable (manifest/main-class)

---

# E) Bases de données / SQL (Oracle)

## 20) **TP SQL – LMD + contraintes**

### Objectif

Manipuler INSERT/UPDATE/DELETE + contraintes immédiates vs différées.

### Détails

* scripts `.sql` annotés (1) 2) 3)…)
* gestion des erreurs d’intégrité, ordre des insertions
* compréhension “deferred constraint” (selon ce que ton TP demandait)

---

## 21) **Base “Paris 2024” (schéma sports/athlètes/médailles)**

### Objectif

Base relationnelle sur JO Paris 2024.

### Détails

* tables citées : `PAYS`, `SPORT`, `DISCIPLINE`, `ATHLETE`, `GAGNER_I`, `GAGNER_E`, `PRATIQUER`
* requêtes :

  * jointures, agrégats, regroupements, conditions
  * requêtes ensemblistes (selon tes TPs)

---

## 22) **Comptes-rendus TP + Word + SQL pack**

### Objectif

Produire des livrables “propres” :

* compte rendu précis
* doc Word éditable
* fichier .sql complet annoté

### Détails

* structuration : intro / conclusion courtes
* requêtes numérotées
* cohérence avec tes TPs précédents (même style)

---

# F) Linux / DevOps / Réseau / outils

## 23) **SAE Ansible / Rocky Linux**

### Objectif

Découvrir Ansible + infra (inventaire, ping module, SSH).

### Ce que tu as rencontré

* venv ansible
* commande ping
* erreur sshpass + host key checking (fingerprint à ajouter)

### Détails “compétences”

* SSH known_hosts / fingerprint
* inventaire ini
* modules Ansible (ping)
* gestion d’environnement (venv)

---

## 24) **Git – workflow add/commit/push**

### Objectif

Commandes simples pour versionner proprement.

### Détails

* `git add .`
* `git commit -m "..."`
* `git push`
* (et souvent gestion branches quand tu bosses sur projets plus gros)

---

## 25) **AutoHotkey – AZERTY keybind fix**

### Objectif

Remapper `&é"'` vers `1 2 3 4` sans déclencher d’actions parasites (menus/dash).

### Détails

* AHK v2, `#HotIf WinActive(...)`
* envoi scan codes / Send
* problème rencontré : certains binds déclenchent actions “jeu” (shift-like / menus)
* recherche d’un remap plus “pur” (éviter effets secondaires)

---

# G) Gestion de projet / docs / présentations / oraux

## 26) **Gestion de projet – planning avancée**

### Objectif

Travailler sur planning (Gantt, ressources, compétences) dans fichier tableur + calendrier perso `cal_Perso`.

### Détails

* feuilles tâches/ressources/compétences
* dépendances, affectations
* calcul coûts/charge
* projet démarrant le **6 avril 2025** (dans ton contexte)

---

## 27) **Oral anglais – “Telephoning: solving a technical problem”**

### Objectif

Préparer des conversations jouables, dans les deux rôles (appelant/répondant).

### Détails

* 3 situations :

  * app météo
  * débogage
  * site de jeux vidéo
* scripts structurés, phrases types, transitions naturelles

---

## 28) **Fiches de révision / corrections (math / contrôles)**

### Objectif

Produire fiches condensées (2 pages), majoritairement avec exemples (souvent code + commentaires), et corrections détaillées.

### Détails

* récurrence/Newton, matrices, équations/log/exp, limites, etc.
* forte contrainte : “condensé”, utile contrôle, pas trop blabla
* génération de questions type QCM pour t’entraîner

---

## 29) **Simuland / projets business (ENVOL, MicroCam)**

### Objectif

Stratégie d’entreprise en simulation : budget, R&D, RH, marketing, KPI.

### Détails

* décisions chiffrées (investissements, orientation produit)
* livrables :

  * SWOT/PESTEL/risques
  * argumentaires
  * posters/présentations

---

# H) Création d’assets graphiques (icônes, posters, bannières)

## 30) **Pack d’icônes UI (PNG blanc transparent)**

### Objectif

Avoir des icônes propres pour UI (wishlist, controller, leaderboard, scheduler, etc.).

### Détails

* contraintes visuelles strictes :

  * blanc pur
  * fond transparent
  * traits assez épais
  * pas de glow
* formats : PNG, tailles précises selon besoin

---

## 31) **Bannières / images promo (16:9, etc.)**

### Objectif

Assets marketing pour pages de jeu/projets.

### Détails

* composition lisible à petite taille
* respect ratio 16:9
* cohérence avec identité visuelle

---

# Si tu veux une version “portfolio prêt à coller”

Je peux te transformer tout ça en format :

* **Portfolio BUT** (titre + techno + missions + résultats)
* ou **CV** (très synthétique mais impactant)

Mais même sans ça, le texte ci-dessus est déjà une base solide “longue”.

Si tu veux que ce soit encore plus détaillé : je peux ajouter pour chaque projet une mini section **“difficultés rencontrées / solutions”** (ex : host key checking, remap AHK, front/back cartes Roblox, contraintes Maven, etc.) en restant fidèle à ce que tu m’as raconté.
