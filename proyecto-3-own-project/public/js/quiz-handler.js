const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
})

function startGame(questions) {
  startButton.classList.add('hide')
  const task = handleQuestions(questions);
  questionElement.innerText = task.question
  answerButtonsElement.innerText = "questions.answer[0]"
  questionContainerElement.classList.remove('hide')
}


fetch('http://localhost:4000/verbs/answers')
	.then(response => response.json())
	.then( data => {
    console.log(data);
    const sourceName = data[0]
    const v1 = data[1]
    const v2 = data[2]
    const v3 = data[3]
    const wrongV1 = data[4]
    const wrongV2 = data[5]
    const wrongV3 = data[6]
  
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
      { text: v1, correct: false },
      { text: v2, correct: false },
      { text: v2, correct: false }
    ]
  }
]
 return questions
}