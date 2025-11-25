
document.addEventListener('DOMContentLoaded', () => {

  const userNameEl = document.getElementById('userName');
  const userScoreEl = document.getElementById('userScore');
  const compScoreEl = document.getElementById('computerScore');
  const roundNumberEl = document.getElementById('roundNumber');
  const generateBtn = document.getElementById('generateBtn');
  const nextBtn = document.getElementById('nextBtn');
  const resetBtn = document.getElementById('resetBtn');

  const userCardSlot = document.getElementById('userCard');
  const compCardSlot = document.getElementById('computerCard');

  const roundResultEl = document.getElementById('roundResult');
  const finalPanel = document.getElementById('finalPanel');
  const finalText = document.getElementById('finalText');
  const finalSummary = document.getElementById('finalSummary');

  // 36 PNG-карт
  const deck = [
    { id: '6', value: 6 },
    { id: '7', value: 7 },
    { id: '8', value: 8 },
    { id: '9', value: 9 },
    { id: '10', value: 10 },
    { id: 'J', value: 2 },
    { id: 'Q', value: 3 },
    { id: 'K', value: 4 },
    { id: 'A', value: 11 }
  ];

  const suits = ['S', 'C', 'D', 'H']; // Spades, Clubs, Diamonds, Hearts

  let userScore = 0;
  let compScore = 0;
  let round = 0;
  const maxRounds = 3;

  function askName() {
    let name = '';
    while (!name || name.length < 2) {
      name = prompt("Введіть ваше ім'я:", "Гравець");
      if (name === null) return "Гравець";
      name = name.trim();
    }
    return name;
  }

  const playerName = askName();
  userNameEl.textContent = playerName;

  function randCard() {
    const card = deck[Math.floor(Math.random() * deck.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    return {
      id: card.id,
      suit: suit,
      value: card.value,
      file: `${card.id}${suit}.png`
    };
  }

  function showCard(slot, card) {
    slot.innerHTML = "";
    const img = document.createElement("img");
    img.src = `cards/${card.file}`;
    img.className = "cardPNG";
    slot.appendChild(img);
  }

  function updateScores() {
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
  }

  function resetRoundUI() {
    userCardSlot.innerHTML = "";
    compCardSlot.innerHTML = "";
    roundResultEl.textContent = "";
  }

  function finalizeGame() {
    finalPanel.hidden = false;

    if (userScore > compScore) {
      finalText.textContent = `Перемога! ${playerName} виграв!`;
      finalSummary.textContent = `${playerName}: ${userScore} — Комп'ютер: ${compScore}`;
    }
    else if (userScore < compScore) {
      finalText.textContent = "Поразка! Комп'ютер сильніший цього разу.";
      finalSummary.textContent = `${playerName}: ${userScore} — Комп'ютер: ${compScore}`;
    }
    else {
      finalText.textContent = "Нічия!";
      finalSummary.textContent = `${userScore} : ${compScore}`;
    }

    generateBtn.disabled = true;
    nextBtn.disabled = true;
  }

  generateBtn.addEventListener('click', () => {
    if (round >= maxRounds) return;

    const userCard = randCard();
    const compCard = randCard();

    showCard(userCardSlot, userCard);
    showCard(compCardSlot, compCard);

    userScore += userCard.value;
    compScore += compCard.value;

    let msg = "";
    if (userCard.value > compCard.value) msg = `${playerName} виграв раунд!`;
    else if (userCard.value < compCard.value) msg = "Комп'ютер виграв раунд!";
    else msg = "Нічия!";

    roundResultEl.textContent = msg;

    round++;
    roundNumberEl.textContent = round;

    updateScores();

    generateBtn.disabled = true;
    nextBtn.disabled = false;

    if (round === maxRounds) {
      nextBtn.textContent = "Підсумок";
    }
  });

  nextBtn.addEventListener('click', () => {
    if (round >= maxRounds) {
      finalizeGame();
      return;
    }

    resetRoundUI();
    generateBtn.disabled = false;
    nextBtn.disabled = true;
    roundResultEl.textContent = "Натисніть «Згенерувати карти»";
  });

  resetBtn.addEventListener('click', () => {
    location.reload();
  });

  updateScores();
});
