$(document).ready(function(){

var clockRunning = false;
var intervalId;
var time = 10;
var i = 0;

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


var gameScore = {
    score: 0,
    wrongAnswer: 0,    
    submitted: function(guess) {
        clearInterval(intervalId);
        clockRunning = false;
         
        if (guess === questions[i].Ans1) {
            $('#timer').empty()
            gameScore.score++;
            i++;
            time = 10;
            if (i < questions.length){
                displayQuestions()
            } else {
                console.log('you win the game')  
            }            
        }
        else {
            gameScore.wrongAnswer++;
            console.log('you have made ' + gameScore.wrongAnswer + ' mistakes')
            $('#correctAnswerDisplayOne').text('The correct answer was: ' + questions[i].Ans1)
            $('#timer').empty()
            setTimeout(generalDelay,4000)       
        }
     

       

    }    
}

// Click button to start game, displays questions and starts/displays timer
$(document).on('click', '#startGame', function() {
    $('#gameButton').empty();
    displayQuestions()
})

//capturing which answer is clicked by user
$(document).on('click', '#answerA', function() {
    var guess = $(this).attr('data-val')
    gameScore.submitted(guess);   
})

$(document).on('click', '#answerB', function() {
    var guess = $(this).attr('data-val')
    gameScore.submitted(guess);   
})

$(document).on('click', '#answerC', function() {
    var guess = $(this).attr('data-val')
    gameScore.submitted(guess);  
})

$(document).on('click', '#answerD', function() {
    var guess = $(this).attr('data-val')
    gameScore.submitted(guess);    
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
        time--
        $('#timer').text(time)

         if (time < 1){
            clearInterval(intervalId);
            clockRunning = false
             console.log('time out')
             $('countdownTimer').append(`
                <p id="timer">${time}<p>
             `)
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
                console.log('no more questions left in array')  
            }
        
    }

})
