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
    <p><strong>How you describe yourself</strong><br>
    You might catch yourself saying:</p>
    <ul>
      <li>“I am a designer and inventor.”</li>
      <li>“I shine when I contribute my best.”</li>
      <li>“I excel at analysis and abstract thinking.”</li>
      <li>“I value intelligence, rigor, and principle.”</li>
      <li>“I thrive on complex systems and ideas.”</li>
      <li>“My approach is scientific and objective.”</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the keenest Thinker can get fatigued and slip into:</p>
    <ul>
      <li>Indecision or “analysis paralysis”</li>
      <li>Withdrawal and silent aloofness</li>
      <li>Sarcastic or put-down remarks</li>
      <li>Refusal to communicate (the “silent treatment”)</li>
      <li>Perfectionism tied to performance anxiety</li>
      <li>Harsh self-criticism (and criticism of others)</li>
    </ul>
    <p><strong>Strategies to regain your best self</strong><br>
    When you notice you’ve drifted into stress mode, try:</p>
    <ul>
      <li>Balancing your critiques with encouragement</li>
      <li>Honoring your need for independence</li>
      <li>Validating your curiosity—allow yourself to explore</li>
      <li>Checking in on your physical well-being (move, stretch)</li>
      <li>Taking a pause to smile or breathe deeply</li>
      <li>Prioritizing tasks instead of perfection</li>
      <li>Inviting yourself to make (and learn from) mistakes</li>
      <li>Remembering you can only change yourself, not others</li>
      <li>Reaching out to a trusted friend or colleague for feedback</li>
    </ul>
    <p><strong>Common communication pitfalls</strong><br>
    You’re brilliant with data, but watch for these:</p>
    <ul>
      <li>Leading with criticism before rapport</li>
      <li>“Data dumping”—overwhelming others with facts</li>
      <li>Diving too deeply into technical minutiae</li>
      <li>Using humor at someone else’s expense</li>
      <li>Setting unrealistic expectations of others</li>
      <li>Getting stuck “in your head” and losing the personal angle</li>
    </ul>
    <p><strong>Likely alignment on other personality systems</strong><br>
    If you’re a Green Thinker, you often map to:</p>
    <ul>
      <li>Hippocrates: Choleric</li>
      <li>Jungian Type: Thinking (ENTJ | INTJ | ENTP | INTP)</li>
      <li>Myers-Briggs: ENTJ, INTJ, ENTP, or INTP</li>
      <li>Keirsey: Promethean (NT)</li>
      <li>Lowry: Green</li>
      <li>DISC: Dominant (D)</li>
    </ul>
  </section>`,

  Blue: `
  <section class="feedback-section">
    <h4>Connector (Blue) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is relationship—you’re the “True Blue” trooper who naturally puts people first. Before you make any decision, you check in on how it will affect those involved. In those moments, you are:</p>
    <ul>
      <li>Friendly and welcoming</li>
      <li>Helpful and supportive</li>
      <li>Compassionate and considerate</li>
      <li>Cooperative and team-oriented</li>
      <li>Emotional and expressive</li>
      <li>Imaginative and creative</li>
      <li>Affectionate and warm</li>
    </ul>
    <p><strong>How you describe yourself</strong><br>
    You might catch yourself saying:</p>
    <ul>
      <li>“I value personal relationships above all.”</li>
      <li>“I take a people-centered point of view.”</li>
      <li>“I seek harmony and cooperation.”</li>
      <li>“I intuitively focus on others’ strengths.”</li>
      <li>“I embrace democratic decision-making.”</li>
      <li>“I enjoy activating people’s potential.”</li>
      <li>“I’m an optimistic, enthusiastic spokesperson.”</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the most generous Connector can slip into stress-mode and:</p>
    <ul>
      <li>Misbehave to get attention</li>
      <li>Tell little white lies to save face</li>
      <li>Pretend to agree rather than speak up</li>
      <li>Withdraw and lose track of your own priorities</li>
      <li>Fantasize or daydream excessively</li>
      <li>Cry often or appear depressed</li>
      <li>Resort to passive-resistance (“silent treatment”)</li>
      <li>Express emotions by yelling or impatience</li>
    </ul>
    <p><strong>Strategies to regain your best self</strong><br>
    When you notice stress creeping in, try:</p>
    <ul>
      <li>Accepting that negative emotions aren’t about you</li>
      <li>Practicing saying “no” and setting healthy boundaries</li>
      <li>Focusing on growth in others—sometimes “helping” means stepping back</li>
      <li>Acknowledging that struggle is part of growth</li>
      <li>Letting go of the need for universal approval</li>
      <li>Validating your own feelings and contributions</li>
      <li>Honoring your unique talents and gifts</li>
      <li>Pausing to think before you leap</li>
      <li>Taking deliberate self-care breaks</li>
    </ul>
    <p><strong>Common communication pitfalls</strong><br>
    Watch out for these overused Connector habits:</p>
    <ul>
      <li>Relying too heavily on emotional appeals</li>
      <li>Mistaking intensity for anger or hostility</li>
      <li>Taking feedback too personally</li>
      <li>Over-apologizing</li>
      <li>Beating around the bush instead of stating needs</li>
    </ul>
    <p><strong>Likely alignment on other personality systems</strong><br>
    As a Blue Connector, you often map to:</p>
    <ul>
      <li>Hippocrates: Melancholic</li>
      <li>Jungian Type: Feeling preference</li>
      <li>Myers-Briggs: ENFJ | INFJ | ENFP | INFP</li>
      <li>Keirsey: Apollonian (NF)</li>
      <li>Lowry: Blue</li>
      <li>DISC: Influence (I)</li>
    </ul>
  </section>`,

  Orange: `
  <section class="feedback-section">
    <h4>Mover (Orange) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is freedom—you “squeeze the juice” out of every moment. Rules are merely guidelines and you often carve out your own path. In those moments, you are:</p>
    <ul>
      <li>Active and energized</li>
      <li>Take-charge instinctively</li>
      <li>Competitive and driven</li>
      <li>Skilled negotiator</li>
      <li>Spontaneous in your choices</li>
      <li>A natural performer—you love entertaining</li>
      <li>Expert at multi-tasking</li>
    </ul>
    <p><strong>How you describe yourself</strong><br>
    You might catch yourself saying:</p>
    <ul>
      <li>“I thrive on action.”</li>
      <li>“I live in the here and now.”</li>
      <li>“I must have the freedom to act.”</li>
      <li>“I welcome change and take risks.”</li>
      <li>“I crave variety.”</li>
      <li>“I seek fun and peak performance.”</li>
      <li>“I solve concrete problems quickly.”</li>
      <li>“I’m a flexible, practical diplomat.”</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the boldest Mover can slip into stress-mode and:</p>
    <ul>
      <li>Act rude or defiant</li>
      <li>Break rules on purpose</li>
      <li>Fail to finish tasks—run away or quit</li>
      <li>Joke or tease inappropriately</li>
      <li>Become overly compulsive or manipulative</li>
    </ul>
    <p><strong>Strategies to regain your best self</strong><br>
    When you notice stress creeping in, try:</p>
    <ul>
      <li>Go have some fun—seek new experiences outside work</li>
      <li>Get hands on—create or build something to channel energy</li>
      <li>Move your body—prioritize physical activity and self-care</li>
      <li>Find fellow Oranges—they’ll appreciate your candor and energy</li>
      <li>Focus on one task—complete it before moving on</li>
      <li>Prioritize what’s truly important</li>
      <li>Make an impression—use your flair for innovation to inspire others</li>
      <li>Reward yourself—celebrate small wins before chasing the next big goal</li>
      <li>Compete—join games or challenges to satisfy your drive</li>
    </ul>
    <p><strong>Common communication pitfalls</strong><br>
    Watch out for these overused Mover habits:</p>
    <ul>
      <li>Multi-tasking at the expense of depth</li>
      <li>Coming across as self-centered</li>
      <li>Bulldozing intensity that overwhelms others</li>
      <li>“Ready, FIRE, Aim”—acting before planning</li>
      <li>Interrupting others</li>
    </ul>
    <p><strong>Likely alignment on other personality systems</strong><br>
    As an Orange Mover, you often map to:</p>
    <ul>
      <li>Hippocrates: Sanguine</li>
      <li>Jungian Type: Intuition preference</li>
      <li>Myers-Briggs: ESFP | ISFP | ESTP | ISTP</li>
      <li>Keirsey: Dionysian (SP)</li>
      <li>Lowry: Orange</li>
      <li>DISC: Conscientiousness (C)</li>
    </ul>
  </section>`,

  Gold: `
  <section class="feedback-section">
    <h4>Planner (Gold) Feedback</h4>
    <p><strong>Who you are at your best</strong><br>
    Your driving force is responsibility—you regularly “set the gold standard” and strive to be “as good as gold.” Conscientious and dependable, you want to do the right thing by following established standards and honoring your commitments.</p>
    <h5>Attributes When Shining</h5>
    <ul>
      <li>Prepared and proactive</li>
      <li>Reliable—others count on you</li>
      <li>Punctual—you respect people’s time</li>
      <li>Appropriate in every setting</li>
      <li>Rule-following—you honor structure</li>
      <li>Detail-oriented—you catch the small stuff</li>
      <li>Organized—you bring order to chaos</li>
    </ul>
    <p><strong>How you describe yourself</strong><br>
    You might catch yourself saying:</p>
    <ul>
      <li>“I am conventional and steady.”</li>
      <li>“Family and home are my top priorities.”</li>
      <li>“I am accountable, thorough, and precise.”</li>
      <li>“I value belonging and loyalty.”</li>
      <li>“I have a sense of social responsibility.”</li>
      <li>“I reward dedication and consistency.”</li>
      <li>“I appreciate order and punctuality.”</li>
    </ul>
    <p><strong>When you’re stressed or off-balance</strong><br>
    Even the most organized Planner can slip into stress-mode and:</p>
    <ul>
      <li>Complain or act self-pitying</li>
      <li>Worry excessively and exhibit anxiety</li>
      <li>React physically to pressure (tension, headaches)</li>
      <li>Judge yourself and others too harshly</li>
      <li>Slip into “blind herd” mentality, following without question</li>
      <li>Become overly controlling, rigid, or closed-minded</li>
      <li>Display a negative attitude toward new ideas</li>
    </ul>
    <p><strong>Strategies to regain your best self</strong><br>
    When you feel stress mounting, try:</p>
    <ul>
      <li>Validate yourself—acknowledge all you’ve accomplished</li>
      <li>Find community—get involved in groups where you belong</li>
      <li>Care for yourself—make “me time” a priority</li>
      <li>Set realistic limits—recognize when “good enough” is enough</li>
      <li>Focus on controllables—let go of what’s outside your influence</li>
      <li>Create new traditions—update routines that feel draining</li>
      <li>Give yourself a break—stop driving others as hard as you drive yourself</li>
      <li>Close past loops—resolve lingering issues so you can move on</li>
      <li>Build in leeway—avoid over-scheduling every minute</li>
      <li>Lighten up—enjoy the process, not just the end result</li>
    </ul>
    <p><strong>Common communication pitfalls</strong><br>
    Watch out for these overused Planner habits:</p>
    <ul>
      <li>Being closed-minded to change</li>
      <li>Wagging your finger instead of guiding</li>
      <li>Wearing “check-it-off” blinders, missing the big picture</li>
      <li>Getting stuck on specifics and losing flexibility</li>
      <li>Falling into martyrdom and complaining—“no one else does it right”</li>
    </ul>
    <p><strong>Likely alignment on other personality systems</strong><br>
    As a Gold Planner, you often map to:</p>
    <ul>
      <li>Hippocrates: Phlegmatic</li>
      <li>Jungian Type: Sensation preference</li>
      <li>Myers-Briggs: ESTJ | ISTJ | ESFJ | ISFJ</li>
      <li>Keirsey: Epimethean (SJ)</li>
      <li>Lowry: Gold</li>
      <li>DISC: Steadiness (S)</li>
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
