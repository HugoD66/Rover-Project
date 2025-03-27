import {Obstacle} from "../src/core/types/obstacle";
import {Coordinates} from "../src/core/types/coordinates";

describe("Tests de création des obstacles", () => {
  let obstacle: Obstacle;

  test('Les obstacles sont créés', () => {
    obstacle = new Obstacle(2, 2);

    expect(obstacle.getObstaclePosition()).toStrictEqual(new Coordinates(2, 2));
  })
})

