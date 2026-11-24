
let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;
let raspunsuriCorecte = 0;

// Bara de progres din stânga
const baraProgres = document.getElementById("progres-total");
const textProgres = document.getElementById("procent-total");

// Bara de progres din provocarea zilei
const baraProgresQuiz = document.getElementById("progres");
const textProgresQuiz = document.getElementById("procent");

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
    actualizeazaProgres();
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
function actualizeazaProgres() {
    const procent = (raspunsuriCorecte / intrebari.length) * 100;

    // Actualizăm progresul din stânga
    baraProgres.style.width = procent + "%";
    textProgres.textContent = procent + "%";

    // Actualizăm progresul din quiz
    baraProgresQuiz.style.width = procent + "%";
    textProgresQuiz.textContent = procent + "%";
}
function verifica(alegere) {
    if (raspunsDat) {
        return;
    }

    raspunsDat = true;

    const intrebareCurenta = intrebari[indexIntrebare];

    if (alegere === intrebareCurenta.corect) {
    scor += 10;
    raspunsuriCorecte++;
    zonaMesaj.textContent = "Corect! Ai câștigat 10 puncte! ⭐";
    actualizeazaProgres();
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

// ===== NAVIGARE AVENTURĂ =====

const butonAventura = document.getElementById("buton-aventura");
const aventuraSection = document.getElementById("aventura-section");
const butonInapoi = document.getElementById("inapoi-acasa");

if (butonAventura && aventuraSection && butonInapoi) {
    butonAventura.addEventListener("click", function () {
        document.querySelectorAll("main > section").forEach(function (sectiune) {
            sectiune.hidden = true;
        });

        aventuraSection.hidden = false;
    });

    butonInapoi.addEventListener("click", function () {
        aventuraSection.hidden = true;

        document.querySelectorAll("main > section").forEach(function (sectiune) {
            if (sectiune.id !== "aventura-section") {
                sectiune.hidden = false;
            }
        });
    });
}

// ===== NIVELURI AVENTURĂ =====

const niveluriAventura = document.querySelectorAll(".adventure-node");

niveluriAventura.forEach(function(nivel) {
    nivel.addEventListener("click", function() {

        if (nivel.classList.contains("locked")) {
            alert("🔒 Acest nivel este încă blocat! Termină mai întâi misiunea anterioară.");
            return;
        }

        const numarNivel = nivel.dataset.level;

        if (numarNivel === "1") {
            alert("🏡 Bine ai venit în Satul misterios! Pregătește-te pentru prima misiune!");
        }

    });
});
