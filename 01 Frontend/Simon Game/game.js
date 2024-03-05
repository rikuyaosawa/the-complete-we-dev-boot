var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keyup(function () {
  if (!started) {
    $(".funny-image").remove();
    $("#container").show();
    $("#sub-text").show();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  $(".funny-image").remove();
  $("#container").show();
  if ($("#sub-text").text() !== "Remember and Repeat the Sequence") {
    $("#sub-text").text("Remember and Repeat the Sequence");
  }

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  if (name === "game-over") {
    var audio = new Audio("sounds/" + name + ".wav");
    audio.play();
    return;
  } else {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("game-over");
    $("#level-title").css("margin-top", "50px");
    $("#sub-text").css("margin-top", "20px");
    $("#container").hide();
    $("body").append("<img src='images/funny.jpg' class='funny-image'>");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $("#sub-text").text("You reached level " + level + "!\nBetter luck next time!");
    reset();
  }
}

function reset() {
    level = 0;
    gamePattern = [];
    started = false;
}
