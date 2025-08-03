const STORAGE_KEY = "personalityQuizQuestions";

// Sanitize uploaded filename
function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\.]/g, '')
    .replace(/\-+/g, '-');
}

// Handle image file upload & preview
function handleImageUpload(input, previewImg, hiddenInput) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    // 1) show preview in the admin UI
    previewImg.src = reader.result;
    previewImg.style.display = 'inline';
    // 2) store the entire Data-URL in localStorage JSON
    hiddenInput.value = reader.result;
  };
  reader.readAsDataURL(file);
}

// Add a new question block (or load existing)
function addNewQuestion(existing = null) {
  const container = document.getElementById("question-container");
  const table = document.createElement("table");

  const topic = existing?.topic || "";
  const prompt = existing?.prompt || "";

  // Header row
  table.innerHTML = `
    <thead>
      <tr>
        <th colspan="7">
          Topic: <input type="text" value="${topic}" class="topic-input">
          Prompt: <input type="text" value="${prompt}" class="prompt-input">
        </th>
      </tr>
      <tr>
        <th>Answer (A)</th>
        <th>Color (F)</th>
        <th>Status (G)</th>
        <th>Description (D)</th>
        <th>Image</th>
        <th>Preview</th>
        <th>Image URL</th>
      </tr>
    </thead>
  `;

  // Body rows
  const tbody = document.createElement("tbody");
  const options = existing?.options || [{},{},{},{}];

  options.forEach((opt, i) => {
    const row = document.createElement("tr");

    const colors = ['Blue','Orange','Green','Gold'];
    const statuses = ['Ask','Ignore'];

    row.innerHTML = `
      <td><input type="text" class="answer-input" value="${opt.answer||''}"></td>
      <td>
        <select class="color-select">
          ${colors.map(c=>`<option${opt.color===c?' selected':''}>${c}</option>`).join('')}
        </select>
      </td>
      <td>
        <select class="status-select">
          ${statuses.map(s=>`<option${(opt.status||'Ask')===s?' selected':''}>${s}</option>`).join('')}
        </select>
      </td>
      <td>
        <textarea class="description-input">${opt.description||''}</textarea>
      </td>
      <td>
        <input type="file" accept="image/*"
          onchange="handleImageUpload(this, this.nextElementSibling, this.nextElementSibling.nextElementSibling)">
      </td>
      <td>
        <img class="preview" src="${opt.imageUrl||''}" style="${opt.imageUrl?'display:inline-block;':''}">
      </td>
      <td>
        <input type="hidden" class="image-url-input" value="${opt.imageUrl||''}">
      </td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
  // add a separator after each question
  const hr = document.createElement('hr');
  hr.className = 'topic-separator';
  container.appendChild(hr);
}

// Save all questions to localStorage
function saveAllQuestions() {
  const tables = document.querySelectorAll("#question-container table");
  const questions = {};

  tables.forEach(table => {
    const topic = table.querySelector(".topic-input").value.trim();
    const prompt = table.querySelector(".prompt-input").value.trim();
    const key = `${topic}||${prompt}`;
    const rows = table.querySelectorAll("tbody tr");
    const opts = [];

    rows.forEach(row => {
      opts.push({
        answer: row.querySelector(".answer-input").value.trim(),
        color:  row.querySelector(".color-select").value,
        status: row.querySelector(".status-select").value,
        description: row.querySelector(".description-input").value.trim(),
        imageUrl: row.querySelector(".image-url-input").value.trim(),
      });
    });
    questions[key] = opts;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  alert("Questions saved successfully!");
}

// Load on page start
function loadQuestionsFromLocal() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const grouped = JSON.parse(stored);
  Object.entries(grouped).forEach(([key, opts]) => {
    const [topic, prompt] = key.split("||");
    addNewQuestion({ topic, prompt, options: opts });
  });
}

document.addEventListener("DOMContentLoaded", loadQuestionsFromLocal);
