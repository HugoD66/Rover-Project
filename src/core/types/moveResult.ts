import {Coordinates} from "./coordinates";

export type MoveResult = {
  success: boolean;
  position: Coordinates;
  message?: string;
};