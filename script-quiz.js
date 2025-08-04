// script-quiz.js

// ————— Hard-coded quiz questions —————
const QUESTIONS = [
  // … your existing QUESTIONS array here …
];

// ————— Feedback blocks for each style —————
const FEEDBACK_MAP = {
  Green: `
    <section class="feedback-section">
      <h4>Thinker (Green) Feedback</h4>
      <p>The driving force for Greens is competency. Naturally curious, you thirst for knowledge and information and like to come up with solutions and systems for solving problems and inventing a better future. Preferring to keep your emotions to yourself, you approach situations objectively. Remember “Keen Green.”</p>
      <h5>When you’re at your best, you are:</h5>
      <ul>
        <li>Problem-solvers</li>
        <li>Independent</li>
        <li>Tenacious</li>
        <li>Self-assured</li>
        <li>Witty sense of humor</li>
        <li>Logical, Analytical</li>
        <li>Creative, Ingenious</li>
      </ul>
      <h5>You may see yourself as:</h5>
      <ul>
        <li>I am a designer and inventor</li>
        <li>I contribute my best</li>
        <li>I am an excellent analyst</li>
        <li>I am principled</li>
        <li>I enjoy complex systems</li>
        <li>I value intelligence and competence</li>
        <li>My attitudes are scientific</li>
        <li>I think abstractly</li>
      </ul>
      <h5>When you’re tired or stressed, you may find yourself:</h5>
      <ul>
        <li>Behaving indecisively</li>
        <li>Refusing to comply or cooperate</li>
        <li>Withdrawing, aloofness</li>
        <li>Put-downs, sarcastic remarks</li>
        <li>Refusing to communicate (silent treatment)</li>
        <li>Perfection tied to performance anxiety</li>
        <li>Highly critical of self and others</li>
      </ul>
      <h5>Strategies to get back on track:</h5>
      <ul>
        <li>Balance your critiques</li>
        <li>Honor your independence</li>
        <li>Validate your interests – allow yourself to explore</li>
        <li>Pay attention to your physical well-being</li>
        <li>Smile</li>
        <li>Prioritize</li>
        <li>Invite yourself to make mistakes</li>
        <li>Recognize you can only change yourself</li>
        <li>Reach out to others</li>
      </ul>
      <h5>Common Communication Mistakes:</h5>
      <ul>
        <li>Pointing out mistakes first</li>
        <li>Data dumping</li>
        <li>Data diving</li>
        <li>Humor at others’ expense</li>
        <li>Unreasonable expectations</li>
        <li>Living in your head</li>
      </ul>
      <h5>Alignment with other systems:</h5>
      <ul>
        <li>Hippocrates – CHOLERIC</li>
        <li>Carl Jung – THINKING</li>
        <li>Myers-Briggs – ENTJ | INTJ | ENTP | INTP</li>
        <li>Keirsey – PROMETHEAN (NT)</li>
        <li>Lowry – Green</li>
        <li>DISC – Dominant (D)</li>
      </ul>
    </section>
  `,
  Blue: `
    <section class="feedback-section">
      <h4>Connector (Blue) Feedback</h4>
      <p>Blues are “True Blue troopers”; your driving force is relationship. Before you decide, you check how it will affect everyone involved, often putting others’ needs ahead of your own.</p>
      <h5>When you’re at your best, you are:</h5>
      <ul>
        <li>Friendly</li>
        <li>Helpful</li>
        <li>Compassionate, considerate</li>
        <li>Cooperative</li>
        <li>Emotional, expressive</li>
        <li>Imaginative, creative</li>
        <li>Affectionate</li>
      </ul>
      <h5>You might catch yourself saying:</h5>
      <ul>
        <li>I value personal relationships</li>
        <li>I have a people-centered point of view</li>
        <li>I value harmony and cooperation</li>
        <li>I intuitively focus on personal strengths</li>
        <li>I am naturally democratic</li>
        <li>I enjoy activating people’s potential</li>
        <li>I am an optimistic, dramatic spokesperson</li>
      </ul>
      <h5>When stressed or off-balance, you may:</h5>
      <ul>
        <li>Misbehave to get attention</li>
        <li>Lie to save face</li>
        <li>Pretend to agree</li>
        <li>Withdraw, lose track of priorities</li>
        <li>Daydream excessively</li>
        <li>Cry often, appear depressed</li>
        <li>Become passive-resistant</li>
        <li>Yell or scream</li>
      </ul>
      <h5>Strategies to regain balance:</h5>
      <ul>
        <li>Accept “negative” emotions</li>
        <li>Learn to say “no”</li>
        <li>Do less “helping”</li>
        <li>Recognize life’s struggles</li>
        <li>Let it go – most people like you!</li>
        <li>Validate yourself</li>
        <li>Use your talents</li>
        <li>Set boundaries</li>
        <li>Look before leaping</li>
        <li>Take care of yourself</li>
        <li>Express your unique self</li>
      </ul>
      <h5>Common Communication Pitfalls:</h5>
      <ul>
        <li>Using emotional appeals</li>
        <li>Mistaking intensity for anger</li>
        <li>Taking things personally</li>
        <li>Over-apologizing</li>
        <li>Beating around the bush</li>
      </ul>
      <h5>Alignment with other systems:</h5>
      <ul>
        <li>Hippocrates – MELANCHOLIC</li>
        <li>Carl Jung – FEELING</li>
        <li>Myers-Briggs – ENFJ | INFJ | ENFP | INFP</li>
        <li>Keirsey – APOLLONIAN (NF)</li>
        <li>Lowry – Blue</li>
        <li>DISC – Influence (I)</li>
      </ul>
    </section>
  `,
  Orange: `
    <section class="feedback-section">
      <h4>Mover (Orange) Feedback</h4>
      <p>Oranges “squeeze the juice” out of life; your driving force is freedom. If you lack choices you’ll create them. Rules are just guidelines, and risk-taking is natural.</p>
      <h5>When you’re at your best, you are:</h5>
      <ul>
        <li>Active</li>
        <li>Take-Charge</li>
        <li>Competitive</li>
        <li>Negotiator</li>
        <li>Spontaneous</li>
        <li>Performer</li>
        <li>Multi-tasker</li>
      </ul>
      <h5>You might catch yourself saying:</h5>
      <ul>
        <li>I thrive on action</li>
        <li>I live in the here and now</li>
        <li>I must have freedom to act</li>
        <li>I welcome change and risks</li>
        <li>I like variety</li>
        <li>I seek fun and performance</li>
        <li>I deal quickly with concrete problems</li>
        <li>I am a flexible, practical diplomat</li>
      </ul>
      <h5>When stressed, you may:</h5>
      <ul>
        <li>Act rude or defiant</li>
        <li>Break rules on purpose</li>
        <li>Quit halfway</li>
        <li>Joke inappropriately</li>
        <li>Become compulsive, manipulative</li>
      </ul>
      <h5>Strategies to regain balance:</h5>
      <ul>
        <li>Go have some fun</li>
        <li>Get hands on – build something</li>
        <li>Move your body</li>
        <li>Find fellow Oranges</li>
        <li>Focus on one thing at a time</li>
        <li>Prioritize</li>
        <li>Make an impression</li>
        <li>Reward yourself</li>
        <li>Compete</li>
      </ul>
      <h5>Common Pitfalls:</h5>
      <ul>
        <li>Multi-tasking</li>
        <li>Self-centeredness</li>
        <li>Bulldozing intensity</li>
        <li>Interrupting</li>
        <li>“Ready, FIRE, aim”</li>
      </ul>
      <h5>Alignment with other systems:</h5>
      <ul>
        <li>Hippocrates – SANGUINE</li>
        <li>Carl Jung – INTUITION</li>
        <li>Myers-Briggs – ESFP | ISFP | ESTP | ISTP</li>
        <li>Keirsey – DIONYSIAN (SP)</li>
        <li>Lowry – Orange</li>
        <li>DISC – Conscientiousness (C)</li>
      </ul>
    </section>
  `,
  Gold: `
    <section class="feedback-section">
      <h4>Planner (Gold) Feedback</h4>
      <p>Golds “set the gold standard”; your driving force is responsibility. Conscientious and dependable, you follow established standards and aim to do the right thing.</p>
      <h5>When shining, you are:</h5>
      <ul>
        <li>Prepared</li>
        <li>Reliable</li>
        <li>On-time</li>
        <li>Appropriate</li>
        <li>Rule-follower</li>
        <li>Detail-oriented</li>
        <li>Organized</li>
      </ul>
      <h5>You might say:</h5>
      <ul>
        <li>I am conventional</li>
        <li>I highly regard family and home</li>
        <li>I am accountable and thorough</li>
        <li>I like to belong</li>
        <li>I have social responsibility</li>
        <li>I appreciate order and punctuality</li>
      </ul>
      <h5>When stressed, you may:</h5>
      <ul>
        <li>Complain with self-pity</li>
        <li>Exhibit anxiety and worry</li>
        <li>Judge yourself and others harshly</li>
        <li>Become controlling and rigid</li>
        <li>Display negativity</li>
      </ul>
      <h5>Strategies to regain balance:</h5>
      <ul>
        <li>Validate yourself</li>
        <li>Get involved – find your place</li>
        <li>Set realistic limits</li>
        <li>Focus on what you can control</li>
        <li>Start new traditions</li>
        <li>Give yourself a break</li>
        <li>Bring closure to past issues</li>
        <li>Leave leeway in schedules</li>
        <li>Lighten up and enjoy the process</li>
      </ul>
      <h5>Common Pitfalls:</h5>
      <ul>
        <li>Closed-mindedness</li>
        <li>“Should” and “must” overuse</li>
        <li>Martyrdom and complaining</li>
        <li>Stuck on specifics</li>
      </ul>
      <h5>Alignment with other systems:</h5>
      <ul>
        <li>Hippocrates – PHLEGMATIC</li>
        <li>Carl Jung – SENSATION</li>
        <li>Myers-Briggs – ESTJ | ISTJ | ESFJ | ISFJ</li>
        <li>Keirsey – EPIMETHEAN (SJ)</li>
        <li>Lowry – Gold</li>
        <li>DISC – Steadiness (S)</li>
      </ul>
    </section>
  `
};

// ————— DOM Ready & Quiz Setup —————
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wantEmail')
          .addEventListener('change', toggleEmailField);
  document.querySelector('.refetch-btn')
          .addEventListener('click', () => {
            document.getElementById('questions-container').innerHTML = '';
            renderQuestions();
            setupSubmitValidation();
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
  document.querySelectorAll('.done-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      const all = Array.from(document.querySelectorAll('.done-chk'))
                       .every(c => c.checked);
      btn.disabled = !all;
    });
  });
}

document.getElementById('quiz-form')
        .addEventListener('submit', e => {
  e.preventDefault();
  collectAndShowResults();
});

function collectAndShowResults() {
  const name  = document.getElementById('name').value.trim();
  const want  = document.getElementById('wantEmail').checked;
  const email = document.getElementById('email').value.trim();
  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });
  const sorted = Object.entries(totals)
                       .sort((a,b) => b[1] - a[1]);
  const blend  = sorted.map(([c]) => c).join(' > ');
  showResults(name, sorted, blend);
  if (want && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nYour results:\n\n`;
    sorted.forEach(([c,v]) => {
      const labelMap = {
        Blue:   'Connector (Blue)',
        Green:  'Thinker (Green)',
        Gold:   'Planner (Gold)',
        Orange: 'Mover (Orange)'
      };
      body += `${labelMap[c]}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\nPowered by Laura Cooley\nlaura@withpurpose-onpurpose.com\nwww.withpurpose-onpurpose.com\nBased on Personality Lingo by Mary Miscisin\n`;
    window.location.href = 
      `mailto:${email}` +
      `?bcc=laura@withpurpose-onpurpose.com` +
      `&subject=${subj}` +
      `&body=${encodeURIComponent(body)}`;
  }
}

function showResults(name, sorted, blend) {
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
  const max  = sorted[0][1] || 1;
  sorted.forEach(([c,v]) => {
    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    wrap.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar" style="width:${(v/max)*100}%;background:${c.toLowerCase()};"></div>
      <div class="bar-value">${v}</div>
    `;
    bars.appendChild(wrap);
  });

  // insert color-specific feedback
  const topStyle = sorted[0][0];
  rc.insertAdjacentHTML('beforeend', FEEDBACK_MAP[topStyle] || '');

  // insert general communication section
  rc.insertAdjacentHTML('beforeend', `
    <section class="feedback-section general">
      <h4>General Communication with All Styles</h4>
      <p>We all process and perceive input differently. To increase emotional intelligence and build stronger relationships, it helps to recognize these varied communication styles:</p>
      <h5>Orange Communication</h5>
      <p>Oranges tell it like it is… (spontaneous, forceful, “tell the point” style.)</p>
      <h5>Blue Communication</h5>
      <p>Blues warm up to the topic… (heart-focused, expressive, nuance-driven.)</p>
      <h5>Gold Communication</h5>
      <p>Golds go step-by-step… (“should,” “must,” closure-oriented.)</p>
      <h5>Green Communication</h5>
      <p>Greens skip small talk… (facts first, logic over empathy, “big why?”)</p>
    </section>
  `);

  // hide form, show results & wire print
  document.getElementById('quiz-form').style.display = 'none';
  rc.classList.remove('hidden');
  document.getElementById('print-btn')
          .addEventListener('click', () => window.print());
}
