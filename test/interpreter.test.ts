import {Interpreter} from "../src/class/interpreter";
import {Rover} from "../src/class/rover";
import {Map} from "../src/class/map";
import {Orientation} from "../src/interface/rover.interface";
import {Obstacle} from "../src/class/obstacle";

describe("Tests de création de la chaine de commande", () => {
  let interpreter: Interpreter;
  let map: Map;
  let rover: Rover;

  test('La chaine de commande a bien été crée', () => {
    const map = new Map(5, 5);
    const rover = new Rover(0, 0, Orientation.NORD, map);
    const obstacle = new Obstacle(4, 4);

    interpreter =  new Interpreter(rover, ['A', 'G', 'G', 'G', 'A', 'A'], obstacle);

    expect(interpreter.getCommand()).toStrictEqual(['A', 'G', 'G', 'G', 'A', 'A']);
  })
})