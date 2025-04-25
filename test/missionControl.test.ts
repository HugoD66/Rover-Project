import { MissionControl } from "../src/mission-control/mission-control";
import { Rover } from "../src/rover/rover";
import { Map } from "../src/rover/map/map";

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

  test("should execute multiple commands", () => {
    missionControl.setCommandLine(["AHEAD", "RIGHT", "AHEAD"]);
    missionControl.executeCommands();
    expect(rover.getActualPositions()).toEqual(new Coordinates(1, 1));
  });
});
