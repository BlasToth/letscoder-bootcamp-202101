const question = document.getElementById('question');
const buttons = document.querySelectorAll('.btn');


fetch('http://localhost:4000/verbs/answers')
.then(response => response.json())
.then( data => {
  console.log(data);
  const sourceName = data[7];
  const buttonText = data[4];
  let v1 = data[0];
  let v2 = data[1];
  let v3 = data[2];
  const sendAnswerToBack = [];
  const gap = "______";
  if (v1 === "case 0") {
    sendAnswerToBack.push("case 0");
    v1 = gap;
  }
  else if (v2 === "case 1") {
    sendAnswerToBack.push("case 1");
    v2 = gap;
  }
  else if (v3 === "case 2") {
    sendAnswerToBack.push("case 2");
    v3 = gap;
  }

  getQuestionText(sourceName, v1, v2, v3)
  getButtonText(buttonText)
})
.catch(err => console.error(err));

function getQuestionText(sourceName, v1, v2, v3) {
  question.innerText = `Cuál es la forma correcta del verbo irregular: ${sourceName}? 
  ${v1}, ${v2}, ${v3}`;
}

function getButtonText(buttonText) {
  for (let i = 0; i < buttons.length; i++ ) {
    buttons[i].textContent = buttonText[i]
  }
}

