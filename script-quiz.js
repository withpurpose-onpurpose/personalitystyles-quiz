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

const FEEDBACK = {
  Green: `
  <section class="feedback-section">
    <h4>Thinker (Green) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    When you’re in your element, your driving force is competence—you love diving into complexity, inventing new solutions, and mastering systems. In those moments, you are:</p>
    <ul>
      <li>A natural problem-solver</li>
      <li>Independent and self-directed</li>
      <li>Tenacious in pursuit of answers</li>
      <li>Self-assured in your expertise</li>
      <li>Witty, with a dry sense of humor</li>
      <li>Logical and analytical</li>
      <li>Creative and ingenious</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the keenest Thinker can get fatigued and slip into:</p>
    <ul>
      <li>Analysis paralysis</li>
      <li>Withdrawal and aloofness</li>
      <li>Sarcastic remarks</li>
      <li>Silent treatment</li>
      <li>Perfectionism tied to anxiety</li>
      <li>Harsh self-criticism</li>
    </ul>
    <p><strong>Get back on track</strong><br>
    Try:</p>
    <ul>
      <li>Balancing critiques with encouragement</li>
      <li>Honoring your need for independence</li>
      <li>Validating your curiosity—explore freely</li>
      <li>Checking in on your physical well-being</li>
      <li>Pausing to smile or breathe deeply</li>
      <li>Prioritizing progress over perfection</li>
      <li>Inviting yourself to make mistakes</li>
      <li>Reaching out to a trusted friend</li>
    </ul>
  </section>`,

  Blue: `
  <section class="feedback-section">
    <h4>Connector (Blue) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is relationship—you’re the “True Blue” trooper who naturally puts people first. Before any decision, you check how it will affect others. In those moments, you are:</p>
    <ul>
      <li>Friendly and welcoming</li>
      <li>Helpful and supportive</li>
      <li>Compassionate and considerate</li>
      <li>Cooperative and team-oriented</li>
      <li>Emotional and expressive</li>
      <li>Imaginative and creative</li>
      <li>Affectionate and warm</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the most generous Connector can slip into stress-mode and:</p>
    <ul>
      <li>Seek attention through drama</li>
      <li>Tell white lies to save face</li>
      <li>Pretend to agree rather than speak up</li>
      <li>Withdraw from priorities</li>
      <li>Daydream excessively</li>
      <li>Cry or appear depressed</li>
      <li>Use passive-resistance</li>
      <li>Express frustration loudly</li>
    </ul>
    <p><strong>Get back on track</strong><br>
    Try:</p>
    <ul>
      <li>Accepting negative emotions aren’t about you</li>
      <li>Practicing saying “no” and setting boundaries</li>
      <li>Stepping back to let others grow</li>
      <li>Recognizing struggle is part of growth</li>
      <li>Letting go of need for universal approval</li>
      <li>Validating your own feelings</li>
      <li>Pausing to think before you leap</li>
      <li>Taking deliberate self-care breaks</li>
    </ul>
  </section>`,

  Orange: `
  <section class="feedback-section">
    <h4>Mover (Orange) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is freedom—you “squeeze the juice” out of every moment. Rules feel like guidelines and you often carve your own path. In those moments, you are:</p>
    <ul>
      <li>Active and energized</li>
      <li>Instinctive take-charge personality</li>
      <li>Competitive and driven</li>
      <li>A skilled negotiator</li>
      <li>Spontaneous and adventurous</li>
      <li>A natural performer</li>
      <li>Expert at multi-tasking</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the boldest Mover can slip into stress-mode and:</p>
    <ul>
      <li>Act rude or defiant</li>
      <li>Break rules on purpose</li>
      <li>Fail to complete tasks</li>
      <li>Joke inappropriately</li>
      <li>Become overly controlling</li>
    </ul>
    <p><strong>Get back on track</strong><br>
    Try:</p>
    <ul>
      <li>Go have some fun—seek new experiences</li>
      <li>Channel energy into building something</li>
      <li>Move your body—prioritize physical self-care</li>
      <li>Connect with fellow Oranges</li>
      <li>Focus on completing one task</li>
      <li>Prioritize what truly matters</li>
      <li>Celebrate small wins</li>
      <li>Join games or competitions</li>
    </ul>
  </section>`,

  Gold: `
  <section class="feedback-section">
    <h4>Planner (Gold) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is responsibility—you regularly set the gold standard and strive to be “as good as gold.” Conscientious and dependable, you honor commitments and established standards.</p>
    <h5>Attributes When Shining</h5>
    <ul>
      <li>Prepared and proactive</li>
      <li>Reliable—others count on you</li>
      <li>Punctual—you respect people’s time</li>
      <li>Appropriate and structured</li>
      <li>Detail-oriented and organized</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the most organized Planner can slip into stress-mode and:</p>
    <ul>
      <li>Complain or act self-pitying</li>
      <li>Worry excessively</li>
      <li>Become rigid and closed-minded</li>
      <li>Exhibit harsh judgment</li>
    </ul>
    <p><strong>Get back on track</strong><br>
    Try:</p>
    <ul>
      <li>Validate your accomplishments</li>
      <li>Set realistic limits</li>
      <li>Create new, energizing routines</li>
      <li>Build in leeway—avoid over-scheduling</li>
      <li>Enjoy the process, not just the result</li>
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

    // 1) map for label names
    const labels = {
      Blue:   'Connector (Blue)',
      Green:  'Thinker (Green)',
      Gold:   'Planner (Gold)',
      Orange: 'Mover (Orange)'
    };

    // 2) plain-text feedback lookup
    const TEXT_FEEDBACK = {
      Green:
`Thinker (Green) Feedback:
Who you are at your best:
  • A natural problem-solver
  • Independent and self-directed
  • Tenacious in pursuit of answers
  • Self-assured in your expertise
  • Witty, with a dry sense of humor
  • Logical and analytical
  • Creative and ingenious

When you’re stressed or off-balance:
  • Analysis paralysis
  • Withdrawal and aloofness
  • Sarcastic remarks
  • Silent treatment
  • Perfectionism tied to anxiety
  • Harsh self-criticism

Get back on track:
  • Balance critiques with encouragement
  • Honor your need for independence
  • Validate your curiosity—explore freely
  • Check in on your physical well-being
  • Pause to smile or breathe deeply
  • Prioritize progress over perfection
  • Invite yourself to make mistakes
  • Reach out to a trusted friend`,
      Blue:
`Connector (Blue) Feedback:
Who you are at your best:
  • Friendly and welcoming
  • Helpful and supportive
  • Compassionate and considerate
  • Cooperative and team-oriented
  • Emotional and expressive
  • Imaginative and creative
  • Affectionate and warm

When you’re stressed or off-balance:
  • Seek attention through drama
  • Tell white lies to save face
  • Pretend to agree rather than speak up
  • Withdraw from priorities
  • Daydream excessively
  • Cry or appear depressed
  • Use passive-resistance
  • Express frustration loudly

Get back on track:
  • Accept that negative emotions aren’t about you
  • Practice saying “no” and setting boundaries
  • Step back to let others grow
  • Recognize struggle is part of growth
  • Let go of need for universal approval
  • Validate your own feelings
  • Pause to think before you leap
  • Take deliberate self-care breaks`,
      Orange:
`Mover (Orange) Feedback:
Who you are at your best:
  • Active and energized
  • Instinctive take-charge personality
  • Competitive and driven
  • A skilled negotiator
  • Spontaneous and adventurous
  • A natural performer
  • Expert at multi-tasking

When you’re stressed or off-balance:
  • Act rude or defiant
  • Break rules on purpose
  • Fail to complete tasks
  • Joke inappropriately
  • Become overly controlling

Get back on track:
  • Go have some fun—seek new experiences
  • Channel energy into building something
  • Move your body—prioritize physical self-care
  • Connect with fellow Oranges
  • Focus on completing one task
  • Prioritize what truly matters
  • Celebrate small wins
  • Join games or competitions`,
      Gold:
`Planner (Gold) Feedback:
Who you are at your best:
  • Prepared and proactive
  • Reliable—others count on you
  • Punctual—you respect people’s time
  • Appropriate and structured
  • Detail-oriented and organized

When you’re stressed or off-balance:
  • Complain or act self-pitying
  • Worry excessively
  • Become rigid and closed-minded
  • Exhibit harsh judgment

Get back on track:
  • Validate your accomplishments
  • Set realistic limits
  • Create new, energizing routines
  • Build in leeway—avoid over-scheduling
  • Enjoy the process, not just the result`
    };

    // 3) build your mail body
    let body = `Hi ${name},\n\nHere are your results:\n\n`;
    sorted.forEach(([c,v]) => {
      body += `${labels[c]}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\n`;

    // 4) append the text feedback for your top style
    body += `---\n${TEXT_FEEDBACK[top]}\n---\n\n`;

    // 5) signature
    body += `Powered by Laura Cooley\nlaura@withpurpose-onpurpose.com\nwww.withpurpose-onpurpose.com\nBased on Personality Lingo by Mary Miscisin\n`;

    // 6) fire the mailto
    window.location.href =
      `mailto:${email}` +
      `?bcc=laura@withpurpose-onpurpose.com` +
      `&subject=${subj}` +
      `&body=${encodeURIComponent(body)}`;
  }
}
