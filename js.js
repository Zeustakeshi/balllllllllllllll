var canvas = document.getElementById("canvas")
var color = "rgb(0, 183, 255)"
var context = canvas.getContext("2d");
var mginRight = Math.floor(Math.random() * (21 - 10 + 1)) + 10
var demSoCot = 3
var demSoDong = 1
var listGach = []
var gameOver = false
var score = 0
var heightScore = 0
var indexLevel = 0
var demSolevel = 0
var pos_xGach = 50
var level_Up = true
var soTangLevel = 0
var demDequy =0
const max_level = 11
const min_level = 1
var box = {
    width: 150,
    height: 20,
    pos_x : 300,
    pos_y : 400,
    vo_x : 40,
    vo_y : 40,
}
var ball = {
    radius : 15,
    pos_x : canvas.width/2,
    pos_y : canvas.height/2,
    vo_x : 2,
    vo_y : 3,
}
var listLevel = []
function LEVEl (id, mginTop, mginRight, soCot, soDong, pos_x, pos_y, heightGach, isBroken ){
    this.id  = id 
    this.mginTop = mginTop
    this.mginRight = mginRight
    this.soCot = soCot
    this.soDong = soDong
    this.pos_x = pos_x
    this.pos_y = pos_y
    this.widthGach = (canvas.width - (2*pos_x +  mginRight*(soCot - 1)))/soCot
    this.heightGach = heightGach
    this.isBroken = isBroken
}
// var gach = new LEVEl("gach", 10, 10, 5, 3, 50, 50, 15)
function addListLevel(minLevel, maxLevel){
    if (listLevel.length == 0){
        for (var i = minLevel; i <= maxLevel; i++){
            listLevel.push(
                new LEVEl(`level ${i}`,10, mginRight,demSoCot, demSoDong, pos_xGach,50,20,false )
            )
            demSoCot  += 2
            demSoDong += 1
            pos_xGach - 10
        }
    }
}
addListLevel(min_level,max_level)
///////////////////resetttttttttttttttt//////////////////////////
function reset(){
    // // listLevel[soTangLevel].isBroken = true
    start = true
    mouseMove = false
    gameOver = false
    ball.pos_x = canvas.width/2
    ball.pos_y = canvas.height/2
    ball.vo_x = 2
    ball.vo_y = 3
    score = 0 
    soTangLevel = 0
    demSolevel = 0
    indexLevel = 0
    level_Up = true
    listGach.length = 0
    checkLevelUp()
}
function addListGach (sttlevel){
    for (var i=0; i < listLevel[sttlevel - 1].soDong; i++ ){
        for (var j = 0; j< listLevel[sttlevel - 1].soCot; j++){
            listGach.push({
                pos_x : listLevel[sttlevel - 1].pos_x + j*(listLevel[sttlevel - 1].mginRight + listLevel[sttlevel - 1].widthGach),
                pos_y : listLevel[sttlevel - 1].pos_y + i*(listLevel[sttlevel - 1].mginTop + listLevel[sttlevel - 1].heightGach),
                isBroken : listLevel[sttlevel -1].isBroken,
                width : listLevel[sttlevel-1].widthGach,
                height : listLevel[sttlevel - 1].heightGach
            })
        }
    }

}

function checkLevelUp (){
    // console.log(listGach)
    if (listGach.length == 0){
        addListGach (indexLevel + 1)
        indexLevel+= 1
        ball.pos_x =  box.pos_x + box.width/2 
        ball.pos_y = box.pos_y - box.height 
        // ball.vo_x *= -1
        // ball.vo_y *= -1
    }
    
}
function checkGameOver(){
    if(ball.pos_y > canvas.width - ball.radius){
        gameOver = true
        audio3.play()
        continues = false
    }
}
function CheckGameOverRestart(){
    if (!gameOver && !restart && start){
        requestAnimationFrame(drawScreenPlay)
    }
    else if (gameOver && !start && !restart){
        checkScore()
    }
    else if (restart && !gameOver && !start){
        reset()
        requestAnimationFrame(drawScreenPlay)
    }
}
function checkvacham_BallBox(){
    if (ball.pos_x - ball.radius >= box.pos_x && ball.pos_x - ball.radius < box.pos_x + box.width && ball.pos_y+ ball.radius == box.pos_y + box.height ){
        ball.vo_y *= -1
        audio2.play()
    }else if(ball.pos_x + ball.radius >= box.pos_x && ball.pos_x + ball.radius < box.pos_x + box.width && ball.pos_y+ ball.radius == box.pos_y + box.height ){
        ball.vo_y *= -1
        audio2.play()
       
    }
}
function checkVaCham_BallGach(){
    let RanDom =  Math.floor(Math.random() * (5 - 1 + 1)) + 1
    listGach.forEach(function(aa,i){
        if (!aa.isBroken){
            if (ball.pos_x + ball.radius >= aa.pos_x && 
                ball.pos_x - ball.radius <= aa.pos_x + aa.width && 
                ball.pos_y + ball.radius >= aa.pos_y &&
                ball.pos_y - ball.radius <= aa.pos_y + aa.height )
            {
                if (
                    ball.pos_x + ball.radius == aa.pos_x || ball.pos_x - ball.radius == aa.pos_x + aa.width
                ){
                    ball.vo_x *=-1
                    if (RanDom == 1){
                        audio12.play()
                    }else{
                        audio11.play()
                    }
                }else{
                    ball.vo_y *=-1
                    //aa.isBroken = true
                    listGach.splice(i,1)
                    checkLevelScore()
                    demSolevel++
                    if (RanDom == 1){
                        audio12.play()
                    }else{
                        audio11.play()
                    }
                }
            }
        }
    })
}
function checkLevelScore(){
    switch (valueOption) {
        case "Rất Dễ":
            score +=1
            break;
        case "Dễ":
            score +=2
            break;
        case "Trung Bình":
            score +=4
            break;
        case "Khó":
            score +=6
            break;
        case "Rất Khó":
            score +=10
            break;
        default:
            score += 1
            break;
    }
}
function checkScore(){
    if (gameOver == false){
        document.getElementById("score").innerText = `Score: ${score}`
        document.getElementById("heightscore").innerText = `Heigth Score: ${heightScore}`
        document.getElementById("Level").innerText = `Level: ${indexLevel  }`
        if (indexLevel > max_level -1){
            alert ("YouWin")
            audio5.play()
            reset()

        }
    }else{
        if (score >= heightScore){
            heightScore = score
        }
        document.getElementById("score").innerText = `game over`

    }
}
function drawBall(){
    let ball1 = new Image();
    ball1.src = "./asset/ball1.png";
    ball1.onload = function () {
        let whidth_ball = ball.radius*2
        context.drawImage(ball1,ball.pos_x + ball.radius - 30, ball.pos_y - ball.radius,ball.radius*2, ball.radius*2);
    };
    ball1.onload()
}
function drawBox (){
    let box1 = new Image()
    box1.src = "./asset/box.png"
    box1.onload = function () {
        context.drawImage(box1,box.pos_x, box.pos_y, box.width, box.height);
    };
    box1.onload()
    // context.beginPath();
    // context.fillRect(box.pos_x, box.pos_y, box.width, box.height)
    // context.fillStyle = color;
    // context.fill();
    // context.closePath()
}
function drawGach(){

    listGach.forEach(function(aa){  
        if (!aa.isBroken ){
            let box1 = new Image()
            if (indexLevel < 3){
                box1.src = "./asset/box.png"
            }else if (indexLevel < 5){
                box1.src = "./asset/box2.png"
            }else if(indexLevel <= 6){
                box1.src = "./asset/box3.png"
            }else{
                box1.src = "./asset/gachred.png"
            }
            box1.onload = function () {
                context.drawImage(box1,aa.pos_x, aa.pos_y, aa.width, aa.height);
            };
            box1.onload()
        }
    })
}
// drawGach()
function vachamBall (){
    if (ball.pos_x < ball.radius || ball.pos_x > canvas.width - ball.radius){
        ball.vo_x *= -1
        audio4.play()
    }
    else if(ball.pos_y < ball.radius ){
        ball.vo_y *= -1
        audio4.play()

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
// function eventKeyboardInPlay(){
//     document.addEventListener("keydown", function(e){
//         if (continues){
//             let getIputKeyBoardRight = true
//             let getIputKeyBoardLeft = true
//             if (box.pos_x < (- box.width /2)){
//                 getIputKeyBoardLeft = false
//             }else if ( box.pos_x > canvas.width - (box.width / 2)){
//                 getIputKeyBoardRight = false
//             }
//             if (e.key == "d" || e.key == "ArrowRight" ){
//                 if ( getIputKeyBoardRight){
//                     box.pos_x += box.vo_x
//                 }
//             }  
//             if (e.key == "a" || e.key == "ArrowLeft" ){
//                 if ( getIputKeyBoardLeft){
//                     box.pos_x -= box.vo_x
//                 }
//             }
//         }
//     })
// }
function velai ()
{  // console.log(listGach.length)
    demDequy+= 1
    checkLevelUp()
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
        mouseMove = false
        restart = false
        requestAnimationFrame(velai)
        
    }
    else {
        requestAnimationFrame(velai)
    }
} 
function drawScreenPlay (){
    checkStart()
    velai()
    // getSelectCapDo()
}
sukienchuot()
drawScreenPlay()
