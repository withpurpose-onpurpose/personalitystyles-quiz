// ————— Hard-coded quiz questions —————
const QUESTIONS = [
  {
    id: 100,
    text: "What are you most likely to say?",
    options: [
      { id:"100.01", description:`The purpose of life\nIs a life of purpose`, color:"Blue" },
      { id:"100.02", description:`“Two things in life are infinite: the universe and human stupidity; and I'm not sure about the universe.”\n— Albert Einstein`, color:"Green" },
      { id:"100.03", description:`The problem with temptation\nis that you may not get another chance.\n— Laurence Peter`, color:"Orange" },
      { id:"100.04", description:`NOTICE!!! Lack of planning on your part does not constitute an emergency on my part`, color:"Gold" }
    ]
  },
  {
    id: 200,
    text: "The best description of me in childhood is:",
    options: [
      { id:"200.01", description:`Of all types of children, I had the most difficult time fitting into an academic routine.\n\nI learned by doing and experiencing rather than by listening and reading.\n\nI needed physical involvement in\nthe learning process and was motivated by my own natural competitive nature and sense of fun.`, color:"Orange" },
      { id:"200.02", description:`I appeared to be older than my years.\n\nI was focused on my greatest interests, and achieved more in subjects that were mentally stimulating.\n\nI was impatient with drill and routine.\n\nI questioned authority, and found it necessary to respect teachers before I could learn from them.`, color:"Green" },
      { id:"200.03", description:`I was imaginative and creative.\n\nI flourished with encouragement rather than competition, and wanted others to like me.\n\nI reacted with great sensitivity to\ndiscordance or rejection and sought recognition.\n\nI responded best to my\nteachers who were warm and friendly.`, color:"Blue" },
      { id:"200.04", description:`I wanted to follow the rules and regulations of the school.\n\nI understood and respected authority and was comfortable with academic routine.\n\nI was the easiest of all types of children to adapt to the educational\nsystem.`, color:"Gold" }
    ]
  },
  {
    id: 300,
    text: "I am best described by:",
    options: [
      { id:"300.01", description:`I act on a moment’s notice — Witty | Charming | Spontaneous\nI consider life as a game, here and now — Impulsive | Generous | Impactful\nI need fun, variety, stimulation and excitement — Optimistic | Eager | Bold\nI value skill, resourcefulness and courage — Physical | Immediate | Fraternal\nI am a natural trouble-shooter, a performer and a competitor.`, color:"Orange" },
      { id:"300.02", description:`I seek knowledge and understanding — Analytical | Global | Conceptual\nI live my life by my own standard — Cool | Calm | Collected\nI need explanations and answers — Inventive | Logical | Perfectionistic\nI value intelligence, insight fairness and justice — Abstract | Hypothetical | Investigative\nI am a natural nonconformist, a visionary and a problem solver.`, color:"Green" },
      { id:"300.03", description:`I need to feel unique & authentic — Enthusiastic | Sympathetic | Personal\nI look for meaning and significance in life — Warm | Communicative | Compassionate\nI need to contribute, to encourage and to care — Idealistic | Spiritual | Sincere\nI value integrity and unity in relationships — Peaceful | Flexible | Imaginative\nI am a natural romantic, a poet and a nurturer.`, color:"Blue" },
      { id:"300.04", description:`I follow the rules and respect authority — Loyal | Dependable | Prepared\nI have a strong sense of what is right and wrong in life — Thorough | Sensible | Punctual\nI need to be useful and to belong — Faithful | Stable | Organized\nI value home, family and tradition — Caring | Concerned | Concrete\nI am a natural preserver, a good citizen and helpful.`, color:"Gold" }
    ]
  },
  {
    id: 400,
    text: "What brings me joy is:",
    options: [
      { id:"400.01", description:`Being the Best — Excitement | Physical movement | Performing | Taking Action | Taking Risks | Trouble-shooting | Freedom`, color:"Orange" },
      { id:"400.02", description:`Exploring new ideas — High achievement | Meeting Challenges | Seeking new knowledge | Solving problems | Doing what “can’t be done” | Creative freedom | Humor & irony`, color:"Green" },
      { id:"400.03", description:`Acceptance | Affection | Conversations | Family | Friendships | Groups | Love | Music`, color:"Blue" },
      { id:"400.04", description:`Time for family | Tradition | Doing the “right thing” | Acknowledgement | Belonging | Home | A sense of order | A task well done`, color:"Gold" }
    ]
  }
];

// ————— Feedback blocks —————
const FEEDBACK = {
  Green: `<section class="feedback-section">
    <h4>Thinker (Green) Feedback</h4>
    <p>Your driving force is competency… Remember “Keen Green.”</p>
    <h5>At your best:</h5>
    <ul>
      <li>Problem-solver</li><li>Independent</li><li>Tenacious</li>
      <li>Self-assured</li><li>Witty</li><li>Logical & Analytical</li><li>Creative</li>
    </ul>
    <h5>When stressed:</h5>
    <ul>
      <li>Indecisive</li><li>Aloof</li><li>Perfection anxiety</li><li>Critical</li>
    </ul>
    <h5>Get back on track:</h5>
    <ul>
      <li>Balance critiques</li><li>Honor your independence</li>
      <li>Validate your curiosity</li><li>Reach out to others</li>
    </ul>
  </section>`,
  Blue: `<section class="feedback-section">
    <h4>Connector (Blue) Feedback</h4>
    <p>Your driving force is relationship… “True Blue trooper.”</p>
    <h5>At your best:</h5>
    <ul>
      <li>Friendly</li><li>Helpful</li><li>Compassionate</li><li>Expressive</li>
    </ul>
    <h5>When stressed:</h5>
    <ul>
      <li>Attention-seeking</li><li>Withdrawn</li><li>Overemotional</li>
    </ul>
    <h5>Get back on track:</h5>
    <ul>
      <li>Accept negative emotions</li><li>Learn to say no</li>
      <li>Set boundaries</li><li>Use your talents</li>
    </ul>
  </section>`,
  Orange: `<section class="feedback-section">
    <h4>Mover (Orange) Feedback</h4>
    <p>Your driving force is freedom… “Squeeze the juice” out of life.</p>
    <h5>At your best:</h5>
    <ul>
      <li>Active</li><li>Spontaneous</li><li>Risk-taker</li><li>Negotiator</li>
    </ul>
    <h5>When stressed:</h5>
    <ul>
      <li>Rule-breaker</li><li>Impulsive</li><li>Manipulative</li>
    </ul>
    <h5>Get back on track:</h5>
    <ul>
      <li>Go have fun</li><li>Build something</li><li>Move your body</li>
    </ul>
  </section>`,
  Gold: `<section class="feedback-section">
    <h4>Planner (Gold) Feedback</h4>
    <p>Your driving force is responsibility… “Good as gold.”</p>
    <h5>At your best:</h5>
    <ul>
      <li>Prepared</li><li>Reliable</li><li>Detail-oriented</li><li>Organized</li>
    </ul>
    <h5>When stressed:</h5>
    <ul>
      <li>Anxious</li><li>Rigid</li><li>Judgmental</li>
    </ul>
    <h5>Get back on track:</h5>
    <ul>
      <li>Validate yourself</li><li>Set realistic limits</li>
      <li>Bring closure</li><li>Lighten up</li>
    </ul>
  </section>`
};

// ————— Main setup —————
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wantEmail')
          .addEventListener('change', toggleEmailField);
  document.querySelector('.refetch-btn')
          .addEventListener('click', () => {
    document.getElementById('questions-container').innerHTML = '';
    renderQuestions();
    setupValidation();
  });
  renderQuestions();
  setupValidation();
});

function toggleEmailField() {
  const show = document.getElementById('wantEmail').checked;
  document.getElementById('email-label')
          .classList.toggle('hidden', !show);
  document.getElementById('email').required = show;
}

function renderQuestions() {
  const c = document.getElementById('questions-container');
  c.insertAdjacentHTML('beforeend', `
    <div class="instructions">
      <strong>Instructions:</strong>
      <ul>
        <li>Move each slider to indicate how much the statement describes you.</li>
        <li>far LEFT = “Not at all like me,” far RIGHT = “Totally like me.”</li>
        <li>Check “I am done…” for each question before submitting.</li>
      </ul>
    </div>
  `);

  QUESTIONS.forEach((q,i) => {
    const sec = document.createElement('section');
    sec.className = 'question';
    sec.innerHTML = `<h3>Question ${i+1}: ${q.text}</h3>`;
    q.options.forEach(opt => {
      const w = document.createElement('div');
      w.className = 'option-item';
      w.innerHTML = `
        <div class="option-content">
          <p class="option-label">${opt.description}</p>
          <input type="range" min="0" max="100" step="1" value="0"
                 data-color="${opt.color}">
          <small class="slider-instruction">
            (Further right = more like you)
          </small>
        </div>
      `;
      sec.appendChild(w);
    });
    sec.insertAdjacentHTML('beforeend', `
      <div class="done-group">
        <label>
          <input type="checkbox" class="done-chk">
          I am done ranking this question.
        </label>
      </div>
    `);
    c.appendChild(sec);
  });
}

function setupValidation() {
  const btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  document.querySelectorAll('.done-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      const all = [...document.querySelectorAll('.done-chk')]
        .every(c => c.checked);
      btn.disabled = !all;
    });
  });
}

document.getElementById('quiz-form')
        .addEventListener('submit', e => {
  e.preventDefault();
  showResults();
});

function showResults() {
  const name  = document.getElementById('name').value.trim();
  const want  = document.getElementById('wantEmail').checked;
  const email = document.getElementById('email').value.trim();
  const totals = {Green:0,Gold:0,Orange:0,Blue:0};

  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });

  const sorted = Object.entries(totals)
                       .sort((a,b) => b[1] - a[1]);
  const blend = sorted.map(([c])=>c).join(' > ');
  const top   = sorted[0][0];

  const rc = document.getElementById('result-container');
  rc.innerHTML = `
    <h2>Personality Quiz Results</h2>
    <p>Adapted by Laura Cooley — act with purpose, on purpose</p>
    <p>
      Based on
      <a href="https://www.amazon.com/Personality-Lingo-Transform-Relationships-Communication/dp/1502718383?tag=thezipsyndica-20"
         target="_blank">
        Personality Lingo® by Mary Miscisin
      </a>
    </p>
    <h3>Thanks, ${name}!</h3>
    <p>Ranked blend: <strong>${blend}</strong></p>
    <div class="bars"></div>
    <button id="print-btn">🖨 Print Results</button>
  `;
  const bars = rc.querySelector('.bars');
  const max  = sorted[0][1]||1;
  sorted.forEach(([c,v]) => {
    bars.insertAdjacentHTML('beforeend', `
      <div class="bar-wrap">
        <div class="bar-label">${c}</div>
        <div class="bar" style="width:${(v/max)*100}%; background:${c.toLowerCase()};"></div>
        <div class="bar-value">${v}</div>
      </div>
    `);
  });

  // top-style feedback
  rc.insertAdjacentHTML('beforeend', FEEDBACK[top]);

  // general communication
  rc.insertAdjacentHTML('beforeend', `
    <section class="feedback-section general">
      <h4>General Communication with All Styles</h4>
      <p>We all process input differently. To increase emotional intelligence and build stronger relationships, be aware of these styles:</p>
      <h5>Orange</h5><p>Tell it like it is… (spontaneous, direct)</p>
      <h5>Blue</h5><p>Warm up… (heart-focused, expressive)</p>
      <h5>Gold</h5><p>Step-by-step… (“should,” “must,” closure-oriented)</p>
      <h5>Green</h5><p>Straight to the facts… (logic over empathy)</p>
    </section>
  `);

  document.getElementById('quiz-form').style.display='none';
  rc.classList.remove('hidden');
  document.getElementById('print-btn')
          .addEventListener('click', ()=>window.print());

  if (want && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nYour results:\n\n`;
    sorted.forEach(([c,v])=>{
      const labels = {Blue:'Connector (Blue)',Green:'Thinker (Green)',
                      Gold:'Planner (Gold)',Orange:'Mover (Orange)'};
      body += `${labels[c]}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\nPowered by Laura Cooley\nlaura@withpurpose-onpurpose.com\nwww.withpurpose-onpurpose.com\nBased on Personality Lingo by Mary Miscisin\n`;
    window.location.href = `mailto:${email}?bcc=laura@withpurpose-onpurpose.com`
                           + `&subject=${subj}`
                           + `&body=${encodeURIComponent(body)}`;
  }
}
