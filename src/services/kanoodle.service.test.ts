import { KanoodleService } from './kanoodle.service';

describe.only('KanoodleService', () => {
  const kanoodleService = new KanoodleService();
  const mockInput = {
    initialPieces: [
      {
        row: 0,
        col: 0,
        symbol: 'A',
        tiles: [
          {
            row: 0,
            col: 1,
          },
          {
            row: 2,
            col: 1,
          },
          {
            row: 0,
            col: 0,
          },
          {
            row: 1,
            col: 0,
          },
          {
            row: 2,
            col: 0,
          },
        ],
        originalTiles: [
          {
            col: 0,
            row: 0,
          },
          {
            col: 2,
            row: 0,
          },
          {
            col: 0,
            row: 1,
          },
          {
            col: 1,
            row: 1,
          },
          {
            col: 2,
            row: 1,
          },
        ],
        dimensions: {
          col: 3,
          row: 2,
        },
        rotation: 'ROTATION_90',
        flipState: false,
        color: '#e4240d',
      },
      {
        row: 0,
        col: 1,
        symbol: 'C',
        tiles: [
          {
            col: 1,
            row: 0,
          },
          {
            col: 0,
            row: 1,
          },
          {
            col: 1,
            row: 1,
          },
          {
            col: 1,
            row: 2,
          },
          {
            col: 2,
            row: 2,
          },
        ],
        originalTiles: [
          {
            col: 1,
            row: 0,
          },
          {
            col: 0,
            row: 1,
          },
          {
            col: 1,
            row: 1,
          },
          {
            col: 1,
            row: 2,
          },
          {
            col: 2,
            row: 2,
          },
        ],
        dimensions: {
          col: 3,
          row: 3,
        },
        rotation: 'ROTATION_0',
        flipState: false,
        color: '#f5a4c8',
      },
      {
        row: 3,
        col: 0,
        symbol: 'F',
        tiles: [
          {
            row: 1,
            col: 2,
          },
          {
            row: 0,
            col: 1,
          },
          {
            row: 1,
            col: 1,
          },
          {
            row: 0,
            col: 0,
          },
          {
            row: 1,
            col: 0,
          },
        ],
        originalTiles: [
          {
            col: 1,
            row: 0,
          },
          {
            col: 0,
            row: 1,
          },
          {
            col: 1,
            row: 1,
          },
          {
            col: 0,
            row: 2,
          },
          {
            col: 1,
            row: 2,
          },
        ],
        dimensions: {
          col: 2,
          row: 3,
        },
        rotation: 'ROTATION_90',
        flipState: false,
        color: '#b96bae',
      },
    ],
  };

  it('should solve the Kanoodle problem and return the correct result with limit', async () => {
    // Act
    const result = await kanoodleService.solveKanoodleProblem({ ...mockInput, limit: 1 });

    // Assert
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('solutions');
    expect(result.count).toBe(1);
    expect(result.solutions).toEqual([
      [
        {
          piece: {
            index: 0,
            symbol: 'A',
            gridWidth: 11,
            gridHeight: 5,
            color: '#e4240d',
            dimensions: {
              col: 3,
              row: 2,
            },
            bitfield: '1797',
            tiles: [
              {
                col: 0,
                row: 0,
              },
              {
                col: 2,
                row: 0,
              },
              {
                col: 0,
                row: 1,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 2,
                row: 1,
              },
            ],
          },
          rotation: 'ROTATION_90',
          col: 0,
          row: 0,
          flipped: false,
        },
        {
          piece: {
            index: 2,
            symbol: 'C',
            gridWidth: 11,
            gridHeight: 5,
            color: '#f5a4c8',
            dimensions: {
              col: 3,
              row: 3,
            },
            bitfield: '393986',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 0,
                row: 1,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 1,
                row: 2,
              },
              {
                col: 2,
                row: 2,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 1,
          row: 0,
          flipped: false,
        },
        {
          piece: {
            index: 5,
            symbol: 'F',
            gridWidth: 11,
            gridHeight: 5,
            color: '#b96bae',
            dimensions: {
              col: 2,
              row: 3,
            },
            bitfield: '197378',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 0,
                row: 1,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
            ],
          },
          rotation: 'ROTATION_90',
          col: 0,
          row: 3,
          flipped: false,
        },
        {
          piece: {
            index: 1,
            symbol: 'B',
            gridWidth: 11,
            gridHeight: 5,
            color: '#ee69a3',
            dimensions: {
              col: 2,
              row: 4,
            },
            bitfield: '16974338',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
              {
                col: 0,
                row: 3,
              },
            ],
          },
          rotation: 'ROTATION_90',
          col: 2,
          row: 3,
          flipped: false,
        },
        {
          piece: {
            index: 4,
            symbol: 'E',
            gridWidth: 11,
            gridHeight: 5,
            color: '#fee83a',
            dimensions: {
              col: 2,
              row: 4,
            },
            bitfield: '33751554',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
              {
                col: 1,
                row: 3,
              },
            ],
          },
          rotation: 'ROTATION_270',
          col: 3,
          row: 0,
          flipped: false,
        },
        {
          piece: {
            index: 6,
            symbol: 'G',
            gridWidth: 11,
            gridHeight: 5,
            color: '#8e58a5',
            dimensions: {
              col: 3,
              row: 2,
            },
            bitfield: '774',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 2,
                row: 0,
              },
              {
                col: 0,
                row: 1,
              },
              {
                col: 1,
                row: 1,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 3,
          row: 1,
          flipped: true,
        },
        {
          piece: {
            index: 7,
            symbol: 'H',
            gridWidth: 11,
            gridHeight: 5,
            color: '#65bc68',
            dimensions: {
              col: 2,
              row: 3,
            },
            bitfield: '197122',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
            ],
          },
          rotation: 'ROTATION_270',
          col: 4,
          row: 3,
          flipped: false,
        },
        {
          piece: {
            index: 3,
            symbol: 'D',
            gridWidth: 11,
            gridHeight: 5,
            color: '#179ad9',
            dimensions: {
              col: 3,
              row: 2,
            },
            bitfield: '519',
            tiles: [
              {
                col: 0,
                row: 0,
              },
              {
                col: 1,
                row: 0,
              },
              {
                col: 2,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 8,
          row: 0,
          flipped: false,
        },
        {
          piece: {
            index: 11,
            symbol: 'L',
            gridWidth: 11,
            gridHeight: 5,
            color: '#89c8ec',
            dimensions: {
              col: 3,
              row: 3,
            },
            bitfield: '198148',
            tiles: [
              {
                col: 2,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 2,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 7,
          row: 0,
          flipped: true,
        },
        {
          piece: {
            index: 10,
            symbol: 'K',
            gridWidth: 11,
            gridHeight: 5,
            color: '#edb02e',
            dimensions: {
              col: 2,
              row: 2,
            },
            bitfield: '769',
            tiles: [
              {
                col: 0,
                row: 0,
              },
              {
                col: 0,
                row: 1,
              },
              {
                col: 1,
                row: 1,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 6,
          row: 1,
          flipped: false,
        },
        {
          piece: {
            index: 8,
            symbol: 'I',
            gridWidth: 11,
            gridHeight: 5,
            color: '#f3742b',
            dimensions: {
              col: 3,
              row: 3,
            },
            bitfield: '459780',
            tiles: [
              {
                col: 2,
                row: 0,
              },
              {
                col: 2,
                row: 1,
              },
              {
                col: 0,
                row: 2,
              },
              {
                col: 1,
                row: 2,
              },
              {
                col: 2,
                row: 2,
              },
            ],
          },
          rotation: 'ROTATION_0',
          col: 8,
          row: 1,
          flipped: false,
        },
        {
          piece: {
            index: 9,
            symbol: 'J',
            gridWidth: 11,
            gridHeight: 5,
            color: '#1b8841',
            dimensions: {
              col: 2,
              row: 4,
            },
            bitfield: '50463234',
            tiles: [
              {
                col: 1,
                row: 0,
              },
              {
                col: 1,
                row: 1,
              },
              {
                col: 1,
                row: 2,
              },
              {
                col: 0,
                row: 3,
              },
              {
                col: 1,
                row: 3,
              },
            ],
          },
          rotation: 'ROTATION_90',
          col: 7,
          row: 3,
          flipped: false,
        },
      ],
    ]);
  });

  it('should solve the Kanoodle problem and return the correct result without limit', async () => {
    // Act
    const result = await kanoodleService.solveKanoodleProblem(mockInput);

    // Assert
    expect(result).toHaveProperty('count');
    expect(result).toHaveProperty('solutions');
    expect(result.count).toBe(2137);
    expect(result.solutions).toHaveLength(2137);
  });
});
