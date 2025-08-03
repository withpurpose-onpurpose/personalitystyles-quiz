// script-quiz.js

const STORAGE_KEY = "personalityQuizQuestions";

document.addEventListener("DOMContentLoaded", () => {
  // wire up email opt-in show/hide + required toggle
  const wantEmail = document.getElementById("wantEmail");
  const emailField = document.getElementById("emailField");
  wantEmail.addEventListener("change", () => {
    if (wantEmail.checked) {
      emailField.style.display = "block";
      emailField.querySelector("input").required = true;
    } else {
      emailField.style.display = "none";
      emailField.querySelector("input").required = false;
    }
  });

  // load questions
  refetchQuestions();
});

function refetchQuestions() {
  const container = document.getElementById("questions-container");
  container.innerHTML = "";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    container.innerHTML = `<p class="error">No questions found. Please log in to the admin dashboard and enter quiz questions.</p>`;
    return;
  }

  const grouped = JSON.parse(stored);
  renderQuestions(grouped);
  setupSubmitValidation();
}

function renderQuestions(grouped) {
  const container = document.getElementById("questions-container");
  let qIndex = 0;

  for (const [key, options] of Object.entries(grouped)) {
    const [topic, prompt] = key.split("||");
    const section = document.createElement("section");
    section.className = "question";
    section.dataset.qKey = key;

    // header
    const h3 = document.createElement("h3");
    h3.textContent = `Question ${++qIndex}: ${prompt}`;
    section.appendChild(h3);

    // each option
    options.forEach((opt, i) => {
      const flex = document.createElement("div");
      flex.className = "option-item";

      // image
      if (opt.imageUrl) {
        const img = document.createElement("img");
        img.src = opt.imageUrl;
        img.alt = opt.answer;
        flex.appendChild(img);
      }

      // content beside image
      const content = document.createElement("div");
      content.className = "option-content";

      // answer text
      const p = document.createElement("p");
      p.className = "option-label";
      p.textContent = `${opt.answer}: ${opt.description}`;
      content.appendChild(p);

      // slider 0–4
      const input = document.createElement("input");
      input.type = "range";
      input.min = "0";
      input.max = "4";
      input.step = "1";
      input.value = "0";
      input.dataset.color = opt.color;
      input.name = `${key}--${opt.answer}`;
      content.appendChild(input);

      // instruction below
      const small = document.createElement("small");
      small.className = "slider-instruction";
      small.textContent = "(The further to the right you choose, the more like you this answer is)";
      content.appendChild(small);

      flex.appendChild(content);
      section.appendChild(flex);
    });

    // “Done ranking” checkbox
    const doneDiv = document.createElement("div");
    doneDiv.className = "done-group";
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = `done-${qIndex}`;
    const lbl = document.createElement("label");
    lbl.htmlFor = chk.id;
    lbl.textContent = " I am done ranking my answers for this question.";
    doneDiv.appendChild(chk);
    doneDiv.appendChild(lbl);
    section.appendChild(doneDiv);

    container.appendChild(section);
  }
}

function setupSubmitValidation() {
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.disabled = true;

  const checks = document.querySelectorAll(".done-group input[type='checkbox']");
  checks.forEach(chk => {
    chk.addEventListener("change", () => {
      const allDone = Array.from(checks).every(c => c.checked);
      submitBtn.disabled = !allDone;
    });
  });
}

// form submission
document.getElementById("quiz-form").addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const wantEmail = document.getElementById("wantEmail").checked;
  const email = form.email.value;
  const company = form.company.value;
  const jobTitle = form.jobTitle.value;

  // tally by color
  const totals = { Green: 0, Gold: 0, Orange: 0, Blue: 0 };
  document.querySelectorAll("input[type='range']").forEach(r => {
    const val = parseInt(r.value);
    const col = r.dataset.color;
    if (totals[col] !== undefined) totals[col] += val;
  });

  // sort descending
  const sorted = Object.entries(totals).sort((a,b) => b[1] - a[1]);
  const blendOrder = sorted.map(([c]) => c).join(" > ");
  const top = sorted[0][0];

  showResults(name, top, blendOrder, sorted, wantEmail, email, company, jobTitle);
});

function showResults(name, top, blendOrder, sorted, wantEmail, email, company, jobTitle) {
  const rc = document.getElementById("result-container");
  rc.innerHTML = `
    <h2>Thanks, ${name}!</h2>
    <p>Your top style: <strong>${top}</strong></p>
    <p>Ranked blend: ${blendOrder}</p>
    <div class="bars"></div>
  `;
  rc.style.display = "block";
  document.getElementById("quiz-form").style.display = "none";

  // draw bars
  const bars = rc.querySelector(".bars");
  const max = sorted[0][1] || 1;
  sorted.forEach(([c, v]) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    const label = document.createElement("div");
    label.textContent = c;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = `${(v / max) * 100}%`;
    bar.style.backgroundColor = c.toLowerCase();
    const span = document.createElement("span");
    span.textContent = v;
    wrap.appendChild(label);
    wrap.appendChild(bar);
    wrap.appendChild(span);
    bars.appendChild(wrap);
  });

  // mailto:
  if (wantEmail && email) {
    const subj = encodeURIComponent("Your Personality Quiz Results");
    let body = `Hi ${name},\n\nHere are your results:\n\n`;
    sorted.forEach(([c,v]) => body += `${c}: ${v}\n`);
    body += `\nBlend order: ${blendOrder}\n\nRegards,\nLaura Cooley`;
    const mailto = `mailto:${email}?bcc=laura@withpurpose-onpurpose.com&subject=${subj}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}
