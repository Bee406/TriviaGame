$('#remaining-time').hide();
var trivia = {

    correct: 0,
    incorrect: 0,

    currentIndex: 0, //use to know which question to loop through
    timer: 10,
    timerOn: false, //use to keep timer at same speed
    timerId: "", //use to hold set interval


    questions: {
        q1: "What is the most visited tourist attraction in the world?",
        q2: "The Bahamas is one of the most popular destinations for U.S. residents to visit in the Caribbean. On average, how cold does it get in the Bahamas?",
        q3: "Champagne is less than 100 miles away from Paris. How many bottles of Champagne are shipped around the country from there each year?",
        q4: "Which major Canadian city has not hosted the Olympics?",
        q5: "How many Smithsonian museums and galleries are in Washington, D.C.?",
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
        q3: "322 million bottles",
        q4: "Toronto",
        q5: "17",
    },


    startGame: function () {

        // hide start button
        $("#start").hide();

        //show time left
        $("#remaining-time").show();

        // start nextQuestion function to display first question
        trivia.nextQuestion();

    },
    // method to display all questions
    nextQuestion: function () {
        
        //reset timer to 10 on each question
         trivia.timer = 10;
       
        //add time left to timer text on page
        $("#timer").text(trivia.timer);

        // keep timer at same pace, call timerRunning function
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // gets all the current questions based on currentIndex
        var questionContent = Object.values(trivia.questions)[trivia.currentIndex];
        $("#question").text(questionContent);

        // gets all the answer options based on currentIndex
        var questionOptions = Object.values(trivia.options)[trivia.currentIndex];

        // create buttons for each of the answer options
        $.each(questionOptions, function (index, option) {
            $("#options").append($("<button class='option'>" + option + "</button>"));
        })

    },
   
    timerRunning: function () {
        // if timer still has time left and there are still questions left to ask. 
        // "The Object.keys() method returns an array of a given object's property names, in the same order as we get with a normal loop."
        if (trivia.timer > -1 && trivia.currentIndex < Object.keys(trivia.questions).length) {
            $("#timer").text(trivia.timer);
            trivia.timer--;
        }

        else if (trivia.timer === -1) {
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Out of time! The answer was " + Object.values(trivia.answers)[trivia.currentIndex] + "</h3>");
        }
        // if all the questions have been shown end the game, show results
        else if (trivia.currentIndex === Object.keys(trivia.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the page
            var grade = (trivia.correct / 5).toFixed(2);
            grade = grade * 100;
            $("#results").html(
                "<p>Correct: " + trivia.correct + "</p>" +
                "<p>Incorrect: " + trivia.incorrect + "</p>" +
                "<p>Grade: " + grade + "%</p>");
            // hide game sction
            $('#game').hide();
        }

    },
    // method to evaluate the option clicked
    guessChecker: function () {

        // timer ID for gameResult setTimeout
        // var resultId;

        // the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentIndex];


        if ($(this).text() === currentAnswer) {

            trivia.correct++;
            clearInterval(trivia.timerId);
            setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Correct Answer!</h3>");
        }

        else {
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Nope! Correct answer is " + currentAnswer + ".</h3>");
        }

    },
    // method to remove previous question results and options
    guessResult: function () {

        // increment to next question set
        trivia.currentIndex++;

        // remove the options and results
        $(".option").remove();
        $("#results h3").remove();

        // begin next question
        trivia.nextQuestion();

    }

}

$("#start").on("click", trivia.startGame);
$(document).on("click", ".option", trivia.guessChecker);


