
let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;

const butonStart = document.getElementById("start");
const zonaScor = document.getElementById("scor");
const zonaIntrebare = document.getElementById("intrebare");
const zonaRaspunsuri = document.getElementById("raspunsuri");
const zonaMesaj = document.getElementById("mesaj");

const intrebari = [
    {
        text: "Ce număr urmează în șirul: 2, 4, 6, 8, ...?",
        variante: ["9", "10", "12"],
        corect: 1
    },
    {
        text: "Ce număr urmează: 5, 10, 15, 20, ...?",
        variante: ["25", "22", "30"],
        corect: 0
    },
    {
        text: "Dacă 2 pisici au câte 4 picioare, câte picioare au în total?",
        variante: ["4", "6", "8"],
        corect: 2
    },
    {
        text: "Ce simbol urmează: ▲ ● ▲ ● ▲ ...?",
        variante: ["▲", "●", "■"],
        corect: 1
    },
    {
        text: "Maria este mai înaltă decât Ana, iar Ana este mai înaltă decât Ioana. Cine este cea mai înaltă?",
        variante: ["Ana", "Ioana", "Maria"],
        corect: 2
    }
];

butonStart.addEventListener("click", function () {
    butonStart.style.display = "none";
    afiseazaIntrebare();
});

function afiseazaIntrebare() {
    raspunsDat = false;
    zonaIntrebare.textContent =
        "Întrebarea " + (indexIntrebare + 1) + " din " +
        intrebari.length + ": " + intrebari[indexIntrebare].text;

    zonaRaspunsuri.innerHTML = "";
    zonaMesaj.textContent = "";

    intrebari[indexIntrebare].variante.forEach(function (varianta, i) {
        const buton = document.createElement("button");
        buton.textContent = varianta;
        buton.style.margin = "6px";
        buton.style.padding = "10px 18px";
        buton.style.borderRadius = "8px";
        buton.style.border = "2px solid #E85D9E";
        buton.style.cursor = "pointer";

        buton.addEventListener("click", function () {
            verifica(i);
        });

        zonaRaspunsuri.appendChild(buton);
    });
}

function verifica(alegere) {
    if (raspunsDat) {
        return;
    }

    raspunsDat = true;

    const intrebareCurenta = intrebari[indexIntrebare];

    if (alegere === intrebareCurenta.corect) {
        scor += 10;
        zonaMesaj.textContent = "Corect! Ai câștigat 10 puncte! ⭐";
    } else {
        zonaMesaj.textContent =
            "Nu chiar! Răspunsul corect era: " +
            intrebareCurenta.variante[intrebareCurenta.corect];
    }

    zonaScor.textContent = "⭐ Scor: " + scor;

    zonaRaspunsuri.querySelectorAll("button").forEach(function (buton) {
        buton.disabled = true;
    });

    const butonUrmator = document.createElement("button");
    butonUrmator.textContent =
        indexIntrebare === intrebari.length - 1
            ? "Vezi rezultatul final"
            : "Următoarea întrebare →";

    butonUrmator.style.marginTop = "15px";
    butonUrmator.style.padding = "12px 18px";
    butonUrmator.style.border = "none";
    butonUrmator.style.borderRadius = "10px";
    butonUrmator.style.backgroundColor = "#159A9C";
    butonUrmator.style.color = "white";
    butonUrmator.style.cursor = "pointer";

    butonUrmator.addEventListener("click", function () {
        indexIntrebare++;

        if (indexIntrebare < intrebari.length) {
            afiseazaIntrebare();
        } else {
            afiseazaRezultatFinal();
        }

        butonUrmator.remove();
    });

    zonaRaspunsuri.appendChild(butonUrmator);
}

function afiseazaRezultatFinal() {
    zonaIntrebare.textContent = "🎉 Ai terminat toate întrebările!";
    zonaRaspunsuri.innerHTML = "";
    zonaMesaj.textContent =
        "Scorul tău final este " + scor + " din " +
        (intrebari.length * 10) + " puncte. Bravo, detectivule!";
}
