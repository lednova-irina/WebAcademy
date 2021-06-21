function crossGame(user) {
  const svgNS = "http://www.w3.org/2000/svg";

  const X = crossGame.X;
  const O = crossGame.O;
  const EMPTY = "EMPTY";

  const NOT_STARTED = "NOT_STARTED";
  const STARTED = "STARTED";
  // const PAUSED =2;
  const WIN = "WIN";
  const STANDOFF = "STANDOFF";

  this.user = user;
  this.steps = 0;
  this.status = NOT_STARTED;

  this.boardEl = document.querySelector(".cross__board");
  this.boardRows = document.querySelectorAll(".cross__board--row");
  this.board = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];

  this.stepHistory = [];
  this.winLine = null;

  this.init = function init() {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const cell = this.boardRows[row].children[column];

        cell.dataset.row = row;
        cell.dataset.column = column;

        cell.onclick = this.step.bind(this, row, column);
      }
    }
    this.clearBoard();
  };

  this.renderX = function renderX() {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "x cross__board-item-el");
    svg.setAttribute("viewBox", "0 0 80 80");

    svg.innerHTML = `
      <line class="x__line1" x1="20" y1="10" x2="60" y2="70"/>
      <line class="x__line2" x1="60" y1="10" x2="20" y2="70"/>
        `;

    return svg;
  };

  this.renderO = function renderO() {
    const svg = document.createElementNS(svgNS, "svg");
    const ellipse = document.createElementNS(svgNS, "ellipse");
    svg.setAttribute("class", "o cross__board-item-el");
    svg.setAttribute("viewBox", "0 0 80 80");

    svg.append(ellipse);

    ellipse.setAttribute("cx", "40");
    ellipse.setAttribute("cy", "40");
    ellipse.setAttribute("rx", "20");
    ellipse.setAttribute("ry", "30");

    return svg;
  };

  this.clearBoard = function clearBoard() {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const cell = this.boardRows[row].children[column];

        cell.innerText = "";
      }
    }
  };

  this.render = function render() {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const cell = this.boardRows[row].children[column];

        if (cell.children.length > 0) {
          continue;
        }

        if (this.board[row][column] === X) {
          cell.append(this.renderX());
        } else if (this.board[row][column] === O) {
          cell.append(this.renderO());
        }
      }
    }

    if (this.status === WIN && this.winLine) {
      this.addCrossLine(this.winLine);
    }
  };

  this.addCrossLine = function (winLine) {
    const { type, index } = winLine;
    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute(
      "class",
      [
        "cross_finish-line",
        `cross_finish-line--${type}`,
        `cross_finish-line--${index}`,
      ].join(" ")
    );

    svg.innerHTML = `
      <line  x1="3%" y1="50%" x2="97%" y2="50%"/>
             `;

    this.boardEl.append(svg);
  };

  this.step = function step(row, column) {
    let isWent = false;
    if (this.status !== STARTED) {
      return isWent;
    }

    if (this.board[row][column] === EMPTY) {
      const el = this.steps % 2 === 0 ? X : O;

      this.board[row][column] = el;
      this.stepHistory.push({ el, column, row });

      const win = this.isWin();

      if (!win) {
        this.steps++;
        isWent = true;

        if (this.steps === 9) {
          this.status = STANDOFF;
        }
      } else {
        this.status = WIN;
        this.winLine = win;
      }

      this.render();

      if (this.status === STARTED && el === this.user) {
        setTimeout(this.autoMove.bind(this), 2000);

        // this.autoMove();
      }

      return isWent;
    }
  };

  this.isWin = function isWin() {
    const currentSymbol = this.steps % 2 === 0 ? X : O;
    const lines = this.getLines();
    const winLine = lines.find(isLineWin);

    function isLineWin(line) {
      return line.data.every(function (symbol) {
        return symbol === currentSymbol;
      });
    }

    if (winLine) {
      return winLine;
    }

    // for (let i = 0; i < 3; i++) {
    //   const columnArr = [this.board[0][i], this.board[1][i], this.board[2][i]];

    //   const winColumn = columnArr.every(isRowWin);

    //   if (winColumn) {
    //     return {
    //       index: i,
    //       type: "column",
    //     };
    //   }

    //   const rowArr = this.board[i];

    //   const winRow = rowArr.every(isRowWin);

    //   if (winRow) {
    //     return {
    //       index: i,
    //       type: "row",
    //     };
    //   }
    // }

    // const diagonals = [
    //   [this.board[0][0], this.board[1][1], this.board[2][2]],
    //   [this.board[0][2], this.board[1][1], this.board[2][0]],
    // ];

    // const winDiagIdx = diagonals.findIndex(isRowWin);

    // if (winDiagIdx !== -1) {
    //   return {
    //     index: winDiagIdx,
    //     type: "diagonal",
    //   };
    // }

    return null;
  };

  this.startGame = function startGame() {
    this.status = STARTED;
    this.steps = 0;
    this.stepHistory = [];
    this.winLine = null;

    if (this.user !== X) {
      this.autoMove();
    }
  };

  this.getLines = function () {
    const result = [];

    for (let i = 0; i < 3; i++) {
      const columnArr = [this.board[0][i], this.board[1][i], this.board[2][i]];

      result.push({
        index: i,
        type: "column",
        data: columnArr,
      });

      const rowArr = this.board[i];

      result.push({
        index: i,
        type: "row",
        data: rowArr,
      });
    }

    result.push(
      {
        index: 0,
        type: "diagonal",
        data: [this.board[0][0], this.board[1][1], this.board[2][2]],
      },
      {
        index: 1,
        type: "diagonal",
        data: [this.board[0][2], this.board[1][1], this.board[2][0]],
      }
    );
    return result;
  };

  this.countSymbolsInLine = function (sm, lineArr) {
    return lineArr.includes(sm === X ? O : X)
      ? -1
      : lineArr.reduce(function (sum, el) {
          if (el === sm) {
            return sum + 1;
          }
          return sum;
        }, 0);
  };

  this.getDistanceBetweenCells = function (cell1, cell2) {
    return (
      Math.pow(Math.abs(cell1.column - cell2.column), 2) +
      Math.pow(Math.abs(cell1.row - cell2.row), 2)
    );
  };

  this.getEmptyCorners = function () {
    const checkHandler = function (cell) {
      return this.board[cell.row][cell.column] === EMPTY;
    };
    return [
      { column: 0, row: 0 },
      { column: 2, row: 0 },
      { column: 0, row: 2 },
      { column: 2, row: 2 },
    ].filter(checkHandler, this);
  };

  this.getEmptySides = function () {
    const checkHandler = function (cell) {
      return this.board[cell.row][cell.column] === EMPTY;
    };
    return [
      { column: 1, row: 0 },
      { column: 0, row: 1 },
      { column: 2, row: 1 },
      { column: 1, row: 2 },
    ].filter(checkHandler, this);
  };

  this.moveToRandomCell = function (cells) {
    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    if (randomCell) {
      return this.step(randomCell.row, randomCell.column);
    }
  };

  this.moveToEmptyCorner = function (lastMove) {
    //   const compareFunction = function (cell1, cell2) {
    //     const distanceToCell1 = this.getDistanceBetweenCells(cell1, lastMove);
    //   };

    // const lastMove = this.stepHistory[this.stepHistory.length - 1];
    const getDistanceToCell = this.getDistanceBetweenCells.bind(this, lastMove);
    const compareFunction = function (cell1, cell2) {
      const distanceToCell1 = getDistanceToCell(cell1);
      const distanceToCell2 = getDistanceToCell(cell2);

      //   if (distanceToCell2 - distanceToCell1 < 0) {
      //     return distanceToCell2 - distanceToCell1;
      //   }
      //   if (distanceToCell2 - distanceToCell1 > 0) {
      //     return distanceToCell2 - distanceToCell1;
      //   }
      return distanceToCell2 - distanceToCell1;
    };
    const emptyCorners = this.getEmptyCorners()
      .sort(compareFunction)
      .filter(function (corner, idx, corners) {
        return getDistanceToCell(corner) === getDistanceToCell(corners[0]);
      });
    return this.moveToRandomCell(emptyCorners);
  };

  this.checkIsCorner = function (cell) {
    const corners = [
      { column: 0, row: 0 },
      { column: 2, row: 0 },
      { column: 0, row: 2 },
      { column: 2, row: 2 },
    ];

    return !!corners.find(function (corner) {
      return corner.column === cell.column && corner.row === cell.row;
    });
  };

  this.autoMove = function () {
    const mySm = this.steps % 2 === 0 ? X : O;
    const enemySm = this.steps % 2 === 1 ? X : O; //user

    if (mySm === X && this.steps === 0) {
      return this.step(1, 1);
    }

    if (mySm === O && this.steps === 1) {
      //Если крестики сделали первый ход в угол, ответить ходом в центр.
      if (this.board[1][1] === EMPTY) {
        return this.step(1, 1);
      }

      // Если крестики сделали первый ход в центр, до конца игры ходить в любой угол, а если это невозможно — в любую клетку.
      const emptyCorner = this.getEmptyCorners()[0];
      return this.step(emptyCorner.row, emptyCorner.column);
    }

    const lines = this.getLines();

    const myWinLine = lines.find(function (line) {
      return this.countSymbolsInLine(mySm, line.data) === 2;
    }, this);

    const enemyWinLine = lines.find(function (line) {
      return this.countSymbolsInLine(enemySm, line.data) === 2;
    }, this);

    const closedLine = myWinLine || enemyWinLine;

    if (closedLine) {
      switch (closedLine.type) {
        case "row": {
          const row = closedLine.index;
          const column = closedLine.data.findIndex(function (el) {
            return el === EMPTY;
          });

          return this.step(row, column);
        }
        case "column": {
          const column = closedLine.index;
          const row = closedLine.data.findIndex(function (el) {
            return el === EMPTY;
          });

          return this.step(row, column);
        }

        default: {
          const dIndex = closedLine.index;
          const emptyIndex = closedLine.data.findIndex(function (el) {
            return el === EMPTY;
          });
          if (dIndex === 0) {
            return this.step(emptyIndex, emptyIndex);
          } else {
            return this.step(emptyIndex, 2 - emptyIndex);
          }
        }
      }
    }

    if (mySm === X) {
      const lastMove = this.stepHistory[this.stepHistory.length - 1];
      const moveToCorner = this.moveToEmptyCorner(lastMove);
      if (moveToCorner) {
        return moveToCorner;
      }

      return this.randomMove();
    } else {
      // за нолики
      if (
        this.stepHistory[0].el === X &&
        this.checkIsCorner(this.stepHistory[0])
      ) {
        //Следующим ходом занять угол, противоположный первому ходу крестиков, а если это невозможно — пойти на сторону.
        const lastMove = this.stepHistory[0];
        const moveToCorner = this.moveToEmptyCorner(lastMove);
        if (moveToCorner) {
          return moveToCorner;
        } else {
          const emptySides = this.getEmptySides();
          if (emptySides.length > 0) {
            return this.moveToRandomCell(emptySides);
          }
        }
      }

      //Если следующий ход крестиков — в угол, занять противоположный угол:
      const lastStepHistory = this.stepHistory[this.stepHistory.length - 1];
      if (lastStepHistory.el === X && this.checkIsCorner(lastStepHistory)) {
        const moveToCorner = this.moveToEmptyCorner(lastStepHistory);
        if (moveToCorner) {
          return moveToCorner;
        }
      }

      //Если следующий ход крестиков — на противоположную сторону, пойти в любой угол:
      if (
        this.stepHistory[2] &&
        this.stepHistory[2].el === X &&
        this.stepHistory[0].el
      ) {
        const distanceBetweenCells = this.getDistanceBetweenCells(
          this.stepHistory[0],
          this.stepHistory[2]
        );
        const areCellsOnOppositeSides = distanceBetweenCells === 4;
        if (areCellsOnOppositeSides) {
          const moveToCorner = this.moveToEmptyCorner(lastStepHistory);
          if (moveToCorner) {
            return moveToCorner;
          }
        }

        //Если следующий ход крестиков — на сторону рядом с их первым ходом, пойти в угол рядом с обоими крестиками
        const distanceBetweenNeighborCells = distanceBetweenCells === 2;
        if (
          distanceBetweenNeighborCells &&
          !this.checkIsCorner(this.stepHistory[0]) &&
          !this.checkIsCorner(this.stepHistory[2])
        ) {
          const compareFunction = function (cell1, cell2) {
            const c11 = this.getDistanceBetweenCells(
              this.stepHistory[0],
              cell1
            );
            const c12 = this.getDistanceBetweenCells(
              this.stepHistory[2],
              cell1
            );

            const c21 = this.getDistanceBetweenCells(
              this.stepHistory[0],
              cell2
            );
            const c22 = this.getDistanceBetweenCells(
              this.stepHistory[2],
              cell2
            );

            return c11 + c12 - (c21 + c22);
          };
          const moveToCell = this.getEmptyCorners().sort(
            compareFunction.bind(this)
          )[0];

          return this.step(moveToCell.row, moveToCell.column);
        }
      }
    }
    return this.randomMove();
  };

  this.randomMove = function () {
    const rowsWithEmptyCells = this.board.filter(function (row) {
      return row.includes(EMPTY);
    });
    const randomEmptyRow =
      rowsWithEmptyCells[Math.floor(Math.random() * rowsWithEmptyCells.length)];
    const row = this.board.findIndex(function (rowArr) {
      return rowArr === randomEmptyRow;
    });

    let column;
    while (typeof column === "undefined") {
      const randomCellIndex = Math.floor(Math.random() * randomEmptyRow.length);

      if (randomEmptyRow[randomCellIndex] === EMPTY) {
        column = randomCellIndex;
      }
    }
    this.step(row, column);
  };
}
crossGame.X = "X";
crossGame.O = "O";

const game = new crossGame(crossGame.O);
game.init();
game.startGame();
