import { Rover } from "../src/rover/rover";
import {IRoverState, Orientation} from "../src/rover/rover.interface";
import { Map } from "../src/rover/map/map";
import {Coordinates} from "../src/rover/coordinate/coordinates";

describe("Tests de déplacement du Rover", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover est initialisé à la position (0, 0) et orienté vers le Nord", () => {
    rover = new Rover(map);

    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
    expect(etat.getOrientation()).toBe(Orientation.NORTH);
  });

  test("Le rover tourne puis fait un mouvement inverse (BACK)", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
  
    rover.turnOnRight(); // Tourne à droite (de Nord à Est)
    rover.goAhead();     // Avance de 1 à (1, 0)
    rover.turnOnRight(); // Tourne à droite (de Est à Sud)
    rover.goBack();      // Avance de 1 vers le Sud, donc retourne à (1, 1)
  
    const etat: IRoverState = rover.getState();
    expect(etat.getActualPositions()).toStrictEqual(new Coordinates(1, 1));
    expect(etat.getOrientation()).toBe(Orientation.SOUTH);
  });
  test("Le rover effectue une rotation complète et revient à sa position initiale", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
  
    rover.turnOnLeft();  // Tourne à gauche (de Nord à Ouest)
    rover.turnOnLeft();  // Tourne à gauche (de Ouest à Sud)
    rover.turnOnLeft();  // Tourne à gauche (de Sud à Est)
    rover.turnOnLeft();  // Tourne à gauche (de Est à Nord)
  
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