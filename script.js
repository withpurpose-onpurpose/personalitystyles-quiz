const SHEET_ID = '1wqtgiMNCeZ1aoR3k5oy_oHh7bvbLnkNvqrCINCQoDgA';
const DATA_URL = `https://opensheet.elk.sh/${SHEET_ID}/PersonalityQuiz_Questions`;
const POST_URL = `https://script.google.com/macros/s/AKfycbw28Por_s5ddFB5RRScl2BzAkt9RFwAYQRb5BuvWRJSKvz6XXrkREoSmtaqIN2G1t2IqQ/exec`;

document.addEventListener("DOMContentLoaded", function () {
  const questionsContainer = document.getElementById("questions-container");

  fetch(DATA_URL)
    .then((response) => response.json())
    .then((questions) => renderQuestions(questions))
    .catch((error) => console.error("Error fetching questions:", error));

  function renderQuestions(questions) {
    questions.forEach((q, idx) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      const qTitle = document.createElement("p");
      qTitle.innerHTML = `<strong>Question ${idx + 1}:</strong> ${q.Question}`;
      qDiv.appendChild(qTitle);

      const sliders = [];
      const sliderValues = [0, 0, 0, 0];

      const updateAllSliders = () => {
        let total = sliderValues.reduce((a, b) => a + b, 0);
        if (total > 100) {
          // scale proportionally
          for (let i = 0; i < sliderValues.length; i++) {
            sliderValues[i] = Math.round((sliderValues[i] / total) * 100 / 25) * 25;
          }
          total = sliderValues.reduce((a, b) => a + b, 0);
        }
        sliders.forEach((slider, i) => {
          slider.value = sliderValues[i];
          slider.nextSibling.textContent = ` (${sliderValues[i] === 0 ? "Not like me at all" : sliderValues[i] === 100 ? "Totally like me" : sliderValues[i] + "%"})`;
        });
        totalDiv.innerHTML = `Total: <span class="total-value">${total}</span>/100`;
        totalDiv.classList.toggle("warning", total !== 100);
      };

      for (let i = 0; i < 4; i++) {
        const label = document.createElement("label");
        label.textContent = q[`Option${i + 1}`];

        const range = document.createElement("input");
        range.type = "range";
        range.min = 0;
        range.max = 100;
        range.step = 25;
        range.value = 0;

        const valueLabel = document.createElement("span");
        valueLabel.textContent = " (Not like me at all)";

        range.addEventListener("input", () => {
          sliderValues[i] = parseInt(range.value);
          updateAllSliders();
        });

        sliders.push(range);

        label.appendChild(range);
        label.appendChild(valueLabel);
        qDiv.appendChild(label);
      }

      const totalDiv = document.createElement("div");
      totalDiv.className = "total";
      qDiv.appendChild(totalDiv);
      updateAllSliders();

      questionsContainer.appendChild(qDiv);
    });
  }
});

document.getElementById('quiz-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const scores = { Thinker: 0, Connector: 0, Mover: 0, Planner: 0 };

  const sliders = document.querySelectorAll(".question");
  sliders.forEach((qDiv, qIdx) => {
    const inputs = qDiv.querySelectorAll("input[type='range']");
    const values = Array.from(inputs).map(i => parseInt(i.value));
    const total = values.reduce((a, b) => a + b, 0);
    if (total > 0) {
      const weights = values.map(v => v / total);
      // Assuming fixed mapping order: Option1 = Connector, Option2 = Mover, Option3 = Thinker, Option4 = Planner
      scores.Connector += weights[0] * 100;
      scores.Mover += weights[1] * 100;
      scores.Thinker += weights[2] * 100;
      scores.Planner += weights[3] * 100;
    }
  });

  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    jobTitle: formData.get('jobTitle'),
    scores
  };

  await fetch(POST_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });

  document.getElementById('quiz-form').style.display = 'none';
  const result = document.getElementById('result-container');
  result.style.display = 'block';
  result.innerHTML = `
    <p class="result">🎉 Your Personality Style Blend:</p>
    <ul>
      <li><span style="color:#3b9d38">Thinker (Green)</span>: ${Math.round(scores.Thinker)}%</li>
      <li><span style="color:#0066cc">Connector (Blue)</span>: ${Math.round(scores.Connector)}%</li>
      <li><span style="color:#f6871f">Mover (Orange)</span>: ${Math.round(scores.Mover)}%</li>
      <li><span style="color:#b8860b">Planner (Gold)</span>: ${Math.round(scores.Planner)}%</li>
    </ul>
  `;
});
