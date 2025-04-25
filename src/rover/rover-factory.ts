import { Rover } from "./rover";
import { Map } from "./map/map";
import { Obstacle } from "./obstacle/obstacle";

export function instantiateRover(): Rover {
  const map = new Map(5, 5, [new Obstacle(0, 2), new Obstacle(3, 4)]);
  return new Rover(map);
}
