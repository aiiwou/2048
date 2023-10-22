import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const GRID_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
    constructor(gridElement) {
        this.cells = [];
        for (let i = 0; i < GRID_COUNT; i++) {
            this.cells.push(new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE)));
        }

        this.groupedCellsByColumn = this.groupCells(1);
        this.groupedCellsByReversedColumn = this.groupedCellsByColumn.map(column => [...column].reverse()); 
        this.groupedCellsByRow = this.groupCells();
        this.groupedCellsByReversedRow = this.groupedCellsByRow.map(row => [...row].reverse());
    }
 
    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    // isVertical = 1 если нужно группировать по колонкам (для движения вверх и вниз)
    /// = 0 если по строкам (для движения вправо и влево)
    groupCells(isVertical = 0) {
        return this.cells.reduce((groupedCells, cell) => {
            const _x = isVertical == 1 ? cell.x : cell.y;
            const _y = isVertical == 1 ? cell.y : cell.x;
            groupedCells[_x] = groupedCells[_x] || [];
            groupedCells[_x][_y] = cell;
            return groupedCells;
        }, [])
    }
}