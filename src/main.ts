import { Interpreter } from "./interpreter/interpreter";
import { Rover } from "./rover/rover";
import { MissionControl } from "./mission-control/mission-control";
import { instantiateMissionControl } from "./mission-control/main.mission-control";
import { instantiateRover } from "./rover/rover-factory";
import { CliUI } from "./interpreter/cli-ui";

const HOST = '0.0.0.0';
const PORT = 12345;

function runMission(): void {
  const rover: Rover = instantiateRover();
  const missionControl: MissionControl = instantiateMissionControl(rover);
  const interpreter: Interpreter = new Interpreter(missionControl);
  const cli = new CliUI(interpreter);

  cli.start();
  interpreter.startServer(HOST, PORT);
}

runMission();
