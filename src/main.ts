import { Interpreter } from "./interpreter/interpreter-export";
import {InterpreterDirection} from "./rover/interface/rover.interface";
import { instantiateMissionControl } from "./mission-control/main.mission-control";
import {instantiateRover} from "./rover/main-rover";

function runMission() {
    const rover = instantiateRover();
    const missionControl = instantiateMissionControl(rover);

    const commands = [InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
    const interpreter = new Interpreter(missionControl, commands);

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