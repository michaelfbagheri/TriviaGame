$(document).ready(function(){

var clockRunning = false;
var intervalId;
var time = 0;
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
            A1: 'Blue',
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
    done: function() {

        $.each($("input[name='answer']:checked"), function() {
        if ($(this).val() === questions1.Ans1) {
            gameScore.score++;
            console.log($(this).val())
            i++;
            displayQuestions()
            if (i < questions.length){
                console.log('you win the game')  
            }
        
            
        }
        else {
            gameScore.wrongAnswer++;
            console.log($(this).val())
            $('#correctAnswerDisplay').text('The correct answer was: ' + questions[0].Ans1)
        }
        })
        return console.log('next Question')

    }    
}





$(document).on('click', '#submit', function() {
    clearInterval(intervalId);
    clockRunning = false;
    gameScore.done();   
})


$(document).on('click', '#startGame', function() {
    displayQuestions()
})
   

function displayQuestions(){
        $('.questionOne').text(questions[i].Q1)
        $('.answerOne').empty()
        $('.answerOne').append(
            `
            <input type="radio" id="answerA" name="answer" value="${questions[i].A1}" style="margin: 10px"> ${questions1.A1}
            <input type="radio" id="answerB" name="answer" value="${questions[i].B1}" style="margin: 10px"> ${questions1.B1}
            <input type="radio" id="answerC" name="answer" value="${questions[i].C1}" style="margin: 10px"> ${questions1.C1}
            <input type="radio" id="answerD" name="answer" value="${questions[i].D1}" style="margin: 10px"> ${questions1.D1}
            
            `
        )
            if (!clockRunning){
                intervalId = setInterval(startClock,1000);
                clockRunning = true;
            }   
}


    function startClock() {
        time++
         if (time > 5){
            clearInterval(intervalId);
            clockRunning = false
             console.log('time out')
        }
        console.log(time)
    }
      
    function stopClock() {
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
      }

})
