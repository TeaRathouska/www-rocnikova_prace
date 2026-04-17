// KAROUSEL
let Slide = 0;
const slides = document.querySelectorAll(".slide");

function changeSlide(n) {
    slides[Slide].classList.remove("active");
    Slide = (Slide + n + slides.length) % slides.length;
    slides[Slide].classList.add("active");
}

// SUBMIT BUTTON PRO REZERVACI
document.getElementById("ticketForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Vaše cesta začíná! Rezervace byla odeslána na e-mail.");
});