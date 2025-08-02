const SHEET_ID = '1wqtgiMNCeZ1aoR3k5oy_oHh7bvbLnkNvqrCINCQoDgA';
const DATA_URL = `https://opensheet.elk.sh/${SHEET_ID}/PersonalityQuiz_Questions`;
const POST_URL = `https://script.google.com/macros/s/AKfycbw28Por_s5ddFB5RRScl2BzAkt9RFwAYQRb5BuvWRJSKvz6XXrkREoSmtaqIN2G1t2IqQ/exec`;

function convertDriveLinkToImage(url) {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  if (url.includes("id=")) {
    const id = new URLSearchParams(url.split("?")[1]).get("id");
    return id ? `https://drive.google.com/uc?export=view&id=${id}` : null;
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  const questionsContainer = document.getElementById("questions-container");

  fetch(DATA_URL)
    .then((response) => response.json())
    .then((questions) => renderQuestions(questions.filter(q => q.Status === "Ask")))
    .catch((error) => console.error("Error fetching questions:", error));

  function renderQuestions(questions) {
    const grouped = {};
    questions.forEach(q => {
      const qNum = q.QuestionNumber?.toString()?.trim();
      if (!grouped[qNum]) grouped[qNum] = [];
      grouped[qNum].push(q);
    });

    Object.entries(grouped).forEach(([qNum, qOptions], idx) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      const qTitle = document.createElement("p");
      qTitle.innerHTML = `<strong>Question ${idx + 1}:</strong> ${qOptions[0].QuestionText}`;
      qDiv.appendChild(qTitle);

      const matrixTable = document.createElement("table");
      matrixTable.className = "option-matrix";

      for (let i = 0; i < 2; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
          const index = i * 2 + j;
          const opt = qOptions[index];
          if (!opt) continue;

          const cell = document.createElement("td");

          const optionHeader = document.createElement("strong");
          optionHeader.textContent = opt.OptionLabel || '';
          cell.appendChild(optionHeader);

          const imageURL = convertDriveLinkToImage(opt.OptionTextOrImageURL);
          if (imageURL) {
            const img = document.createElement("img");
            img.src = imageURL;
            img.alt = opt.OptionLabel || "Option image";
            img.style.maxWidth = "200px";
            cell.appendChild(img);
          }

          const text = document.createElement("div");
          text.textContent = opt.OptionText || "";
          cell.appendChild(text);

          row.appendChild(cell);
        }
        matrixTable.appendChild(row);
      }

      qDiv.appendChild(matrixTable);

      const sliders = [];
      const sliderValues = new Array(qOptions.length).fill(0);

      const updateAllSliders = () => {
        let total = sliderValues.reduce((a, b) => a + b, 0);
        if (total > 100) {
          for (let i = 0; i < sliderValues.length; i++) {
            sliderValues[i] = Math.round((sliderValues[i] / total) * 100 / 25) * 25;
          }
          total = sliderValues.reduce((a, b) => a + b, 0);
        }
        sliders.forEach((slider, i) => {
          slider.range.value = sliderValues[i];
          slider.valueLabel.textContent = ` (${sliderValues[i] === 0 ? "Not at all like me" : sliderValues[i] === 100 ? "Totally like me!" : sliderValues[i] + "%"})`;
        });
        totalDiv.innerHTML = `Total: <span class="total-value">${total}</span>/100`;
        totalDiv.classList.toggle("warning", total !== 100);
      };

      qOptions.forEach((opt, i) => {
        const label = document.createElement("label");
        label.style.display = "block";

        const range = document.createElement("input");
        range.type = "range";
        range.min = 0;
        range.max = 100;
        range.step = 25;
        range.value = 0;

        const valueLabel = document.createElement("span");
        valueLabel.textContent = " (Not at all like me)";

        range.addEventListener("input", () => {
          sliderValues[i] = parseInt(range.value);
          updateAllSliders();
        });

        sliders.push({ range, valueLabel });

        label.appendChild(range);
        label.appendChild(valueLabel);
        qDiv.appendChild(label);
      });

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
  const sliders = document.querySelectorAll(".question");
  const allAnswers = [];

  sliders.forEach((qDiv) => {
    const inputs = qDiv.querySelectorAll("input[type='range']");
    const values = Array.from(inputs).map(i => parseInt(i.value));
    allAnswers.push(values);
  });

  const payload = {
    timestamp: new Date().toISOString(),
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    jobTitle: formData.get('jobTitle'),
    answers: allAnswers
  };

  await fetch(POST_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });

  document.getElementById('quiz-form').style.display = 'none';
  const result = document.getElementById('result-container');
  result.style.display = 'block';
  result.innerHTML = `<p class="result">🎉 Thanks for taking the quiz! Your results will be shared shortly.</p>`;
});
