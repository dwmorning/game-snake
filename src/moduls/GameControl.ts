import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);
        this.init()
    }

    init(){
        document.addEventListener("keydown",this.keydownHandler.bind(this))
        this.run()
    }

    keydownHandler(event:KeyboardEvent){
         this.direction = event.key
    }

    run(){
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        this.checkEat(X,Y)
        
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e:any){
            this.isLive = false
            alert(e.message+' GAME OVER!');
        }
        this.isLive && setTimeout(this.run.bind(this), 300 -(this.scorePanel.level-1)*30);
    }

    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl