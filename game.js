
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.speed = 200;
        this.color = "#50AFEF";
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT

        this.context.fillStyle = '#282C34';
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        document.body.appendChild(this.canvas);
        this.newGame();
        
    }

    newGame() {
        this.b = new board(this);
        this.brick = new brick(this);
        this.listenKetBoard();
        this.startGame();
        this.loop();
        this.score = 0;
    }

    startGame() {
        setInterval( () => {
            this.brick.fall();
        }, this.speed);
    }

    createNewBrick(){
        // this.ranDomColor();
        this.brick = new brick(this);
    }

    ranDomColor() {
        var listcolor = ["#C678DD","#E06C66","#98C379","#E5A656","#50AFEF"]
        var r = Math.floor(Math.random()*5);
        this.color = listcolor[r];
    }

    listenKetBoard(){
        document.addEventListener('keydown', (event)=>{
            switch(event.code){
                case 'ArrowLeft': this.brick.moveleft(); break;
                case 'ArrowRight':this.brick.moveright(); break;
                case 'ArrowDown': this.brick.moveDown(); break;
                case 'ArrowUp':this.brick.rotate(); break;
            }
        })
    }

    loop(){
        let check = true;
        for(let col = 0; col < this.b.data[0].length; col++){
            if(!this.b.isEmptyCell(0, col)){
                check = false;
            }
        }
        this.update();
        if(check){
            this.draw();
            setTimeout(() => this.loop(), 30);
        }
        else{
           document.getElementById("score").innerText = "GAME OVER"
        }
    }

    update(){

    }

    clearScreen() {
        this.context.fillStyle = '#282C34';
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    draw(){
        this.clearScreen();
        this.b.draw();
        this.brick.draw();
        this.b.fullRow();
    }
}

var g = new game();