var start = false
var restart = false
var stop1 = true
var continues = false
var mouseMove  = false
var audio1 = new Audio('./audio/vachamballvsgach.mp3');
var audio2 = new Audio('./audio/vachamballvsbox.mp3');
var audio3 = new Audio('./audio/gameover.mp3');


function checkStart (){
    document.getElementById("start").addEventListener("click", function(){
        start = true
        stop1 = false
        restart = false
        gameOver = false
        continues = true

    })
    document.getElementById("stop").addEventListener("click", function(){
        start = false
        restart = false
        stop1 = true
        continues = false

    })
    document.getElementById("restart").addEventListener("click", function(){
        restart = true
        start = false
        stop1 = false
        gameOver = true
        continues = true
        audio3.play()
    })
    document.getElementById("continues").addEventListener("click", function(){
        continues = true 
        restart = false
        start = false
        stop1 = false
        gameOver = false
    })
    document.addEventListener("keydown", function(e){
        start = true
        stop1 = false
        restart = false
        gameOver = false
        continues = true
    })
    document.querySelector("canvas").addEventListener("mousedown", function(e){
        start = true
        stop1 = false
        restart = false
        gameOver = false
        continues = true
        mouseMove = true
        sukienchuot()
    })

}

function sukienchuot(){
    if (mouseMove == true){
        var aa = document.querySelector("canvas")
        aa.addEventListener("mousemove", function(e){
        box.pos_x =  e.offsetX  - box.width/2
    })

    }
}