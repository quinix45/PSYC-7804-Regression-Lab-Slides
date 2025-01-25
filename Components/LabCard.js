class LabCard extends HTMLElement {
	constructor() {
		super();
		const template = document.getElementById("lab-card-template").content;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.cloneNode(true));
	}
}

customElements.define("lab-card", LabCard);