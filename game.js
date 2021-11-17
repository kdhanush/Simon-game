
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;



$(document).on("keypress",function(){

    if(!started){
        $("h1").text("level "+level);

        nextSequence();
        started = true;

    }
});

var checkAnswer = (currentLevel) =>{

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

     } else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(()=>{
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            console.log("Wrong");
        }
    }

    

var nextSequence = () => {

    userClickedPattern = [];

    level++;
    $("h1").text("level "+level);

    started = true;

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =  buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);


            var chosenColour = randomChosenColour;
            playSound(chosenColour);

            
}




$(".btn").click(function(e){
    var idClicked = this.id;
    var userChosenColour = idClicked;
    var chosenColour = idClicked;
    userClickedPattern.push(userChosenColour);
    playSound(chosenColour);
    animatePress(chosenColour);

    checkAnswer(userClickedPattern.length-1);

});


var playSound = (chosenColour) => {
    var audio = new Audio("/sounds/"+chosenColour+".mp3");
    audio.play(); 
}

var animatePress = (currentColour) => {

    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $('.btn').removeClass("pressed");
    },100);
}


var startOver = () =>{
    level = 0;
    gamePattern = [];
    started = false;
}

 