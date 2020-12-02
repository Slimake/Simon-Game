var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =  [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function() {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function() {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
	    started = true;
	}
})

if (screen.width < 1110) {
	$("#level-title").text("Press Start Game to start");
	$("button").addClass("start-button");
}

$(".start-button").on("click", function() {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
	    started = true;
	}
	$("button").removeClass("start-button");
})

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any key to Restart");
		if (screen.width < 1110) {
			$("#level-title").text("Game Over, Press Start Game to start");
			$("button").addClass("start-button");
		}
		startOver();
	}
}


function nextSequence() {
	var randomNumber = Math.floor((Math.random() * 4));
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	userClickedPattern = [];

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	
	playSound(randomChosenColour);

	level++;
	$("#level-title").text("Level " + level);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {

	$("#" + currentColour).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}