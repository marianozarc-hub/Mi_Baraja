// 1. DICCIONARIO CON FILOSOFÍA DE LOS DOCUMENTOS
const cardData = {
    oros: {
        info: "Materia, éxito tangible y salud física.",
        meanings: {
            1: "Triunfo absoluto y prosperidad", 2: "Amistad, socios o dualidad económica", 
            3: "Fortuna, expansión y crecimiento", 4: "Estabilidad o regalo inesperado", 
            5: "Resolución de deudas o problemas", 6: "Generosidad y equilibrio",
            7: "Tesoro hallado tras el esfuerzo", 10: "Dama práctica y protectora", 
            11: "Caballero emprendedor (noticias)", 12: "Rey de poder y madurez"
        }
    },
    copas: {
        info: "Emociones, familia y mundo interior.",
        meanings: {
            1: "El Hogar (El Nido) y amor puro", 2: "Pasión, encuentro o reconciliación", 
            3: "Celebración, bodas o alegrías", 4: "Tedio, estancamiento emocional", 
            5: "Herencia, pasado o aprendizaje", 6: "Nostalgia y recuerdos dulces",
            7: "Elección, sueños y fantasías", 10: "Dama amorosa e intuitiva", 
            11: "Caballero idealista o propuesta", 12: "Rey noble y protector"
        }
    },
    espadas: {
        info: "Mente, justicia, salud y desafíos.",
        meanings: {
            1: "Compromiso legal o decisión firme", 2: "Dualidad, dudas o miedos", 
            3: "Conflicto, penas o malentendidos", 4: "Reposo, tregua o soledad", 
            5: "Derrota, obstáculos o desánimo", 6: "Viaje sanador o mudanza mental",
            7: "Ansiedad o pensamientos intrusivos", 10: "Dama de carácter y claridad", 
            11: "Noticias rápidas o tensiones", 12: "Hombre de ley o autoridad fría"
        }
    },
    bastos: {
        info: "Energía, voluntad y realizaciones.",
        meanings: {
            1: "Lejanía, viajes o metas largas", 2: "Cercanía, socios o viajes cortos", 
            3: "Fraternidad y apoyo cercano", 4: "Solidez, hogar y cimientos", 
            5: "Rivalidad, competencia o lucha", 6: "Logro lento pero seguro",
            7: "Trabajo duro y perseverancia", 10: "Dama activa y leal", 
            11: "Cambio de rumbo o noticias", 12: "Rey carismático y líder"
        }
    }
};

const spreads = {
    one: { cards: 1, positions: ["Energía Central"] },
    three: { cards: 3, positions: ["Pasado", "Presente", "Futuro"] },
    celtic: { 
        cards: 10, 
        positions: [
            "Situación Actual", "El Desafío", "Mente Subconsciente",
            "Pasado Reciente", "Mente Consciente", "Futuro Inmediato",
            "Actitud Interna", "Entorno", "Esperanzas/Miedos", "Resultado Final"
        ] 
    }
};

window.onload = () => {
    const exportContainer = document.getElementById("exportContainer");
    const exportBtn = document.getElementById("exportBtn");
    const drawBtn = document.getElementById("drawBtn");
    const spreadSelect = document.getElementById("spreadSelect");
    const cardsDiv = document.getElementById("cards");
    const readingDiv = document.getElementById("reading");
    const userName = document.getElementById("userName");

    const deck = [];
    Object.keys(cardData).forEach(suit => {
        for (let n in cardData[suit].meanings) {
            deck.push({ 
                suit, 
                num: n, 
                name: `${n > 9 ? (n==10?'Sota':n==11?'Caballo':'Rey') : n} de ${suit}`,
                meaning: cardData[suit].meanings[n]
            });
        }
    });

    drawBtn.onclick = () => {
        cardsDiv.innerHTML = "";
        readingDiv.innerHTML = "";
        exportContainer.style.display = "none";
        let revealed = 0;

        const spread = spreads[spreadSelect.value];
        const drawn = [...deck].sort(() => Math.random() - 0.5).slice(0, spread.cards);

        drawn.forEach((card, i) => {
            const rev = Math.random() < 0.5;
            const cardDiv = document.createElement("div");
            cardDiv.className = "card hidden";
            cardDiv.innerHTML = `<span>🃏</span><p>${spread.positions[i]}</p>`;

            cardDiv.onclick = () => {
                if (!cardDiv.classList.contains("hidden")) return;
                cardDiv.classList.remove("hidden");
                const icons = { oros: "🟡", copas: "🍷", espadas: "⚔️", bastos: "🌿" };
                cardDiv.innerHTML = `
                    <div style="font-size:3rem">${icons[card.suit]}</div>
                    <strong>${card.name}</strong>
                    <p style="font-size:0.7rem">${spread.positions[i]}</p>
                `;

                readingDiv.innerHTML += `
                    <p><strong>${spread.positions[i]}:</strong> ${card.name} ${rev ? '(Invertida)' : ''}<br>
                    <em>${card.meaning}</em>. ${rev ? 'Sugiere un bloqueo o introspección.' : 'Energía en flujo positivo.'}</p>
                `;

                if (++revealed === spread.cards) {
                    readingDiv.innerHTML += `<hr><p><strong>Enfoque de Crecimiento:</strong> Esta lectura destaca temas de ${cardData[card.suit].info}</p>`;
                    exportContainer.style.display = "block";
                }
            };
            cardsDiv.appendChild(cardDiv);
        });
    };

    exportBtn.onclick = () => {
        const doc = `Lectura de ${userName.value || 'Consultante'}\nFecha: ${new Date().toLocaleString()}\n\n${readingDiv.innerText}`;
        const blob = new Blob([doc], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Lectura_${userName.value || 'Anonimo'}.txt`;
        a.click();
    };
};
