import { Interpreter } from "./interpreter/interpreter-export";
import {Rover} from "./rover/rover-export";
import {MissionControl} from "./mission-control/mission-control-export";

import { instantiateMissionControl } from "./mission-control/main.mission-control";
import { instantiateRover } from "./rover/main-rover";
import {CliUI} from "./ui/cli-ui";

const HOST = '0.0.0.0';
const PORT = 12345;

function runMission(): void {
    const rover: Rover = instantiateRover();

    const missionControl: MissionControl = instantiateMissionControl(rover);

    const interpreter: Interpreter = new Interpreter(missionControl);

    interpreter.startServer(HOST, PORT);

    const cli = new CliUI(interpreter);
    cli.start();
}

runMission();