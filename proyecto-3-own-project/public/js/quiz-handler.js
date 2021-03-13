const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion()
}

function showQuestion(questions) {
  console.log(questions)
  const source = questions[0].question;
  questionElement.innerText = source;
  questions.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (1 > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

fetch('http://localhost:4000/verbs/answers')
	.then(response => response.json())
	.then( data => {
    console.log(data);
    const {sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3} = data;
    const wrongV2Array = wrongV2.split(',');
    console.log(wrongV2Array)
    handleQuestions(sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3, wrongV2Array);

    })
	.catch(err => console.error(err));

function handleQuestions(sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3, wrongV2Array) {
  
  const questions = [
  {
    question: `Cuál es la forma correcta del verbo irregular: ${sourceName}? ${v1}, ____, ${v3} `,
    answers: [
      { text: v2, correct: true },
      { text: wrongV2Array[0], correct: false },
      { text: wrongV2Array[1], correct: false },
      { text: wrongV2Array[2], correct: false }
    ]
  }
]
  showQuestion(questions)
}