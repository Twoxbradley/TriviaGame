// Quiz initializes when the start button is clicked
// The timer begins a countdown from 60 seconds to 0
// There are 8 questions total multiple choice questions. When 


$(document).ready(function () {

    $("#startBtn").on("click", function () {
        $("#window").fadeOut(200, function () {
            $(this).hide();
            $("gameQuestions").fadeIn();
            $("body").css("background-color", "#fff");
            nextQuestion();
            answerOptions();
            console.log("You clicked the start button!");
        });
    });



    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
});

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    // questions options and answers data
    questions: {
        q1: 'Where did Taekwondo originate?',
        q2: 'Because you know Taekwondo, you have the right to use it anytime you please?',
        q3: 'Who is the father of American Taekwondo?',
        q4: 'What does Taekwono mean?',
        q5: 'Over 70 Million people in 188 countries practice Taekwondo. How many of them have Blackbelts?',
        q6: 'What Martial Art is Taekwondo most closely associated with?',
        q7: 'Taekwondo is both a Martial Art and a combat sport?',
        q8: 'What is the Taekwondo uniform called?',
    },
    options: {
        q1: ['China', 'Japan', 'Korea', 'Singapore'],
        q2: ['True', 'False'],
        q3: ['Chuck Norris', 'Bruce Lee', 'Jhoon Rhee', 'Jackie Chan'],
        q4: ['Feet First', 'The way of the Tiger', 'The way of foot and fist', 'Honor and Integrity'],
        q5: ['All of them', '35 Million', '750 Thousand', '4 Million'],
        q6: ['Karate', 'Judo', 'Jujitsu', 'Krav Maga'],
        q7: ['True', 'False'],
        q8: ['Judogi', 'Gi', 'Dobok', 'Karategi']
    },
    answers: {
        q1: 'Korea',
        q2: 'False',
        q3: 'Jhoon Rhee',
        q4: 'The way of foot and fist',
        q5: '4 Million',
        q6: 'Karate',
        q7: 'True',
        q8: 'Dobok'
    },

    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#game').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();

    },

    // method to loop through and display questions and options 
    nextQuestion: function () {

        // set timer to 15 seconds each question
        trivia.timer = 15;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        // gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        // creates all the trivia guess options in the html
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
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
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        // if all the questions have been shown end the game, show results
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            // adds results of game (correct, incorrect, unanswered) to the page
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            // hide game sction
            $('#game').hide();

            // show start button to begin a new game
            $('#start').show();
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
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        // else the user picked the wrong option, increment incorrect
        else {
            // turn button clicked red for incorrect
            $(this).addClass('btn-danger').removeClass('btn-info');

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