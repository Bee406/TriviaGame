var trivia = {

  correct: 0,
  incorrect: 0,

  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',


  questions: {
    q1: "What is the most visited tourist attraction in the world?",
    q2: "The Bahamas is one of the most popular destinations for U.S. residents to visit in the Caribbean. On average, how cold does it get in the Bahamas?",
    q3: "Champagne is less than 100 miles away from Paris. How many bottles of Champagne are shipped around the country from there each year?",
    q4: "Which major Canadian city has not hosted the Olympics?",
    q5: " How many Smithsonian museums and galleries are in Washington, D.C.?",
  },
  options: {
    q1: ["Times Square", "Disney World", "The Colosseum", "Eiffel Tower"],
    q2: ["40 degrees", "50 degrees", "60 degrees", "70 degrees"],
    q3: ["1.5 million bottles", "322 million bottles", "525 million bottles", "1 billion bottles"],
    q4: ["Montreal", "Toronto", "Calgary", "Vancouver"],
    q5: ["10", "13", "17", "19"],
  },
  answers: {
    q1: "Times Square",
    q2: "70 degrees",
    q3: "322 Million Bottles",
    q4: "Toronto",
    q5: "17",
  },

  
  startGame: function () {

    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    clearInterval(trivia.timerId);

    // remove start button
    $('#start').hide();

      $('#remaining-time').show();

    // ask first question
    trivia.nextQuestion();

  },
  // method to loop through and display questions and options 
  nextQuestion: function () {

    // set timer to 10 seconds each question
    trivia.timer = 10;
    //    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // to prevent timer speed up
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the trivia guess options in the html
    $.each(questionOptions, function (index, key) {
      $("#options").append($("<button class='btn-info option'>" + key + "</button>"));
    })

  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning: function () {
    // if timer still has time left and there are still questions left to ask
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // the time has run out and increment unanswered, run result
    else if (trivia.timer === -1) {
      trivia.incorrect++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      // adds results of game (correct, incorrect, unanswered) to the page
      var grade = (trivia.correct / 5).toFixed(2);
      grade = grade * 100;
      $('#results').html('<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' + 
          '<p>Grade: ' + grade + '%</p>');
      // hide game sction
      $('#game').hide();
    }

  },
  // method to evaluate the option clicked
  guessChecker: function () {

    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this).addClass("btn-success").removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else {
      // turn button clicked red for incorrect
      $(this).addClass('btn-incorrect').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
    }

  },
  // method to remove previous question results and options
  guessResult: function () {

    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();

  }

}

$("#start").on("click", trivia.startGame);
$(document).on("click", ".option", trivia.guessChecker);


