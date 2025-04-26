import { Rover } from "./rover";
import { Map } from "./map/map";
import { Obstacle } from "./obstacle/obstacle";

/**
 * Fonction pour générer un obstacle aléatoire sur la carte.
 * La position est déterminée en générant des coordonnées X et Y aléatoires.
 * 
 * @param mapWidth La largeur de la carte.
 * @param mapHeight La hauteur de la carte.
 * @returns Un nouvel obstacle avec des coordonnées aléatoires.
 */
function generateRandomObstacle(mapWidth: number, mapHeight: number): Obstacle {
  // Génère une coordonnée X aléatoire dans les limites de la carte.
  const x = Math.floor(Math.random() * mapWidth); 
  // Génère une coordonnée Y aléatoire dans les limites de la carte.
  const y = Math.floor(Math.random() * mapHeight);  
  return new Obstacle(x, y);
}

/**
 * Fonction pour générer un certain nombre d'obstacles uniques sur la carte.
 * 
 * Cette fonction s'assure que chaque obstacle a une position unique en utilisant un Set
 * pour garder une trace des positions déjà occupées.
 * 
 * @param mapWidth La largeur de la carte.
 * @param mapHeight La hauteur de la carte.
 * @param numObstacles Le nombre d'obstacles à générer.
 * @returns Un tableau d'obstacles générés de manière aléatoire.
 */
function generateRandomObstacles(mapWidth: number, mapHeight: number, numObstacles: number): Obstacle[] {
  const obstacles: Obstacle[] = [];  // Tableau pour stocker les obstacles générés.
  const occupiedPositions = new Set<string>();  // Set pour vérifier les positions occupées.

  // Tant que nous n'avons pas généré le nombre d'obstacles désiré
  while (obstacles.length < numObstacles) {
    const obstacle = generateRandomObstacle(mapWidth, mapHeight);  // Crée un obstacle aléatoire.

    // Crée une clé unique pour la position de l'obstacle (x, y).
    const posKey = `${obstacle.getX()}-${obstacle.getY()}`;
    
    // Vérifie si la position est déjà occupée. Si ce n'est pas le cas, ajoute l'obstacle.
    if (!occupiedPositions.has(posKey)) {
      obstacles.push(obstacle);
      occupiedPositions.add(posKey);  // Ajoute la position au Set pour éviter les doublons.
    }
  }

  return obstacles;  // Retourne le tableau d'obstacles générés.
}

/**
 * Fonction pour initialiser le rover avec une carte et des obstacles générés aléatoirement.
 * 
 * @returns Une instance de Rover, avec une carte contenant des obstacles.
 */
export function instantiateRover(): Rover {
  const mapWidth = 5;   // Largeur de la carte.
  const mapHeight = 5;  // Hauteur de la carte.
  const numObstacles = 3;  // Nombre d'obstacles à générer.

  // Génère les obstacles aléatoires.
  const obstacles = generateRandomObstacles(mapWidth, mapHeight, numObstacles);

  // Crée une nouvelle carte avec les dimensions et les obstacles générés.
  const map = new Map(mapWidth, mapHeight, obstacles);

  // Crée et retourne un nouveau rover avec la carte.
  return new Rover(map);
}
