import { InterpreterDirection } from "../../rover/interface/rover.interface";
import { MissionControl } from "../../mission-control/mission-control-export";

export class Interpreter {
  private missionControl: MissionControl;
  private commands: string[];

  constructor(missionControl: MissionControl, commands: string[]) {
    this.missionControl = missionControl;
    this.commands = commands;
  }

  executeCommands() {
    for (let char of this.commands) {
      this.executeCommand(char);
    }
  }

  private executeCommand(char: string) {
    switch (char) {
      case InterpreterDirection.AHEAD:
        this.missionControl.goAhead();
        break;
      case InterpreterDirection.RIGHT:
        this.missionControl.turnOnRight();
        break;
      case InterpreterDirection.LEFT:
        this.missionControl.turnOnLeft();
        break;
      case InterpreterDirection.BACK:
        this.missionControl.goBack();
        break;
      default:
        throw new Error(`Unknown command: ${char}`);
    }
  }
}
