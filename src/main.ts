import { Interpreter } from "./interpreter/interpreter-export";
import {Rover} from "./rover/rover-export";
import {MissionControl} from "./mission-control/mission-control-export";

import {InterpreterDirection} from "./rover/interface/rover.interface";
import { instantiateMissionControl } from "./mission-control/main.mission-control";
import { instantiateRover } from "./rover/main-rover";

function runMission(): void {
    const rover: Rover = instantiateRover();

    //Meet obstacle
    //const commands: string[] = [InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]

    //No obstacle
    const commands: string[] = [InterpreterDirection.AHEAD, InterpreterDirection.LEFT, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
    const missionControl: MissionControl = instantiateMissionControl(rover, commands);

    const interpreter: Interpreter = new Interpreter(missionControl);

    console.log("Initial State:",
      "\nOrientation:", missionControl.getRoverState().getOrientation(),
      "\nPositions:", missionControl.getRoverState().getActualPositions()
    );

    interpreter.executeCommands();

    console.log("Final State:",
      "\nOrientation:", missionControl.getRoverState().getOrientation(),
      "\nPositions:", missionControl.getRoverState().getActualPositions()
    );
}

runMission();