/**
 * Created by hadgi on 16/06/2017.
 */

/* eslint-env browser */
const myQuestions = [
  {
    question: 'Who is the strongest?',
    answers: {
      a: 'Superman',
      b: 'The Terminator',
      c: 'Waluigi, obviously',
    },
    correctAnswer: 'c',
  },
  {
    question: 'What is the best site ever created?',
    answers: {
      a: 'SitePoint',
      b: 'Simple Steps Code',
      c: "Trick question; they're both the best",
    },
    correctAnswer: 'c',
  },
  {
    question: 'Where is Waldo really?',
    answers: {
      a: 'Antarctica',
      b: 'Exploring the Pacific Ocean',
      c: 'Sitting in a tree',
      d: 'Minding his own business, so stop asking',
    },
    correctAnswer: 'd',
  },
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
let slides = null;
let currentSlide = 0;

function buildQuiz() {
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const question = document.createElement('div');
    question.classList.add('question');
    question.textContent = `${currentQuestion.question}`;
    slide.appendChild(question);

    const answers = document.createElement('div');
    answers.classList.add('answers');

    Object.keys(currentQuestion.answers).forEach((letter) => {
      const answer = document.createElement('div');
      answer.classList.add('answer');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${questionNumber}`;
      input.value = letter;

      const label = document.createElement('label');
      label.textContent = `${letter} : ${currentQuestion.answers[letter]}`;

      answer.appendChild(input);
      answer.appendChild(label);
      answers.appendChild(answer);
    });

    slide.appendChild(answers);

    quizContainer.appendChild(slide);
  });

  slides = document.querySelectorAll('.slide');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = ['input[name=question', questionNumber, ']:checked'].join('');
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect += 1;
      answerContainers[questionNumber].style.color = 'lightgreen';
    } else {
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

buildQuiz();

showSlide(0);

submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
