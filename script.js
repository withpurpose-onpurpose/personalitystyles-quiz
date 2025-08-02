const SHEET_ID = '1wqtgiMNCeZ1aoR3k5oy_oHh7bvbLnkNvqrCINCQoDgA';
const DATA_URL = `https://opensheet.elk.sh/${SHEET_ID}/PersonalityQuiz_Questions`;
const POST_URL = `https://script.google.com/macros/s/AKfycbw28Por_s5ddFB5RRScl2BzAkt9RFwAYQRb5BuvWRJSKvz6XXrkREoSmtaqIN2G1t2IqQ/exec`;


document.addEventListener("DOMContentLoaded", function () {
  const questionsContainer = document.getElementById("questions-container");

  // Replace this with your Google Apps Script endpoint
  const QUESTIONS_ENDPOINT = "https://script.google.com/macros/s/AKfycbw28Por_s5ddFB5RRScl2BzAkt9RFwAYQRb5BuvWRJSKvz6XXrkREoSmtaqIN2G1t2IqQ/exec";

  fetch(QUESTIONS_ENDPOINT)
    .then((response) => response.json())
    .then((data) => renderQuestions(data.questions))
    .catch((error) => console.error("Error fetching questions:", error));

  function renderQuestions(questions) {
    questions.forEach((q, idx) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      const qTitle = document.createElement("p");
      qTitle.textContent = q.text;
      qDiv.appendChild(qTitle);

      const sliders = [];

      q.options.forEach((option, optIdx) => {
        const label = document.createElement("label");
        label.textContent = option;

        const range = document.createElement("input");
        range.type = "range";
        range.min = 0;
        range.max = 100;
        range.step = 25;
        range.value = 0;
        range.dataset.questionIndex = idx;

        const valueLabel = document.createElement("span");
        valueLabel.textContent = " (Not like me at all)";
        range.addEventListener("input", () => {
          updateTotal(sliders, totalDiv);
          const val = parseInt(range.value);
          valueLabel.textContent = ` (${val === 0 ? "Not like me at all" : val === 100 ? "Totally like me" : val + "%"})`;
        });

        sliders.push(range);

        label.appendChild(range);
        label.appendChild(valueLabel);
        qDiv.appendChild(label);
      });

      const totalDiv = document.createElement("div");
      totalDiv.className = "total";
      qDiv.appendChild(totalDiv);
      updateTotal(sliders, totalDiv);

      questionsContainer.appendChild(qDiv);
    });
  }

  function updateTotal(sliders, displayEl) {
    const total = sliders.reduce((sum, r) => sum + parseInt(r.value), 0);
    displayEl.innerHTML = `Total: ${total}%`;

    sliders.forEach((slider) => {
      const currentVal = parseInt(slider.value);
      const othersTotal = total - currentVal;
      slider.max = 100 - othersTotal;
    });

    if (total !== 100) {
      displayEl.classList.add("warning");
    } else {
      displayEl.classList.remove("warning");
    }
  }
});


document.getElementById('quiz-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const grouped = {};
  const scores = { Green: 0, Blue: 0, Orange: 0, Gold: 0 };

  formData.forEach((val, key) => {
    if (key.startsWith('Q')) {
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(val);
    }
  });

  Object.values(grouped).forEach(values => {
    const weight = 100 / values.length;
    values.forEach(style => {
      scores[style] += weight;
    });
  });

  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    jobTitle: formData.get('jobTitle'),
    scores
  };

  // Optional: post to Apps Script web app
  await fetch(POST_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });

  // Show result
  document.getElementById('quiz-form').style.display = 'none';
  const result = document.getElementById('result-container');
  result.style.display = 'block';
  result.innerHTML = `
    <p class="result">🎉 Your Personality Style Blend:</p>
    <ul>
      <li>Green (Thinker): ${Math.round(scores.Green)}%</li>
      <li>Blue (Connector): ${Math.round(scores.Blue)}%</li>
      <li>Orange (Mover): ${Math.round(scores.Orange)}%</li>
      <li>Gold (Planner): ${Math.round(scores.Gold)}%</li>
    </ul>
  `;
});
