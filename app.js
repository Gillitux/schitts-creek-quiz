'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which members of the Rose family are related in real life?',
      answers: [
        'Johnny and David',
        'David and Alexis',
        'Alexis and Moira',
        'Moira and Johnny'
      ],
      correctAnswer: 'Johnny and David'
    },
    {
      question: 'In her film "The Crows Have Eyes 3: The Crowening", what is Moira\'s profession?',
      answers: [
        'Archaeologist',
        'Ornothologist',
        'Epidemiologist',
        'Etymologist'
      ],
      correctAnswer: 'Ornothologist'
    },
    {
      question: 'Why did Alexis have to do community service?',
      answers: [
        'DUI',
        'Public intoxication',
        'Trying to bribe a police officer',
        'Trespassing'
      ],
      correctAnswer: 'Ornothologist'
    },
    {
      question: 'Who is Mutt related to?',
      answers: [
        'Ted',
        'Stevie',
        'Jocelyn',
        'Bob'
      ],
      correctAnswer: 'Jocelyn'
    },
    {
      question: 'What is the name of Johnny\'s former assistant?',
      answers: [
        'John Josephson',
        'Frank Fredrickson',
        'Greg Gunderson',
        'Mike Morrison'
      ],
      correctAnswer: 'Mike Morrison'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


// These functions return HTML templates
function generateWelcomePage(){
  return `<div class="mainPage">
  <h2>How well do you know Schitt's Creek?</h2>
  <p>Take the quiz and find out!</p>
  <button id="startQuiz">Start Quiz</button>
 </div>`;
  //append form to main element
  //add html from inside of form
}

function handleQuizStart(){
  $('main').on('click', '#startQuiz', function (event){
    store.quizStarted=true;
    renderQuiz();
  });
}


function generateQuestionPage(){
  let question = store.questions[store.questionNumber];
  let answer = question.answers.map((answer,idx)=>{
    if(idx===0){return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required> 
    <label for="answer${idx}">${answer}</label><br>`;}
    return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
    <label for="answer${idx}">${answer}</label><br>`;
  });
  
  return `<div class="scoreCurrent">
  <h3>Score ${store.score+1} of 5</h3>
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <div class="mainPage">
  <form id="question">
    <h2>${question.question}</h2>
    ${answer.join('')}
<button type="submit">Submit</button>
</form>
 </div>`;
}

function handleSubmit(){
  $('main').on('submit', '#question', function(){
    event.preventDefault();
    let chosenAnswer=$('input[name="answer"]:checked').val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;

    if (chosenAnswer === correctAnswer){
      $('main').html(generateCorrectPage());
      store.score++;
    } else {
      $('main').html(generateIncorrectPage());
    }
  });
}



function generateCorrectPage(){
  //let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let question = store.questions[store.questionNumber];
  return `<div class="mainPage">
  <div class="scoreCurrent">
  <h3>Score ${store.score+1} of 5</h3>
  <h3>Correct!</h3>
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <h2>${question.question}</h2>
  <img src="https://media.giphy.com/media/efm1NmEY9oRNY2EMp1/giphy.gif" alt="Shocked and Impressed" class="picture"><br>
  
  <button id="nextQuestion">Next Question</button>`;
}

function generateIncorrectPage(){
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  return `<div class="scoreCurrent">
  <h3>Score ${store.score+1} of 5</h3>
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <div class="mainPage">
  <h2>Wrong! It's obviously ${correctAnswer}</h2>
  <p>Your score is: ${store.score}/5</p>

  <img src="wrongAnswer.jpeg" alt="Wrong Answer" class="picture"><br>
  <button id="nextQuestion">Next Question</button>
  </div>`;
}

function handleNextQuestion(){
  $('main').on('click', '#nextQuestion', function(){
    store.questionNumber++;
    renderQuiz();
  });
}

function generateFinal(){
  return `<div class="mainPage">
  <h2>wow you finished</h2>
  <p>Final score: ${store.score}</p>
  <button id="restart">Try Again</button>
  </div>`;}

function handleRestart(){
  $('main').on('click', '#restart', function (){
    store.quizStarted=false;
    store.questionNumber=0;
    store.score=0;
    renderQuiz();
  });
}

/*


function generateCorrectPage(){
  //append form to main element
  //add html from inside of form
  //add event listeners for next button
}

function generateIncorrectPage(){

}

function generateFinal(){
  if questions.length === questionNumber return finalPage
  `<div class="mainPage"><h2>Are you a Starcraft 2 n00b?</h2>
  <p>`Final score: ${FinalScore}`</p>
  <button id="startOver">Start Quiz</button>
 </div>`;
}

function handleRestart(){
  //returns to welcomePage
}
*/


function renderQuiz(){
  let html= '';
  if (store.quizStarted){
    if(store.questionNumber===store.questions.length){
      html= generateFinal();
    }
    else{
      html = generateQuestionPage();
    }
  } 
  else { 
    html = generateWelcomePage();
  }
  $('main').html(html);
  //open a specific page based on the state
}

function main(){
  renderQuiz();
  handleQuizStart();
  handleSubmit();
  handleNextQuestion();
  handleRestart();

  /*
    renderQuizApp();
      startQuizApp();
      submitAnswer();
      clickNext();
      playAgain();
*/

}

$(main);
