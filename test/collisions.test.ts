import {Obstacle} from "../src/class/obstacle";

describe("Tests de création des obstacles", () => {
  let obstacles: Obstacle;

  test('Les obstacles sont créés', () => {
    obstacles = new Obstacle([{x: 2, y: 2}, {x: 3, y: 3}]);
    expect(obstacles.getObstaclesPositions()).toStrictEqual([{x: 2, y: 2}, {x: 3, y: 3}]);
  })
})