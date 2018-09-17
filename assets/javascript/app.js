$(document).ready(function(){

var clockRunning = false;
var intervalId;
var time = 10;
var i = 0;
var answerPicked = false;

var questions1 = {
            Q1: 'what color are Granny Smith apples?',
            A1: 'Blue',
            B1: 'Green',
            C1: 'Purple',
            D1: 'Orange',
            Ans1: 'Green',            
}

var questions2 = {
            Q1: 'what color are Red apples?',
            A1: 'Red',
            B1: 'Green',
            C1: 'Purple',
            D1: 'Orange',
            Ans1: 'Red',            
}

var questions3 = {
            Q1: 'what color are Blue apples?',
            A1: 'Blue',
            B1: 'Green',
            C1: 'Purple',
            D1: 'Orange',
            Ans1: 'Blue',            
}

var questions = [questions1,questions2,questions3];
console.log(questions)

//this object keeps score/win/loss
var gameScore = {
    score: 0,
    wrongAnswer: 0,    
    submitted: function(guess) {
        clearInterval(intervalId);
        clockRunning = false;
         
        if (guess === questions[i].Ans1) {
            $('#timer').empty()
            gameScore.score++;
            $('.numRightAnswers').text('Correct Answers: ' + gameScore.score)
            i++;
            time = 10;
            if (i < questions.length){
                displayQuestions()
            } else {
                i = 0;
                $('#timer').empty() 
                $('.questionOne').empty()
                $('.answerOne').empty()
                $('#correctAnswerDisplayOne').empty()
                $('#gameButton').append(`
                <button id="startGame">Play Again</button>
                `)
                $('#outcome').text('You Win!')
                gameScore.wrongAnswer = 0
                gameScore.score = 0

            }            
        }
        else {
            gameScore.wrongAnswer++;
            $('.numWrongAnswers').text('Wrong Answers: ' +gameScore.wrongAnswer)
            $('#correctAnswerDisplayOne').text('The correct answer was: ' + questions[i].Ans1)
            $('#timer').empty()
            setTimeout(generalDelay,3000)       
        }
     

       

    }    
}

// Click button to start game, displays questions and starts/displays timer
$(document).on('click', '#startGame', function() {
    $('#gameButton').empty();
    $('#outcome').empty()
    $('.numRightAnswers').empty();
    $('.numWrongAnswers').empty();
    displayQuestions()
})

//capturing which answer is clicked by user
$(document).on('click', '#answerA', function() {
   if (!answerPicked){
    var guess = $(this).attr('data-val')
    gameScore.submitted(guess); 
    answerPicked = true
}
})

$(document).on('click', '#answerB', function() {
    if (!answerPicked){
        var guess = $(this).attr('data-val')
        gameScore.submitted(guess); 
        answerPicked = true
    }
})

$(document).on('click', '#answerC', function() {
    if (!answerPicked){
        var guess = $(this).attr('data-val')
        gameScore.submitted(guess); 
        answerPicked = true
    }
})

$(document).on('click', '#answerD', function() {
    if (!answerPicked){
        var guess = $(this).attr('data-val')
        gameScore.submitted(guess); 
        answerPicked = true
    } 
})






   
// this function displays the question and multiple choice answers on the DOM
// and starts the count down timer by invoking the startclock function
function displayQuestions(){
        $('.questionOne').text(questions[i].Q1)
        $('.answerOne').empty()
        $('#correctAnswerDisplayOne').empty()
        $('.answerOne').append(
            `
            <p class="answers" id="answerA" name="answerQOne" data-val="${questions[i].A1}" style="margin: 10px"> ${questions[i].A1}
            <p class="answers" id="answerB" name="answerQOne" data-val="${questions[i].B1}" style="margin: 10px"> ${questions[i].B1}
            <p class="answers" id="answerC" name="answerQOne" data-val="${questions[i].C1}" style="margin: 10px"> ${questions[i].C1}
            <p class="answers" id="answerD" name="answerQOne" data-val="${questions[i].D1}" style="margin: 10px"> ${questions[i].D1}
            
            `
        )
            if (!clockRunning){
                intervalId = setInterval(startClock,1000);
                clockRunning = true;
            }   
}


    function startClock() {
        answerPicked = false
        time--
        $('#timer').text(time)
         if (time < 1){
            clearInterval(intervalId);
            clockRunning = false
             console.log('time out')
             $('#correctAnswerDisplayOne').text('The correct answer was: ' + questions[i].Ans1)
             $('countdownTimer').append(`
                <p id="timer">${time}<p>
             `)
             gameScore.wrongAnswer++;
            $('.numWrongAnswers').text('Wrong Answers: ' +gameScore.wrongAnswer)
             setTimeout(generalDelay,3000)
        }
        console.log(time)
    }
      
    function generalDelay() {
        console.log('in general delay')
        i++;
            time = 10;
            if (i < questions.length){
                displayQuestions()
            } else {
                i = 0;
                $('#timer').empty() 
                $('.questionOne').empty()
                $('.answerOne').empty()
                $('#correctAnswerDisplayOne').empty()
                $('#gameButton').append(`
                <button id="startGame">Play Again</button>
                `)
                $('#outcome').text('You Lose!')
                gameScore.wrongAnswer = 0
                gameScore.score = 0
            }
        
    }

})
