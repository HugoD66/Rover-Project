import { Rover } from "../src/class/rover";
import {IRoverState, Orientation} from "../src/interface/rover.interface";
import { Map } from "../src/class/map";
import {Coordinates} from "../src/class/coordinates";

describe("Tests de déplacement du Rover", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover est initialisé à la position (0, 0) et orienté vers le Nord", () => {
    rover = new Rover(map);

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover avance de 1 vers le Nord", () => {
    map = new Map(5, 5);
    rover = new Rover(map);

    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 1));
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover avance de 1 vers l'Est", () => {
    map = new Map(5, 5);
    rover = new Rover(map);

    rover.turnOnRight();
    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(1, 0));
    expect(etat.getOrientation()).toBe(Orientation.EST);
  });

  test("Le rover avance de 1 vers le Sud et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover(map);

    rover.goBack();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 4));
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover avance de 1 vers l'Ouest et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover(map);

    rover.turnOnLeft();
    rover.goAhead();

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(4, 0));
    expect(etat.getOrientation()).toBe(Orientation.WEST);
  });

  test("Le rover avance de 5 vers le nord et dépasse limite map", () => {
    map = new Map(5, 5);
    rover = new Rover(map);

    for(let i = 0; i < 5; i++) {
      rover.goAhead();
    }

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });
});