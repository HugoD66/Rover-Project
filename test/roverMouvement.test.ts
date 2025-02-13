import { Rover } from "../src/class/rover";
import { Orientation } from "../src/interface/rover.interface";
import { Map } from "../src/class/map";
import {Interpreter} from "../src/class/interpreter";
import {Obstacle} from "../src/class/obstacle";

describe("Tests de déplacement du Rover", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover avance de 1 vers le Nord", () => {
    map = new Map(5, 5);
    rover = new Rover(0, 0, Orientation.NORD, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(1);
    expect(etat.GetOrientation()).toBe(Orientation.NORD);
  });

  test("Le rover avance de 1 vers l'Est", () => {
    map = new Map(5, 5);
    rover = new Rover(0, 0, Orientation.EST, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(1);
    expect(etat.GetPositionY()).toBe(0);
    expect(etat.GetOrientation()).toBe(Orientation.EST);
  });

  test("Le rover avance de 1 vers le Sud", () => {
    map = new Map(5, 5);
    rover = new Rover(2, 1, Orientation.SUD, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(0)
    expect(etat.GetOrientation()).toBe(Orientation.SUD);
  });

  test("Le rover avance de 1 vers l'Ouest", () => {
    map = new Map(5, 5);
    rover = new Rover(3, 3, Orientation.OUEST, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(3);
    expect(etat.GetOrientation()).toBe(Orientation.OUEST);
  });
});

describe("Tests de déplacement sur la map ( retour au début ) du Rover", () => {
  let rover: Rover;
  let map: Map;

  test("Le rover dépasse la limite nord et revient au sud", () => {
    map = new Map(5, 5);
    rover = new Rover(2, 4, Orientation.NORD, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(0);
  });

  test("Le rover dépasse la limite sud et revient au nord", () => {
    map = new Map(5, 5);
    rover = new Rover(3,  0, Orientation.SUD, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(3);
    expect(etat.GetPositionY()).toBe(4);
  });

  test("Le rover dépasse la limite est et revient à l'ouest", () => {
    map = new Map(5, 5);
    rover = new Rover(4, 2, Orientation.EST, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(2);
  });

  test("Le rover dépasse la limite ouest et revient à l'est", () => {
    map = new Map(5, 5);
    rover = new Rover(0, 3, Orientation.OUEST, map);

    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(4);
    expect(etat.GetPositionY()).toBe(3);
  });
});

/*
describe("Tests d'exécution de l'Interpreter", () => {
  let interpreter: Interpreter;
  let map: Map;
  let rover: Rover;
  let obstacles: Obstacle;

  beforeEach(() => {
    map = new Map(5, 5);
    rover = new Rover(0, 0, Orientation.NORD, map);
    obstacles = new Obstacle(1, 1);
  });

  test("Le rover exécute une série de commandes sans collision", () => {
    interpreter = new Interpreter(rover, ['A'], obstacles);

    expect(() => interpreter.Execute()).not.toThrow();

    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(1);
  });

  test("Le rover détecte une collision et arrête l'exécution", () => {
    interpreter = new Interpreter(rover, ['A', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'A', 'A', 'A', 'A', 'A', 'D', 'D', 'D', 'B', 'B', 'B', 'B', 'B', 'B' ], obstacles);

    expect(() => interpreter.Execute()).toThrow('Collision detected');

    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(1);
  });
});*/
