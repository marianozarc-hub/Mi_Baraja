// 1. DICCIONARIO CON SABOR LATINO Y TRADICIÓN GITANA
const cardData = {
    copas: {
        info: "Todo lo que pasa por tu corazón, tu familia y los afectos.",
        meanings: {
            1: "¡El Nido! Tu casa y tu gente están en un momento re lindo.",
            2: "Se viene una charla íntima o un secretito que te va a gustar.",
            3: "¡Festejo! Alguna alegría compartida o una noticia que te va a hacer brindar.",
            4: "Andás medio bajón o aburrido con lo de siempre. ¡Cambiá el aire!",
            5: "Ojo, che... hay miedos o sentís que alguien no te está jugando limpio.",
            6: "Mucho recuerdo dando vueltas. No te quedes en el ayer, mirá adelante.",
            7: "¡Buenas noticias! Se viene algo que te va a poner una sonrisa.",
            10: "Una mujer re dulce y buena onda que te quiere ayudar.",
            11: "Un pibe idealista o una propuesta que te va a mover el piso.",
            12: "Un hombre de gran corazón, alguien que te cuida y te banca."
        }
    },
    oros: {
        info: "La platita, el laburo y las cosas que tocamos con las manos.",
        meanings: {
            1: "¡Golazo! Éxito total y mucha suerte en lo que te propongas.",
            2: "Preparate porque se viene una sorpresa que no te esperabas para nada.",
            3: "Platita que llega o un proyecto que empieza a crecer fuerte.",
            4: "Un regalito o una estabilidad que te va a dar mucha tranquilidad.",
            5: "Andás flojo de papeles o te falta un manguito. ¡A organizarse!",
            6: "Alguien te va a dar una mano o vos vas a poder ayudar a otro.",
            7: "Plata que llega de arriba o por un golpe de suerte. ¡Aprovechala!",
            10: "Una mujer re práctica y laburadora, alguien que sabe lo que quiere.",
            11: "Un pibe emprendedor o noticias de algún negocio que se viene.",
            12: "Un hombre con poder o mucha experiencia que te da seguridad."
        }
    },
    espadas: {
        info: "Tus pensamientos, los líos de la mente y los desafíos.",
        meanings: {
            1: "Una decisión firme o un papel importante que tenés que firmar.",
            2: "Tenés muchas dudas, che. Estás entre dos caminos y no sabés qué hacer.",
            3: "Andás con el corazón medio roto o tuviste una pelea fea. ¡Fuerza!",
            4: "Necesitás parar un poco la moto. Descansá y tomate un respiro.",
            5: "Se puso difícil la cosa. Hay trabas que te están frenando el paso.",
            6: "Un viaje o un cambio de aire que te va a venir bárbaro para sanar.",
            7: "Mucha ansiedad. Estás pensando de más y te estás haciendo la cabeza.",
            10: "Una mujer de armas tomar, inteligente y que no se calla nada.",
            11: "Noticias que vuelan o una discusión que salta de la nada.",
            12: "Un hombre de ley o alguien muy serio que te pone los puntos."
        }
    },
    bastos: {
        info: "Tu energía, las ganas de hacer cosas y el laburo.",
        meanings: {
            1: "¡Lejanía! Se viene un viaje largo o una meta que estaba lejos se acerca.",
            2: "Tenés a alguien que te banca a muerte en tus planes cercanos.",
            3: "Tus amigos o hermanos están ahí para darte el empujón que necesitás.",
            4: "Cimientos fuertes. Lo que estás armando tiene buena base.",
            5: "Mucho ego dando vueltas. Ojo con las peleas en el laburo.",
            6: "Vas lento pero seguro. No te apures, que el triunfo llega.",
            7: "Le estás poniendo el pecho a las balas. Tu esfuerzo va a valer la pena.",
            10: "Una mujer con mucha chispa y energía, alguien re leal.",
            11: "Un cambio de rumbo o noticias que te hacen moverte rápido.",
            12: "Un líder nato, alguien con carisma que te guía el camino."
        }
    }
};

const spreads = {
    one: { cards: 1, positions: ["El consejo de hoy"] },
    three: { cards: 3, positions: ["Lo que ya pasó", "Lo que estás viviendo", "Lo que se viene"] },
    celtic: { 
        cards: 10, 
        positions: [
            "Cómo estás vos", "Lo que te frena", "Lo que tenés en la cabeza",
            "Lo que dejás atrás", "Tus metas", "Lo que llega pronto",
            "Cómo te sentís por dentro", "Lo que dicen de afuera", "Tus miedos y ganas", "El destino final"
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
    const userNameInput = document.getElementById("userName");

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
            const isReversed = Math.random() < 0.5;
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

                const orientacion = isReversed ? " (está medio trabada la cosa)" : " (viene con fluidez)";
                const consejo = isReversed ? "Parece que acá tenés que tener paciencia, algo está costando salir." : "¡Qué buena onda! Esta energía te acompaña re bien.";

                readingDiv.innerHTML += `
                    <p><strong>${spread.positions[i]}:</strong> ${card.name}${orientacion}<br>
                    <em>${card.meaning}</em><br>
                    <small>${consejo}</small></p>
                `;

                if (++revealed === spread.cards) {
                    readingDiv.innerHTML += `<hr><p><strong>En resumen:</strong> Mirá, hoy la mano viene por el lado de ${cardData[card.suit].info}</p>`;
                    exportContainer.style.display = "block";
                }
            };
            cardsDiv.appendChild(cardDiv);
        });
    };

    exportBtn.onclick = () => {
        const nombre = userNameInput.value || "Amigo/a";
        const content = `CHARLA DE BARAJA ESPAÑOLA\nPara mi amigo/a: ${nombre}\nFecha: ${new Date().toLocaleString()}\n\n${readingDiv.innerText}\n\n¡Ojalá te sirva! Guardalo para leerlo después.`;
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Charla_con_${nombre}.txt`;
        a.click();
    };
};
        
