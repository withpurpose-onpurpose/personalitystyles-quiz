document.addEventListener("DOMContentLoaded", () => {
  fetchQuestions();

  document.getElementById("quiz-form").addEventListener("submit", handleSubmit);
});

async function fetchQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  try {
    const response = await fetch("questions.json");
    const data = await response.json();

    for (const group of data) {
      const div = document.createElement("div");
      div.className = "question";
      div.dataset.topic = group.topic;

      const prompt = document.createElement("label");
      prompt.textContent = group.prompt;
      div.appendChild(prompt);

      const table = document.createElement("table");
      table.className = "option-matrix";

      let totalRow = 0;

      for (const answer of group.answers) {
        const row = table.insertRow();
        row.dataset.color = answer.color;
        row.dataset.answer = answer.a;

        const sliderCell = row.insertCell();
        const label = document.createElement("label");
        label.textContent = `${answer.color}:`;
        sliderCell.appendChild(label);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = 0;
        slider.max = 100;
        slider.value = 0;
        slider.name = `${group.topic}-${answer.color}`;
        slider.className = "slider";
        slider.addEventListener("input", () => updateTotal(div));
        sliderCell.appendChild(slider);

        const valueDisplay = document.createElement("span");
        valueDisplay.textContent = "0";
        valueDisplay.style.marginLeft = "1rem";
        sliderCell.appendChild(valueDisplay);

        slider.addEventListener("input", () => {
          valueDisplay.textContent = slider.value;
        });

        // optional image
        if (answer.imageUrl) {
          const imageCell = row.insertCell();
          const img = document.createElement("img");
          img.src = answer.imageUrl;
          img.alt = "Preview Image";
          img.style.maxWidth = "100px";
          imageCell.appendChild(img);
        }
      }

      const totalDisplay = document.createElement("div");
      totalDisplay.className = "total";
      totalDisplay.innerHTML = `Total: <span class="total-value">0</span> <span class="warning"></span>`;
      div.appendChild(table);
      div.appendChild(totalDisplay);

      container.appendChild(div);
    }
  } catch (err) {
    console.error("Failed to fetch questions:", err);
    container.innerHTML = "<p>Could not load questions. Please try again later.</p>";
  }
}

function updateTotal(questionDiv) {
  const sliders = questionDiv.querySelectorAll("input[type='range']");
  const total = [...sliders].reduce((sum, s) => sum + Number(s.value), 0);
  questionDiv.querySelector(".total-value").textContent = total;

  const warning = questionDiv.querySelector(".warning");
  warning.textContent = total !== 100 ? "❗ Must total 100" : "";
  warning.style.color = total !== 100 ? "red" : "green";
}

function handleSubmit(e) {
  e.preventDefault();

  const questions = document.querySelectorAll(".question");
  const scores = { Blue: 0, Orange: 0, Green: 0, Gold: 0 };
  let valid = true;

  questions.forEach((div) => {
    const sliders = div.querySelectorAll("input[type='range']");
    let groupTotal = 0;

    sliders.forEach((slider) => {
      const color = slider.name.split("-")[1];
      const value = parseInt(slider.value);
      scores[color] += value;
      groupTotal += value;
    });

    if (groupTotal !== 100) {
      div.querySelector(".warning").textContent = "❗ Must total 100";
      valid = false;
    } else {
      div.querySelector(".warning").textContent = "";
    }
  });

  if (!valid) {
    alert("Please make sure all groups total 100.");
    return;
  }

  showResults(scores);
}

function showResults(scores) {
  const container = document.getElementById("result-container");
  container.innerHTML = "<h2>Your Personality Blend</h2>";

  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);

  sorted.forEach(([color, value]) => {
    const percent = Math.round((value / total) * 100);
    const bar = document.createElement("div");
    bar.className = "result-bar";
    bar.innerHTML = `
      <strong>${color}</strong>: ${value} points (${percent}%)
      <div style="height: 20px; background-color: #eee; border-radius: 4px;">
        <div style="
          width: ${percent}%;
          height: 100%;
          background-color: ${getColorCode(color)};
          text-align: right;
          padding-right: 5px;
          color: white;
        ">${percent > 10 ? percent + "%" : ""}</div>
      </div>
    `;
    container.appendChild(bar);
  });

  container.style.display = "block";
}

function getColorCode(color) {
  switch (color) {
    case "Blue": return "#1e90ff";
    case "Orange": return "#ff9800";
    case "Green": return "#4caf50";
    case "Gold": return "#d4af37";
    default: return "#ccc";
  }
}
