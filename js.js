var canvas = document.getElementById("canvas")
var color = "rgb(0, 183, 255)"
var context = canvas.getContext("2d");
var box = {
    width: 150,
    height: 10,
    pos_x : 300,
    pos_y : 400,
    vo_x : 40,
    vo_y : 40,
}
var ball = {
    radius : 10,
    pos_x : canvas.width/2,
    pos_y : canvas.height/2,
    vo_x : 2,
    vo_y : 3,
}
var gach = {
    pos_x : 50,
    mginRight : 10,
    mginTop : 10,
    soCot : 10,
    widthGach : 40,
    heightGach : 15,
    soDong : 5,
    pos_y : 50
}
var listGach = []
var gameOver = false
// var restart = false 
var score = 0
var heightScore = 0
function reset(){
    start = true
    mouseMove = false
    gameOver = false
    ball.pos_x = canvas.width/2
    ball.pos_y = canvas.height/2
    // box.pos_x = 300
    // box.pos_y = 400
    ball.vo_x = 2
    ball.vo_y = 3
    score = 0 

    listGach.forEach(function(aa){
        aa.isBroken = false
    })
}
function addListGach (){
    for (var i=0; i < gach.soDong; i++ ){
        for (var j = 0; j< gach.soCot; j++){
            listGach.push({
                pos_x : gach.pos_x + j*(gach.mginRight + gach.widthGach),
                pos_y : gach.pos_y + i*(gach.mginTop + gach.heightGach),
                isBroken : false,
                width : gach.widthGach,
                height : gach.heightGach
            })
        }
    }
}
addListGach()
function checkGameOver(){
    if(ball.pos_y > canvas.width - ball.radius){
        gameOver = true
        audio3.play()
        continues = false
    }
}
function CheckGameOverRestart(){
    if (!gameOver && !restart && start){
        // reset()
        requestAnimationFrame(drawScreenPlay)
    }
    else if (gameOver && !start && !restart){
        // reset()
        checkScore()
    }
    else if (restart && !gameOver && !start){
        reset()
        requestAnimationFrame(drawScreenPlay)
    }
    console.log(gameOver,restart,start)
}
function checkvacham_BallBox(){
    if (ball.pos_x - ball.radius > box.pos_x && ball.pos_x - ball.radius < box.pos_x + box.width && ball.pos_y+ ball.radius == box.pos_y + box.height ){
        ball.vo_y *= -1
    }else if(ball.pos_x + ball.radius > box.pos_x && ball.pos_x + ball.radius < box.pos_x + box.width && ball.pos_y+ ball.radius == box.pos_y + box.height ){
        ball.vo_y *= -1
       
    }
}
function checkVaCham_BallGach(){
    listGach.forEach(function(aa){
        if (!aa.isBroken){
            if (ball.pos_x >= aa.pos_x && 
                ball.pos_x <= aa.pos_x + aa.width && 
                ball.pos_y + ball.radius >= aa.pos_y &&
                ball.pos_y - ball.radius <= aa.pos_y + aa.height)
            {
                ball.vo_y *=-1
                aa.isBroken = true
                score += 1
                audio1.play()
            }
        }
    })
}
function checkScore(){
    if (gameOver == false){
        document.getElementById("score").innerText = `Score: ${score}`
        document.getElementById("heightscore").innerText = `Heigth Score: ${heightScore}`
    }else{
        if (score >= heightScore){
            heightScore = score
        }
        document.getElementById("score").innerText = `game over`
    }
}
function drawBall(){
    context.beginPath();
    context.arc( ball.pos_x  , ball.pos_y , ball.radius,0,2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath()
}
function drawBox (){
    context.beginPath();
    context.fillRect(box.pos_x, box.pos_y, box.width, box.height)
    context.fillStyle = color;
    context.fill();
    context.closePath()
}
function drawGach(){
    listGach.forEach(function(aa){  
        if (!aa.isBroken){
        context.beginPath();
        // context.fillRect(aa.pos_x, aa.pos_y, aa.width, aa.height)
        context.fillStyle = color;
        context.fillRect(aa.pos_x, aa.pos_y, aa.width, aa.height)
        context.fill();
        context.closePath()
        }
    })
}
function vachamBall (){
    if (ball.pos_x < ball.radius || ball.pos_x > canvas.width - ball.radius){
        ball.vo_x *= -1
        audio2.play()
    }
    else if(ball.pos_y < ball.radius ){
        ball.vo_y *= -1
        audio2.play()
    }
}
function vachamBox(){
    let getIputKeyBoardRight = true
    let getIputKeyBoardLeft = true
    if (box.pos_x < (- box.width /2)){
        getIputKeyBoardLeft = false
    }else if ( box.pos_x > canvas.width - (box.width / 2)){
        getIputKeyBoardRight = false
    }
}
function moveBall(){
    ball.pos_x += ball.vo_x
    ball.pos_y += ball.vo_y
    vachamBall()
}
function eventKeyboardInPlay(){
    document.addEventListener("keydown", function(e){
        if (continues){
            let getIputKeyBoardRight = true
            let getIputKeyBoardLeft = true
            if (box.pos_x < (- box.width /2)){
                getIputKeyBoardLeft = false
            }else if ( box.pos_x > canvas.width - (box.width / 2)){
                getIputKeyBoardRight = false
            }
            if (e.key == "d" || e.key == "ArrowRight" ){
                if ( getIputKeyBoardRight){
                    box.pos_x += box.vo_x
                }
            }  
            if (e.key == "a" || e.key == "ArrowLeft" ){
                if ( getIputKeyBoardLeft){
                    box.pos_x -= box.vo_x
                }
            }
        }
    })
}

function velai (){
    checkGameOver()
    checkScore()
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawGach()
    checkvacham_BallBox()
    drawBox()
    if (continues == true){
        moveBall()
        checkVaCham_BallGach()
        // requestAnimationFrame(velai)
    }
    if (gameOver && !stop1){
        reset()
        requestAnimationFrame(velai)
    }else if (restart == true){
        reset()
        continues = false
        requestAnimationFrame(velai)
        
    }
    else {
        requestAnimationFrame(velai)
    }

} 
function drawScreenPlay (){
    checkStart()
    // checkGameOver()
    //CheckGameOverRestart()
    //var radom = Math.floor(Math.random() * (2 - (1) + 1)) + (1)

    velai()
}

sukienchuot()
drawScreenPlay()
