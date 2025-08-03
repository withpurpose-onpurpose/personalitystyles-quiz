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
        <li>Move each slider to indicate how much the statement describes you.</li>
        <li>far left = "Not at all like me," far right = "Totally like me."</li>
        <li>You can choose any value in between to capture nuance.</li>
        <li>Be sure to adjust every slider before submitting.</li>
      </ul>
    </div>
  `);

  let qIndex = 0;
  Object.entries(grouped).forEach(([key, options]) => {
    const [, prompt] = key.split('||');
    const section = document.createElement('section');
    section.className = 'question';
    section.innerHTML = `<h3>Question ${++qIndex}: ${prompt}</h3>`;

    options.forEach(opt => {
      const wrap = document.createElement('div');
      wrap.className = 'option-item';

      // comment out image rendering temporarily
      // if (opt.imageUrl) {
      //   const img = document.createElement('img');
      //   img.className = 'preview';
      //   img.src = opt.imageUrl;
      //   img.alt = opt.answer;
      //   wrap.appendChild(img);
      // }

      const content = document.createElement('div');
      content.className = 'option-content';
      content.innerHTML = `
        <p class="option-label">${opt.answer}: ${opt.description}</p>
        <input type="range" min="0" max="100" step="1" value="0"
               data-color="${opt.color}" name="${key}--${opt.answer}">
        <small class="slider-instruction">
          (The further to the right you choose, the more like you this answer is)
        </small>
      `;
      wrap.appendChild(content);
      section.appendChild(wrap);
    });

    const doneDiv = document.createElement('div');
    doneDiv.className = 'done-group';
    doneDiv.innerHTML = `<label><input type="checkbox" class="done-chk"> I am done ranking my answers for this question.</label>`;
    section.appendChild(doneDiv);

    container.appendChild(section);
  });
}

function setupSubmitValidation() {
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  document.querySelectorAll('.done-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      const allDone = Array.from(document.querySelectorAll('.done-chk')).every(c => c.checked);
      submitBtn.disabled = !allDone;
    });
  });
}

document.getElementById('quiz-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const wantEmail = document.getElementById('wantEmail').checked;
  const email = form.email.value.trim();

  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });

  const sorted = Object.entries(totals).sort((a,b) => b[1]-a[1]);
  const top = sorted[0][0];
  const blend = sorted.map(([c])=>c).join(' > ');

  showResults(name, top, sorted, blend);

  if (wantEmail && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `<h1>Your Personality Quiz Results</h1><p>Hi ${name},</p><p>Here are your results:</p><ul>`;
    sorted.forEach(([c,v]) => {
      body += `<li style="color:${c.toLowerCase()}"><strong>${c}:</strong> ${v}</li>`;
    });
    body += `</ul><p><strong>Blend:</strong> ${blend}</p>`;
    const mailto = `mailto:${email}?bcc=laura@withpurpose-onpurpose.com&subject=${subj}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
});

function showResults(name, top, sorted, blend) {
  const rc = document.getElementById('result-container');
  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${blend}</p>
    <div class="bars"></div>
    <button id="print-btn">🖨 Print Results</button>
  `;
  const barWrap = rc.querySelector('.bars');
  const max = sorted[0][1]||1;
  sorted.forEach(([c,v]) => {
    const row = document.createElement('div');
    row.className = 'bar-wrap';
    row.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar" style="width:${(v/max)*100}% ;background:${c.toLowerCase()};height:1.2rem;border-radius:4px;"></div>
      <div class="bar-value">${v}</div>
    `;
    barWrap.appendChild(row);
  });
  rc.classList.remove('hidden');
  document.getElementById('quiz-form').classList.add('hidden');

  document.getElementById('print-btn').addEventListener('click', () => window.print());
}
