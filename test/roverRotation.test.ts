import { Rover } from "../src/class/rover";
import { Orientation } from "../src/interface/rover.interface";
import { Map } from "../src/class/map";

describe("Tests de rotation du Rover", () => {
  let rover: Rover;
  let map: Map;

  beforeEach(() => {
    map = new Map(5, 5);
    rover = new Rover(0, 0, Orientation.SUD, map);
  });

  test("Le rover tourne à gauche", () => {
    rover.TournerAGauche();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(0);
    expect(etat.GetOrientation()).toBe(Orientation.EST);
  });

  test("Le rover tourne à droite", () => {
    rover.TournerADroite();
    const etat = rover.GetEtat();
    expect(etat.GetPositionX()).toBe(0);
    expect(etat.GetPositionY()).toBe(0);
    expect(etat.GetOrientation()).toBe(Orientation.OUEST);
  });
});
