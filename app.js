const loader = document.getElementById("loader");
const quiz = document.getElementById("quiz");
const questionNumber = document.getElementById("question-number");
const progressBarFull = document.getElementById("progress-bar-full");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const maximumQuestions = 10;
let counter = 0;
const correctScore = 10;
let questions = [];
let score = 0;
let acceptingAnswers = true;

fetch(
  "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple"
)
  .then((response) => response.json())
  .then((loadedquestions) => {
    questions = loadedquestions.results.map((loadedquestion) => {
      const formattedQuestion = {
        question: `${loadedquestion.question}`,
      };
      const answerChoices = [...loadedquestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4);
      answerChoices.splice(
        formattedQuestion.answer,
        0,
        loadedquestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + index] = choice;
      });
      return formattedQuestion;
    });
    loadQuestions();
  })
  .catch((error) => console.log(error));

//load questions
loadQuestions = () => {
  availableQuestions = [...questions];
  getNewQuestion();
  loader.classList.add("hidden");
  quiz.classList.remove("hidden");
};
//display question
getNewQuestion = () => {
  if (availableQuestions.length === 0 || counter >= maximumQuestions) {
    localStorage.setItem("recentScore", JSON.stringify(score));
    // go to end page
    return window.location.assign("/end.html");
  }
  counter++;
  questionNumber.innerText = `${counter}/${maximumQuestions}`;
  // update the progress bar
  progressBarFull.style.width = `${(counter / maximumQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const id = choice.dataset.id;
    choice.innerHTML = currentQuestion["choice" + id];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
//choices or options
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.id;
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    console.log(choice.dataset.id == currentQuestion.answer);

    if (classToApply == "correct") {
      incrementScore(correctScore);
    }
    if (classToApply == "incorrect") {
      for (let i = 0; i < choices.length; i++) {
        if (choices[i].dataset.id == currentQuestion.answer) {
          choices[i].classList.add("correct");
          setTimeout(() => {
            choices[i].classList.remove("correct");
          }, 1000);
        }
      }
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
