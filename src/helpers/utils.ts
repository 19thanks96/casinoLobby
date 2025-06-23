
export const MAX_REELS = 3;
export const MAX_SYMBOL_IN_REEL = 3;


export const initialReels =  [
    [1, 1, 3],
    [2, 2, 2],
    [2, 0, 2],
];



export function rotateMatrixToRight(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const rotatedMatrix: number[][] = Array.from({ length: cols }, () => new Array(rows));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            rotatedMatrix[col][rows - 1 - row] = matrix[row][col];
        }
    }

    return rotatedMatrix;
}

export function rotateMatrixToLeft(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const rotatedMatrix: number[][] = Array.from({ length: cols }, () => new Array(rows));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            rotatedMatrix[cols - 1 - col][row] = matrix[row][col];
        }
    }
    return rotatedMatrix;
}