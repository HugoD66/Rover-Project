import { Map } from "../src/rover/map/map";
import { Obstacle } from "../src/rover/obstacle/obstacle";
import { Coordinates } from "../src/rover/coordinate/coordinates";

describe("Tests de la carte", () => {
  let map: Map;
  let obstacle: Obstacle;

  test('La carte est créée sans obstacles', () => {
    map = new Map(5, 5);

    const mapInfo = map.getMapInformation();
    expect(mapInfo.getMapLimitX()).toBe(5);
    expect(mapInfo.getMapLimitY()).toBe(5);
    expect(mapInfo.getObstacles()).toBeUndefined();
  });

  test('La carte est créée avec un obstacle', () => {
    obstacle = new Obstacle(2, 2);
    map = new Map(5, 5, [obstacle]);

    const mapInfo = map.getMapInformation();
    expect(mapInfo.getMapLimitX()).toBe(5);
    expect(mapInfo.getMapLimitY()).toBe(5);
    const obstacles = mapInfo.getObstacles();
    expect(obstacles).toHaveLength(1);
    expect(obstacles![0].getObstaclePosition()).toEqual(new Coordinates(2, 2));
  });

  test("La carte avec des obstacles placés dans les coins et aux bords", () => {
    const obstacle1 = new Obstacle(0, 0);  // Coin supérieur gauche
    const obstacle2 = new Obstacle(4, 0);  // Coin inférieur gauche
    const obstacle3 = new Obstacle(0, 4);  // Coin supérieur droit
    const obstacle4 = new Obstacle(4, 4);  // Coin inférieur droit
    map = new Map(5, 5, [obstacle1, obstacle2, obstacle3, obstacle4]);
  
    const mapInfo = map.getMapInformation();
    expect(mapInfo.getObstacles()).toHaveLength(4);
    expect(mapInfo.getObstacles()![0].getObstaclePosition()).toEqual(new Coordinates(0, 0));
    expect(mapInfo.getObstacles()![1].getObstaclePosition()).toEqual(new Coordinates(4, 0));
    expect(mapInfo.getObstacles()![2].getObstaclePosition()).toEqual(new Coordinates(0, 4));
    expect(mapInfo.getObstacles()![3].getObstaclePosition()).toEqual(new Coordinates(4, 4));
  });
  
  test('La carte a été crée avec différents obstacles', () => {
    const obstacle1 = new Obstacle(2, 2);
    const obstacle2 = new Obstacle(3, 3);
    map = new Map(5, 5, [obstacle1, obstacle2]);

    const mapInfo = map.getMapInformation();
    expect(mapInfo.getMapLimitX()).toBe(5);
    expect(mapInfo.getMapLimitY()).toBe(5);
    const obstacles = mapInfo.getObstacles();
    expect(obstacles).toHaveLength(2);
    expect(obstacles![0].getObstaclePosition()).toEqual(new Coordinates(2, 2));
    expect(obstacles![1].getObstaclePosition()).toEqual(new Coordinates(3, 3));
  })
});
