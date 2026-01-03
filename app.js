// 1. DATOS DE LA BARAJA
const suits = {
  oros: "Dinero, trabajo, seguridad",
  copas: "Emociones, relaciones",
  espadas: "Conflictos, mente, decisiones",
  bastos: "Acción, energía, proyectos"
};

const numbers = {
  1: "Inicio, oportunidad", 2: "Dualidad, elección", 3: "Crecimiento",
  4: "Estabilidad", 5: "Conflicto", 6: "Armonía", 7: "Prueba",
  10: "Mensaje", 11: "Movimiento", 12: "Autoridad"
};

// 2. FUNCIONES DE AYUDA
const getNumberName = (num) => {
  if (num == 1) return "As";
  if (num == 10) return "Sota";
  if (num == 11) return "Caballo";
  if (num == 12) return "Rey";
  return num;
};

const deck = [];
Object.keys(suits).forEach(suit => {
  Object.keys(numbers).forEach(num => {
    deck.push({
      id: `${num}-${suit}`,
      suit: suit,
      name: `${getNumberName(num)} de ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      meaning: `${numbers[num]} en ${suits[suit]}`
    });
  });
});

// 3. LÓGICA DE LA TIRADA
const drawCards = () => {
  const cardsDiv = document.getElementById("cards");
  const readingDiv = document.getElementById("reading");
  const spreadType = document.getElementById("spreadSelect").value;
  
  cardsDiv.innerHTML = "";
  readingDiv.innerHTML = "";

  const numCards = spreadType === "one" ? 1 : 3;
  const positions = spreadType === "one" ? ["Mensaje"] : ["Pasado", "Presente", "Futuro"];
  
  // Mezclar y seleccionar
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  const drawn = shuffled.slice(0, numCards);

  drawn.forEach((card, index) => {
    const isReversed = Math.random() < 0.5;
    const cardDiv = document.createElement("div");
    cardDiv.className = "card"; // Quitamos 'hidden' para probar si aparecen
    
    cardDiv.innerHTML = `
      <strong>${card.name}</strong>
      <p style="font-size:0.8rem">${positions[index]}</p>
      <small>${isReversed ? "(Invertida)" : "(Derecha)"}</small>
    `;

    // Al hacer clic, mostramos el significado
    cardDiv.onclick = () => {
      cardDiv.style.background = "#444";
      readingDiv.innerHTML += `
        <p><strong>${positions[index]}:</strong> ${card.name} ${isReversed ? 'Invertida' : 'Derecha'}. ${card.meaning}.</p>
      `;
    };

    cardsDiv.appendChild(cardDiv);
  });
};

// 4. ASIGNAR EL BOTÓN (Método directo para Android)
window.onload = () => {
  const btn = document.getElementById("drawBtn");
  if(btn) {
    btn.onclick = drawCards;
  } else {
    console.error("No se encontró el botón drawBtn");
  }
};
