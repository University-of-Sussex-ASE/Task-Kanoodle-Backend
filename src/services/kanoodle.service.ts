import { Service } from 'typedi';
import { Kanoodle } from '@/algorithm/kanoodle.class';
import { PieceDescriptions } from '@/algorithm/pieces.const';

@Service()
export class KanoodleService {
  public async solveKanoodleProblem(input) {
    const Gridwith = 11;
    const Gridheight = 5;
    const { initialPieces, limit } = input;

    const solutions = Kanoodle.findAllSolutions(PieceDescriptions, Gridwith, Gridheight, initialPieces, limit);
    return {
      count: solutions.length,
      solutions,
    };
  }
}
