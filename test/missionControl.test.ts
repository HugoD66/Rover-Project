import {Rover} from "../src/class/rover";
import {Map} from "../src/class/map";
import {MissionControl} from "../src/class/mission-control";
import {Coordinates} from "../src/class/coordinates";
import {Obstacle} from "../src/class/obstacle";
import {InterpreterDirection, Orientation} from "../src/interface/rover.interface";

describe("Test du Mission Control", () => {
  let rover: Rover;
  let map: Map;
  let missionControl: MissionControl;
  test("Le mission control est bien instancié", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);
    expect(missionControl).toBeInstanceOf(MissionControl);
  })
  test("Le rover avance via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);

    missionControl.goAhead();
    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 1));
  })

  test("Le rover recule via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);

    missionControl.goBack();
    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 4));
  })

  test("Le rover tourne à gauche via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);

    missionControl.turnOnLeft();
    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
  })

  test("Le rover tourne à droite via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);

    missionControl.turnOnRight();
    const state = rover.getState();
    expect(state.getOrientation()).toBe(Orientation.EST);
  })
})