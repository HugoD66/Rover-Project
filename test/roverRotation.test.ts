import { Rover } from "../src/class/rover";
import { Orientation } from "../src/interface/rover.interface";
import { Map } from "../src/class/map";

describe("Tests de rotation du Rover", () => {
  let rover: Rover;
  let map: Map;

  beforeEach(() => {
    map = new Map(5, 5);
    rover = new Rover();

    rover.map = map;
  });

  test("Le rover tourne à gauche", () => {
    rover.turnOnLeft();
    const etat = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({"x": 0, "y": 0});
    expect(etat.getOrientation()).toBe(Orientation.WEST);
  });

  test("Le rover tourne à droite", () => {
    rover.turnOnRight();
    const etat = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 0, y: 0});
    expect(etat.getOrientation()).toBe(Orientation.EST);
  });
});
