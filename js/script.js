let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction;
//objeto com as coordenadas da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//função que desenha o quadrado
function createBG(){
    //fillStyle ele trabalha com o background do elemento
    context.fillStyle = "black";
    //fillRect trabalho o retangulo, recebe quatro parametros
    // x(largura) e y(altura)
    context.fillRect(0, 0, 16 * box, 16 * box);
}
//função que desenha a cobra 
function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "#dcdcdc";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//função que desenha a comida da cobrar
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
//função de controles de direção da cobrar
document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
    }
    if (event.keyCode == 38 && direction != "down") {
        direction = "up";
    }
    if (event.keyCode == 39 && direction != "left") {
        direction = "right";
    }
    if (event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
}
//função de movimento da cobrar
function snakeMove(){

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (direction == 'right') {
        snakeX += box;
    }
    if (direction == 'left') {
        snakeX -= box;
    }
    if (direction == 'up') {
        snakeY -= box;
    }
    if (direction == 'down') {
        snakeY += box;
    }

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y:snakeY
    }

    snake.unshift(newHead);

}
//função que permite que a cobra vá além da borda e apareção do lado oposto
function moveBeyondBorder(){
    if (snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }
}
//função de derrota do jogo
function loseGame(){
    for (i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(playGame);
            alert('You lose!!');
            location.reload(); 
            
        } 
    }
}
//função que inicia o jogo
function playGame(){
    moveBeyondBorder()
    loseGame();
    createBG();
    drawFood();
    createSnake();   
    snakeMove();
}

setInterval(playGame, 150);