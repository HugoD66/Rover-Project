import { MissionControl } from "../src/mission-control/mission-control";
import { Rover } from "../src/rover/rover";
import { Map } from "../src/rover/map/map";
import { InterpreterDirection, Orientation } from "../src/rover/rover.interface";
import { Coordinates } from "../src/rover/coordinate/coordinates";

describe("MissionControl", () => {
  let missionControl: MissionControl;
  let rover: Rover;
  let map: Map;

  beforeEach(() => {
    map = new Map(5, 5);
    rover = new Rover(map);
    missionControl = new MissionControl(rover);
  });

  test("should execute a single command", () => {
    missionControl.executeCommand("AHEAD");
    expect(rover.getActualPositions().y).toBe(1);
  });

  test("MissionControl exécute une séquence de commandes complexes", () => {
    missionControl.executeCommand(InterpreterDirection.AHEAD);
    missionControl.executeCommand(InterpreterDirection.RIGHT);
    missionControl.executeCommand(InterpreterDirection.AHEAD);

    expect(rover.getActualPositions()).toEqual(new Coordinates(1, 1)); // Position attendue après les mouvements
    expect(rover.getOrientation()).toBe(Orientation.EST);  // Orientation attendue après la rotation
  });

  test("should execute multiple commands", () => {
    missionControl.executeCommand(InterpreterDirection.AHEAD);
    missionControl.executeCommand(InterpreterDirection.RIGHT);
    missionControl.executeCommand(InterpreterDirection.AHEAD);
    expect(rover.getActualPositions()).toEqual(new Coordinates(1, 1));
  });
});
