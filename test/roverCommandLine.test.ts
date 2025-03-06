import {Rover} from "../src/rover/class/rover";
import {Map} from "../src/rover/class/map";
import {Obstacle} from "../src/rover/class/obstacle";
import {InterpreterDirection, Orientation} from "../src/rover/interface/rover.interface";
import {Coordinates} from "../src/rover/class/coordinates";

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

  test("Le rover suit une chaine de commande et rencontre un obstacle", () => {
    map = new Map(5, 5, [new Obstacle(0, 2)]);
    rover = new Rover(map);

    rover.setCommandLine([InterpreterDirection.AHEAD,InterpreterDirection.AHEAD,InterpreterDirection.AHEAD])
    rover.executeCommandLine();

    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 1));
    expect(state.getOrientation()).toBe(Orientation.NORTH);
  })
})