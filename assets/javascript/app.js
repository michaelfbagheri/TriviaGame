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
    submitted: function() {

        $.each($("input[name='answer']:checked"), function() {
        if ($(this).val() === questions[i].Ans1) {
            gameScore.score++;
            console.log($(this).val())
            i++;
            time = 0;
            if (i < questions.length){
                displayQuestions()
            } else {
                console.log('you win the game')  
            }
           
        
            
        }
        else {
            debugger;
            gameScore.wrongAnswer++;
            console.log($(this).val())
            $('#correctAnswerDisplay').text('The correct answer was: ' + questions[i].Ans1)
            setTimeout(generalDelay, 1000 * 5)
            i++;
            time = 0;
            if (i < questions.length){
                displayQuestions()
            } else {
                console.log('no more questions left in array')  
            }
        
        
        }
        })

       

    }    
}





$(document).on('click', '#submit', function() {
    clearInterval(intervalId);
    clockRunning = false;
    gameScore.submitted();   
})


$(document).on('click', '#startGame', function() {
    displayQuestions()
})
   

function displayQuestions(){
        $('.questionOne').text(questions[i].Q1)
        $('.answerOne').empty()
        $('#correctAnswerDisplay').empty()
        $('.answerOne').append(
            `
            <input type="radio" id="answerA" name="answer" value="${questions[i].A1}" style="margin: 10px"> ${questions[i].A1}
            <input type="radio" id="answerB" name="answer" value="${questions[i].B1}" style="margin: 10px"> ${questions[i].B1}
            <input type="radio" id="answerC" name="answer" value="${questions[i].C1}" style="margin: 10px"> ${questions[i].C1}
            <input type="radio" id="answerD" name="answer" value="${questions[i].D1}" style="margin: 10px"> ${questions[i].D1}
            
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
      
    function generalDelay() {
        
    }

})
