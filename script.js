let totalPoints = 0;

// QUIZ

function checkQuiz(){

  let score = 0;

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');

  if(q1) score += Number(q1.value);
  if(q2) score += Number(q2.value);
  if(q3) score += Number(q3.value);

  totalPoints += score;

  document.getElementById("quizResult").innerHTML =
    `Twój wynik: ${score}/3 punktów`;

  updateFinalScore();
}

// DRAG DROP

const items = document.querySelectorAll('.drag-item');
const dropzone = document.getElementById('dropzone');

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', dropItem);

function dragStart(e){
  e.dataTransfer.setData('text', e.target.innerText);
}

function dragOver(e){
  e.preventDefault();
}

function dropItem(e){
  e.preventDefault();

  const data = e.dataTransfer.getData('text');

  const div = document.createElement('div');
  div.className = "drag-item";
  div.innerText = data;

  dropzone.appendChild(div);
}

function checkDragDrop(){

  const elements = [...dropzone.querySelectorAll('.drag-item')]
    .map(el => el.innerText);

  const correct = [
    'fun suma(a:Int,b:Int):Int',
    '{ }',
    'return wynik'
  ];

  const isCorrect =
    JSON.stringify(elements) === JSON.stringify(correct);

  if(isCorrect){
    totalPoints += 2;
    document.getElementById("dragResult").innerHTML =
      "Poprawna kolejność! +2 pkt";
  }else{
    document.getElementById("dragResult").innerHTML =
      "Niepoprawna kolejność.";
  }

  updateFinalScore();
}

// GAPS

function checkGaps(){

  const gap1 = document.getElementById('gap1').value.trim();
  const gap2 = document.getElementById('gap2').value.trim();

  let points = 0;

  if(gap1 === "fun") points++;
  if(gap2 === "return") points++;

  totalPoints += points;

  document.getElementById("gapResult").innerHTML =
    `Zdobyto ${points}/2 punktów`;

  updateFinalScore();
}

// FLASHCARDS

function flipCard(card){
  card.classList.toggle('flipped');
}

// FINAL SCORE

function updateFinalScore(){

  const maxPoints = 7;

  const percent = Math.min(
    Math.round((totalPoints / maxPoints) * 100),
    100
  );

  let grade = "";

  if(percent <= 50){
    grade = "2.0 (niedostateczny)";
  }
  else if(percent <= 60){
    grade = "3.0 (dostateczny)";
  }
  else if(percent <= 70){
    grade = "3.5 (dostateczny plus)";
  }
  else if(percent <= 80){
    grade = "4.0 (dobry)";
  }
  else if(percent <= 90){
    grade = "4.5 (dobry plus)";
  }
  else{
    grade = "5.0 (bardzo dobry)";
  }

  document.getElementById("finalScore").innerHTML =
    `Wynik: ${percent}%`;

  document.getElementById("finalGrade").innerHTML =
    `Ocena: ${grade}`;
}