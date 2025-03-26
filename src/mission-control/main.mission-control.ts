import {MissionControl} from "./mission-control";
import {Rover} from "../rover/rover";

export function instantiateMissionControl(rover: Rover, commands?: string[]): MissionControl {
  return new MissionControl(rover, commands);
}