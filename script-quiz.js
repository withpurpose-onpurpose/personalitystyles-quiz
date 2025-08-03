const STORAGE_KEY = "personalityQuizQuestions";

document.addEventListener('DOMContentLoaded', () => {
  // email toggle
  document.getElementById('want-email').addEventListener('change', e => {
    const emailGroup = document.getElementById('email-container');
    const emailInput = emailGroup.querySelector('input[name="email"]');
    if (e.target.checked) {
      emailGroup.style.display = 'block';
      emailInput.setAttribute('required', 'required');
    } else {
      emailGroup.style.display = 'none';
      emailInput.removeAttribute('required');
    }
  });

  loadQuestionsFromLocal();
  document.getElementById('quiz-form').addEventListener('submit', handleSubmit);
});

function loadQuestionsFromLocal() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const container = document.getElementById('questions-container');

  if (!stored) {
    container.innerHTML = '<p style="color:red;">No questions found. Please log in to the admin dashboard and enter quiz questions.</p>';
    return;
  }

  const grouped = JSON.parse(stored);
  renderQuiz(grouped);
}

function renderQuiz(grouped) {
  const container = document.getElementById('questions-container');
  container.innerHTML = `
    <div class="question-block">
      <strong>Instructions:</strong>
      <ul>
        <li>If only one answer is <em>ALL YOU</em>, slide to 100 for that option and 0 for the rest.</li>
        <li>If you can’t decide between two, split 100 equally (50/50) and 0 for the others.</li>
        <li>If one is dominant, you might pick 75/25 split, etc.</li>
        <li>You must answer every option for every question (no blanks).</li>
      </ul>
    </div>
  `;

  let qIdx = 0;
  for (const [key, options] of Object.entries(grouped)) {
    qIdx++;
    const [topic, prompt] = key.split('||');
    const block = document.createElement('div');
    block.className = 'question-block';

    block.innerHTML = `<div class="question-title">Question ${qIdx}: ${prompt}</div>`;

    options.forEach(opt => {
      const optDiv = document.createElement('div');
      optDiv.className = 'answer-option';

      // image (if present)
      if (opt.imageUrl) {
        const img = document.createElement('img');
        img.src = opt.imageUrl;
        img.alt = opt.answer;
        optDiv.appendChild(img);
      }

      // content + slider
      const content = document.createElement('div');
      content.className = 'answer-content';
      content.innerHTML = `
        <div class="quote">${opt.answer}: ${opt.description}</div>
        <input type="range" min="0" max="100" step="1" value="0"
               data-color="${opt.color}" required>
        <div class="slider-hint">(Slide to the right = more like you)</div>
      `;
      optDiv.appendChild(content);

      block.appendChild(optDiv);
    });

    container.appendChild(block);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const sliders = form.querySelectorAll('input[type=range]');
  const formData = new FormData(form);

  // validation: each question-block has 4 sliders, all must be answered (range always has value)
  const questionBlocks = document.querySelectorAll('.question-block');
  if (questionBlocks.length === 0) return;
  let allAnswered = true;
  questionBlocks.forEach(block => {
    const vals = Array.from(block.querySelectorAll('input[type=range]'))
      .map(r => Number(r.value));
    if (vals.some(v => isNaN(v))) allAnswered = false;
  });
  if (!allAnswered) {
    alert('Please answer all sliders before submitting.');
    return;
  }

  // aggregate scores by color
  const scores = { Green: 0, Blue: 0, Orange: 0, Gold: 0 };
  sliders.forEach(slider => {
    const color = slider.dataset.color;
    scores[color] += Number(slider.value);
  });

  // payload
  const payload = {
    name: formData.get('name'),
    email: formData.get('email') || null,
    company: formData.get('company'),
    jobTitle: formData.get('jobTitle'),
    scores
  };

  // show on-screen report
  showReport(payload);
  // mailto if requested
  if (document.getElementById('want-email').checked) {
    const subject = encodeURIComponent('Your Personality Style Quiz Results');
    const body = encodeURIComponent(
      `Hi ${payload.name},\n\nYour scores:\n` +
      `Green: ${scores.Green}\nBlue: ${scores.Blue}\n` +
      `Orange: ${scores.Orange}\nGold: ${scores.Gold}\n\n` +
      `– withpurpose-onpurpose.com`
    );
    window.location.href = `mailto:${payload.email}?subject=${subject}&body=${body}`;
  }
  // TODO: send mailto to admin (mailto:you@yourdomain.com?body=...)
}

function showReport({ name, scores }) {
  const rpt = document.getElementById('result-container');
  rpt.style.display = 'block';
  rpt.innerHTML = `
    <h2>🎉 Thank you, ${name}!</h2>
    <p>Your color scores:</p>
    <ul>
      <li style="color:green">Thinker (Green): ${scores.Green}</li>
      <li style="color:blue">Connector (Blue): ${scores.Blue}</li>
      <li style="color:orange">Mover (Orange): ${scores.Orange}</li>
      <li style="color:#B8860B">Planner (Gold): ${scores.Gold}</li>
    </ul>
  `;
  document.getElementById('quiz-form').style.display = 'none';
}
