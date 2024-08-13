var colors = ["green","red","yellow","blue"];
var game_pattern = [];
var counter = 0;
var level = 1;
var is_start = false;

$(document).keypress(function(event){
    if(is_start == false){
        is_start = true;
        start(); 
    }    
    
})

$(".btn").click(function() {
    if (game_pattern.length >0 && game_pattern[counter] == this.id){
        make_sound(this.id);
        make_animation(this.id);
        counter = counter + 1;
        if (counter == game_pattern.length){
            setTimeout(function(){start();}, 400)
        }
    }
    else{
        game_over();
    }
});

function start(){
    var rand = Math.floor(Math.random() * 4);
    var color = colors[rand];
    game_pattern.push(color);
    counter = 0;
    $("h1").text("Level: " + level);
    make_sound(color);
    make_animation(color);
    level += 1;
}

function make_sound(chosen_color){
    var audio = new Audio("/sounds/"+chosen_color+".mp3");
    audio.play();
}

function make_animation(chosen_color){
    $("."+chosen_color).addClass("pressed");
    setTimeout(function(){
        $("."+chosen_color).removeClass("pressed");
    },100);
}

function game_over(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    var game_over_audio = new Audio("/sounds/wrong.mp3");
    game_over_audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    game_pattern = [];
    counter = 0;
    level = 1;
    is_start = false;
}