# SitePersoPortfolio

Ce dépôt contient la refonte complète d’un portfolio développeur orienté démonstration technique, qualité visuelle et lisibilité produit. Le site est conçu comme une vitrine professionnelle qui met en avant les projets, les compétences d’ingénierie et la capacité à structurer un front-end moderne avec une base de contenu maintenable.

Le projet est volontairement construit sans framework front-end, avec un socle HTML, CSS et JavaScript natif. Ce choix facilite l’hébergement statique, réduit la complexité de build et permet de garder une maîtrise fine de la performance, de l’accessibilité et du rendu visuel.

## Positionnement du projet

La version actuelle repose sur une architecture en pages statiques enrichies par des scripts de rendu dynamique. La page d’accueil présente le profil, un aperçu des projets et la direction technique globale. La bibliothèque projets apporte un niveau de profondeur supérieur avec un catalogue filtrable et des fiches détaillées par projet, alimentées automatiquement depuis une source unique.

L’objectif de cette refonte est de proposer un portfolio crédible pour des contextes académiques, de stage et de collaboration technique, en combinant une identité visuelle soignée avec un contenu structuré et exploitable.

## Architecture fonctionnelle

La page `index.html` joue le rôle de landing principale et met en avant la proposition de valeur, les projets phares, la stack et les informations de contact. Elle intègre également un système bilingue français/anglais avec persistance locale de la langue choisie.

La page `Projets.html` est un catalogue dynamique. Elle charge le contenu de `Projets.md`, construit des cartes projet, applique la recherche et les filtres de domaine, et redirige vers des fiches individuelles.

La page `ProjetDetails.html` affiche une fiche complète par projet en utilisant l’identifiant passé dans l’URL (`?id=...`). Cette page génère automatiquement la structure détaillée, les blocs d’insight (difficulté, solution, impact), une timeline technique, des liens utiles et des suggestions de projets liés.

Le fichier `Projets.md` est la source de vérité métier pour la bibliothèque. Le contenu éditorial y est centralisé afin d’éviter les doublons entre la liste et les fiches détaillées.

## Organisation des fichiers

Le dépôt est organisé autour d’une logique simple. Les pages HTML sont à la racine, les styles et scripts sont regroupés dans `assets`, et les médias statiques sont stockés dans `Images`.

```text
SitePersoPortfolio/
  index.html
  Projets.html
  ProjetDetails.html
  Competences.html
  Projets.md
  assets/
    css/
      main.css
      projects.css
    js/
      app.js
      projects-source.js
      projects-list.js
      project-detail.js
  Images/
    Roblox_SbProject.png
    ChromeExtenstion.png
```

## Internationalisation

Le site fonctionne en français par défaut et propose un basculement vers l’anglais. La langue active est conservée via `localStorage` pour offrir une expérience cohérente entre les pages. Sur la partie bibliothèque, l’interface est traduite alors que les descriptions longues conservent le texte source lorsque nécessaire pour préserver la précision du contenu initial.

## Lancement local

Le site doit être lancé via un serveur HTTP local, car la bibliothèque projets charge `Projets.md` avec `fetch`. Une ouverture directe en `file://` ne permet pas un fonctionnement complet.

Depuis le dossier du projet, exécuter :

```powershell
cd "c:\Users\leodu\Downloads\RefonteSitePortfolio\SitePersoPortfolio"
python -m http.server 8000
```

Ensuite, ouvrir dans le navigateur :

```text
http://localhost:8000/index.html
http://localhost:8000/Projets.html
```

Pour arrêter le serveur, utiliser `Ctrl + C` dans le terminal.

## Validation et tests recommandés

La validation de base consiste à vérifier la navigation entre les pages, le changement de langue, le comportement mobile et le rendu du catalogue dynamique. Il est également recommandé de tester plusieurs fiches projet via `ProjetDetails.html?id=...` pour confirmer le rendu des sections, de la timeline et de la navigation précédent/suivant.

Un contrôle syntaxique JavaScript peut être exécuté localement avec Node.js :

```powershell
node --check assets/js/app.js
node --check assets/js/projects-source.js
node --check assets/js/projects-list.js
node --check assets/js/project-detail.js
```

## Déploiement

Le projet peut être déployé sur toute plateforme d’hébergement statique compatible HTML/CSS/JS (GitHub Pages, Netlify, Vercel en mode statique, Cloudflare Pages, etc.). Le point d’attention principal est de conserver l’accès direct à `Projets.md`, indispensable pour la génération du catalogue et des fiches.

## Maintenance éditoriale

Pour ajouter ou enrichir des projets, il faut prioritairement modifier `Projets.md`. Le parseur (`assets/js/projects-source.js`) reconstruit ensuite la bibliothèque automatiquement. Cette approche réduit le risque d’incohérence et garde une maintenance simple quand le volume de projets augmente.

## Stratégie Git

Le dépôt est structuré avec une logique de branches permettant de conserver l’historique et d’isoler les évolutions. La branche `legacy/portfolio-v1` archive l’ancienne version, `refonte/portfolio-v2` sert de base de reconstruction, et `revamp` porte les évolutions avancées en cours avant fusion vers la branche principale.

## Licence et usage

Le contenu du portfolio (textes, design, narration de projets) est destiné à un usage personnel et professionnel dans le cadre de la présentation du travail de Leo Peron. Toute réutilisation externe doit être explicitement autorisée.
