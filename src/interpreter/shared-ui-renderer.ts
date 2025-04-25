import { renderMapAscii } from "../rover/map/map-renderer";
import { MissionControl } from "../mission-control/mission-control";

export function renderFullState(missionControl: MissionControl): string {
  const roverState = missionControl.getRoverState();
  const map = missionControl.getMap();
  const obstacles = map.getObstacles();
  const { width, height } = {
    width: map.getMapLimitX(),
    height: map.getMapLimitY(),
  };

  const ascii = renderMapAscii(roverState, obstacles ?? [], { width, height });

  return [
    `🛸 Orientation du Rover : ${roverState.getOrientation()}`,
    `🪐 Position du Rover : ${roverState.getActualPositions().toString()}`,
    '',
    ascii
  ].join('\n');
}
