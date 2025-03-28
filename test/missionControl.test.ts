import {Rover} from "../src/rover/rover";
import {Map} from "../src/rover/map";
import {MissionControl} from "../src/mission-control/mission-control";
import {Coordinates} from "../src/core/types/coordinates";
import {InterpreterDirection, Orientation} from "../src/core/interfaces/rover.interface";

describe("Test du Mission Control", () => {
  let rover: Rover;
  let map: Map;
  let missionControl: MissionControl;

  test("Le mission control est bien instancié", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover, []);
    expect(missionControl).toBeInstanceOf(MissionControl);
  })
  test("Le rover avance via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover, [InterpreterDirection.AHEAD]);

    missionControl.executeCommands();

    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 1));
  })

  test("Le rover recule via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover, [InterpreterDirection.BACK]);

    missionControl.executeCommands();

    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 4));
  })

  test("Le rover tourne à gauche via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover, [InterpreterDirection.LEFT]);

    missionControl.executeCommands();

    const state = rover.getState();
    expect(state.getActualPositions()).toStrictEqual(new Coordinates(0, 0));
  })

  test("Le rover tourne à droite via le Mission Control", () => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover, [InterpreterDirection.RIGHT]);

    missionControl.executeCommands();

    const state = rover.getState();
    expect(state.getOrientation()).toBe(Orientation.EST);
  })
})