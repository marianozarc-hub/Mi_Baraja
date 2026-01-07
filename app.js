// DICCIONARIO OPTIMIZADO PARA CONSEJOS (Basado en los 3 documentos)
const cardData = {
    copas: {
        info: "emociones y familia",
        meanings: {
            1: "El hogar es tu refugio, busca apoyo en los tuyos.",
            2: "Alguien cercano tiene la respuesta que buscas.",
            3: "Viene una alegría, celebra los pequeños logros.",
            4: "No te cierres, el desánimo es pasajero.",
            5: "Analiza si tus miedos son reales o solo ideas.",
            7: "Confía en tu intuición, vienen buenas noticias.",
            10: "Una mujer amable te dará un buen consejo.",
            11: "Sigue tus ideales, pero mantén los pies en la tierra.",
            12: "Busca la guía de alguien con madurez emocional."
        }
    },
    oros: {
        info: "temas materiales y seguridad",
        meanings: {
            1: "El éxito está asegurado, actúa con confianza.",
            2: "Mantente alerta, una sorpresa cambiará tus planes.",
            3: "Es momento de invertir energía en tus proyectos.",
            4: "Tu estabilidad está protegida, agradece lo que tienes.",
            5: "Organiza tus prioridades para evitar fugas de energía.",
            7: "La suerte te acompaña, aprovecha las oportunidades.",
            10: "Sé práctico y enfócate en resultados reales.",
            11: "Nuevas noticias sobre negocios o trabajo llegan pronto.",
            12: "Tu experiencia es tu mejor activo ahora mismo."
        }
    },
    espadas: {
        info: "mente, justicia y desafíos",
        meanings: {
            1: "Toma una decisión firme y no mires atrás.",
            2: "Aclara tus dudas antes de dar el siguiente paso.",
            3: "Acepta el dolor para poder sanar y avanzar.",
            4: "El descanso no es pérdida de tiempo, es necesario.",
            5: "No luches batallas que no te corresponden.",
            6: "Un cambio de ambiente te dará la claridad que buscas.",
            7: "Suelta la ansiedad, no puedes controlarlo todo.",
            10: "Usa tu inteligencia para resolver este problema.",
            11: "Actúa rápido pero con la cabeza fría.",
            12: "Busca la justicia y la verdad en esta situación."
        }
    },
    bastos: {
        info: "energía, voluntad y nuevos comienzos",
        meanings: {
            1: "Mira a largo plazo, el camino es largo pero valdrá la pena.",
            2: "Busca aliados, no tienes que hacerlo todo solo.",
            3: "Tus amigos son tu red de apoyo, confía en ellos.",
            4: "Construye sobre bases sólidas, no te apresures.",
            5: "Evita conflictos innecesarios por orgullo.",
            6: "La constancia será tu llave al éxito.",
            7: "Sigue esforzándote, estás más cerca de lo que crees.",
            10: "Tu lealtad será recompensada muy pronto.",
            11: "Prepárate para moverte rápido, el cambio es hoy.",
            12: "Confía en tu capacidad de liderazgo."
        }
    }
};

const spreads = {
    one: { cards: 1, positions: ["El consejo central"] },
    three: { cards: 3, positions: ["Origen", "Situación actual", "Consejo a futuro"] },
    celtic: { cards: 10, positions: ["Tu estado", "El desafío", "Lo oculto", "El pasado", "Tus metas", "Lo que viene", "Tu fuerza", "Tu entorno", "Tus miedos", "Resultado"] }
};

window.onload = () => {
    const drawBtn = document.getElementById("drawBtn");
    const exportBtn = document.getElementById("exportBtn");
    const readingDiv = document.getElementById("reading");
    const cardsDiv = document.getElementById("cards");
    const userQuestion = document.getElementById("userQuestion");
    const userName = document.getElementById("userName");

    const deck = [];
    Object.keys(cardData).forEach(suit => {
        for (let n in cardData[suit].meanings) {
            deck.push({ suit, num: n, name: `${n > 9 ? (n==10?'Sota':n==11?'Caballo':'Rey') : n} de ${suit}`, advice: cardData[suit].meanings[n] });
        }
    });

    drawBtn.onclick = () => {
        if (!userQuestion.value.trim()) {
            alert("Por favor, escribe tu pregunta primero para que las cartas puedan ayudarte.");
            return;
        }

        cardsDiv.innerHTML = "";
        readingDiv.innerHTML = `<h3>Sobre tu pregunta: "${userQuestion.value}"</h3>`;
        let revealed = 0;
        const spread = spreads[document.getElementById("spreadSelect").value];
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
                cardDiv.innerHTML = `<div style="font-size:3rem">${icons[card.suit]}</div><strong>${card.name}</strong><p>${spread.positions[i]}</p>`;

                readingDiv.innerHTML += `
                    <p><strong>${spread.positions[i]}:</strong> ${card.name} ${rev ? '(Bloqueada)' : '(Fluida)'}<br>
                    ${rev ? 'El consejo se ve pausado: ' : 'El consejo es: '} ${card.advice}</p>
                `;

                if (++revealed === spread.cards) {
                    readingDiv.innerHTML += `<hr><p>Amigo/a, las cartas te sugieren enfocarte en temas de ${cardData[card.suit].info}.</p>`;
                    document.getElementById("exportContainer").style.display = "block";
                }
            };
            cardsDiv.appendChild(cardDiv);
        });
    };

    exportBtn.onclick = () => {
        const doc = `CONSULTA DE BARAJA\nPregunta: ${userQuestion.value}\nConsultante: ${userName.value || 'Amigo/a'}\n\n${readingDiv.innerText}`;
        const blob = new Blob([doc], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Consejo_Baraja.txt`;
        a.click();
    };
};
    
