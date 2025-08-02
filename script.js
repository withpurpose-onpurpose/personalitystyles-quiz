const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQApNytYtR7M4-LZGhf1WTXcJxzqxSZRcW_vROMD_Lwfn9Vv89gWsenchhW0zCHGxE_cnNBtnuhyIDA/pub?gid=722482684&single=true&output=csv";
 // this is the publish link just to the question tab

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch(SHEET_URL);
  const tsvText = await response.text();
  const rows = tsvText.trim().split('\n').map(line => line.split('\t'));

  const headers = rows[0];
  const dataRows = rows.slice(1).filter(row => row[6] === 'Ask'); // G = 6

  const grouped = {};

  dataRows.forEach(row => {
    const key = `${row[0]}||${row[1]}`; // A + B = unique question key
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({
      answer: row[2],        // C
      description: row[3],   // D
      imageUrl: convertDriveLink(row[4]), // E
      color: row[5]          // F
    });
  });

  const container = document.getElementById('questions-container');
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
});

function convertDriveLink(url) {
  if (!url || !url.includes('drive.google.com')) return '';
  const match = url.match(/\/d\/([^\/]+)\//);
  return match ? `https://drive.google.com/uc?id=${match[1]}` : '';
}
