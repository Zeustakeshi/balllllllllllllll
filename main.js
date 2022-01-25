var option = 1
var opt = 1
var changeScreen = 1
var listoption = []
var soOption = 3




function eventKeyboardOption(){
    document.addEventListener("keydown",function(e){
        if (e.key  == "s" || e.key == "ArrowDown"){
            option += 1
            if (option > soOption  ){
                option = 1
            }
            drawOption()
        }
        if (e.key == "w" || e.key == "ArrowUp" ){
            option -= 1
            if (option < 1){
                option = soOption
            }
            drawOption()
        }
        else if ( option == 3 && (e.key == "a" || e.key == "ArrowLeft")){
            opt -= 1
            if (opt < 1){
                opt = 5
            }
            drawOption()
        }
        else if (option == 3 && (e.key == "d" || e.key == "ArrowRight")){
            opt += 1
            if (opt > 5){
                opt = 1
            }
            drawOption()
        }
        else if (option == 1 && (e.key == "j" ||e.key == "Enter")) {
            if (changeScreen == 1){
                changeScreen = 2
                change_Screen()
            }
        } 

       
    })
}



function drawText (){
    let fontsize = 28
    let posText_x = canvas.width/4 + canvas.width/10
    let posText_y = canvas.height/4 + canvas.height/10
    context.font= `${fontsize}px Arial`;
    context.strokeText("New Game",posText_x,posText_y);
    context.strokeText("Restart" ,posText_x,posText_y + fontsize + fontsize/2 )
    context.strokeText("Level: ",posText_x,posText_y + 2*(fontsize + fontsize/2))
    switch (opt) {
        case 1:
            context.strokeText("Very Easy",posText_x + 2*(fontsize + fontsize/2), posText_y + 2*(fontsize + fontsize/2))
            break;
        case 2:
            context.strokeText("Easy",posText_x + 2*(fontsize + fontsize/2), posText_y + 2*(fontsize + fontsize/2))
            break;
        case 3:
            context.strokeText("Medium",posText_x + 2*(fontsize + fontsize/2), posText_y + 2*(fontsize + fontsize/2))
            break;
        case 4:
            context.strokeText("Hard",posText_x + 2*(fontsize + fontsize/2), posText_y + 2*(fontsize + fontsize/2))
            break;
        case 5:
            context.strokeText("Very Hard",posText_x + 2*(fontsize + fontsize/2), posText_y + 2*(fontsize + fontsize/2))
            break;    
    
    }
}

function drawBackgroud(){
    context.beginPath();
    context.lineWidth = "3";
    context.strokeStyle = "balck";
    context.strokeRect(canvas.width/4, canvas.height/4,canvas.width/2, canvas.height/2)
    context.fill();
    context.closePath()
}

function drawOption(){
    context.beginPath();
    context.lineWidth = "1";
    //context.strokeStyle = "green";
    addLisoption()
    switch (option) {
        case 1:
            context.strokeRect(listoption[option-1].pos_x,
                listoption[option-1].pos_y,
                listoption[option-1].width,
                listoption[option-1].height)   
            break;
        case 2:
            context.strokeRect(listoption[option-1].pos_x,
                listoption[option-1].pos_y,
                listoption[option-1].width,
                listoption[option-1].height)   
            break;
        case 3:
            context.strokeRect(listoption[option-1].pos_x,
                listoption[option-1].pos_y,
                listoption[option-1].width,
                listoption[option-1].height)   
            break;        
    
    }
    context.fill();
    context.closePath()
}
function drawMainScreen (){
    context.clearRect (0,0,canvas.width,canvas.height)
    drawText()
    drawBackgroud()
    drawOption()
    if (changeScreen == 1){
        
    }
    requestAnimationFrame(drawMainScreen)
}
function change_Screen(){
    switch (changeScreen) {
        case 1:
           checkkey()
            drawMainScreen()
            break;
        case 2:
            checkkey()
            context.clearRect (0,0,canvas.width,canvas.height)
            drawScreenPlay()  
            break;    
    }
}
function checkkey(){
    if (changeScreen == 1){
        eventKeyboardOption()
    }else {
        eventKeyboardInPlay()
    }
}

function main(){
    change_Screen()
}

function addLisoption(){
    for ( var i = 0; i< soOption; i++){
        listoption.push({
            stt: i,
            posopt: 20 + 20*i*2,
            pos_x: canvas.width/4,
            pos_y: canvas.height/4 + 20 + 20*i*2,
            width: canvas.width/2,
            height:  (canvas.width+ canvas.height)/25
        })
    }
}