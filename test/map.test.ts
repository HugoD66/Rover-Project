import { Map } from "../src/rover/map";
import { Obstacle } from "../src/core/types/obstacle";
import { Coordinates } from "../src/core/types/coordinates";

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
