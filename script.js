const STORAGE_KEY = "personalityQuizQuestions";

document.addEventListener('DOMContentLoaded', () => {
  loadQuestionsFromLocal();
});

function loadQuestionsFromLocal() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const container = document.getElementById('questions-container');

  if (!stored) {
    container.innerHTML = '<p style="color:red;">No questions found. Please log in to the admin dashboard and enter quiz questions.</p>';
    return;
  }

  const grouped = JSON.parse(stored);
  renderQuiz(grouped);
}

function renderQuiz(grouped) {
  const container = document.getElementById('questions-container');
container.innerHTML = `
  <div style="background:#f0f0f0;padding:1rem;border-radius:8px;margin-bottom:2rem;">
    <strong>Instructions:</strong>
    <ul>
      <li>If only one answer is <em>ALL YOU</em>, pick <strong>4</strong> for that option and <strong>0</strong> for the rest.</li>
      <li>If you can’t decide between two, pick <strong>2</strong> for each, <strong>0</strong> for the others.</li>
      <li>If one is dominant, pick <strong>3</strong> and <strong>1</strong>, <strong>0</strong> for others.</li>
      <li>If they are all like you, pick <strong>1</strong> for each option.</li>
      <li><strong>Total must always add up to 4.</strong></li>
    </ul>
  </div>
`;

  let questionIndex = 0;

  for (const [questionKey, options] of Object.entries(grouped)) {
    const [topic, prompt] = questionKey.split('||');
    const section = document.createElement('div');
    section.className = 'question';

    const heading = document.createElement('h3');
    heading.textContent = `Question ${++questionIndex}: ${prompt}`;
    section.appendChild(heading);

    const sliders = [];
    const totalDisplay = document.createElement('div');
    totalDisplay.className = 'total';
    totalDisplay.textContent = 'Total: 0/100';
    section.appendChild(totalDisplay);

    options.forEach((opt, i) => {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '1rem';

      const label = document.createElement('label');
      label.textContent = `${opt.answer}: ${opt.description}`;
      wrapper.appendChild(label);

    if (opt.imageUrl) {
  const img = document.createElement('img');

  // Normalize the path to be relative to the current HTML file
  const relativePath = opt.imageUrl.replace(/^.*?assets\/uploads\//, 'assets/uploads/');
  img.src = relativePath;
  img.alt = opt.answer;
  wrapper.appendChild(img);
}


        const input = document.createElement('input');
        input.type = 'range';
        input.min = '0';
        input.max = '100';
        input.step = '25';
        input.value = '0';
      input.dataset.color = opt.color;
      input.name = `question-${questionIndex}-answer-${i}`;
      wrapper.appendChild(input);

      const span = document.createElement('span');
      span.textContent = ' (The further to the right you choose, the more like you this answer is)';
      wrapper.appendChild(span);

      sliders.push(input);
      section.appendChild(wrapper);
    });

    section.appendChild(totalDisplay);

    sliders.forEach(slider => {
      slider.addEventListener('input', () => {
        let sum = sliders.reduce((acc, el) => acc + Number(el.value), 0);
        totalDisplay.textContent = `Total: ${sum}/100`;
        if (sum !== 100) {
          totalDisplay.classList.add('warning');
        } else {
          totalDisplay.classList.remove('warning');
        }
      });
    });

    container.appendChild(section);
    container.appendChild(document.createElement('hr'));
  }
}
document.getElementById('quiz-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const company = formData.get('company');
  const jobTitle = formData.get('jobTitle');

  const colorScores = { Blue: 0, Orange: 0, Green: 0, Gold: 0 };

  const inputs = document.querySelectorAll('input[type="range"]');
  inputs.forEach(input => {
    const color = input.dataset.color;
    const value = parseInt(input.value, 10);
    if (color && colorScores.hasOwnProperty(color)) {
      colorScores[color] += value;
    }
  });

  // Sort colors by score descending
  const sortedColors = Object.entries(colorScores)
    .sort((a, b) => b[1] - a[1]);

  const rankedColors = sortedColors.map(c => c[0]); // Primary → Quadternary

  showResultReport(name, email, company, jobTitle, colorScores, rankedColors);
});
function showResultReport(name, email, company, jobTitle, colorScores, rankedColors) {
  const resultEl = document.getElementById('result-container');
  resultEl.style.display = 'block';

  let colorBars = '';
  for (const color in colorScores) {
    colorBars += `
      <div style="margin:0.5rem 0;">
        <div style="font-weight:bold;">${color}</div>
        <div style="height:20px;background:${color.toLowerCase()};width:${colorScores[color]}%;max-width:100%;"></div>
        <div>${colorScores[color]}%</div>
      </div>
    `;
  }

  const mailtoLink = `mailto:${email}?subject=Your Personality Quiz Results&body=Hi ${name},%0D%0A%0D%0AThanks for taking the quiz! Here are your results:%0D%0A${rankedColors.join(' > ')}%0D%0A%0D%0ARegards,%0D%0ALaura`;

  const notifyAdminLink = `mailto:laura@yourdomain.com?subject=New Quiz Submission&body=${name} (${email}) just completed the quiz.%0D%0ACompany: ${company}%0D%0AJob Title: ${jobTitle}%0D%0AResults: ${rankedColors.join(' > ')}`;

  resultEl.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p><strong>Your top style:</strong> ${rankedColors[0]}</p>
    <p><strong>Ranked blend:</strong> ${rankedColors.join(' > ')}</p>
    ${colorBars}
    <p><a href="${mailtoLink}" style="display:inline-block;margin:1rem 0;" target="_blank">📧 Email these results to yourself</a></p>
    <p><a href="${notifyAdminLink}" style="display:inline-block;margin:1rem 0;" target="_blank">🔔 Notify Admin</a></p>
  `;
}
