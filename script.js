//BURGIR MENU
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    const ikona = hamburger.querySelector("i");
    ikona.classList.toggle("fa-bars");
    ikona.classList.toggle("fa-times");
});

// Zavřít menu, když klikneš na odkaz (aby se menu schovalo po odscrollování)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const ikona = hamburger.querySelector("i");
        ikona.classList.add("fa-bars");
        ikona.classList.remove("fa-times");
    });
});

//COUNTDOWN
function aktualizujOdpocet() {
    const element = document.getElementById("countdown");
    if (!element) return;

    const pocatecniDatum = new Date("2024-01-01T00:00:00").getTime();
    const nyni = new Date().getTime();
    
    const denMs = 24 * 60 * 60 * 1000;
    const delkaOdpoctuMs = 14 * denMs; // 14 dni odpocitavani
    const celkovyCyklusMs = 15 * denMs; // 15. "stopka" (den co se nakupujou listky na tuto vystavau)

    // 
    const poziceVCyklu = (nyni - pocatecniDatum) % celkovyCyklusMs;

    if (poziceVCyklu < delkaOdpoctuMs) {
        // ODPOCET
        const zbyva = delkaOdpoctuMs - poziceVCyklu;

        const dny = Math.floor(zbyva / denMs);
        const hodiny = Math.floor((zbyva % denMs) / (1000 * 60 * 60));
        const minuty = Math.floor((zbyva % (1000 * 60 * 60)) / (1000 * 60));
        const sekundy = Math.floor((zbyva % (1000 * 60)) / 1000);

        const format = (cislo) => String(cislo).padStart(2, '0');
        element.innerHTML = `${format(dny)}d ${format(hodiny)}h ${format(minuty)}m ${format(sekundy)}s`;
        element.style.color = "#BC6FF1";
    } else {
        //  15. den
        element.innerHTML = "EXPEDICE PRÁVĚ ZAČÍNÁ!";
        element.style.color = "#ff0055"; // ZMENI SE BARVA NA CERVENOU JAKO VAROVANI
    }
}
aktualizujOdpocet();
setInterval(aktualizujOdpocet, 1000);

// KAROUSEL
let Slide = 0;
const slides = document.querySelectorAll(".slide");

function changeSlide(n) {
    slides[Slide].classList.remove("active");
    Slide = (Slide + n + slides.length) % slides.length;
    slides[Slide].classList.add("active");
}

// SUBMIT BUTTON REZERVACE
document.getElementById("ticketForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Vaše cesta začíná! Rezervace byla odeslána na e-mail.");
});

//CSV expozice
const csvData = `nazev;popis;kategorie;obrazek
Galaxie nad hlavou;Zažijte vesmír ve 360° rozlišení. Od zářících mlhovin až po horký povrch Slunce – díky unikátní projekci se ocitnete přímo uprostřed hvězdné soustavy.;Vesmír;https://www.planetum.cz/data/documents/1/6/532_ales-svoboda-krest-hniky-kdy-a-kde-planetum-karta-p.png

Expedice Mars;Ovládněte marsovské vozítko a prozkoumejte největší kaňon Sluneční soustavy. Díky hydraulickému simulátoru ucítíte každý náraz a nerovnost na vlastní kůži.;Mars;https://iqlandia.cz/application/files/thumbnails/gallery_thumbnail/4717/1042/5030/426A0658.webp

Mise Sojuz 28;Vžijte se do kůže prvního československého kosmonauta. Usedněte do věrné kopie modulu, ve kterém se Vladimír Remek v roce 1978 vracel na Zem. Zažijte ten pocit těsného prostoru a odhodlání na vlastní kůži!.;Vesmírná mise;https://iqlandia.cz/application/files/thumbnails/gallery_thumbnail/3317/1042/5041/iQLANDIA-Kosmo-Sojuz_1.webp

Operátor z Marsu;Ovládněte technologii, která zkoumá rudou planetu. Chopte se joysticku a otestujte svou přesnost při ovládání robotické ruky. Dokážete uchopit marsovský minerál stejně jako skutečná sonda?;Technologie;https://iqlandia.cz/application/files/thumbnails/gallery_thumbnail/1617/1042/5013/Web_foto_88.webp

Historie Vesmíru;Prozkoumejte unikátní sbírku historických dalekohledů a přístrojů, které změnily náš pohled na svět. Prohlédněte si skutečné meteority staré miliardy let a zjistěte, jak se měřil čas i prostor.;Historie;https://www.ntm.cz/file/2b53fc695f1492d115f2e8f9044e9acc/166/pageheader:webp/R44A6892.webp

Výstava meteoritů;Pohlédněte do tváře skutečným návštěvníkům z hlubin vesmíru. Prozkoumejte unikátní sbírku meteoritů, které dopadly na naši planetu, a zjistěte, co všechno nám tyto vesmírné kameny prozrazují o vzniku života.;Vesmír;https://cdn.myshoptet.com/usr/www.muzeum-meteoritu.cz/user/documents/upload/DSC02326-Enhanced-NR-14944.jpg`;

async function nactiExpozice() {
    const kontejner = document.getElementById("seznam-expozic");
    if (!kontejner) return;

    // Rozzdeleni dat na radky
    const radky = csvData.split('\n').filter(radek => radek.trim() !== '');
    const dataBezHlavicky = radky.slice(1);

    kontejner.innerHTML = "";

    dataBezHlavicky.forEach(radek => {
        const [nazev, popis, kategorie, obrazek] = radek.split(';');

        if (nazev) {
            const karta = document.createElement("div");
            karta.className = "expozice-karta";
            
            karta.innerHTML = `
                <img src="${obrazek}" alt="${nazev}" class="expozice-img">
                <div class="expozice-obsah">
                    <span class="stitek-vesmir">${kategorie}</span>
                    <h3>${nazev}</h3>
                    <p>${popis}</p>
                </div>
            `;
            kontejner.appendChild(karta);
        }
    });
}

window.addEventListener("DOMContentLoaded", nactiExpozice);

//RECENZE
const recenzeData = [
    { jmeno: "Petr Svoboda", text: "Úžasný zážitek! Rezervace proběhla hladce a průvodce věděl úplně všechno.", hvezdy: 5 },
    { jmeno: "Jana Novotná", text: "Krásná expozice, jen u vstupu byla menší fronta. Ale stálo to za to!", hvezdy: 4 },
    { jmeno: "Marek Marný", text: "Byli jsme zde s dětmi a moc si to užily. Interaktivní prvky nás bavily celou hodinu.", hvezdy: 5 }
];

function vykresliRecenze() {
    const kontejner = document.getElementById("seznam-recenzi");
    
    recenzeData.forEach(recenze => {
        const karta = document.createElement("div");
        karta.className = "recenze-karta";
        
        // hvezdy podle cisla
        const hvezdyHtml = "★".repeat(recenze.hvezdy) + "☆".repeat(5 - recenze.hvezdy);
        
        karta.innerHTML = `
            <div class="hvezdy">${hvezdyHtml}</div>
            <p>"${recenze.text}"</p>
            <h3>${recenze.jmeno}</h3>
        `;
        
        kontejner.appendChild(karta);
    });
}

window.addEventListener("DOMContentLoaded", vykresliRecenze);
