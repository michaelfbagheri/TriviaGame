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
            pic: 'assets/image/greenApple.jpg',
            expired: false,

}

var questions2 = {
            Q1: 'what color are Red apples?',
            A1: 'Red',
            B1: 'Green',
            C1: 'Purple',
            D1: 'Orange',
            Ans1: 'Red', 
            pic: 'assets/image/greenApple.jpg',
            expired: false,           
}

var questions3 = {
            Q1: 'what color are Blue apples?',
            A1: 'Blue',
            B1: 'Green',
            C1: 'Purple',
            D1: 'Orange',
            Ans1: 'Blue', 
            pic: 'assets/image/greenApple.jpg',
            expired: false,           
}

var questions = [questions1,questions2,questions3];


//this object keeps score/win/loss
var gameScore = {
    score: 0,
    wrongAnswer: 0, 
    unanswered: 0,   
    submitted: function(guess) {
        clearInterval(intervalId);
        clockRunning = false;
        $('#timer').empty() 
        $('.answerOne').empty()
        $('#imageContainer').append(
            `
            <img src="${questions[i].pic}" alt="Green Apple pic" style = "border: 1px solid black">
            `
        )
        if (guess === questions[i].Ans1) {
            gameScore.score++;
            
            $('.numRightAnswers').text('Correct Answers: ' + gameScore.score)
            $('#correctAnswerDisplayOne').text("Correct!!!")
            setTimeout(generalDelay,2000)  
                       
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
    $('#imageContainer').empty()
    gameScore.wrongAnswer = 0
    gameScore.score = 0
    displayQuestions()
})

//capturing which answer is clicked by user
$(document).on('click', '.answers', function() {
    if (!answerPicked){
     var guess = $(this).attr('data-val')
     console.log(guess)
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
            $('#timer').empty() 
            $('.answerOne').empty()
            $('#imageContainer').append(
                `
                <img src="${questions[i].pic}" alt="Green Apple pic" style = "border: 1px solid black">
                `
            )
             $('#correctAnswerDisplayOne').text('The correct answer was: ' + questions[i].Ans1)
             $('countdownTimer').append(`
                <p id="timer">${time}<p>
             `)
             gameScore.unanswered++
             gameScore.wrongAnswer++
            $('.numWrongAnswers').text('Wrong Answers: ' +gameScore.wrongAnswer)
             setTimeout(generalDelay,3000)
        }
        console.log(time)
    }
      
    function generalDelay() {
            i++;
            time = 10;
            if (i < questions.length){
                $('.questionOne').empty()
                $('#imageContainer').empty()
                displayQuestions()
            } else {
                i = 0;
                $('#timer').empty() 
                $('.questionOne').empty()
                $('.answerOne').empty()
                $('#correctAnswerDisplayOne').empty()
                $('#imageContainer').empty()
                let percentage = gameScore.score / questions.length * 100
                console.log(percentage)
                if(percentage < 90) {
                    $('#outcome').text('You Lose!')
                    $('#gameButton').append(`
                        <button id="startGame">Play Again</button>
                        `)
                } else {
                    $('#outcome').text('You Win!')
                    $('#gameButton').append(`
                        <button id="startGame">Play Again</button>
                        `)
                }
            }   
    }



    // function generalDelay1() {
    //     i++;
    //     time = 10;
    //         if (i < questions.length){
    //             $('.questionOne').empty()
    //             $('#imageContainer').empty()
    //             displayQuestions()
    //         } else {
    //             i = 0;

    //             $('#correctAnswerDisplayOne').empty()
    //             $('#gameButton').append(`
    //             <button id="startGame">Play Again</button>
    //             `)
    //             $('#outcome').text('You Win!')
    //             gameScore.wrongAnswer = 0
    //             gameScore.score = 0
    //         } 
    // }
})
