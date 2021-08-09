/**
 * Title: Shortly
 * Description: a landing page for shorten links
 * Author: Samin Yasar
 * Date: 08/August/2021
 */

// ? Dependencies
import Shortener from "./Shortener.js";

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
const shortedLinksContainer = document.getElementById("shortedLinksContainer");
const shortingLoader = document.getElementById("shortingLoader");

shortenForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputedLinkValue = inputedLink.value.trim();
    if (inputedLinkValue !== "") {
        inputedLink.style.borderColor = "";
        errorContainer.style.display = "";
        inputedLink.value = "";
        shortingLoader.style.display = "block";

        const shortener = new Shortener(inputedLinkValue);
        await shortener.getData();
        shortener.manipulateDOM(shortedLinksContainer);
        [...document.querySelectorAll(".btn-copy")].forEach((btnCopy) => {
            btnCopy.addEventListener("click", () => {
                [...document.querySelectorAll(".btn-copy")]
                    .filter((el) => el.classList.contains("btn-secondary"))
                    .forEach((el) => {
                        el.classList.remove("btn-secondary");
                        el.classList.add("btn-primary");
                        el.textContent = "copy";
                    });
                btnCopy.classList.remove("btn-primary");
                btnCopy.classList.add("btn-secondary");
                btnCopy.textContent = "copied!";
                const copyURL = btnCopy.previousElementSibling.href;
                const copyEl = document.createElement("input");
                copyEl.type = "text";
                copyEl.readOnly = true;
                copyEl.value = copyURL;
                document.body.appendChild(copyEl);
                copyEl.select();
                document.execCommand("copy");
                document.body.removeChild(copyEl);
            });
        });

        shortingLoader.style.display = "";
    } else {
        inputedLink.style.borderColor = "hsl(0, 87%, 67%)";
        errorContainer.style.display = "block";
    }
});
