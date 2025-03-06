import {MissionControl} from "./class/mission-control";
import {Rover} from "../rover/class/rover";

export function instantiateMissionControl(rover: Rover, commands: string[]): MissionControl {
  return new MissionControl(rover, commands);
}