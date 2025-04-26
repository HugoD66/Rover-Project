import { IRoverState } from "../rover.interface";
import { Obstacle } from "../obstacle/obstacle";

/**
 * Rendu ASCII de la carte, représentant la position du rover et des obstacles.
 * 
 * @param roverState L'état actuel du rover, incluant sa position et son orientation.
 * @param obstacles Liste des obstacles présents sur la carte.
 * @param size Dimensions de la carte, incluant la largeur et la hauteur.
 * @param showObstacles Paramètre optionnel permettant de contrôler l'affichage des obstacles. 
 *        Par défaut, les obstacles sont affichés. Si `false`, les obstacles ne sont pas rendus.
 * @returns Une chaîne de caractères représentant la carte sous forme ASCII, avec la position du rover et des obstacles.
 */
export function renderMapAscii(
  roverState: IRoverState,
  obstacles: Obstacle[],
  size: { width: number; height: number },
  showObstacles: boolean = true // ✅ Paramètre optionnel pour l'affichage des obstacles
): string {
  let output = ""; // Initialisation de la chaîne de rendu

  // Parcours de chaque ligne de la carte
  for (let y = 0; y < size.height; y++) {
    let row = ""; // Initialisation d'une nouvelle ligne pour chaque itération

    // Parcours de chaque colonne de la carte
    for (let x = 0; x < size.width; x++) {

      // Vérification si la position actuelle est celle du rover
      if (
        x === roverState.getActualPositions().x &&
        y === roverState.getActualPositions().y
      ) {
        row += "R"; // Représentation du rover par "R"
      } 
      // Vérification si un obstacle est présent à la position (x, y)
      else if (
        showObstacles && obstacles.some(o => {
          const pos = o.getObstaclePosition(); 
          return pos.x === x && pos.y === y; // Si un obstacle est à la même position
        })
      ) {
        row += "X"; // Représentation de l'obstacle par "X"
      } 
      // Si aucun rover ni obstacle, on affiche un point "."
      else {
        row += ".";
      }
    }
    output += row + "\n"; // Ajoute la ligne au rendu final
  }

  return output; // Retourne la carte rendue sous forme ASCII
}
