/**
 * Title: Shortly
 * Description: a landing page for shorten links
 * Author: Samin Yasar
 * Date: 08/August/2021
 */

// ? Navigation Animation

const hamburgerIcon = document.getElementById("hamburgerIcon");
const navLinks = document.getElementById("navLinks");

hamburgerIcon.addEventListener("click", function () {
    if (this.classList.contains("fa-bars")) {
        // nav links is hidden
        this.classList.remove("fa-bars");
        this.classList.add("fa-times");
    } else if (this.classList.contains("fa-times")) {
        this.classList.remove("fa-times");
        this.classList.add("fa-bars");
    } else {
        return;
    }
    navLinks.classList.toggle("active-nav-links");
});

// ? Shortening Links

const shortenForm = document.getElementById("shortenForm");
const inputedLink = document.getElementById("inputedLink");
const btnShorten = document.getElementById("btnShorten");
const errorContainer = document.querySelector(".form-group:last-child");

shortenForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputedLinkValue = inputedLink.value.trim();
    if (inputedLinkValue !== "") {
        // validate input link
        inputedLink.style.borderColor = "";
        errorContainer.style.display = "";
        console.log(inputedLinkValue);
        inputedLink.value = "";
        // TODO: shorten the given link using Short.co API
    } else {
        inputedLink.style.borderColor = "hsl(0, 87%, 67%)";
        errorContainer.style.display = "block";
    }
});
