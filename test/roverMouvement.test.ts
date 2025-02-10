import { Rover } from "../src/class/rover";
import { Orientation } from "../src/interface/rover.interface";

describe("Tests de déplacement du Rover", () => {
  let rover: Rover;

  beforeEach(() => {
    rover = new Rover(0, 0, Orientation.NORD, 5, 5);
  });

  test("Le rover avance de 1 vers le Nord", () => {
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(1);
    expect(etat.GetOrientation()).toBe(Orientation.NORD);
  });

  test("Le rover avance de 1 vers l'Est", () => {
    rover = new Rover(0, 0, Orientation.EST, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(1);
    expect(etat.GetPositionY()).toBe(0);
    expect(etat.GetOrientation()).toBe(Orientation.EST);
  });

  test("Le rover avance de 1 vers le Sud", () => {
    rover = new Rover(2, 2, Orientation.SUD, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(1);
    expect(etat.GetOrientation()).toBe(Orientation.SUD);
  });

  test("Le rover avance de 1 vers l'Ouest", () => {
    rover = new Rover(3, 3, Orientation.OUEST, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(3);
    expect(etat.GetOrientation()).toBe(Orientation.OUEST);
  });
});

/*
describe("Tests de déplacement sur la map ( retour au début )  du Rover", () => {
  let rover: Rover;

  test("Le rover dépasse la limite nord et revient au sud", () => {
    rover = new Rover(2, 4, Orientation.NORD, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(2);
    expect(etat.GetPositionY()).toBe(0);
  });

  test("Le rover dépasse la limite sud et revient au nord", () => {
    rover = new Rover(3, 0, Orientation.SUD, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(3);
    expect(etat.GetPositionY()).toBe(4);
  });

  test("Le rover dépasse la limite est et revient à l'ouest", () => {
    rover = new Rover(4, 2, Orientation.EST, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(2);
  });

  test("Le rover dépasse la limite ouest et revient à l'est", () => {
    rover = new Rover(0, 3, Orientation.OUEST, 5, 5);
    rover.Avancer();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(4);
    expect(etat.GetPositionY()).toBe(3);
  });
});
*/
