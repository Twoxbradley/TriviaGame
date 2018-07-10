// You'll create a trivia form with multiple choice or true/false options (your choice).

// The player will have a limited amount of time to finish the quiz. 


// The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.


// Don't let the player pick more than one answer per question.
// Don't forget to include a countdown timer.

// Quiz initializes when the start button is clicked
// The timer begins a countdown from 60 seconds to 0
// There are 8 questions total multiple choice questions.  

//RR - Glabal var to store id from call to setInterval for clearing
var timerId = null;

$(document).ready(function () {
    // on start click ... paragraph fades, questions appear with radio buttons and timer begins (60 secons)
    $("#startBtn").on("click", function () {
        $("#start-content").fadeOut(200, function () {
            countdown(60);
            questionsDisplay();
        });
    });
});

//string of questions, and answers
var questions = [{
        ques: 'Where did Taekwondo originate?',
        ans: ['China', 'Japan', 'Korea', 'Singapore'],
        name: 'origin',
        correct: 'Korea',
        divClass: ".origin"

    },
    {
        ques: 'Because you know Taekwondo, you have the right to use it anytime you please?',
        ans: ['true', 'false'],
        name: 'discipline',
        correct: 'false',
        divClass: ".discipline"

    },
    {
        ques: 'Who is the father of American Taekwondo?',
        ans: ['Chuck Norris', 'Bruce Lee', 'Jhoon Rhee', 'Jackie Chan'],
        name: 'father',
        correct: 'Jhoon Rhee',
        divClass: ".father"

    },
    {
        ques: 'What does Taekwono mean?',
        ans: ['Feet First', 'The way of the Tiger', 'The way of foot and fist', 'Honor and Integrity'],
        name: 'meaning',
        correct: 'The way of foot and fist',
        divClass: ".meaning"


    },
    {
        ques: 'Over 70 Million people in 188 countries practice Taekwondo. How many of them have Blackbelts?',
        ans: ['All of them', '35 Million', '750 Thousand', '4 Million'],
        name: 'blackbelts',
        correct: '4 Million',
        divClass: ".blackbelts"

    },
    {
        ques: 'What Martial Art is Taekwondo most closely associated with?',
        ans: ['Karate', 'Judo', 'Jujitsu', 'Krav Maga'],
        name: 'association',
        correct: 'Karate',
        divClass: ".association"

    },
    {
        ques: 'Taekwondo is both a Martial Art and a combat sport?',
        ans: ['true', 'false'],
        name: 'sport',
        correct: 'true',
        divClass: ".sport"

    },
    {
        ques: 'What is the Taekwondo uniform called?',
        ans: ['Judogi', 'Gi', 'Dobok', 'Karategi'],
        name: 'uniform',
        correct: 'Dobok',
        divClass: ".uniform"

    }
];


var questionsDisplay = function () {
    $("#questions").empty();

    //RR - changed loop condition to use questions.length instead of static number, this way when we add/remove questions, it won't break our loop
    // loops through the 10 questions 
    for (var j = 0; j < 7; j++) {
        $('#questions').append('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        // loops through answers for each radio button

        //get ans array from current questions element
        const ans = questions[j].ans;

        for (var i = 0; i < ans.length; i++) {
            $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + ans[i] + '"/><label for="' + questions[j].name + '">' + ans[i] + '</label>');
        }
        $('.questions').prepend('<hr />');
    }

    $("#quiz-content").show();
}

//RR - gradeQuiz function will stop timer and loop through questions and count up number of correct/incorrect answers chosen
var gradeQuiz = function () {
    // once submit is clicked...
    // tests
    // stop timer
    clearInterval(timerId);

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    //RR - changed loop condition to use questions.length
    // loop through correctArray & radioName to match html elements & answers
    for (var i = 0; i < questions.length; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    // fade out questions
    $('#quiz-content').fadeOut(500);
    // show answerScreen
    $('#answer-screen').show();
    // display correctAnswers
    $('#correct-screen').append(correctAnswers);
    // display wrongAnswers
    $('#wrong-screen').append(wrongAnswers);
}

//RR - will set a countdown for specified number of seconds
//timer
var countdown = function (seconds) {

    //RR - store the returned interval id in gloabl var so other functions have access
    timerId = setInterval(function () {
        seconds = seconds - 1;
        $("#time-remain").html(seconds);

        //when time runs out, call grade quiz
        if (seconds <= 0) {
            gradeQuiz();
        }
    }, 1000);

}; // end countdown



//RR - changed submit button to just call gradeQuiz
// function to grade quiz once submit button is clicked
$('#sub-but').on('click', gradeQuiz);

//resart button click event
$('#restart-btn').on('click', function () {

    $('#answer-screen').hide();
    $('#start-content').show();

});