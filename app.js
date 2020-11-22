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
      question: 'In her film "The Crows Have Eyes 3: The Crowening": what is Moira\'s profession?',
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
      correctAnswer: 'DUI'
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
  score: 0,
  currentView: 'landing'
};


// These functions return HTML templates
function generateWelcomePage(){
  return `<div class="mainPage">
  <h2>How well do you know Schitt's Creek?</h2>
  <img src="https://media.giphy.com/media/3ohzdTN61oIJCmqxLa/giphy.gif" alt="Pep Talk"  class="picture">
  <p>Take the quiz and find out!</p>
  <button id="startQuiz">Start Quiz</button>
 </div>`;
}




function generateQuestionPage(){
  let question = store.questions[store.questionNumber];
  let answer = question.answers.map((answer,idx)=>{
    /*if(idx===0){
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required> 
      <label for="answer${idx}">${answer}</label><br>`;
    }*/
    return `<div class="radio-buttons">
    <input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
    <label for="answer${idx}">${answer}</label><br>
    </div>`;
  });
  
  return `<div class="scoreCurrent">
  <h3>Score ${store.score} of ${store.questionNumber}</h3>
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <img src="https://media.giphy.com/media/YobpKxJJB5fOfSMW8x/giphy.gif" alt "Johnny Question" class="picture">
  <div class="mainPage">
  <form id="question">
    <h2>${question.question}</h2>
    <div class="userAnswers">${answer.join('')}</div>
<button type="submit">Submit</button>
</form>
 </div>`;
}



function generateCorrectPage(){
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let question = store.questions[store.questionNumber];
  return `<div class="mainPage">
  <div class="scoreCurrent">
  <h3>Score ${store.score} of ${store.questionNumber+1}</h3>
  <h3 class="correct">Correct!</h3>
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <h2>${question.question}</h2>
  <img src="https://media.giphy.com/media/l4FGq1RrgxMPSqCE8/giphy.gif" alt="Shocked and Impressed" class="picture"><br>
  
  <button id="nextQuestion">Next Question</button>`;
}

function generateIncorrectPage(){
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let question = store.questions[store.questionNumber];
  return `<div class="scoreCurrent">
  <h3>Score ${store.score} of ${store.questionNumber+1}</h3>
  <h3 class="wrong">WRONG!</h3> 
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <img src="https://media.giphy.com/media/3o84TVK3ahgqYNjZzq/giphy.gif" alt="Wrong Answer" class="picture"><br>
  <div class="mainPage">
  <h2>${question.question}</h2>
  <div class="wrongAnswer">
  <h2>It's obviously ${correctAnswer}</h2>
  </div>
  <button id="nextQuestion">Next Question</button>
  </div>`;
}


function generateFinal(){
  return `<div class="mainPage">
  <img src="https://media.giphy.com/media/3og0ItP017re6GfeP6/giphy.gif" alt="Alexis Graduating" class="picture">
  <div class="wrongAnswer">
  <h2>Final score: ${store.score}</h2>
  </div>
  <button id="restart">Try Again</button>
  </div>`;}

//Handler Functions

function handleQuizStart(){
  $('main').on('click', '#startQuiz', function (event){
    store.currentView='questions';
    renderQuiz();
  });
}


function handleSubmit(){
  $('main').on('submit', '#question', function(event){
    event.preventDefault();
    let chosenAnswer=$('input[name="answer"]:checked').val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    //conditional for what will happen when button is pressed
    if (chosenAnswer === correctAnswer){
      store.currentView='correct';
      store.score++;
    } else {
      store.currentView='incorrect';
    }
    renderQuiz();
  });
}



function handleNextQuestion(){
  $('main').on('click', '#nextQuestion', function(){
    store.questionNumber++;
    store.currentView = 'questions';
    renderQuiz();
  });
}





/*
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  let question = store.questions[store.questionNumber];
  return `<div class="scoreCurrent">
  <h3>Score ${store.score} of ${store.questionNumber+1}</h3>
  <h3 class="wrong">WRONG!</h3> 
  <h3> Question ${store.questionNumber+1} of 5</h3>
  </div>
  <div class="wrongAnswer">
  <h2>It's obviously ${correctAnswer}</h2>
  </div>
  <div class="mainPage">
  <h2>${question.question}</h2>

  <img src="https://media.giphy.com/media/3o84TVK3ahgqYNjZzq/giphy.gif" alt="Wrong Answer" class="picture"><br>
  <button id="nextQuestion">Next Question</button>
  </div>`;
*/






function handleRestart(){
  $('main').on('click', '#restart', function (){
    store.quizStarted=false;
    store.questionNumber=0;
    store.score=0;
    store.currentView = 'landing';
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
  <p>`Wow! Final score: ${FinalScore}`</p>
  <button id="startOver">Start Quiz</button>
 </div>`;
}

function handleRestart(){
  //returns to welcomePage
}
*/


function renderQuiz(){
  let html= '';
  if (store.currentView !== 'landing'){
    if (store.currentView === 'incorrect'){
      html=generateIncorrectPage();
    }
    else if (store.currentView === 'correct'){
      html=generateCorrectPage();
    }
    else if (store.currentView === 'questions'){
      if(store.questionNumber===store.questions.length){
        html= generateFinal();
      }
      else{
        html = generateQuestionPage();
      }
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
