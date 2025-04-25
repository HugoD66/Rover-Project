import {Coordinates} from "../rover/coordinate/coordinates";

export type MoveResult = {
  success: boolean;
  position: Coordinates;
  message?: string;
};