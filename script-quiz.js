// script-quiz.js

document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions();
  document.getElementById("quiz-form").addEventListener("submit", handleSubmit);
});

function fetchQuestions() {
  fetch('questions.json') // or use a real backend endpoint
    .then(response => response.json())
    .then(data => renderQuestions(data))
    .catch(error => console.error("Error loading questions:", error));
}

function renderQuestions(questions) {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  questions.forEach((question, qIndex) => {
    const wrapper = document.createElement("div");
    wrapper.className = "question";

    const heading = document.createElement("h3");
    heading.textContent = `Question ${qIndex + 1}: ${question.prompt}`;
    wrapper.appendChild(heading);

    const totalDisplay = document.createElement("div");
    totalDisplay.className = "total";
    totalDisplay.innerHTML = `Total: <span id="total-${qIndex}">0</span>/100`;
    wrapper.appendChild(totalDisplay);

    question.options.forEach((option, oIndex) => {
      const row = document.createElement("div");
      row.className = "slider-row";

      const label = document.createElement("label");
      label.innerHTML = `<strong>${option.code}</strong>: ${option.text}`;

      const input = document.createElement("input");
      input.type = "range";
      input.min = 0;
      input.max = 100;
      input.value = 0;
      input.className = "slider";
      input.name = `q${qIndex}-${oIndex}`;
      input.dataset.question = qIndex;

      const valueSpan = document.createElement("span");
      valueSpan.className = "slider-value";
      valueSpan.textContent = "0";

      input.addEventListener("input", () => {
        valueSpan.textContent = input.value;
        updateTotal(qIndex);
      });

      row.appendChild(label);
      row.appendChild(input);
      row.appendChild(valueSpan);

      wrapper.appendChild(row);
    });

    container.appendChild(wrapper);
    container.appendChild(document.createElement("hr"));
  });
}

function updateTotal(qIndex) {
  const inputs = document.querySelectorAll(`input[data-question="${qIndex}"]`);
  let sum = 0;
  inputs.forEach(input => sum += parseInt(input.value));
  document.getElementById(`total-${qIndex}`).textContent = sum;

  if (sum > 100) {
    document.getElementById(`total-${qIndex}`).parentElement.style.color = 'red';
  } else {
    document.getElementById(`total-${qIndex}`).parentElement.style.color = '';
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const totals = document.querySelectorAll('.total span');
  for (let total of totals) {
    if (parseInt(total.textContent) !== 100) {
      alert("Each question must total exactly 100.");
      return;
    }
  }

  alert("Form submitted successfully!");
}

function refetchQuestions() {
  fetchQuestions();
}
