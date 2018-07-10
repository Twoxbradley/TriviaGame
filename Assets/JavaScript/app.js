// You'll create a trivia form with multiple choice or true/false options (your choice).

// The player will have a limited amount of time to finish the quiz. 


// The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.


// Don't let the player pick more than one answer per question.
// Don't forget to include a countdown timer.

// Quiz initializes when the start button is clicked
// The timer begins a countdown from 60 seconds to 0
// There are 8 questions total multiple choice questions.  


$(document).ready(function () {
// on start click ... paragraph fades, questions appear with radio buttons and timer begins (60 secons)
    $("#startBtn").on("click", function () {
        $("#para").fadeOut(200, function () {
            $("#startBtn").hide();
            countdown(60);
            questions();
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
        ans: ["true, false"],
        name: 'discipline',
        correct: false,
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
        ans: ["true, false"],
        name: 'sport',
        correct: true,
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
    $(".questions :not('#sub-but')").empty();
    // loops through the 10 questions 
    for (var j = 0; j < 10; j++) {
        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + question[j].ques + '</div>');
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
        }
        $('.questions').prepend('<hr />');
    }
}

for (var i = 0; i < 10; i++) {

    if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
        correctAnswers++;
        console.log("this is correct! number:" + i)
    } else {
        wrongAnswers++;
        console.log("this is wrong! number:" + i)
    };
}

//timer
var countdown = function (seconds) {

    var timer = setInterval(function () {
        seconds = seconds - 1;
        $("#time-remain").html(seconds);


        if (seconds <= 0) {
            $('.container').fadeOut(500);
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var unAnswered = 0;

            for (var i = 0; i < 10; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correctAnswers++;
                    console.log("this is correct! number:" + i)
                } else {
                    wrongAnswers++;
                    console.log("this is wrong! number:" + i)
                };
            }

            $('#correctTimesUp').append(correctAnswers);
            // display wrongAnswers
            $('#wrongTimesUp').append(wrongAnswers);
            $('#timesUp').fadeIn(1000).show();

            // alert("Times Up!");
            clearInterval(timer);
            return;
        }
    }, 1000);

    // click event for submit button to stop timer
    $('#sub-but').on('click', function () {
        clearInterval(timer);
    })
}; // end countdown

// function to grade quiz once submit button is clicked
var gradeQuiz = $('#sub-but').on('click', function () {

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    // loop through correctArray & radioName to match html elements & answers
    for (var i = 0; i < 10; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    // once submit is clicked...
    // tests
    // stop timer
    countdown();
    // fade out questions
    $('.container').fadeOut(500);
    // show answerScreen
    $('#answerScreen').show();
    // display correctAnswers
    $('#correctScreen').append(correctAnswers);
    // display wrongAnswers
    $('#wrongScreen').append(wrongAnswers);

}); 