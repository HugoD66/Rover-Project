import { MissionControl } from "../../mission-control/mission-control-export";

export class Interpreter {
  private missionControl: MissionControl;

  public constructor(missionControl: MissionControl) {
    this.missionControl = missionControl;
  }

  public executeCommands(): void {
    this.missionControl.executeCommands();
  }
}
