// script-quiz.js

document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions();

  document.getElementById("quiz-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const responses = {};
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company") || "";
    const jobTitle = formData.get("jobTitle") || "";

    // Score tracking
    const scores = {
      Blue: 0,
      Gold: 0,
      Green: 0,
      Orange: 0
    };

    for (let [key, value] of formData.entries()) {
      if (key.startsWith("slider-")) {
        const [_, topic, color] = key.split("-");
        scores[color] += parseInt(value, 10);
        if (!responses[topic]) responses[topic] = {};
        responses[topic][color] = parseInt(value, 10);
      }
    }

    const summary = Object.entries(scores)
      .map(([color, score]) => `${color}: ${score}`)
      .join("\n");

    const mailtoLink = `mailto:${email}?subject=Your Personality Style Results&body=Thank you, ${name}!\n\nYour results:\n${summary}`;
    const adminLink = `mailto:youremail@yourdomain.com?subject=New Quiz Submission&body=Name: ${name}\nEmail: ${email}\nCompany: ${company}\nJob Title: ${jobTitle}\n\nResults:\n${summary}`;

    document.getElementById("result-container").innerHTML = `
      <p class="result">Thank you for submitting your quiz!</p>
      <p><a href="${mailtoLink}" target="_blank">📩 Email results to yourself</a></p>
      <p><a href="${adminLink}" target="_blank">📥 Notify Admin</a></p>
    `;
    document.getElementById("result-container").style.display = "block";
  });
});

function fetchQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  fetch("questions.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((question) => {
        const qEl = document.createElement("div");
        qEl.className = "question";
        qEl.innerHTML = `
          <label>${question.prompt}</label>
          <table class="option-matrix">
            ${question.answers
              .map(
                (a) => `
                <tr>
                  <td><strong>${a.color}</strong></td>
                  <td>${a.description}</td>
                  <td>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="0"
                      step="1"
                      name="slider-${question.topic}-${a.color}"
                      onchange="validateTotal('${question.topic}')"
                    />
                    <span id="slider-value-${question.topic}-${a.color}">0</span>
                  </td>
                </tr>
              `)
              .join("")}
          </table>
          <div class="total">Total: <span id="total-${question.topic}">0</span>/100</div>
          <div class="warning" id="warning-${question.topic}" style="display:none">⚠ Total must equal 100</div>
        `;
        container.appendChild(qEl);
      });
    });
}

function validateTotal(topic) {
  const inputs = document.querySelectorAll(`input[name^=slider-${topic}-]`);
  let total = 0;

  inputs.forEach((input) => {
    total += parseInt(input.value);
    const color = input.name.split("-")[2];
    document.getElementById(`slider-value-${topic}-${color}`).textContent = input.value;
  });

  document.getElementById(`total-${topic}`).textContent = total;
  const warning = document.getElementById(`warning-${topic}`);
  warning.style.display = total !== 100 ? "block" : "none";
}

function refetchQuestions() {
  fetchQuestions();
}
