// 1. FUNCIONES DE APOYO
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

// 2. DATOS
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

const deck = [];
Object.keys(suits).forEach(suit => {
  Object.keys(numbers).forEach(num => {
    deck.push({
      id: `${num}-${suit}`,
      suit: suit,
      name: `${getNumberName(num)} de ${capitalize(suit)}`,
      meaning: `${numbers[num]} en el ámbito de ${suits[suit]}`
    });
  });
});

const spreads = {
  one: { cards: 1, positions: ["Mensaje principal"] },
  three: { cards: 3, positions: ["Pasado", "Presente", "Futuro"] },
  celtic: { 
    cards: 10, 
    positions: [
      "Situación Actual (El consultante)",
      "El Obstáculo (Lo que cruza)",
      "Raíz Inconsciente (El pasado lejano)",
      "Pasado Reciente",
      "Corona (Metas y pensamientos conscientes)",
      "Futuro Inmediato",
      "Actitud Interna (Cómo te ves)",
      "Entorno (Influencias externas)",
      "Esperanzas y Temores",
      "Resultado Final (Hacia dónde vas)"
    ] 
  }
};

// 3. LÓGICA (Ejecución al cargar)
window.onload = () => {
  const exportContainer = document.getElementById("exportContainer");
  if(exportContainer) exportContainer.style.display = "none";
  const drawBtn = document.getElementById("drawBtn");
  const spreadSelect = document.getElementById("spreadSelect");
  const cardsDiv = document.getElementById("cards");
  const readingDiv = document.getElementById("reading");

  drawBtn.onclick = () => {
    cardsDiv.innerHTML = "";
    readingDiv.innerHTML = "";
    let revealedCount = 0;

    const spread = spreads[spreadSelect.value];
    const shuffled = shuffle(deck);
    const drawn = shuffled.slice(0, spread.cards);

    drawn.forEach((card, index) => {
      card.reversed = Math.random() < 0.5;
      
      const cardDiv = document.createElement("div");
      cardDiv.className = "card hidden";
      // Arreglo de las etiquetas HTML internas:
     cardDiv.innerHTML = `<div style="font-size: 3rem;">🃏</div><p>${spread.positions[index]}</p>`;

      cardDiv.onclick = () => {
        if (!cardDiv.classList.contains("hidden")) return;
        
        cardDiv.classList.remove("hidden");
       const icons = { oros: "🟡", copas: "🍷", espadas: "⚔️", bastos: "🌿" };
        const symbol = icons[card.suit] || "✨";
        cardDiv.innerHTML = `
          <div style="font-size: 3.5rem; margin-bottom: 10px;">${symbol}</div>
          <strong>${card.name}</strong>
          <p style="font-size: 0.8rem; margin-top: 5px; color: #aaa;">${spread.positions[index]}</p>
        `;
        revealedCount++;

        const orientacion = card.reversed ? "Invertida (aspecto bloqueado)" : "Derecha (aspecto fluido)";

        readingDiv.innerHTML += `
          <p><strong>${spread.positions[index]}:</strong><br>
          ${card.name} (${orientacion}).<br>
          ${card.meaning}.</p>
        `;

        if (revealedCount === spread.cards) {
          const dom = analyzeSpread(drawn);
         const msgs = {
  oros: "La energía se manifiesta en la materia. Es momento de sembrar hábitos tangibles y cuidar tu cuerpo o finanzas como templo de tu espíritu.",
  copas: "El agua emocional predomina. Escucha tu intuición; la respuesta no está en la lógica, sino en cómo resuena en tu corazón.",
  espadas: "Claridad mental necesaria. Hay un proceso de corte o decisión dolorosa pero liberadora. La verdad es tu mejor herramienta.",
  bastos: "Fuego creativo y voluntad. Tienes la chispa para iniciar, pero necesitas canalizar esa pasión para no quemarte en el proceso."
};
          readingDiv.innerHTML += `<hr><p><strong>Lectura Global:</strong> ${msgs[dom]}</p>`;
        }
      };
      cardsDiv.appendChild(cardDiv);

// --- AQUÍ LA NOTA DEL PROFE ---
    // Hacemos visible el contenedor del botón de exportar
    if(exportContainer) exportContainer.style.display = "block";
      
    });
  };
  // --- LÓGICA PARA EXPORTAR ---
  const exportBtn = document.getElementById("exportBtn");
  const exportContainer = document.getElementById("exportContainer");

  exportBtn.onclick = () => {
    // 1. Recopilamos el texto de la lectura
    const readingText = document.getElementById("reading").innerText;
    const timestamp = new Date().toLocaleString();
    const finalContent = `LECTURA DE BARAJA ESPAÑOLA\nFecha: ${timestamp}\n\n${readingText}\n\nGenerado por Mi Baraja App`;

    // 2. Creamos un "link" invisible para descargar el archivo
    const blob = new Blob([finalContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = `Lectura_Baraja_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // 3. Limpiamos
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Esta línea asegura que el botón de exportar aparezca solo cuando hay una lectura lista
  // Debes buscar el final de drawBtn.onclick y añadir:
  // exportContainer.style.display = "block";
const exportBtn = document.getElementById("exportBtn");
  if(exportBtn) {
    exportBtn.onclick = () => {
      const readingText = document.getElementById("reading").innerText;
      const timestamp = new Date().toLocaleString();
      const finalContent = `LECTURA DE BARAJA ESPAÑOLA\nFecha: ${timestamp}\n\n${readingText}`;
      const blob = new Blob([finalContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Lectura_${new Date().getTime()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };
  }
  
};
