const question = document.getElementById('question');
const buttons = document.querySelectorAll('.btn');
const send = document.querySelector('.send-btn');


fetch('http://localhost:4000/verbs/answers')
.then(response => response.json())
.then( data => {
  // console.log(data);
  const sourceName = data[7];
  const buttonText = data[4];
  const id = data[3];
  let v1 = data[0];
  let v2 = data[1];
  let v3 = data[2];
  const sendAnswerToBack = [];
  const gap = "______";
  if (v1 === "case 0") {
    sendAnswerToBack.push("case 0", id);
    v1 = gap;
  }
  else if (v2 === "case 1") {
    sendAnswerToBack.push("case 1", id);
    v2 = gap;
  }
  else if (v3 === "case 2") {
    sendAnswerToBack.push("case 2", id);
    v3 = gap;
  }
  // console.log(sendAnswerToBack)

  getQuestionText(sourceName, v1, v2, v3)
  getButtonText(buttonText, sendAnswerToBack)
})
.catch(err => console.error(err));

function getQuestionText(sourceName, v1, v2, v3) {
  question.innerText = `Cuál es la forma correcta del verbo irregular: ${sourceName}? 
  ${v1}, ${v2}, ${v3}`;
}

function getButtonText(buttonText, sendAnswerToBack) {
  for (let i = 0; i < buttons.length; i++ ) {
    buttons[i].textContent = buttonText[i];
    buttons[i].addEventListener('click', () => {
      sendAnswerToBack[2] = buttons[i].innerText;
      console.log(sendAnswerToBack);
    })
  }
  send.addEventListener('click', () => {
    fetch('http://localhost:4000/verbs/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({decide: sendAnswerToBack})
    }).then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data) //FE console verdict
      // TODO change color by verdict
      if (data.verdict === true) {
        document.body.classList.add('correct'); 
      } else {
        document.body.classList.add('not-correct');
      }
      
    }) 
    send.disabled = true;
  })
}