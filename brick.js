class brick {
    constructor(game) {
        this.game = game;
        this.dots = [];
        this.data = [];
        this.row = 0;
        this.col = 0;
        this.createData();
        this.createDots();
    }

    createData() {
        let baseData = [
            [
                [x, x, x, x]
            ],
            [
                [x, x],
                [x, x]
            ],
            [
                [x, x, x],
                [_, x, _]
            ],
            [
                [x, x, _],
                [_, x, x],
            ],
            [
                [_, x, x],
                [x, x, _]
            ],
            [
                [x, x, x],
                [x, _, _]
            ],
            [
                [x, _, _],
                [x, x, x]
            ]
        ];
        let r = Math.floor(Math.random() * 7);
        this.data = baseData[r];
    }

    canFall() {
        let thisBrickCanFall = true;
        this.dots.forEach((dot) => {
            if (!dot.canFall()) {
                thisBrickCanFall = false;
            }
        })
        return thisBrickCanFall;
    }

    moveDown() {
        while (this.canFall()) {
            this.fall();
        }
    }

    fall() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach((dot) => {
                dot.fall();
            })
        }
        else {
            this.game.createNewBrick();
            this.appendToBoard();
        }
    }



    rotate() {
        let newData = [];
        for (let col = this.data[0].length - 1; col >= 0; col--) {
            let newRow = [];
            for (let row = 0; row < this.data.length; row++) {
                newRow.push(this.data[row][col]);
            }
            newData.push(newRow);
        }

        let check = true;
        for(let row = 0; row < newData.length; row++){
            for(let col = 0; col < newData[0].length; col++){
                if(newData[row][col] == x && !this.game.b.isEmptyCell(row, col)){
                    check = false;
                }
                if(newData[row][col] == x && row+this.row > NUM_ROWS-1){
                    check = false;
                }
                if(newData[row][col] == x && col+this.col > NUM_COLS-1){
                    check = false;
                }
                if(newData[row][col] == x && col+this.col < 0){
                    check = false;
                }
            }
        }

        if(check){
            this.data = newData;
            this.createDots();
        }
    }

    appendToBoard() {
        this.dots.forEach((dot) => {
            this.game.b.data[dot.row][dot.col] = x;
        })
    }

    canMoveLeft() {
        let thisBrickCanFall = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveLeft()) {
                thisBrickCanFall = false;
            }
        })
        return thisBrickCanFall;
    }

    moveleft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.dots.forEach((dot) => {
                dot.moveleft();
            })
        }
    }

    canMoveRight() {
        let thisBrickCanFall = true;
        this.dots.forEach((dot) => {
            if (!dot.canMoveRight()) {
                thisBrickCanFall = false;
            }
        })
        return thisBrickCanFall;
    }

    moveright() {
        if (this.canMoveRight()) {
            this.col++;
            this.dots.forEach((dot) => {
                dot.moveright();
            })
        }
    }

    createDots() {
        this.dots = [];
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if (this.data[row][col] == x) {
                    let newDot = new dot(this.game, row + this.row, col + this.col);
                    this.dots.push(newDot);
                }
            }
        }
    }

    draw() {
        this.dots.forEach((dot) => dot.draw());
    }

    
}
