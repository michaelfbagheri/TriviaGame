$(document).ready(function(){

var clockRunning = false;
var intervalId;
var time = 10;
var i = 0;
var answerPicked = false;

var questions1 = {
    Q1: 'Who was the only President to serve more than two terms?',
    A1: 'Franklin Roosevelt',
    B1: 'John Quincy Adams',
    C1: 'James Madison',
    D1: 'Barak Obama',
    Ans1: 'Franklin Roosevelt',  
    pic: 'assets/image/franklinroosevelt.jpg',
    expired: false,
}

var questions2 = {
    Q1: 'Who holds the title for oldest elected President?',
    A1: 'Ronald Reagan',
    B1: 'George Washington',
    C1: 'James Buchanan',
    D1: 'Donald Trump',
    Ans1: 'Donald Trump', 
    pic: 'assets/image/donaldtrump.jpg',
    expired: false,           
}

var questions3 = {
    Q1: 'how many seats are available in the House of Representatives?',
    A1: '422',
    B1: '157',
    C1: '435',
    D1: '98',
    Ans1: '435', 
    pic: 'assets/image/house.png',
    expired: false,           
}

var questions4 = {
    Q1: 'how many seats are available in the Senate?',
    A1: '422',
    B1: '157',
    C1: '435',
    D1: '100',
    Ans1: '100', 
    pic: 'assets/image/senate.jpg',
    expired: false,           
}

var questions5 = {
    Q1: 'Who is/was the Senate Minority leader in the year 2018?',
    A1: 'Paul Ryan',
    B1: 'Nancy Pelosi',
    C1: 'Mike Pence',
    D1: 'Chuck Schumer',
    Ans1: 'Chuck Schumer', 
    pic: 'assets/image/chuckschumer.jpg',
    expired: false,           
}


var questions6 = {
    Q1: 'in what year did the US declare independence from Great Britain?',
    A1: '1776',
    B1: '1772',
    C1: '1875',
    D1: '1789',
    Ans1: '1776', 
    pic: 'assets/image/declarationofindependence.jpg',
    expired: false,           
}
var questions7 = {
    Q1: 'Who is/was the speaker of the House of Representatives in the year 2018?',
    A1: 'Paul Ryan',
    B1: 'Nancy Pelosi',
    C1: 'Mike Pence',
    D1: 'Chuck Schumer',
    Ans1: 'Paul Ryan', 
    pic: 'assets/image/paulryan.jpg',
    expired: false,           
}
var questions8 = {
    Q1: 'Which Amendment to the constitution guaranteed all American woman the right to vote?',
    A1: '15th',
    B1: '19th',
    C1: '12th',
    D1: '6th',
    Ans1: '19th', 
    pic: 'assets/image/19th.jpg',
    expired: false,           
}

var questions9 = {
    Q1: 'what was repealed with the ratification of the 21st Amendment?',
    A1: 'Slavery',
    B1: 'Alcohol Prohibition',
    C1: 'Obama Care',
    D1: 'Tobacco prohibition',
    Ans1: 'Alcohol Prohibition', 
    pic: 'assets/image/prohibition.jpg',
    expired: false,           
}

var questions10 = {
    Q1: 'What right is guaranteed to all US Citizens under the 2nd Amendment?',
    A1: 'Cold Beer',
    B1: 'Bare Arms',
    C1: 'Freedom of Speech',
    D1: 'Shot of Whisky',
    Ans1: 'Bare Arms', 
    pic: 'assets/image/barearms.jpg',
    expired: false,           
}

var questions = [questions1,questions2,questions3,questions4,questions5,questions6,questions7,questions8,questions9,questions10];


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
            $('#gameButton').append(
                `
                <button id="startGame">Play Again</button>
                `
                )
        } else {
            $('#outcome').text('You Win!')
            $('#gameButton').append(
                `
                <button id="startGame">Play Again</button>
                `
                )
        }
    }   
}

})
