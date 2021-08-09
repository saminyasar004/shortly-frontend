/**
 * Title: Shortener
 * Description: Controls all about link shortener
 * Author: Samin Yasar
 * Date: 08/August/2021
 */

export default class Shortener {
    /**
     * Controls everything about URL shortening.
     *
     * @param {URL} inputedURL - URL which will be shorted.
     * @return {Object} -
     */
    constructor(inputedURL) {
        this.inputedURL = inputedURL;
        this.responseObj = null;

        this.apiURL = `https://api.shrtco.de/v2/shorten?url=${this.inputedURL}`;
    }

    async getData() {
        try {
            return new Promise((res, rej) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", this.apiURL);
                xhr.responseType = "json";
                xhr.send();
                xhr.onload = () => {
                    res((this.responseObj = xhr.response.result));
                };
                xhr.onerror = () => {
                    rej("There was an error on shorting URL.");
                };
            });
        } catch (err) {
            return err;
        }
    }

    /**
     * Manipulate all the essential element for a new shorted link
     *
     * @param {HTMLElement} parentEl - Where the manipulated elements will be appended.
     * @return {Object} - Return manipulated elements as an object.
     */
    manipulateDOM(parentEl) {
        const shortedLinkContainer = document.createElement("div");
        shortedLinkContainer.classList.add("shorted-link-container");
        shortedLinkContainer.innerHTML = `
            <div class="actual-link">
                <p>${this.responseObj.original_link}</p>
            </div>
            <div class="shorted-link">
                <a href="${this.responseObj.full_short_link}" target="_blank">${this.responseObj.full_short_link}</a>
                <button class="btn-primary btn-copy">copy</button>
            </div>
        `;
        parentEl.appendChild(shortedLinkContainer);
    }
}

/* 
<div class="shorted-link-container">
    <div class="actual-link">
        <p>https://saminyasar.netlify.app/</p>
    </div>
    <div class="shorted-link">
        <a href="https:/fsdaf.com" target="_blank"
            >https://fsadfa.com</a
        >
        <button class="btn-primary">copy</button>
    </div>
</div>
 */
