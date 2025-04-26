import {Rover} from "../src/rover/rover";
import {Map} from "../src/rover/map/map";
import {Obstacle} from "../src/rover/obstacle/obstacle";
import {InterpreterDirection, Orientation} from "../src/rover/rover.interface";
import {Coordinates} from "../src/rover/coordinate/coordinates";

describe("Test de l'interpréteur", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover suit une chaine de commande sans rencontrer d'obstacle", () => {
      map = new Map(5, 5, [new Obstacle(2, 2)]);
      rover = new Rover(map);

      rover.setCommandLine([InterpreterDirection.AHEAD,InterpreterDirection.AHEAD,InterpreterDirection.AHEAD])
      rover.executeCommandLine();

      const state = rover.getState();
      expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 3));
      expect(state.getOrientation()).toBe(Orientation.NORTH);
  })
  
})