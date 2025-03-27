# Rover Socket Project

Ce projet met en place un **rover** virtuel piloté par des commandes, relié à une **Mission Control** et à un **serveur TCP** (`RouterServer`). L’objectif est de pouvoir se connecter sur un port TCP, envoyer des commandes (simples ou en séquence) pour faire avancer, reculer, tourner le rover, et visualiser son état mis à jour (orientation, position).

## Sommaire

1. [Description du projet](#description-du-projet)
2. [Technologies et prérequis](#technologies-et-prérequis)
3. [Installation et lancement](#installation-et-lancement)
4. [Utilisation](#utilisation)
5. [Auteurs](#auteurs)
5. [Complément](#complément)

---

## Description du projet

Le rover évolue sur une grille (une « map ») et peut rencontrer des obstacles. L’application se compose de plusieurs classes :

- **Rover** : Représente le rover et gère ses coordonnées et son orientation.
- **MissionControl** : Contrôle la logique d’exécution de commandes (avancer, tourner, etc.).
- **Interpreter** : Fait l’interface entre la logique « Mission Control » et le réseau.
- **RouterServer** : C’est le serveur TCP qui écoute sur un port et reçoit des commandes (`A`, `Q`, `D`, `S`) pour contrôler le rover en direct.

Les commandes envoyées au rover sont :
- `Z` : Avancer
- `S` : Reculer
- `Q` : Tourner à gauche
- `D` : Tourner à droite

On peut également envoyer plusieurs commandes d’un coup, par exemple `ASD` (avancer, reculer, tourner à droite).

---

## Technologies et prérequis

- **Node.js** (version 14+ recommandée)
- **npm** ou **yarn** (pour installer les dépendances)
- **TypeScript** (le projet est en TypeScript, mais compilable en JavaScript)

Vérifiez votre installation avec :
```bash
  node -v
  npm -v
```
## Installation et lancement

Cloner ce dépôt ou récupérer les sources :

```bash
  git clone git@github.com:HugoD66/Rover-Project.git
  cd Rover-Project
  npm install
```

Compiler le projet TypeScript en JavaScript :

```bash
  tsc
```
Cela lancera tsc et générera un dossier dist/ contenant les fichiers compilés.

Lancer l’application :

```bash
   node dist/main.js
```
Vous verrez un message indiquant que le RouterServer est lancé (ex. RouterServer lancé sur 0.0.0.0:12345).

### Utilisation
Ouvrez un second terminal pour vous connecter au rover via netcat (ou telnet) :

```bash
 nc 127.0.0.1 12345
```
(Sur Windows, si nc n’est pas installé, vous pouvez utiliser telnet 127.0.0.1 12345 ou installer un équivalent de netcat, comme Nmap.)

Tapez une commande (ex. A) et validez avec [Entrée] :
- `Z` : Avancer
- `S` : Reculer
- `Q` : Tourner à gauche
- `D` : Tourner à droite

Vous pouvez également envoyer une séquence comme AAASQ (avancer x3, reculer, tourner à gauche).

Dans le premier terminal (celui où tourne node dist/main.js), vous verrez l’état du rover s’actualiser. Par exemple :

```yaml
Suite à la commande : A
🛸 Orientation du Rover :  W
🪐 Positions du Rover : { x: 1, y: 0 }
Remarque : Vous pouvez enlever l’arrêt automatique du serveur dans le code (this.stop()) si vous souhaitez rester en écoute et accepter plusieurs connexions successives.
```

### Auteurs

 - Melina Mitterrand
 - Maurane Hugron
 - Hugo Dessauw
 - Louis Hemard
 - Flavien Deroy
 - Noé Delaveau

### Complément

Ce projet a été réalisé dans le cadre de la formation de développeur web et mobile à l'école Ynov de Bordeaux.

Lancement des tests : 

```bash
 npm run test
```