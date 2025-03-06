import { Rover } from "../src/rover/class/rover";
import { Orientation } from "../src/rover/interface/rover.interface";
import { Map } from "../src/rover/class/map";
import {Coordinates} from "../src/rover/class/coordinates";

describe("Tests de rotation du Rover", () => {
  let rover: Rover;
  let map: Map;

  beforeEach(() => {
    map = new Map(5, 5);
    rover = new Rover(map);
  });

  test("Le rover tourne à gauche", () => {
    rover.turnOnLeft();
    const etat = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
    expect(etat.getOrientation()).toBe(Orientation.WEST);
  });

  test("Le rover tourne à droite", () => {
    rover.turnOnRight();
    const etat = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
    expect(etat.getOrientation()).toBe(Orientation.EST);
  });
});
