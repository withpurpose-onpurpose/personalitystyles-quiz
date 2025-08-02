const SHEET_ID = '1wqtgiMNCeZ1aoR3k5oy_oHh7bvbLnkNvqrCINCQoDgA';
const DATA_URL = `https://opensheet.elk.sh/${SHEET_ID}/PersonalityQuiz_Questions`;
const POST_URL = `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`; // we'll update this in a later step

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('questions-container');
  const res = await fetch(DATA_URL);
  const questions = await res.json();

  const grouped = {};
  questions.forEach(q => {
    if (!grouped[q.QuestionID]) grouped[q.QuestionID] = { text: q.QuestionText, options: [] };
    grouped[q.QuestionID].options.push({ content: q.OptionText, style: q.Style });
  });

  Object.entries(grouped).forEach(([id, q]) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p><strong>${q.text}</strong></p>`;

    q.options.forEach(opt => {
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `
        <input type="checkbox" name="Q${id}" value="${opt.style}">
        ${opt.content.startsWith('http') ? `<img src="${opt.content}" alt="option">` : opt.content}
      `;
      div.appendChild(label);
    });

    container.appendChild(div);
  });
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
