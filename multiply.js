const option1 = document.getElementById("option1"),
      option2 = document.getElementById("option2"),
      option3 = document.getElementById("option3"),
      audio = document.getElementById("myAudio"),
      scoreElement = document.getElementById("score"),
      timerElement = document.getElementById("timer");
      
let answer = 0,
    score = 0,
    timeLeft = 15,
    timerInterval;

function generate_equation() {
  startTimer();
  
  const num1 = Math.floor(Math.random() * 13),
        num2 = Math.floor(Math.random() * 13);

  answer = num1 * num2;
  document.getElementById("num1").textContent = num1;
  document.getElementById("num2").textContent = num2;


  let dummyAnswer1, dummyAnswer2;

  do {
    dummyAnswer1 = Math.floor(Math.random() * 145); 
  } while (dummyAnswer1 === answer);

  do {
    dummyAnswer2 = Math.floor(Math.random() * 145);
  } while (dummyAnswer2 === answer || dummyAnswer2 === dummyAnswer1);

  
  const allAnswers = [answer, dummyAnswer1, dummyAnswer2].sort(() => Math.random() - 0.5);

  option1.textContent = allAnswers[0];
  option2.textContent = allAnswers[1];
  option3.textContent = allAnswers[2];
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  timerElement.style.color = "#F86624";
  timerElement.classList.remove('blink');

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerElement.style.color = "#FE4A49";
      timerElement.classList.add('blink');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  score = Math.max(0, score - 5);
  scoreElement.textContent = score;
  audio.play();
  generate_equation();
}

function checkAnswer(selected, correct) {
  clearInterval(timerInterval);

  if (parseInt(selected) === correct) {
    score += 10;
    scoreElement.textContent = score;
  } else {
    score = Math.max(0, score - 5);
    scoreElement.textContent = score;
    audio.play();
  }

  generate_equation();
}

option1.addEventListener("click", () => checkAnswer(option1.textContent, answer));
option2.addEventListener("click", () => checkAnswer(option2.textContent, answer));
option3.addEventListener("click", () => checkAnswer(option3.textContent, answer));

generate_equation();
