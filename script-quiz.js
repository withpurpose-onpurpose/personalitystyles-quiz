// script-quiz.js

// ————— Hard-coded questions —————
const QUESTIONS = [
  {
    id: 100,
    text: "What are you most likely to say?",
    options: [
      {
        id: "100.01",
        description: `The purpose of life
Is a life of purpose`,
        color: "Blue"
      },
      {
        id: "100.02",
        description: `“Two things in life are infinite: the universe and human stupidity; and I'm not sure about the universe.”
— Albert Einstein`,
        color: "Green"
      },
      {
        id: "100.03",
        description: `The problem with temptation
is that you may not get another chance.
— Laurence Peter`,
        color: "Orange"
      },
      {
        id: "100.04",
        description: `NOTICE!!! Lack of planning on your part does not constitute an emergency on my part`,
        color: "Gold"
      }
    ]
  },
  {
    id: 200,
    text: "The best description of me in childhood is:",
    options: [
      {
        id: "200.01",
        description: `Of all types of children, I had the most difficult time fitting into an academic routine.

I learned by doing and experiencing rather than by listening and reading.

I needed physical involvement in
the learning process and was motivated by my own natural competitive nature and sense of fun.`,
        color: "Orange"
      },
      {
        id: "200.02",
        description: `I appeared to be older than my years.

I was focused on my greatest interests, and achieved more in subjects that were mentally stimulating.

I was impatient with drill and routine.

I questioned authority, and found it necessary to respect teachers before I could learn from them.`,
        color: "Green"
      },
      {
        id: "200.03",
        description: `I was imaginative and creative.

I flourished with encouragement rather than competition, and wanted others to like me.

I reacted with great sensitivity to
discordance or rejection and sought recognition.

I responded best to my
teachers who were warm and friendly.`,
        color: "Blue"
      },
      {
        id: "200.04",
        description: `I wanted to follow the rules and regulations of the school.

I understood and respected authority and was comfortable with academic routine.

I was the easiest of all types of children to adapt to the educational
system.`,
        color: "Gold"
      }
    ]
  },
  {
    id: 300,
    text: "I am best described by:",
    options: [
      {
        id: "300.01",
        description: `I act on a moment’s notice
Witty | Charming | Spontaneous

I consider life as a game, here and now
Impulsive | Generous | Impactful

I need fun, variety, stimulation and excitement
Optimistic | Eager | Bold

I value skill, resourcefulness and courage
Physical | Immediate | Fraternal

I am a natural trouble-shooter, a performer and a competitor.`,
        color: "Orange"
      },
      {
        id: "300.02",
        description: `I seek knowledge and understanding
Analytical | Global | Conceptual

I live my life by my own standard
Cool | Calm | Collected

I need explanations and answers
Inventive | Logical | Perfectionistic

I value intelligence, insight fairness and justice
Abstract | Hypothetical | Investigative

I am a natural nonconformist, a visionary and a problem solver.`,
        color: "Green"
      },
      {
        id: "300.03",
        description: `I need to feel unique & authentic
Enthusiastic | Sympathetic | Personal

I look for meaning and significance in life
Warm | Communicative | Compassionate

I need to contribute, to encourage and to care
Idealistic | Spiritual | Sincere

I value integrity and unity in relationships
Peaceful | Flexible | Imaginative

I am a natural romantic, a poet and a nurturer.`,
        color: "Blue"
      },
      {
        id: "300.04",
        description: `I follow the rules and respect authority
Loyal | Dependable | Prepared

I have a strong sense of what is right and wrong in life
Thorough | Sensible | Punctual

I need to be useful and to belong
Faithful | Stable | Organized

I value home, family and tradition
Caring | Concerned | Concrete

I am a natural preserver, a good citizen and helpful.`,
        color: "Gold"
      }
    ]
  },
  {
    id: 400,
    text: "What brings me joy is:",
    options: [
      {
        id: "400.01",
        description: `Being the Best
Excitement
Physical movement
Performing
Taking Action
Taking Risks
Trouble-shooting
Freedom`,
        color: "Orange"
      },
      {
        id: "400.02",
        description: `Exploring new ideas
High achievement
Meeting Challenges
Seeking new knowledge
Solving problems
Doing what “can’t be done”
Creative freedom
Humor & irony`,
        color: "Green"
      },
      {
        id: "400.03",
        description: `Acceptance
Affection
Conversations
Family
Friendships
Groups
Love
Music`,
        color: "Blue"
      },
      {
        id: "400.04",
        description: `Time for family
Tradition
Doing the “right thing”
Acknowledgement
Belonging
Home
A sense of order
A task well done`,
        color: "Gold"
      }
    ]
  }
];

// ————— Main logic —————

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wantEmail')
          .addEventListener('change', toggleEmailField);
  document.querySelector('.refetch-btn')
          .addEventListener('click', () => {
             document.getElementById('questions-container').innerHTML = '';
             renderQuestions(); setupSubmitValidation();
          });
  renderQuestions();
  setupSubmitValidation();
});

function toggleEmailField() {
  const want = document.getElementById('wantEmail').checked;
  const label = document.getElementById('email-label');
  const input = document.getElementById('email');
  if (want) {
    label.classList.remove('hidden');
    input.required = true;
  } else {
    label.classList.add('hidden');
    input.required = false;
    input.value = '';
  }
}

function renderQuestions() {
  const c = document.getElementById('questions-container');
  c.insertAdjacentHTML('beforeend', `
    <div class="instructions">
      <strong>Instructions:</strong>
      <ul>
        <li>Move each slider to indicate how much the statement describes you.</li>
        <li>far LEFT of slider = "Not at all like me," far RIGHT = "Totally like me."</li>
        <li>Adjust every slider before submitting.</li>
      </ul>
    </div>
  `);

  QUESTIONS.forEach((q,i) => {
    const s = document.createElement('section');
    s.className = 'question';
    s.innerHTML = `<h3>Question ${i+1}: ${q.text}</h3>`;

    q.options.forEach(opt => {
      const w = document.createElement('div');
      w.className = 'option-item';
      // images disabled until path stable:
      // const img = document.createElement('img');
      // img.src = opt.imageUrl;
      // w.appendChild(img);

      const ct = document.createElement('div');
      ct.className = 'option-content';
      ct.innerHTML = `
        <p class="option-label">${opt.description}</p>
        <input type="range" min="0" max="100" step="1" value="0"
               data-color="${opt.color}">
        <small class="slider-instruction">
          (The further right you choose, the more like you it is)
        </small>
      `;
      w.appendChild(ct);
      s.appendChild(w);
    });

    s.insertAdjacentHTML('beforeend', `
      <div class="done-group">
        <label><input type="checkbox" class="done-chk">
          I am done ranking this question.</label>
      </div>
    `);

    c.appendChild(s);
  });
}

function setupSubmitValidation() {
  const btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  document.querySelectorAll('.done-chk').forEach(chk =>
    chk.addEventListener('change', () => {
      const all = Array.from(document.querySelectorAll('.done-chk'))
                       .every(c => c.checked);
      btn.disabled = !all;
    })
  );
}

document.getElementById('quiz-form')
        .addEventListener('submit', e => {
  e.preventDefault();
  collectAndShowResults();
});

function collectAndShowResults() {
  const name = document.getElementById('name').value.trim();
  const want = document.getElementById('wantEmail').checked;
  const email = document.getElementById('email').value.trim();

  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });

  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const blend  = sorted.map(([c])=>c).join(' > ');

  showResults(name, sorted, blend);

  if (want && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nYour results:\n\n`;
    sorted.forEach(([c,v]) => {
      const label = {
        Blue:   'Connector (Blue)',
        Green:  'Thinker (Green)',
        Gold:   'Planner (Gold)',
        Orange: 'Mover (Orange)'
      }[c];
      body += `${label}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\nPowered by Laura Cooley\nlaura@withpurpose-onpurpose.com\nwww.withpurpose-onpurpose.com\nBased on Personality Lingo by Mary Miscisin\n`;
    window.location.href =
      `mailto:${email}?bcc=laura@withpurpose-onpurpose.com` +
      `&subject=${subj}` +
      `&body=${encodeURIComponent(body)}`;
  }
}

function showResults(name, sorted, blend) {
  const rc = document.getElementById('result-container');
  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Ranked blend: <strong>${blend}</strong></p>
    <div class="bars"></div>
    <button id="print-btn">🖨 Print Results</button>
  `;
  const bars = rc.querySelector('.bars');
  const max  = sorted[0][1] || 1;
  sorted.forEach(([c,v]) => {
    const r = document.createElement('div');
    r.className = 'bar-wrap';
    r.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar" style="width:${(v/max)*100}%;background:${c.toLowerCase()};"></div>
      <div class="bar-value">${v}</div>
    `;
    bars.appendChild(r);
  });
  document.getElementById('quiz-form').style.display = 'none';
  rc.classList.remove('hidden');
  document.getElementById('print-btn')
          .addEventListener('click',()=>window.print());
}
