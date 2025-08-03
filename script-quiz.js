// script-quiz.js
// Load and render the quiz, handle submission and results
const STORAGE_KEY = "personalityQuizQuestions";

// Fetch questions from localStorage
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
  setupSubmitValidation(grouped);
}

// Render each question group
function renderQuestions(grouped) {
  const container = document.getElementById('questions-container');
  let qIndex = 0;

  for (const [key, options] of Object.entries(grouped)) {
    const [topic, prompt] = key.split('||');
    const section = document.createElement('section');
    section.className = 'question';
    section.dataset.qKey = key;

    // Question header
    const h3 = document.createElement('h3');
    h3.textContent = `Question ${++qIndex}: ${prompt}`;
    section.appendChild(h3);

    // Options list
    options.forEach((opt, i) => {
      const flex = document.createElement('div');
      flex.className = 'option-item';

      // Image
      if (opt.imageUrl) {
        const img = document.createElement('img');
        img.src = opt.imageUrl;
        img.alt = opt.answer;
        flex.appendChild(img);
      }

      // Content wrapper
      const content = document.createElement('div');
      content.className = 'option-content';

      // Answer text
      const p = document.createElement('p');
      p.className = 'option-label';
      p.textContent = `${opt.answer}: ${opt.description}`;
      content.appendChild(p);

      // Slider
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0';
      input.max = '4';
      input.step = '1';
      input.value = '0';
      input.dataset.color = opt.color;
      input.name = `${key}--${opt.answer}`;
      content.appendChild(input);

      // Instruction small
      const small = document.createElement('small');
      small.className = 'slider-instruction';
      small.textContent = '(The further to the right you choose, the more like you this answer is)';
      content.appendChild(small);

      flex.appendChild(content);
      section.appendChild(flex);
    });

    // Done checkbox
    const doneDiv = document.createElement('div');
    doneDiv.className = 'done-group';
    const chk = document.createElement('input'); chk.type = 'checkbox'; chk.id = `done-${qIndex}`;
    const lbl = document.createElement('label'); lbl.htmlFor = chk.id;
    lbl.textContent = ' I am done ranking my answers for this question.';
    doneDiv.appendChild(chk);
    doneDiv.appendChild(lbl);
    section.appendChild(doneDiv);

    container.appendChild(section);
  }
}

// Ensure all questions answered before enabling submit
function setupSubmitValidation(grouped) {
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

// Handle form submission
document.getElementById('quiz-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const wantEmail = document.getElementById('wantEmail').checked;
  const name = form.name.value;
  const email = form.email.value;
  const company = form.company.value;
  const jobTitle = form.jobTitle.value;

  // Gather slider responses by color
  const totals = { Green: 0, Gold: 0, Orange: 0, Blue: 0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    const val = parseInt(r.value);
    const color = r.dataset.color;
    if (color && totals[color] !== undefined) totals[color] += val;
  });

  // Sort descending
  const sorted = Object.entries(totals)
    .sort((a,b) => b[1]-a[1]);
  const blend = sorted.map(([c,v]) => `${c} (${v})`).join(', ');
  const top = sorted[0][0];

  showResults(name, top, blend, sorted, wantEmail, email, company, jobTitle);
});

// Display on-screen and trigger email
function showResults(name, top, blend, sorted, wantEmail, email, company, jobTitle) {
  const rc = document.getElementById('result-container');
  rc.innerHTML = `<h2>Thanks, ${name}!</h2>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${sorted.map(([c]) => c).join(' > ')}</p>
    <div class="bars"></div>`;

  // render bars
  const bars = rc.querySelector('.bars');
  const maxVal = sorted[0][1] || 1;
  sorted.forEach(([c,v]) => {
    const barWrap = document.createElement('div');
    barWrap.className = 'bar-wrap';
    const label = document.createElement('div'); label.textContent = c;
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = c.toLowerCase();
    bar.style.width = `${(v/maxVal)*100}%`;
    const span = document.createElement('span'); span.textContent = v;
    barWrap.appendChild(label);
    barWrap.appendChild(bar);
    barWrap.appendChild(span);
    bars.appendChild(barWrap);
  });

  rc.style.display = 'block';
  document.getElementById('quiz-form').style.display = 'none';

  // email to user and bcc
  if (wantEmail && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},%0D%0AHere are your results:%0D%0A`;
    sorted.forEach(([c,v]) => {
      body += `${c}: ${v}%0D%0A`;
    });
    body += `%0D%0ABlend: ${sorted.map(([c])=>c).join(' > ')}`;
    const mailto = `mailto:${email}?cc=&bcc=laura@withpurpose-on-purpose.com&subject=${subj}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}
