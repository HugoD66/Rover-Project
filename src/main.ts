import { Interpreter } from "./interpreter/interpreter";
import { Rover } from "./rover/rover";
import { MissionControl } from "./mission-control/mission-control";
import { instantiateMissionControl } from "./mission-control/main.mission-control";
import { instantiateRover } from "./rover/rover-factory";
import { CliUI } from "./interpreter/cli-ui";

// Définition de l'hôte et du port pour le serveur
const HOST = '0.0.0.0';
const PORT = 12345;

/**
 * Fonction principale pour lancer la mission
 * - Crée une instance du rover
 * - Crée une instance du contrôle de mission
 * - Initialise l'interpréteur et l'interface utilisateur
 * - Démarre le serveur
 */
export function runMission(): void {
  // Initialisation du rover avec la carte et les obstacles
  const rover: Rover = instantiateRover();

  // Initialisation du contrôleur de mission avec le rover
  const missionControl: MissionControl = instantiateMissionControl(rover);

  // Création de l'interpréteur avec le contrôleur de mission
  const interpreter: Interpreter = new Interpreter(missionControl);

  // Initialisation de l'interface utilisateur en ligne de commande
  const cli = new CliUI(interpreter);

  // Démarre l'interface utilisateur
  cli.start();

  // Démarre le serveur pour l'interpréteur à l'adresse et au port définis
  interpreter.startServer(HOST, PORT);
}

// Lancement de la mission
runMission();
