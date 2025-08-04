// script-quiz.js

const STORAGE_KEY = "personalityQuizQuestions";

// Your four style-specific feedback blocks:
const specificFeedback = {
  Green: `
    <section class="feedback-specific">
      <h3>Thinker (Green) Feedback</h3>
      <p>Your driving force is <strong>competency</strong>. Naturally curious, 
         you thirst for knowledge and invent solutions for a better future.</p>
      <h4>At your best, you are:</h4>
      <ul>
        <li>Problem-solvers</li>
        <li>Independent</li>
        <li>Tenacious</li>
        <li>Self-assured</li>
        <li>Witty</li>
        <li>Logical & analytical</li>
        <li>Creative & ingenious</li>
      </ul>
      <h4>You say things like:</h4>
      <ul>
        <li>“I am a designer and inventor.”</li>
        <li>“I contribute my best.”</li>
        <li>“I am an excellent analyst.”</li>
        <li>“I am principled.”</li>
        <li>“I enjoy complex systems.”</li>
        <li>“I value intelligence and competence.”</li>
        <li>“My mind works scientifically.”</li>
        <li>“I think abstractly.”</li>
      </ul>
      <h4>When you’re stressed:</h4>
      <ul>
        <li>Behave indecisively</li>
        <li>Refuse to comply or cooperate</li>
        <li>Withdraw, become aloof</li>
        <li>Use sarcasm or put-downs</li>
        <li>Silent treatment</li>
        <li>Perfection tied to anxiety</li>
        <li>Highly critical of self & others</li>
      </ul>
      <h4>Strategies to regain balance:</h4>
      <ul>
        <li>Balance your critiques</li>
        <li>Honor your independence</li>
        <li>Validate your curiosity</li>
        <li>Mind your physical health</li>
        <li>Smile & breathe</li>
        <li>Prioritize tasks</li>
        <li>Allow yourself mistakes</li>
        <li>Reach out for connection</li>
      </ul>
      <h4>Common communication mistakes:</h4>
      <ul>
        <li>Pointing out mistakes first</li>
        <li>“Data dumping” too much info</li>
        <li>Humor at others’ expense</li>
        <li>Unreasonable expectations</li>
        <li>Living in your head</li>
      </ul>
      <h4>Alignment with other systems:</h4>
      <ul>
        <li>Hippocrates: Choleric</li>
        <li>Jung: Thinking</li>
        <li>MBTI: ENTJ | INTJ | ENTP | INTP</li>
        <li>Keirsey: Promethean (NT)</li>
        <li>Lowry: Green</li>
        <li>DISC: Dominant (D)</li>
      </ul>
    </section>
  `,
  Blue: `
    <section class="feedback-specific">
      <h3>Connector (Blue) Feedback</h3>
      <p>Your driving force is <strong>relationship</strong>. You check feelings 
         before decisions and put others first.</p>
      <h4>At your best, you are:</h4>
      <ul>
        <li>Friendly</li>
        <li>Helpful & compassionate</li>
        <li>Cooperative</li>
        <li>Expressive</li>
        <li>Imaginative & creative</li>
        <li>Affectionate</li>
      </ul>
      <h4>You say things like:</h4>
      <ul>
        <li>“I value personal relationships.”</li>
        <li>“Harmony and cooperation matter most.”</li>
        <li>“I focus on people’s strengths.”</li>
        <li>“I’m a natural encourager.”</li>
      </ul>
      <h4>When you’re stressed:</h4>
      <ul>
        <li>Seek attention in disruptive ways</li>
        <li>Lies or inconsistency to save face</li>
        <li>Withdraw & lose track of priorities</li>
        <li>Daydream excessively</li>
        <li>Cry or seem depressed</li>
        <li>Yell or express anger dramatically</li>
      </ul>
      <h4>Strategies to regain balance:</h4>
      <ul>
        <li>Accept “negative” emotions</li>
        <li>Learn to say “no”</li>
        <li>Help in measured ways</li>
        <li>Recognize life’s struggles</li>
        <li>Validate yourself</li>
        <li>Set clear boundaries</li>
        <li>Use your natural optimism</li>
      </ul>
      <h4>Common communication pitfalls:</h4>
      <ul>
        <li>Over-emotional appeals</li>
        <li>Taking things personally</li>
        <li>Over-apologizing</li>
        <li>Beating around the bush</li>
      </ul>
      <h4>Alignment with other systems:</h4>
      <ul>
        <li>Hippocrates: Melancholic</li>
        <li>Jung: Feeling</li>
        <li>MBTI: ENFJ | INFJ | ENFP | INFP</li>
        <li>Keirsey: Apollonian (NF)</li>
        <li>Lowry: Blue</li>
        <li>DISC: Influence (I)</li>
      </ul>
    </section>
  `,
  Orange: `
    <section class="feedback-specific">
      <h3>Mover (Orange) Feedback</h3>
      <p>Your driving force is <strong>freedom</strong>. You “squeeze the juice” out 
         of every moment and thrive on action.</p>
      <h4>At your best, you are:</h4>
      <ul>
        <li>Active & energetic</li>
        <li>Take-charge and competitive</li>
        <li>Skilled negotiator</li>
        <li>Spontaneous & fun-loving</li>
        <li>Talented performer</li>
        <li>Excellent multi-tasker</li>
      </ul>
      <h4>You say things like:</h4>
      <ul>
        <li>“I thrive on action.”</li>
        <li>“I live in the here and now.”</li>
        <li>“I must have freedom.”</li>
        <li>“I welcome change.”</li>
      </ul>
      <h4>When you’re stressed:</h4>
      <ul>
        <li>Act defiantly or break rules</li>
        <li>Fail to finish what you start</li>
        <li>Use inappropriate humor</li>
        <li>Become manipulative</li>
      </ul>
      <h4>Strategies to regain balance:</h4>
      <ul>
        <li>Get hands-on: build or create</li>
        <li>Move your body</li>
        <li>Find other Movers</li>
        <li>Focus and complete one task</li>
        <li>Reward small wins</li>
      </ul>
      <h4>Common communication pitfalls:</h4>
      <ul>
        <li>Interrupting</li>
        <li>Ready, FIRE, Aim</li>
        <li>Bulldozing intensity</li>
      </ul>
      <h4>Alignment with other systems:</h4>
      <ul>
        <li>Hippocrates: Sanguine</li>
        <li>Jung: Intuition</li>
        <li>MBTI: ESFP | ISFP | ESTP | ISTP</li>
        <li>Keirsey: Dionysian (SP)</li>
        <li>Lowry: Orange</li>
        <li>DISC: Conscientiousness (C)</li>
      </ul>
    </section>
  `,
  Gold: `
    <section class="feedback-specific">
      <h3>Planner (Gold) Feedback</h3>
      <p>Your driving force is <strong>responsibility</strong>. You set the gold 
         standard and honor structure.</p>
      <h4>At your best, you are:</h4>
      <ul>
        <li>Prepared & reliable</li>
        <li>Punctual & appropriate</li>
        <li>Rule-following</li>
        <li>Detail-oriented</li>
        <li>Organized</li>
      </ul>
      <h4>You say things like:</h4>
      <ul>
        <li>“I highly regard family and home.”</li>
        <li>“I am accountable and thorough.”</li>
        <li>“I appreciate order.”</li>
      </ul>
      <h4>When you’re stressed:</h4>
      <ul>
        <li>Complain or self-pity</li>
        <li>Become anxious & rigid</li>
        <li>Judge harshly</li>
        <li>Display a “herd” mentality</li>
      </ul>
      <h4>Strategies to regain balance:</h4>
      <ul>
        <li>Validate your accomplishments</li>
        <li>Build new traditions</li>
        <li>Set realistic limits</li>
        <li>Allow “good enough”</li>
        <li>Enjoy the process</li>
      </ul>
      <h4>Common communication pitfalls:</h4>
      <ul>
        <li>Finger-wagging</li>
        <li>“Check-it-off” blinders</li>
        <li>Martyrdom & complaining</li>
      </ul>
      <h4>Alignment with other systems:</h4>
      <ul>
        <li>Hippocrates: Phlegmatic</li>
        <li>Jung: Sensation</li>
        <li>MBTI: ESTJ | ISTJ | ESFJ | ISFJ</li>
        <li>Keirsey: Epimethean (SJ)</li>
        <li>Lowry: Gold</li>
        <li>DISC: Steadiness (S)</li>
      </ul>
    </section>
  `
};

// The general communication overview we drafted:
const generalFeedback = `
  <section class="feedback-general">
    <h3>General Communication with All Styles</h3>
    <p>We each process and convey information in unique ways. By recognizing these differences, 
       you can boost your emotional intelligence, collaborate more effectively, and build trust.</p>

    <h4>Orange Communication</h4>
    <p>Movers “tell it like it is,” jumping right to the point with high energy and spontaneity. 
       They keep options open and often multitask, using physical emphasis (high-fives, playful pushes) for impact.</p>

    <h4>Blue Communication</h4>
    <p>Connectors warm up slowly, checking emotional impact first. They speak from the heart and look 
       for nuance—listening for what’s unsaid as much as what’s said.</p>

    <h4>Gold Communication</h4>
    <p>Planners outline step-by-step details, reference rules or past precedents, and seek clear “yes/no” closure. 
       They finish one topic before moving on and respect hierarchy.</p>

    <h4>Green Communication</h4>
    <p>Thinkers skip small talk, hunting facts and systems: who, what, where, when, how—and why. They 
       value logic, evidence, and “think time” before speaking.</p>
  </section>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.refetch-btn').addEventListener('click', refetchQuestions);
  document.getElementById('wantEmail').addEventListener('change', toggleEmailField);
  refetchQuestions();
});

function toggleEmailField() {
  const want = document.getElementById('wantEmail').checked;
  const grp   = document.getElementById('email-group');
  const email = document.getElementById('email');
  if (want) {
    grp.classList.remove('hidden');
    email.required = true;
  } else {
    grp.classList.add('hidden');
    email.required = false;
    email.value = '';
  }
}

function refetchQuestions() {
  const cont = document.getElementById('questions-container');
  cont.innerHTML = '';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cont.innerHTML = `<p class="error">
      No questions found. Please log in to the admin dashboard and enter quiz questions.
    </p>`;
    return;
  }
  const grouped = JSON.parse(stored);
  renderQuestions(grouped);
  setupSubmitValidation();
}

function renderQuestions(grouped) {
  const cont = document.getElementById('questions-container');
  let qIndex = 0;

  for (const [key, opts] of Object.entries(grouped)) {
    const [topic, prompt] = key.split('||');
    const sec = document.createElement('section');
    sec.className = 'question-block';
    sec.dataset.qKey = key;
    sec.innerHTML = `<h3 class="question-title">Question ${++qIndex}: ${prompt}</h3>`;

    opts.forEach(opt => {
      const item = document.createElement('div');
      item.className = 'option-item';

      // comment out image if none
      // if (opt.imageUrl) {
      //   const img = document.createElement('img');
      //   img.src = opt.imageUrl;
      //   img.alt = opt.answer;
      //   item.appendChild(img);
      // }

      const content = document.createElement('div');
      content.className = 'option-content';
      content.innerHTML = `
        <p class="option-label">${opt.answer}: ${opt.description}</p>
        <input type="range" min="0" max="4" step="1" value="0"
               data-color="${opt.color}" name="${key}--${opt.answer}">
        <small class="slider-instruction">
          (The further to the right, the more like you this answer is)
        </small>
      `;
      item.appendChild(content);
      sec.appendChild(item);
    });

    // done checkbox
    const done = document.createElement('div');
    done.className = 'done-group';
    done.innerHTML = `
      <label>
        <input type="checkbox" class="done-chk">
        I am done ranking my answers for this question.
      </label>
    `;
    sec.appendChild(done);
    cont.appendChild(sec);
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
  const form     = e.target;
  const name     = form.name.value.trim();
  const wantEmail= document.getElementById('wantEmail').checked;
  const email    = form.email.value.trim();

  // tally scores
  const totals = { Green:0, Gold:0, Orange:0, Blue:0 };
  document.querySelectorAll('input[type="range"]').forEach(r => {
    totals[r.dataset.color] += +r.value;
  });

  // sort descending
  const sorted = Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const top    = sorted[0][0];
  const blend  = sorted.map(([c])=>c).join(' > ');

  showResults(name, top, sorted, blend, wantEmail, email);
});

function showResults(name, top, sorted, blend, wantEmail, email) {
  const rc = document.getElementById('result-container');
  rc.innerHTML = `
    <h2>Personality Quiz Results</h2>
    <p>Adapted by Laura Cooley, act with purpose, on purpose</p>
    <p><em><a href="https://www.amazon.com/Personality-Lingo-Transform-Relationships-Communication/dp/1502718383?tag=thezipsyndica-20" target="_blank">
         Based on Personality Lingo® by Mary Miscisin</a></em></p>
    <h3>Thanks, ${name}!</h3>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${blend}</p>
    <div class="bars"></div>
  `;
  // draw bars
  const bars = rc.querySelector('.bars');
  const maxVal = sorted[0][1] || 1;
  sorted.forEach(([c,v])=>{
    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    wrap.innerHTML = `
      <div class="bar-label">${c}</div>
      <div class="bar" style="width:${(v/maxVal)*100}%; background:${c.toLowerCase()};"></div>
      <div class="bar-value">${v}</div>
    `;
    bars.appendChild(wrap);
  });

  // specific style feedback
  rc.insertAdjacentHTML('beforeend', specificFeedback[top] || '');
  // general communication overview
  rc.insertAdjacentHTML('beforeend', generalFeedback);

  rc.classList.remove('hidden');
  document.getElementById('quiz-form').classList.add('hidden');

  // email via mailto
  if (wantEmail && email) {
    const subj = encodeURIComponent('Your Personality Quiz Results');
    let body = `Hi ${name},\n\nHere are your results:\n\n`;
    sorted.forEach(([c,v])=>{
      body += `${c}: ${v}\n`;
    });
    body += `\nBlend: ${blend}\n\nPowered by Laura Cooley\nwww.withpurpose-onpurpose.com`;
    window.location.href = 
      `mailto:${email}?bcc=laura@withpurpose-onpurpose.com`
      + `&subject=${subj}`
      + `&body=${encodeURIComponent(body)}`;
  }
}
