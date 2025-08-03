// script-quiz.js
const STORAGE_KEY = "personalityQuizQuestions";

// load questions from localStorage
function refetchQuestions() {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    container.innerHTML = '<p style="color:red;">No questions found. Please log in to the admin dashboard and enter quiz questions.</p>';
    return;
  }

  const grouped = JSON.parse(stored);
  renderQuestions(grouped);
  setupSubmitValidation();
}

function renderQuestions(grouped) {
  const container = document.getElementById('questions-container');
  let qIndex = 0;

  for (const [key, options] of Object.entries(grouped)) {
    const [topic, prompt] = key.split('||');
    const section = document.createElement('section');
    section.className = 'question';

    // header
    const h3 = document.createElement('h3');
    h3.textContent = `Question ${++qIndex}: ${prompt}`;
    section.appendChild(h3);

    // each option
    options.forEach(opt => {
      const flex = document.createElement('div');
      flex.className = 'option-item';

      if (opt.imageUrl) {
        const img = document.createElement('img');
        img.src = opt.imageUrl;
        img.alt = opt.answer;
        flex.appendChild(img);
      }

      const content = document.createElement('div');
      content.className = 'option-content';

      const p = document.createElement('p');
      p.className = 'option-label';
      p.textContent = `${opt.answer}: ${opt.description}`;
      content.appendChild(p);

      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0';
      input.max = '4';
      input.step = '1';
      input.value = '0';
      input.dataset.color = opt.color;
      input.name = `${key}--${opt.answer}`;
      content.appendChild(input);

      const small = document.createElement('small');
      small.className = 'slider-instruction';
      small.textContent = '(The further to the right you choose, the more like you this answer is)';
      content.appendChild(small);

      flex.appendChild(content);
      section.appendChild(flex);
    });

    // done checkbox
    const doneDiv = document.createElement('div');
    doneDiv.className = 'done-group';
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.id = `done-${qIndex}`;
    const lbl = document.createElement('label');
    lbl.htmlFor = chk.id;
    lbl.textContent = ' I am done ranking my answers for this question.';
    doneDiv.appendChild(chk);
    doneDiv.appendChild(lbl);
    section.appendChild(doneDiv);

    container.appendChild(section);
  }
}

function setupSubmitValidation() {
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;

  document.querySelectorAll('.done-group input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', () => {
      const allDone = Array.from(document.querySelectorAll('.done-group input'))
        .every(c => c.checked);
      submitBtn.disabled = !allDone;
    });
  });
}

document.getElementById('quiz-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const wantEmail = document.getElementById('wantEmail').checked;
  const name = form.name.value;
  const email = form.email.value;
  const company = form.company.value;
  const jobTitle = form.jobTitle.value;

  // tally sliders by color
  const totals = { Green: 0, Gold: 0, Orange: 0, Blue: 0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    const val = parseInt(r.value);
    const col = r.dataset.color;
    if (col in totals) totals[col] += val;
  });

  // sort descending
  const sorted = Object.entries(totals).sort((a,b) => b[1] - a[1]);

  showResults(name, sorted, wantEmail, email);
});

function showResults(name, sorted, wantEmail, email) {
  const rc = document.getElementById('result-container');
  const top = sorted[0][0];
  const blendOrder = sorted.map(([c]) => c).join(' > ');
  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${blendOrder}</p>
    <div class="bars"></div>
  `;

  // build bars
  const bars = rc.querySelector('.bars');
  const maxVal = sorted[0][1] || 1;
  sorted.forEach(([c,v]) => {
    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    const lbl = document.createElement('div');
    lbl.textContent = c;
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = c.toLowerCase();
    bar.style.width = `${(v / maxVal) * 100}%`;
    const span = document.createElement('span');
    span.textContent = v;
    wrap.appendChild(lbl);
    wrap.appendChild(bar);
    wrap.appendChild(span);
    bars.appendChild(wrap);
  });

  // show and hide form
  rc.style.display = 'block';
  document.getElementById('quiz-form').style.display = 'none';

  // mailto if requested
  if (wantEmail && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nHere are your results:\n`;
    sorted.forEach(([c,v]) => body += `${c}: ${v}\n`);
    body += `\nBlend: ${blendOrder}`;
    const mailto = `mailto:${email}?bcc=laura@withpurpose-onpurpose.com&subject=${subj}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}
