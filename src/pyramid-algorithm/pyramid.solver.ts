import _ from 'lodash';
import { DancingLinkX } from './pyramid.dlx';
import { PyramidPattern, Piece } from './pyramid.interface';
import { PIECES, PieceData, rotates, piecemap, piececolor } from './pyramid.const';

function formatSolution(matrix, indices) {
  const result = [];
  const yValueMatrix = [0, -1, 0, 1, -1, 0, 1, 2, -1, 0, 1, 2, 3, -1, 0, 1, 2, 3, 4, -1];
  const zValueMatrix = [0, -1, 1, 1, -1, 2, 2, 2, -1, 3, 3, 3, 3, -1, 4, 4, 4, 4, 4, -1];

  for (const [x, line] of matrix.entries()) {
    for (const [y, blockIndex] of line.entries()) {
      if (blockIndex === -1) continue;
      const symbol = piecemap[blockIndex];
      const color = piececolor[blockIndex];
      const resultIndex = result.findIndex(item => item.symbol === symbol);
      const coordinateObj = {
        x,
        y: yValueMatrix[y],
        z: zValueMatrix[y],
      };
      if (resultIndex === -1) {
        const pieceIndices = indices.filter(item => item.blockIndex === blockIndex);
        result.push({
          pieceIndex: blockIndex,
          symbol,
          color,
          coordinates: [coordinateObj],
          indices: pieceIndices[0].indices,
        });
      } else {
        result[resultIndex].coordinates.push(coordinateObj);
      }
      result.sort((a, b) => a.symbol.charCodeAt(0) - b.symbol.charCodeAt(0));
      for (const item of result) {
        item.coordinates.sort((a, b) => a.z - b.z);
      }
    }
  }
  return result;
}

//SOLVE PYRAMID
function solvePyramid(initialPieces = []) {
  console.log('Solving 5 Level Pyramid Pattern Puzzle.');
  const pattern = new PyramidPattern(5);

  //create all possible pieces
  const pieces = [];
  let piecenodecount = 0;
  for (let blockIndex = 0; blockIndex < PIECES; blockIndex++) {
    const originalPiece = new Piece(PieceData[blockIndex], blockIndex, 0, []);
    pieces.push(JSON.parse(JSON.stringify(originalPiece)));
    piecenodecount += originalPiece.size();

    switch (rotates[blockIndex]) {
      case 8:
        for (let i = 0; i < 3; i++) {
          originalPiece.rotate();
          pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        }
        originalPiece.flip();
        pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        for (let i = 0; i < 3; i++) {
          originalPiece.rotate();
          pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        }
        break;
      case 4:
        for (let i = 0; i < 3; i++) {
          originalPiece.rotate();
          pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        }
        break;
      case 2:
        originalPiece.rotate();
        pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        break;
      case -4:
        for (let i = 0; i < 1; i++) {
          console.log('runnnn');
          originalPiece.rotate();
          pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        }
        console.log(originalPiece);
        originalPiece.flip();
        pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        for (let i = 0; i < 1; i++) {
          originalPiece.rotate();
          pieces.push(JSON.parse(JSON.stringify(originalPiece)));
        }
        break;
      case 1:
      default:
        break;
    }
  }
  //create all possible steps
  let steps = [];
  for (const piece of pieces) {
    pattern.getValidSteps(piece, steps);
  }
  let nodecount = 0;
  nodecount = steps.reduce((value, step) => value + step.indices.length + 1, 0);
  nodecount += PIECES + pattern.size() + 1;

  //filter out steps that are not in initialPieces
  if (initialPieces.length > 0) {
    for (const piece of initialPieces) {
      const { pieceIndex, indices } = piece;
      steps = steps.filter(step => {
        if (step.blockIndex === pieceIndex) {
          return _.isEqual(indices, step.indices);
        }
        return true;
      });
    }
  }

  const dlx = new DancingLinkX(nodecount, steps.length, pattern.size() + PIECES, pattern.size() === piecenodecount);
  for (let i = 0; i < steps.length; i++) {
    for (const index of steps[i].indices) {
      dlx.link(i + 1, index);
    }
    dlx.link(i + 1, steps[i].blockIndex + pattern.size() + 1);
  }
  const stepslist = [];
  dlx.spread(0, 1, stepslist);
  const results = [];
  let count = 0;
  for (const steps of stepslist) {
    const clone = _.cloneDeep(dlx);
    for (const step of steps) {
      clone.knownStep(step);
    }
    clone.dance();
    for (const solution of clone.getResult()) {
      results.push(solution);
    }
    const x = (++count * 100) / stepslist.length;
    console.log('result count', results.length);
    console.log(`\r${x.toFixed(2)}% completed.`);
  }
  const solutions = [];
  for (const result of results) {
    const solution = [];
    for (const index of result) {
      solution.push(steps[index - 1]);
    }
    solution.sort((step1, step2) => step1.blockIndex - step2.blockIndex);
    solutions.push(solution);
  }
  solutions.sort((solution1, solution2) => {
    for (let i = 0; i < PIECES; i++) {
      if (solution1[i].shapeindex !== solution2[i].shapeindex) {
        return solution1[i].shapeindex - solution2[i].shapeindex;
      } else if (solution1[i].x !== solution2[i].x) {
        return solution1[i].x - solution2[i].x;
      } else if (solution1[i].y !== solution2[i].y) {
        return solution1[i].y - solution2[i].y;
      }
    }
    return 0;
  });
  if (solutions.length === 0) {
    return {
      count: 0,
      solutions: [],
    };
  } else {
    const formatSolutions = [];
    for (const solution of solutions) {
      const solutionMatrixFormat = pattern.formatMatrix(solution);
      formatSolutions.push(formatSolution(solutionMatrixFormat, solution));
    }
    return {
      count: formatSolutions.length,
      solutions: formatSolutions,
    };
  }
}

export { solvePyramid };
