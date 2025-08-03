// script-quiz.js

const STORAGE_KEY = "personalityQuizQuestions";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.refetch-btn').addEventListener('click', refetchQuestions);
  document.getElementById('wantEmail').addEventListener('change', toggleEmailField);
  refetchQuestions();
});

function toggleEmailField() {
  const want = document.getElementById('wantEmail').checked;
  const label = document.getElementById('email-label');
  const emailInput = document.getElementById('email');
  if (want) {
    label.classList.remove('hidden');
    emailInput.required = true;
  } else {
    label.classList.add('hidden');
    emailInput.required = false;
    emailInput.value = '';
  }
}

function refetchQuestions() {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    container.innerHTML = '<p class="error">No questions found. Please log in to the admin dashboard and enter quiz questions.</p>';
    return;
  }
  const grouped = JSON.parse(stored);
  renderQuestions(grouped);
  setupSubmitValidation();
}

function renderQuestions(grouped) {
  const container = document.getElementById('questions-container');
  container.insertAdjacentHTML('beforeend', `
    <div class="instructions">
      <strong>Instructions:</strong>
      <ul>
        <li>If only one answer is <em>ALL YOU</em>, pick <strong>4</strong> and <strong>0</strong> for the rest.</li>
        <li>If you can’t decide between two, pick <strong>2</strong> for each, <strong>0</strong> for the others.</li>
        <li>If one is dominant, pick <strong>3</strong> and <strong>1</strong>, <strong>0</strong> for others.</li>
        <li>If they all fit you, pick <strong>1</strong> each.</li>
        <li><strong>Total across all sliders = 4 per question.</strong></li>
      </ul>
    </div>
  `);

  let qIndex = 0;
  for (const [key, options] of Object.entries(grouped)) {
    const [topic, prompt] = key.split('||');
    const section = document.createElement('section');
    section.className = 'question';
    section.dataset.qKey = key;
    section.innerHTML = `<h3>Question ${++qIndex}: ${prompt}</h3>`;

    // script-quiz.js (inside renderQuestions)
options.forEach(opt => {
  const wrap = document.createElement('div');
  wrap.className = 'option-item';

  // image
  if (opt.imageUrl) {
    const img = document.createElement('img');
    img.className = 'preview';
    img.src = opt.imageUrl;   // this is your Data-URL
    img.alt = opt.answer;
    wrap.appendChild(img);    // ← use wrap, not wrapper
  }

  // right-side content
  const content = document.createElement('div');
  content.className = 'option-content';
  content.innerHTML = `
    <p class="option-label">${opt.answer}: ${opt.description}</p>
    <input type="range" min="0" max="4" step="1" value="0"
           data-color="${opt.color}" name="${key}--${opt.answer}">
    <small class="slider-instruction">
      (The further to the right you choose, the more like you this answer is)
    </small>
  `;
  wrap.appendChild(content);

  section.appendChild(wrap);
});


    // done checkbox
    const done = document.createElement('div');
    done.className = 'done-group';
    done.innerHTML = `
      <label><input type="checkbox" class="done-chk"> I am done ranking my answers for this question.</label>
    `;
    section.appendChild(done);

    container.appendChild(section);
  }
}

function setupSubmitValidation() {
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;

  const checks = document.querySelectorAll('.done-chk');
  checks.forEach(chk => {
    chk.addEventListener('change', () => {
      const allDone = Array.from(checks).every(c => c.checked);
      submitBtn.disabled = !allDone;
    });
  });
}

document.getElementById('quiz-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const company = form.company.value.trim();
  const jobTitle = form.jobTitle.value.trim();
  const wantEmail = document.getElementById('wantEmail').checked;

  // collect scores by color
  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    const val = +r.value;
    const color = r.dataset.color;
    if (color in totals) totals[color] += val;
  });

  // sort descending
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const top = sorted[0][0];
  const blendOrder = sorted.map(([c])=>c).join(' > ');

  showResults(name, top, sorted, blendOrder, wantEmail, email);
});

function showResults(name, top, sorted, blendOrder, wantEmail, email) {
  const rc = document.getElementById('result-container');
  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${blendOrder}</p>
    <div class="bars"></div>
  `;
  const bars = rc.querySelector('.bars');
  const max = sorted[0][1]||1;
  sorted.forEach(([c,v])=>{
    const bw = document.createElement('div');
    bw.className = 'bar-wrap';
    bw.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar" style="width:${(v/max)*100}% ;background:${c.toLowerCase()};"></div>
      <div class="bar-value">${v}</div>
    `;
    bars.appendChild(bw);
  });
  rc.style.display='block';
  document.getElementById('quiz-form').style.display='none';

  if (wantEmail && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nHere are your results:\n\n`;
    sorted.forEach(([c,v])=>{
      body += `${c}: ${v}\n`;
    });
    body += `\nBlend: ${blendOrder}`;
    const mailto = `mailto:${email}?bcc=laura@withpurpose-onpurpose.com&subject=${subj}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}
