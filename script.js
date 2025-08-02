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
  container.innerHTML = '';

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
        img.src = opt.imageUrl;
        img.alt = opt.answer;
        wrapper.appendChild(img);
      }

      const input = document.createElement('input');
      input.type = 'range';
      input.min = '0';
      input.max = '100';
      input.value = '0';
      input.dataset.color = opt.color;
      input.name = `question-${questionIndex}-answer-${i}`;
      wrapper.appendChild(input);

      const span = document.createElement('span');
      span.textContent = ' (Not at all like me)';
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
