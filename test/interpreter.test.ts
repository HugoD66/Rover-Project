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
    const obstacles = new Obstacle([{x: 1, y: 1}, {x: 2, y: 4}, {x: 4, y: 4}]);

    interpreter =  new Interpreter(map, rover, ['A', 'G', 'G', 'G', 'A', 'A'], obstacles);
    //expect(interpreter.Execute());

    expect(interpreter.getCommand()).toStrictEqual(['A', 'G', 'G', 'G', 'A', 'A']);
  })
})