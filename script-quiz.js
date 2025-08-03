// script-quiz.js

// 1) HARD-CODED default quiz data:
const DEFAULT_QUESTIONS = {
  "100||What are you most likely to say?": [
    { description: `"The purpose of life Is a life of purpose"`, color: "Gold" },
    { description: `"Two things in life are infinite: the universe and human stupidity; and I'm not sure about the universe." – Albert Einstein"`, color: "Green" },
    { description: `"The problem with temptation is that you may not get another chance." – Laurence Peter"`, color: "Blue" },
    { description: `NOTICE!!! Lack of planning on your part does not constitute an emergency on my part`, color: "Orange" }
  ],
  "200||The best description of me in childhood is:": [
    { description: `Of all types of children, I had the most difficult time fitting into an academic routine…`, color: "Blue" },
    { description: `I appeared older than my years. I was focused on my greatest interests…`, color: "Gold" },
    { description: `I was imaginative and creative. I flourished with encouragement…`, color: "Green" },
    { description: `I wanted to follow the rules and regulations of the school…`, color: "Orange" }
  ],
  "300||I am best described by:": [
    { description: `I act on a moment's notice Witty | Charming…`, color: "Orange" },
    { description: `I seek knowledge and understanding Analytical | Global…`, color: "Green" },
    { description: `I need to feel unique & authentic Enthusiastic…`, color: "Blue" },
    { description: `I follow the rules and respect authority Loyal | Dependable…`, color: "Gold" }
  ],
  "400||What brings me joy is:": [
    { description: `"Being the Best" Excitement Physical…`, color: "Orange" },
    { description: `"Exploring new ideas" High achievement…`, color: "Green" },
    { description: `"Acceptance" Affection…`, color: "Blue" },
    { description: `"Time for family" Tradition Doing the right thing…`, color: "Gold" }
  ]
};

const STORAGE_KEY = "personalityQuizQuestions";

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.refetch-btn')
          .addEventListener('click', refetchQuestions);
  document.getElementById('wantEmail')
          .addEventListener('change', toggleEmailField);
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
  const stored = localStorage.getItem(STORAGE_KEY);
  const grouped = stored
    ? JSON.parse(stored)
    : DEFAULT_QUESTIONS;

  renderQuestions(grouped);
  setupSubmitValidation();
}

function renderQuestions(grouped) {
  const container = document.getElementById('questions-container');
  container.innerHTML = '';  // clear

  container.insertAdjacentHTML('beforeend', `
    <div class="instructions">
      <strong>Instructions:</strong>
      <ul>
        <li>Move each slider to indicate how much the statement describes you.</li>
        <li>far LEFT of slider = "Not at all like me," far RIGHT = "Totally like me."</li>
        <li>Adjust every slider, then check “I am done…” for each question.</li>
      </ul>
    </div>
  `);

  let qIndex = 0;
  for (const [key, options] of Object.entries(grouped)) {
    const [, prompt] = key.split('||');
    const section = document.createElement('section');
    section.className = 'question';
    section.innerHTML = `<h3>Question ${++qIndex}: ${prompt}</h3>`;

    options.forEach((opt, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'option-item';

      // images are commented out for now
      // const img = document.createElement('img');
      // img.src = opt.imageUrl;
      // wrap.appendChild(img);

      const content = document.createElement('div');
      content.className = 'option-content';
      content.innerHTML = `
        <p class="option-label">${opt.description}</p>
        <input type="range" min="0" max="100" step="1" value="0"
               data-color="${opt.color}" name="${key}--${i}">
        <small class="slider-instruction">
          (The further to the right you choose, the more like you this answer is)
        </small>
      `;
      wrap.appendChild(content);
      section.appendChild(wrap);
    });

    const doneDiv = document.createElement('div');
    doneDiv.className = 'done-group';
    doneDiv.innerHTML = `
      <label>
        <input type="checkbox" class="done-chk">
        I am done ranking my answers for this question.
      </label>
    `;
    section.appendChild(doneDiv);

    container.appendChild(section);
  }
}

function setupSubmitValidation() {
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  document.querySelectorAll('.done-chk').forEach(chk =>
    chk.addEventListener('change', () => {
      const allDone = Array.from(document.querySelectorAll('.done-chk'))
                           .every(c => c.checked);
      submitBtn.disabled = !allDone;
    })
  );
}

document.getElementById('quiz-form').addEventListener('submit', e => {
  e.preventDefault();
  collectAndShowResults();
});

function collectAndShowResults() {
  const form = document.getElementById('quiz-form');
  const name = form.name.value.trim();
  const wantEmail = document.getElementById('wantEmail').checked;
  const email = form.email.value.trim();

  // tally
  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });

  // sort
  const sorted = Object.entries(totals)
                       .sort((a,b)=>b[1]-a[1]);
  const blend = sorted.map(([c])=>c).join(' > ');

  showResults(name, sorted, blend);

  if (wantEmail && email) {
    // simple text email
    let body = `Hi ${name},\n\nYour results:\n\n`;
    sorted.forEach(([c,v])=>{
      const label = {
        Blue:   'Connector (Blue)',
        Green:  'Thinker (Green)',
        Gold:   'Planner (Gold)',
        Orange: 'Mover (Orange)'
      }[c];
      body += `${label}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\nPowered by Laura Cooley\nwww.withpurpose-onpurpose.com\nBased on Personality Lingo by Mary Miscisin\n`;
    window.location.href =
      `mailto:${email}?bcc=laura@withpurpose-onpurpose.com` +
      `&subject=${encodeURIComponent('Your Quiz Results')}` +
      `&body=${encodeURIComponent(body)}`;
  }
}

function showResults(name, sorted, blend) {
  const rc = document.getElementById('result-container');
  rc.classList.remove('hidden');
  document.getElementById('quiz-form').style.display = 'none';

  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Ranked blend: <strong>${blend}</strong></p>
    <div class="bars"></div>
    <button id="print-btn">🖨 Print Results</button>
  `;

  const bars = rc.querySelector('.bars');
  const max = sorted[0][1] || 1;
  sorted.forEach(([c,v]) => {
    const row = document.createElement('div');
    row.className = 'bar-wrap';
    row.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar"
           style="width:${(v/max)*100}%;background:${c.toLowerCase()};">
      </div>
      <div class="bar-value">${v}</div>
    `;
    bars.appendChild(row);
  });

  document.getElementById('print-btn')
          .addEventListener('click', ()=>window.print());
}
