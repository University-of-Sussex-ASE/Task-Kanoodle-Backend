import { Service } from 'typedi';
import { solvePyramid } from '@/pyramid-algorithm/pyramid.solver';
import { performance } from 'perf_hooks';

@Service()
export class PyramidService {
  public async solvePyramidProblem(input) {
    const { initialPieces } = input;

    const t0 = performance.now();
    const result = solvePyramid(initialPieces || []);
    const t1 = performance.now();

    console.log('solvePyramid took ' + (t1 - t0) + ' milliseconds.');

    return result;
  }
}
