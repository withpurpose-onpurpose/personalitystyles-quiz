// Load questions from localStorage
const STORAGE_KEY = "personalityQuizQuestions";
const quizContainer = document.getElementById("quiz-container");
const form = document.getElementById("quiz-form");
const resultDiv = document.getElementById("result");

function loadQuiz() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    quizContainer.innerHTML = "<p>No quiz questions found.</p>";
    return;
  }

  const grouped = JSON.parse(stored);
  let qIndex = 0;

  for (const [key, options] of Object.entries(grouped)) {
    const [topic, prompt] = key.split("||");
    const block = document.createElement("div");
    block.className = "question-block";

    const header = document.createElement("h3");
    header.textContent = prompt;
    block.appendChild(header);

    options.forEach((opt, i) => {
      const id = `q${qIndex}_${i}`;
      const option = document.createElement("div");
      option.className = "option";

      option.innerHTML = `
        <label>
          <input type="radio" name="q${qIndex}" value="${opt.color}" required>
          ${opt.answer}
        </label>
      `;
      block.appendChild(option);
    });

    quizContainer.appendChild(block);
    qIndex++;
  }
}

function calculateResult(data) {
  const counts = {
    Blue: 0,
    Orange: 0,
    Green: 0,
    Gold: 0
  };

  data.forEach(color => {
    if (counts[color] !== undefined) counts[color]++;
  });

  // Sort colors by count
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]);

  return {
    raw: counts,
    sorted
  };
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const answers = [];

  for (let entry of formData.entries()) {
    answers.push(entry[1]); // just the color
  }

  const results = calculateResult(answers);

  // Display top 4 ranked colors
  let output = `<h2>Your Personality Blend</h2>`;
  output += `<ol>`;
  results.sorted.forEach(([color, count]) => {
    output += `<li><strong>${color}</strong> - ${count} point(s)</li>`;
  });
  output += `</ol>`;

  resultDiv.innerHTML = output;
  resultDiv.style.display = "block";
});

loadQuiz();
