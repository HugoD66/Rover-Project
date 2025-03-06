import {MissionControl} from "./class/mission-control";
import {Rover} from "../rover/class/rover";

export function instantiateMissionControl(rover: Rover): MissionControl {
  return new MissionControl(rover);
}