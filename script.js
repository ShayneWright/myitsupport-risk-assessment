const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvajkka";

const defaultSummaries = {
  low: "Your answers suggest your business has a stronger-than-average IT foundation. There may still be areas to review, but your business appears to have several important protections and planning habits in place.",
  moderate: "Your answers suggest your business has some useful protections in place, but there are gaps that could create risk, unexpected costs, or business disruption.",
  high: "Your answers suggest your business may be exposed to serious IT, security, or continuity risks. These gaps could lead to downtime, data loss, financial impact, or expensive emergency fixes."
};

const questions = [
  {
    text: "If your business was hit by ransomware today, how prepared are you to recover quickly?",
    choices: [
      { label: "Fully prepared", score: 15, risk: "low", guidance: "" },
      { label: "Somewhat prepared", score: 7.5, risk: "moderate", guidance: "You may have some protection in place, but recovery depends on more than having backups. A strong plan should include tested recovery steps, clear responsibilities, and a realistic idea of how long your business can operate during an outage." },
      { label: "Not prepared", score: 0, risk: "high", guidance: "This is a high-risk area. Ransomware can stop operations, block access to files, create recovery costs, and damage client trust. Every business should have a tested recovery plan before an incident happens." }
    ]
  },
  {
    text: "Are technology costs clear and predictable each month?",
    choices: [
      { label: "Yes, always", score: 10, risk: "low", guidance: "" },
      { label: "Sometimes", score: 5, risk: "moderate", guidance: "Some unexpected technology costs are normal, but frequent surprises usually point to weak planning. A clearer monthly model can help leadership budget, prioritize upgrades, and avoid emergency spending." },
      { label: "No", score: 0, risk: "high", guidance: "Unpredictable IT costs are usually a sign of reactive support. This often leads to surprise invoices, delayed upgrades, and rushed decisions when something breaks." }
    ]
  },
  {
    text: "How easy is it for your staff to get fast, reliable IT help when they need it?",
    choices: [
      { label: "Very easy", score: 10, risk: "low", guidance: "" },
      { label: "Sometimes slow", score: 5, risk: "moderate", guidance: "If support is sometimes slow or inconsistent, staff may lose productive time or work around the issue. A clear support process helps reduce frustration and keeps small problems from becoming bigger ones." },
      { label: "Difficult", score: 0, risk: "high", guidance: "Poor access to IT help creates hidden costs. Employees lose time, issues pile up, and people may start using unsafe shortcuts just to get work done." }
    ]
  },
  {
    text: "Are important business accounts protected with multi-factor sign-in?",
    choices: [
      { label: "Yes, all important accounts", score: 15, risk: "low", guidance: "" },
      { label: "Some accounts", score: 7.5, risk: "moderate", guidance: "Partial protection is better than none, but the highest-risk accounts are often the ones attackers target first. Important email, finance, admin, and leadership accounts should not rely on passwords alone." },
      { label: "No", score: 0, risk: "high", guidance: "Accounts without multi-factor sign-in are a major security risk. A stolen password can lead to email fraud, data loss, ransomware, or unauthorized access to business systems." }
    ]
  },
  {
    text: "Do you know exactly who has access to your company systems and data today?",
    choices: [
      { label: "Yes, clearly", score: 12, risk: "low", guidance: "" },
      { label: "Some uncertainty", score: 6, risk: "moderate", guidance: "Some uncertainty around access usually means permissions have grown over time. Regular access reviews help make sure employees only have access to what they actually need." },
      { label: "No", score: 0, risk: "high", guidance: "Not knowing who has access creates serious risk. Former employees, over-permissioned users, or shared accounts can expose sensitive business and client data." }
    ]
  },
  {
    text: "Could your business continue operating if email went down for one day?",
    choices: [
      { label: "Yes, with little impact", score: 12, risk: "low", guidance: "" },
      { label: "Some disruption", score: 6, risk: "moderate", guidance: "Some disruption is expected, but the business should still have a way to communicate, access key information, and keep urgent work moving during an outage." },
      { label: "Major disruption", score: 0, risk: "high", guidance: "If email downtime would stop the business, that is a continuity risk. A single system failure should not completely block client communication, billing, scheduling, or operations." }
    ]
  },
  {
    text: "Would you be able to detect IT issues before they disrupt your business?",
    choices: [
      { label: "Yes, quickly", score: 12, risk: "low", guidance: "" },
      { label: "Only after issues start", score: 6, risk: "moderate", guidance: "If issues are only noticed after users complain, the business is still operating reactively. Proactive visibility helps catch problems earlier and reduce avoidable downtime." },
      { label: "No", score: 0, risk: "high", guidance: "Without early detection, problems are usually found after they already affect users. This can lead to longer outages, rushed fixes, and preventable business disruption." }
    ]
  },
  {
    text: "If a laptop was lost or stolen, would business data remain protected?",
    choices: [
      { label: "Yes, protected", score: 15, risk: "low", guidance: "" },
      { label: "Not sure", score: 7.5, risk: "moderate", guidance: "If you are unsure, the device may not be properly protected or manageable. Lost devices should not automatically become data breach risks." },
      { label: "No", score: 0, risk: "high", guidance: "A lost or stolen laptop can expose company data, saved passwords, client information, and business files. Devices should be protected before they leave the office." }
    ]
  },
  {
    text: "Do you have a clear technology plan for the next 12 months?",
    choices: [
      { label: "Yes, clearly", score: 10, risk: "low", guidance: "" },
      { label: "Rough plan only", score: 5, risk: "moderate", guidance: "A rough plan is a start, but leadership should have a clear view of upcoming upgrades, risks, budget needs, and business priorities. IT should support the business plan, not react after problems appear." },
      { label: "No plan", score: 0, risk: "high", guidance: "Without a technology plan, decisions are usually made under pressure. This can cause surprise costs, outdated systems, security gaps, and missed opportunities to improve operations." }
    ]
  },
  {
    text: "Overall, how confident are you that your current IT setup can support future growth?",
    choices: [
      { label: "Very confident", score: 8, risk: "low", guidance: "" },
      { label: "Somewhat confident", score: 4, risk: "moderate", guidance: "Some uncertainty usually means the business has outgrown parts of its current setup. Growth requires systems, support, security, and planning that can scale with the company." },
      { label: "Not confident", score: 0, risk: "high", guidance: "Low confidence is a warning sign. If technology cannot support growth, it may slow hiring, frustrate staff, increase risk, and create expensive cleanup later." }
    ]
  }
];

const state = {
  index: 0,
  answers: Array(questions.length).fill(null),
  scorePercentage: 0,
  riskCategory: "",
  guidance: [],
  lead: null
};

const el = {
  intro: document.getElementById("intro-screen"),
  quiz: document.getElementById("quiz-screen"),
  results: document.getElementById("results-screen"),
  startBtn: document.getElementById("start-btn"),
  nextBtn: document.getElementById("next-btn"),
  progress: document.getElementById("progress-text"),
  question: document.getElementById("question-text"),
  choices: document.getElementById("choices"),
  score: document.getElementById("score-display"),
  category: document.getElementById("category-display"),
  summary: document.getElementById("summary-display"),
  leadForm: document.getElementById("lead-form"),
  leadGate: document.getElementById("lead-gate"),
  status: document.getElementById("submit-status"),
  submitBtn: document.getElementById("submit-btn"),
  guidanceSection: document.getElementById("guidance-section"),
  guidanceList: document.getElementById("guidance-list"),
  copySummaryBtn: document.getElementById("copy-summary-btn")
};

function renderQuestion() {
  const q = questions[state.index];
  const selected = state.answers[state.index];

  el.progress.textContent = `Question ${state.index + 1} of ${questions.length}`;
  el.question.textContent = q.text;
  el.choices.innerHTML = "";

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `choice-btn ${selected === idx ? "selected" : ""}`;
    btn.textContent = choice.label;
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(selected === idx));
    btn.addEventListener("click", () => {
      state.answers[state.index] = idx;
      renderQuestion();
      el.nextBtn.disabled = false;
    });
    el.choices.appendChild(btn);
  });

  el.nextBtn.textContent = state.index === questions.length - 1 ? "See My Score" : "Next";
  el.nextBtn.disabled = selected === null;
}

function getResults() {
  const totalPossible = questions.reduce((sum, q) => sum + Math.max(...q.choices.map((c) => c.score)), 0);
  const earned = state.answers.reduce((sum, answerIndex, qIndex) => {
    if (answerIndex === null || answerIndex === undefined) return sum;
    const choice = questions[qIndex]?.choices?.[answerIndex];
    return sum + (choice ? choice.score : 0);
  }, 0);
  const score = Math.round((earned / totalPossible) * 100);

  let riskCategory;
  let summary;
  if (score >= 85) {
    riskCategory = "Green Light — Low Risk";
    summary = defaultSummaries.low;
  } else if (score >= 60) {
    riskCategory = "Yellow Light — Moderate Risk";
    summary = defaultSummaries.moderate;
  } else {
    riskCategory = "Red Light — High Risk";
    summary = defaultSummaries.high;
  }

  const guidance = state.answers
    .map((answerIndex, i) => {
      const question = questions[i];
      const answer = question?.choices?.[answerIndex];
      if (!answer || answer.risk === "low") return null;
      return {
        question: question.text,
        answer: answer.label,
        risk: answer.risk,
        guidance: answer.guidance
      };
    })
    .filter(Boolean);

  return { score, riskCategory, summary, guidance };
}

function renderResults() {
  const { score, riskCategory, summary, guidance } = getResults();
  state.scorePercentage = score;
  state.riskCategory = riskCategory;
  state.guidance = guidance;

  el.score.textContent = `${score}%`;
  el.category.textContent = riskCategory;
  el.summary.textContent = summary;
}

function renderGuidance() {
  if (state.guidance.length === 0) {
    el.guidanceList.innerHTML = `<p class="guidance-item">Great work — based on your responses, no middle- or high-risk guidance was triggered.</p>`;
    return;
  }

  el.guidanceList.innerHTML = state.guidance
    .map((item, i) => `
      <article class="guidance-item">
        <h4>Gap ${i + 1}: ${item.question}</h4>
        <p><strong>Your answer:</strong> ${item.answer}</p>
        <p>${item.guidance}</p>
      </article>
    `)
    .join("");
}

function buildPayload(formDataObj) {
  const payload = {
    ...formDataObj,
    score_percentage: `${state.scorePercentage}%`,
    risk_category: state.riskCategory,
    source: "Website IT Risk Assessment",
    triggered_guidance: state.guidance.map((g) => `${g.question} | ${g.answer} | ${g.guidance}`).join("\n\n"),
    _subject: `IT Risk Assessment Lead - ${formDataObj.company_name}`
  };

  questions.forEach((q, idx) => {
    const qKey = idx + 1;
    payload[`q${qKey}_question`] = q.text;
    payload[`q${qKey}_answer`] = q.choices[state.answers[idx]].label;
  });

  return payload;
}

async function submitLeadForm(event) {
  event.preventDefault();
  if (!el.leadForm.reportValidity()) return;

  const formDataObj = Object.fromEntries(new FormData(el.leadForm).entries());
  const payload = buildPayload(formDataObj);

  el.submitBtn.disabled = true;
  el.status.textContent = "Submitting…";
  el.status.className = "status";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Submission failed");

    state.lead = formDataObj;
    el.status.textContent = "Success! Your detailed guidance is ready below.";
    el.status.className = "status success";
    el.leadGate.classList.add("hidden");
    el.guidanceSection.classList.remove("hidden");
    renderGuidance();
  } catch (error) {
    el.status.textContent = "We couldn't submit right now. Please check your details and try again.";
    el.status.className = "status error";
    el.submitBtn.disabled = false;
  }
}

async function copyLeadSummary() {
  const lead = state.lead || {};
  const qaLines = questions
    .map((q, idx) => `${idx + 1}. ${q.text}\nAnswer: ${q.choices[state.answers[idx]].label}`)
    .join("\n\n");

  const guidanceText = state.guidance.length
    ? state.guidance.map((g, idx) => `${idx + 1}. ${g.question}\n${g.guidance}`).join("\n\n")
    : "None triggered.";

  const summary = [
    "IT Risk Assessment Lead Summary",
    `Full Name: ${lead.full_name || ""}`,
    `Company Name: ${lead.company_name || ""}`,
    `Email: ${lead.email || ""}`,
    `Phone: ${lead.phone || ""}`,
    `Company Size: ${lead.company_size || ""}`,
    `Score: ${state.scorePercentage}%`,
    `Risk Category: ${state.riskCategory}`,
    "",
    "Answers:",
    qaLines,
    "",
    "Triggered Guidance:",
    guidanceText
  ].join("\n");

  try {
    await navigator.clipboard.writeText(summary);
    el.copySummaryBtn.textContent = "Copied!";
    setTimeout(() => {
      el.copySummaryBtn.textContent = "Copy Lead Summary";
    }, 1500);
  } catch {
    el.copySummaryBtn.textContent = "Copy failed, try again";
  }
}

el.startBtn.addEventListener("click", () => {
  el.intro.classList.add("hidden");
  el.quiz.classList.remove("hidden");
  renderQuestion();
});

el.nextBtn.addEventListener("click", () => {
  if (state.answers[state.index] === null) return;

  if (state.index < questions.length - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }

  el.quiz.classList.add("hidden");
  el.results.classList.remove("hidden");
  renderResults();
});

el.leadForm.addEventListener("submit", submitLeadForm);
el.copySummaryBtn.addEventListener("click", copyLeadSummary);
