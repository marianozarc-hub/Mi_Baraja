import { createDeck } from "./deck.js";

// =====================
// BARAJA
// =====================
let deck = createDeck();

// =====================
// UTILIDADES
// =====================
function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// =====================
// TIRADAS
// =====================
const spreads = {
  one: {
    cards: 1,
    positions: ["Mensaje principal"]
  },
  three: {
    cards: 3,
    positions: ["Pasado", "Presente", "Futuro"]
  }
};

// =====================
// DOM
// =====================
const drawBtn = document.getElementById("drawBtn");
const spreadSelect = document.getElementById("spreadSelect");
const cardsDiv = document.getElementById("cards");
const readingDiv = document.getElementById("reading");

// =====================
// LÓGICA PRINCIPAL
// =====================
drawBtn.addEventListener("click", () => {
  cardsDiv.innerHTML = "";
  readingDiv.innerHTML = "";

  let revealedCount = 0;

  const spread = spreads[spreadSelect.value];
  const shuffled = shuffle(deck);

  const drawn = shuffled
    .slice(0, spread.cards)
    .map(card => ({
      ...card,
      reversed: Math.random() < 0.5
    }));

  drawn.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card hidden";
    cardDiv.setAttribute("role", "button");
    cardDiv.setAttribute("tabindex", "0");
    cardDiv.setAttribute("aria-label", "Revelar carta");

    cardDiv.innerHTML = `
      <strong>${card.name}</strong>
      <p>${spread.positions[index]}</p>
    `;

    const reveal = () => {
      if (!cardDiv.classList.contains("hidden")) return;

      cardDiv.classList.remove("hidden");
      revealedCount++;

      const orientationText = card.reversed
        ? "en su aspecto bloqueado o interno"
        : "en su expresión directa y fluida";

      readingDiv.innerHTML += `
        <p>
          <strong>${spread.positions[index]}:</strong><br>
          ${card.name} aparece ${card.reversed ? "invertida" : "derecha"},
          lo que señala ${card.meaning}, ${orientationText}.
        </p>
      `;

      if (revealedCount === spread.cards) {
        const dominantSuit = analyzeSpread(drawn);

        const suitMessages = {
          oros: "La lectura se enfoca en asuntos materiales y estabilidad.",
          copas: "El eje está en emociones y relaciones.",
          espadas: "Predominan decisiones mentales y tensiones.",
          bastos: "La energía va hacia acción e iniciativa."
        };

        readingDiv.innerHTML += `
          <p>
            <strong>Lectura global:</strong><br>
            ${suitMessages[dominantSuit]}
          </p>
        `;
      }
    };

    cardDiv.addEventListener("click", reveal);
    cardDiv.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") reveal();
    });

    cardsDiv.appendChild(cardDiv);
  });
});

// =====================
// INTERPRETACIÓN GLOBAL
// =====================
function analyzeSpread(cards) {
  const suitCount = {};

  cards.forEach(card => {
    suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
  });

  return Object.keys(suitCount).reduce((a, b) =>
    suitCount[a] > suitCount[b] ? a : b
  );
}
