class dot {
    constructor(game, row, col){
        this.game = game;
        this.size = 20;
        this.row = row;
        this.col = col;
    }

    draw() {
        let x = this.col * this.size;
        let y = this.row * this.size;
        this.game.context.fillStyle = this.game.color;
        this.game.context.fillRect(x + 1, y + 1, this.size-2, this.size-2);
    }

    update() {

    }
    
    hitleft() {
        return this.col == 0;
    }
    canMoveLeft(){
        if(this.hitleft()) return false;
        if(!this.game.b.isEmptyCell(this.row, this.col-1)){
            return false;
        };
        return true;
    }
    moveleft() {
        if(this.canMoveLeft()){
            this.col--;
        }
    }

    hitRight(){
        return this.col == NUM_COLS - 1;
    }

    canMoveRight(){
        if(this.hitRight()) return false;
        if(!this.game.b.isEmptyCell(this.row, this.col+1)){
            return false;
        }
        return true;
    }

    moveright(){
        if(this.canMoveRight()){
            this.col++;
        }
    }

    hitBottom(){
        return this.row == NUM_ROWS - 1;
    }

    canFall(){
        if(this.hitBottom()) return false;
        if(!this.game.b.isEmptyCell(this.row+1, this.col)){
            return false;
        };
        return true;
    }

    fall() {
        if(this.canFall()){
            this.row++;
        }
    }
    
}