import { MissionControl } from "./mission-control"; // Importation de la classe MissionControl
import { Rover } from "../rover/rover"; // Importation de la classe Rover

/**
 * Fonction utilitaire pour instancier un objet MissionControl.
 * Elle prend en entrée un rover et une liste de commandes optionnelles.
 * 
 * @param rover Le rover à associer au contrôle de mission.
 * @param commands Une liste de commandes à exécuter, par défaut vide si non fourni.
 * @returns Une instance de MissionControl configurée avec le rover et les commandes.
 */
export function instantiateMissionControl(rover: Rover, commands?: string[]): MissionControl {
  // Création d'une nouvelle instance de MissionControl avec le rover et les commandes fournies.
  return new MissionControl(rover, commands);
}
