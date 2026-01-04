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
            "Situación Actual", "El Obstáculo", "Raíz Inconsciente",
            "Pasado Reciente", "Corona (Consciente)", "Futuro Inmediato",
            "Actitud Interna", "Entorno", "Esperanzas y Temores", "Resultado Final"
        ] 
    }
};

// 3. LÓGICA PRINCIPAL
window.onload = () => {
    const exportContainer = document.getElementById("exportContainer");
    const exportBtn = document.getElementById("exportBtn");
    const drawBtn = document.getElementById("drawBtn");
    const spreadSelect = document.getElementById("spreadSelect");
    const cardsDiv = document.getElementById("cards");
    const readingDiv = document.getElementById("reading");
    const userNameInput = document.getElementById("userName");

    drawBtn.onclick = () => {
        cardsDiv.innerHTML = "";
        readingDiv.innerHTML = "";
        let revealedCount = 0;

        const spread = spreads[spreadSelect.value];
        const shuffled = shuffle(deck);
        const drawn = shuffled.slice(0, spread.cards);

        drawn.forEach((card, index) => {
            const isReversed = Math.random() < 0.5;
            const cardDiv = document.createElement("div");
            cardDiv.className = "card hidden";
            cardDiv.innerHTML = `<div style="font-size: 3rem;">🃏</div><p>${spread.positions[index]}</p>`;

            cardDiv.onclick = () => {
                if (!cardDiv.classList.contains("hidden")) return;
                
                cardDiv.classList.remove("hidden");
                const icons = { oros: "🟡", copas: "🍷", espadas: "⚔️", bastos: "🌿" };
                const symbol = icons[card.suit] || "✨";
                
                cardDiv.innerHTML = `
                    <div style="font-size: 3.5rem; margin-bottom: 10px;">${symbol}</div>
                    <strong>${card.name}</strong>
                    <p style="font-size: 0.7rem; color: #aaa;">${spread.positions[index]}</p>
                `;
                
                revealedCount++;
                const orientacion = isReversed ? "Invertida (aspecto bloqueado)" : "Derecha (aspecto fluido)";

                readingDiv.innerHTML += `
                    <p><strong>${spread.positions[index]}:</strong><br>
                    ${card.name} (${orientacion}).<br>
                    ${card.meaning}.</p>
                `;

                if (revealedCount === spread.cards) {
                    const dom = analyzeSpread(drawn);
                    const msgs = {
                        oros: "Foco en la materia y salud.",
                        copas: "Foco en emociones y vínculos.",
                        espadas: "Foco en la mente y claridad.",
                        bastos: "Foco en acción y proyectos."
                    };
                    readingDiv.innerHTML += `<hr><p><strong>Lectura Global:</strong> ${msgs[dom]}</p>`;
                    if(exportContainer) exportContainer.style.display = "block";
                }
            };
            cardsDiv.appendChild(cardDiv);
        });
    };

    if(exportBtn) {
        exportBtn.onclick = () => {
            const nombre = userNameInput.value || "Consultante Anónimo";
            const timestamp = new Date().toLocaleString();
            const text = readingDiv.innerText;
            const content = `BARAJA ESPAÑOLA\nConsultante: ${nombre}\nFecha: ${timestamp}\n\n${text}`;
            
            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Lectura_${nombre.replace(/ /g, "_")}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }
};
