/* ==========================================================================
   4. VARIÁVEIS DE ESTADO DO JOGO
   ========================================================================== */
let vnIndex = 0;
let isTyping = false;
let typewriterTimer = null;
let currentTextToType = "";

let quizIndex = 0;
let quizQuestions = [];
let score = 0;
let userHistory = [];


// Inicializar imagens dos professores nos elementos img
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("img-sprite-edgar").src = PERSONAGENS.edgar.imagem;
    document.getElementById("img-sprite-joao").src = PERSONAGENS.joao.imagem;

    const quizImage = document.getElementById("quiz-img");
    quizImage.addEventListener("error", () => {
        if (!quizImage.src.includes("placehold.co/600x400")) {
            quizImage.src = "https://placehold.co/600x400/0f172a/ffffff?text=Imagem+indisponivel";
        }
    });
});

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) return;

    switch (actionElement.dataset.action) {
        case "start-game":
            startGame();
            break;
        case "skip-intro":
            skipIntro();
            break;
        case "advance-dialogue":
            handleDialogueClick();
            break;
        case "open-zoom":
            openZoomModal();
            break;
        case "close-zoom":
            closeZoomModal();
            break;
        case "submit-answer":
            submitAnswer(actionElement.dataset.answer === "true");
            break;
        case "next-question":
            closeFeedbackAndNext();
            break;
        case "restart-game":
            restartGame();
            break;
    }
});

// Alternador de telas
function switchScreen(screenId) {
    document.getElementById("screen-start").classList.add("hidden");
    document.getElementById("screen-vn").classList.add("hidden");
    document.getElementById("screen-quiz").classList.add("hidden");
    document.getElementById("screen-result").classList.add("hidden");

    document.getElementById(screenId).classList.remove("hidden");
}

// Iniciar Jogo
function startGame() {
    vnIndex = 0;
    switchScreen("screen-vn");
    renderVNStep();
}

/* ==========================================================================
   5. LÓGICA DA VISUAL NOVEL (TYPEWRITER E ALTERNÂNCIA DE PERSONAGENS)
   ========================================================================== */
function renderVNStep() {
    const step = roteiroVN[vnIndex];
    const charConfig = PERSONAGENS[step.personagem];

    // Atualizar Tag do Nome e Estilização do Badge
    const nameTag = document.getElementById("vn-name-tag");
    nameTag.innerText = charConfig.nome;
    nameTag.className = `px-5 py-1.5 text-white font-display font-bold text-sm md:text-base rounded-xl border shadow-xl tracking-wider ${charConfig.corBadge}`;

    // Destacar o Personagem Ativo (Acender/Apagar)
    const spriteEdgar = document.getElementById("sprite-edgar");
    const spriteJoao = document.getElementById("sprite-joao");

    if (step.personagem === "edgar") {
        spriteEdgar.className = "vn-sprite speaking flex flex-col items-center justify-end h-full w-1/2 max-w-[280px]";
        spriteJoao.className = "vn-sprite silent flex flex-col items-center justify-end h-full w-1/2 max-w-[280px]";
    } else {
        spriteJoao.className = "vn-sprite speaking flex flex-col items-center justify-end h-full w-1/2 max-w-[280px]";
        spriteEdgar.className = "vn-sprite silent flex flex-col items-center justify-end h-full w-1/2 max-w-[280px]";
    }

    document.getElementById("vn-step-indicator").innerText = `${vnIndex + 1} / ${roteiroVN.length}`;

    // Iniciar Efeito Typewriter
    startTypewriter(step.texto);
}

function startTypewriter(text) {
    clearInterval(typewriterTimer);
    currentTextToType = text;
    const textEl = document.getElementById("vn-text");
    textEl.textContent = "";
    isTyping = true;
    let i = 0;

    typewriterTimer = setInterval(() => {
        if (i < text.length) {
            textEl.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typewriterTimer);
            isTyping = false;
        }
    }, 25);
}

function handleDialogueClick() {
    if (isTyping) {
        // Se estiver digitando, completa o texto instantaneamente no clique
        clearInterval(typewriterTimer);
        document.getElementById("vn-text").textContent = currentTextToType;
        isTyping = false;
    } else {
        // Avança para a próxima fala
        if (vnIndex < roteiroVN.length - 1) {
            vnIndex++;
            renderVNStep();
        } else {
            startQuiz();
        }
    }
}

function skipIntro() {
    clearInterval(typewriterTimer);
    startQuiz();
}

/* ==========================================================================
   6. LÓGICA DO QUIZ KAHOOT
   ========================================================================== */
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Sorteia TOTAL_PERGUNTAS imagens distintas, garantindo ao menos uma de cada tipo
// (alternando o tipo sorteado primeiro) e embaralhando a ordem final.
function buildQuizQuestions() {
    const ia = shuffle(perguntas.filter(p => p.isIA));
    const reais = shuffle(perguntas.filter(p => !p.isIA));
    const total = Math.min(TOTAL_PERGUNTAS, perguntas.length);
    const primeiro = Math.random() < 0.5 ? [ia, reais] : [reais, ia];
    const result = [];
    for (let i = 0; result.length < total; i++) {
        const pool = primeiro[i % 2];
        if (pool.length) {
            result.push(pool.shift());
        } else if (!primeiro[(i + 1) % 2].length) {
            break;
        }
    }
    return shuffle(result);
}

function startQuiz() {
    quizQuestions = buildQuizQuestions();
    quizIndex = 0;
    score = 0;
    userHistory = [];
    switchScreen("screen-quiz");
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = quizQuestions[quizIndex];
    document.getElementById("quiz-counter").innerText = `Pergunta ${quizIndex + 1} de ${quizQuestions.length}`;
    document.getElementById("quiz-score").innerText = score;
    document.getElementById("quiz-img").src = q.imagem;
}

function submitAnswer(userSelectedIA) {
    const q = quizQuestions[quizIndex];
    const isCorrect = (userSelectedIA === q.isIA);

    if (isCorrect) {
        score++;
    }

    userHistory.push({
        question: q,
        userAnswerIsIA: userSelectedIA,
        isCorrect: isCorrect
    });

    showFeedbackModal(isCorrect, q);
}

function showFeedbackModal(isCorrect, question) {
    const modal = document.getElementById("modal-feedback");
    const iconBox = document.getElementById("feedback-icon-box");
    const titleEl = document.getElementById("feedback-title");
    const descEl = document.getElementById("feedback-desc");

    if (isCorrect) {
        iconBox.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
        iconBox.innerHTML = '<i class="fa-solid fa-check"></i>';
        titleEl.innerText = "Resposta Correta! 🎉";
        titleEl.className = "font-display text-2xl md:text-3xl font-bold mb-2 text-emerald-400";
    } else {
        iconBox.className = "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 bg-rose-500/20 text-rose-400 border border-rose-500/40";
        iconBox.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        titleEl.innerText = "Resposta Incorreta! ❌";
        titleEl.className = "font-display text-2xl md:text-3xl font-bold mb-2 text-rose-400";
    }

    descEl.innerText = question.explicacao;
    modal.classList.remove("hidden");
}

function closeFeedbackAndNext() {
    document.getElementById("modal-feedback").classList.add("hidden");
    if (quizIndex < quizQuestions.length - 1) {
        quizIndex++;
        renderQuizQuestion();
    } else {
        finishQuiz();
    }
}

// Modal de Zoom da imagem
function openZoomModal() {
    const currentImg = quizQuestions[quizIndex].imagem;
    document.getElementById("zoom-img-target").src = currentImg;
    document.getElementById("modal-zoom").classList.remove("hidden");
}

function closeZoomModal() {
    document.getElementById("modal-zoom").classList.add("hidden");
}

/* ==========================================================================
   7. TELA DE RESULTADOS E REVISÃO
   ========================================================================== */
function finishQuiz() {
    switchScreen("screen-result");

    const hasWon = score >= MINIMO_ACERTOS;
    const iconBox = document.getElementById("result-icon-box");
    const titleEl = document.getElementById("result-status-title");
    const subtitleEl = document.getElementById("result-status-subtitle");
    const scoreText = document.getElementById("result-score-text");

    scoreText.innerText = `${score} / ${quizQuestions.length}`;

    if (hasWon) {
        iconBox.className = "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/20";
        iconBox.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        titleEl.innerText = "VOCÊ VENCEU!";
        titleEl.className = "font-display text-3xl md:text-5xl font-extrabold mb-2 text-emerald-400";
        subtitleEl.innerText = "";
    } else {
        iconBox.className = "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-4 bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-rose-500/20";
        iconBox.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i>';
        titleEl.innerText = "TENTE NOVAMENTE!";
        titleEl.className = "font-display text-3xl md:text-5xl font-extrabold mb-2 text-rose-400";
        subtitleEl.innerText = `Você não atingiu a pontuação mínima de ${MINIMO_ACERTOS} acertos para aprovação.`;
    }

    // Gerar Lista de Revisão
    const reviewContainer = document.getElementById("review-list-container");
    reviewContainer.innerHTML = "";

    userHistory.forEach((item, idx) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `p-3 rounded-xl border text-xs md:text-sm flex items-start space-x-3 ${
            item.isCorrect 
                ? "bg-emerald-950/40 border-emerald-800/50 text-emerald-200" 
                : "bg-rose-950/40 border-rose-800/50 text-rose-200"
        }`;

        itemDiv.innerHTML = `
            <div class="font-bold text-base mt-0.5">
                ${item.isCorrect ? '<i class="fa-solid fa-circle-check text-emerald-400"></i>' : '<i class="fa-solid fa-circle-xmark text-rose-400"></i>'}
            </div>
            <div class="flex-1">
                <div class="font-bold text-slate-100 mb-0.5">Q${idx + 1}: ${item.question.titulo}</div>
                <div>Sua resposta: <b>${item.userAnswerIsIA ? 'Gerada por IA' : 'Imagem Real'}</b> | Gabarito: <b>${item.question.isIA ? 'Gerada por IA' : 'Imagem Real'}</b></div>
                <p class="text-slate-400 text-xs mt-1">${item.question.explicacao}</p>
            </div>
        `;

        reviewContainer.appendChild(itemDiv);
    });
}

function restartGame() {
    switchScreen("screen-start");
}
