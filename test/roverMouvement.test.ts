import { Rover } from "../src/class/rover";
import {IRoverState, Orientation} from "../src/interface/rover.interface";
import { Map } from "../src/class/map";

describe("Tests de déplacement du Rover", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover avance de 1 vers le Nord", () => {
    map = new Map(5, 5);
    rover = new Rover();
    rover.map = map;

    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 0, y: 1});
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover avance de 1 vers l'Est", () => {
    map = new Map(5, 5);
    rover = new Rover();
    rover.map = map;

    rover.turnOnRight();
    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 1, y: 0});
    expect(etat.getOrientation()).toBe(Orientation.EST);
  });

  test("Le rover avance de 1 vers le Sud et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover();
    rover.map = map;

    rover.goBack();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 0, y: 4});
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover avance de 1 vers l'Ouest et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover();
    rover.map = map;

    rover.turnOnLeft();
    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 4, y: 0});
    expect(etat.getOrientation()).toBe(Orientation.WEST);
  });

  test("Le rover avance de 5 vers le nord et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover();
    rover.map = map;

    for(let i = 0; i < 5; i++) {
      rover.goAhead();
    }

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions().coordinates).toStrictEqual({x: 0, y: 0});
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });
});