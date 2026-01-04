// 1. DICCIONARIO NEUTRO CON SABIDURÍA GITANA
const cardData = {
    copas: {
        info: "Tus sentimientos, tu familia y tus afectos.",
        meanings: {
            1: "¡El Nido! Tu hogar y tu gente están en un momento muy especial.",
            2: "Se viene una charla íntima o un secreto que te va a gustar.",
            3: "¡Celebración! Una alegría compartida o una noticia para brindar.",
            4: "Te sientes un poco desanimado o aburrido con la rutina. ¡Cambia de aire!",
            5: "Ten cuidado, hay miedos o sientes que alguien no está siendo sincero.",
            6: "Muchos recuerdos dando vueltas. No te quedes en el ayer, mira adelante.",
            7: "¡Buenas noticias! Viene algo que te traerá mucha alegría.",
            10: "Una mujer muy dulce y amable que quiere ayudarte.",
            11: "Un joven idealista o una propuesta que te va a emocionar.",
            12: "Un hombre de gran corazón, alguien que te apoya y te cuida."
        }
    },
    oros: {
        info: "El dinero, el trabajo y las cosas materiales.",
        meanings: {
            1: "¡Éxito total! Mucha suerte y prosperidad en lo que te propongas.",
            2: "Prepárate para una sorpresa inesperada que te alegrará el día.",
            3: "Dinero que llega o un proyecto que empieza a crecer con fuerza.",
            4: "Un regalo o una estabilidad que te dará mucha tranquilidad.",
            5: "Estás un poco desorganizado o te falta algo de dinero. ¡A planificar!",
            6: "Alguien te va a dar una mano o tú estarás en posición de ayudar a otro.",
            7: "Dinero que llega por sorpresa o por un golpe de suerte. ¡Aprovéchalo!",
            10: "Una mujer muy práctica y trabajadora que sabe lo que quiere.",
            11: "Un joven emprendedor o noticias de un negocio que se aproxima.",
            12: "Un hombre con mucha experiencia que te brinda seguridad."
        }
    },
    espadas: {
        info: "Tus pensamientos, desafíos y temas de salud.",
        meanings: {
            1: "Un compromiso legal o una decisión importante que debes tomar.",
            2: "Tienes muchas dudas. Estás entre dos caminos y no sabes cuál elegir.",
            3: "Te sientes triste o pasaste por una situación difícil. ¡Mucha fuerza!",
            4: "Necesitas descansar un poco. Tómate un respiro para recuperar energía.",
            5: "Se puso difícil la situación. Hay obstáculos que están frenando tu paso.",
            6: "Un viaje o un cambio de ambiente que te ayudará a sanar.",
            7: "Mucha ansiedad. Estás pensando demasiado las cosas y te agobias.",
            10: "Una mujer decidida, inteligente y que habla con mucha claridad.",
            11: "Noticias rápidas o una discusión que surge de la nada.",
            12: "Un hombre serio o de autoridad que pone las cosas en su lugar."
        }
    },
    bastos: {
        info: "Tu energía, tus ganas de hacer cosas y tus proyectos.",
        meanings: {
            1: "¡Lejanía! Un viaje largo o una meta lejana que por fin se acerca.",
            2: "Tienes a alguien que te apoya totalmente en tus planes cercanos.",
            3: "Tus amigos o hermanos están ahí para darte el empuje que necesitas.",
            4: "Cimientos fuertes. Lo que estás construyendo tiene muy buena base.",
            5: "Mucho orgullo en el ambiente. Cuidado con las discusiones en el trabajo.",
            6: "Vas lento pero seguro. No te apresures, que el éxito llegará.",
            7: "Estás haciendo un gran esfuerzo. Tu perseverancia valdrá la pena.",
            10: "Una mujer con mucha energía y entusiasmo, alguien muy leal.",
            11: "Un cambio de rumbo o noticias que te obligan a moverte rápido.",
            12: "Un líder natural, alguien con carisma que guía tu camino."
        }
    }
};

const spreads = {
    one: { cards: 1, positions: ["El consejo para ti"] },
    three: { cards: 3, positions: ["Lo que ya pasó", "Lo que vives ahora", "Lo que vendrá"] },
    celtic: { 
        cards: 10, 
        positions: [
            "Tu estado actual", "Lo que te detiene", "Tus pensamientos",
            "Lo que dejas atrás", "Tus metas", "Lo que llega pronto",
            "Tu mundo interno", "Lo que dicen los demás", "Tus miedos y deseos", "El resultado final"
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

                const orientacion = isReversed ? " (parece que hay algo frenado)" : " (la energía fluye bien)";
                const consejo = isReversed ? "Tal vez debas tener un poco de paciencia, algo está costando salir." : "¡Qué buena señal! Esta energía te acompaña de forma positiva.";

                readingDiv.innerHTML += `
                    <p><strong>${spread.positions[i]}:</strong> ${card.name}${orientacion}<br>
                    <em>${card.meaning}</em><br>
                    <small>${consejo}</small></p>
                `;

                if (++revealed === spread.cards) {
                    readingDiv.innerHTML += `<hr><p><strong>En resumen:</strong> Amigo/a, hoy la situación gira en torno a: ${cardData[card.suit].info}</p>`;
                    exportContainer.style.display = "block";
                }
            };
            cardsDiv.appendChild(cardDiv);
        });
    };

    exportBtn.onclick = () => {
        const nombre = userNameInput.value || "Amigo/a";
        const content = `LECTURA DE BARAJA ESPAÑOLA\nPara mi amigo/a: ${nombre}\nFecha: ${new Date().toLocaleString()}\n\n${readingDiv.innerText}\n\n¡Espero que te sirva! Guárdalo para reflexionar luego.`;
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Lectura_con_${nombre}.txt`;
        a.click();
    };
};
