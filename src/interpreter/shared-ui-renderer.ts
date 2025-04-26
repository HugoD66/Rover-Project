import { renderMapAscii } from "../rover/map/map-renderer";
import { MissionControl } from "../mission-control/mission-control";

/**
 * Fonction permettant de rendre l'état complet de la mission, incluant la carte et la position du rover.
 * Elle génère un rendu ASCII de la carte et fournit des informations sur l'orientation et la position du rover.
 * 
 * @param missionControl L'objet `MissionControl` qui gère l'état de la mission et du rover.
 * @param showObstacles (optionnel) Booléen indiquant si les obstacles doivent être affichés. Par défaut à `true`.
 * 
 * @returns Une chaîne de caractères représentant l'état complet du rover et de la mission.
 */
export function renderFullState(missionControl: MissionControl, showObstacles = true): string {
  // Récupération de l'état du rover et de la carte depuis MissionControl
  const roverState = missionControl.getRoverState();
  const map = missionControl.getMap();
  const obstacles = map.getObstacles();

  // Récupération des dimensions de la carte
  const { width, height } = {
    width: map.getMapLimitX(),
    height: map.getMapLimitY(),
  };

  // Rendu de la carte en ASCII, avec ou sans les obstacles en fonction du paramètre showObstacles
  const ascii = renderMapAscii(roverState, obstacles ?? [], { width, height }, showObstacles);

  // Construction de la chaîne de caractères qui résume l'état du rover et de la mission
  return [
    `🛸 Orientation du Rover : ${roverState.getOrientation()}`, // Affichage de l'orientation du rover
    `🪐 Position du Rover : ${roverState.getActualPositions().toString()}`, // Affichage de la position du rover
    '',
    ascii // Rendu ASCII de la carte
  ].join('\n'); // Retourne l'ensemble des informations sous forme de chaîne
}
