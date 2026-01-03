// =====================
// FUNCIONES UTILIDAD (Movidas arriba para evitar errores)
// =====================
function getNumberName(num) {
  if (num == 1) return "As";
  if (num == 10) return "Sota";
  if (num == 11) return "Caballo";
  if (num == 12) return "Rey";
  return num;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function analyzeSpread(cards) {
  const suitCount = {};
  cards.forEach(card => {
    suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
  });
  let dominantSuit = null;
  let max = 0;
  for (const suit in suitCount) {
    if (suitCount[suit] > max) {
      dominantSuit = suit;
      max = suitCount[suit];
    }
  }
  return dominantSuit;
}

// =====================
// DATOS DE LA BARAJA
// =====================
const suits = {
  oros: "Dinero, trabajo, seguridad",
  copas: "Emociones, relaciones",
  espadas: "Conflictos, mente, decisiones",
  bastos: "Acción, energía, proyectos"
};

const numbers = {
  1: "Inicio, oportunidad",
  2: "Dualidad, elección",
  3: "Crecimiento",
  4: "Estabilidad",
  5: "Conflicto",
  6: "Armonía",
  7: "Prueba",
  10: "Mensaje",
  11: "Movimiento",
  12: "Autoridad"
};

const deck = [];

Object.keys(suits).forEach(suit => {
  Object.keys(numbers).forEach(num => {
    deck.push({
      id: `${num}-${suit}`,
      number: num,
      suit: suit,
      name: `${getNumberName(num)} de ${capitalize(suit)}`,
      meaning: `${numbers[num]} en el ámbito de ${suits[suit]}`
    });
  });
});

const spreads = {
  one: { cards: 1, positions: ["Mensaje principal"] },
  three: { cards: 3, positions: ["Pasado", "Presente", "Futuro"] }
};

// =====================
// LÓGICA PRINCIPAL (Asegurando que los ID existan)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.getElementById("drawBtn");
  const spreadSelect = document.getElementById("spreadSelect");
  const cardsDiv = document.getElementById("cards");
  const readingDiv = document.getElementById("reading");

  if (!drawBtn) return; // Seguridad proactiva

  drawBtn.addEventListener("click", () => {
    cardsDiv.innerHTML = "";
    readingDiv.innerHTML = "";

    let revealedCount = 0;
    const spread = spreads[spreadSelect.value];
    const shuffled = shuffle(deck);
    const drawn = shuffled.slice(0, spread.cards);

    drawn.forEach(card => {
      card.reversed = Math.random() < 0.5;
    });

    drawn.forEach((card, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card hidden";
      cardDiv.innerHTML = `
        <strong>${card.name}</strong>
        <p>${spread.positions[index]}</p>
      `;

      cardDiv.addEventListener("click", () => {
        if (!cardDiv.classList.contains("hidden")) return;

        cardDiv.classList.remove("hidden");
        revealedCount++;

        const orientationText = card.reversed
          ? "en su aspecto bloqueado, interno o en tensión"
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
            oros: "La tirada se centra en asuntos materiales, trabajo, dinero o estabilidad.",
            copas: "El peso de la lectura está en emociones, vínculos y relaciones personales.",
            espadas: "Predominan decisiones mentales, conflictos internos o tensiones.",
            bastos: "La energía apunta a acción, movimiento, iniciativa y proyectos."
          };

          readingDiv.innerHTML += `
            <p><strong>Lectura global:</strong><br>${suitMessages[dominantSuit]}</p>
          `;
        }
      });
      cardsDiv.appendChild(cardDiv);
    });
  });
});
