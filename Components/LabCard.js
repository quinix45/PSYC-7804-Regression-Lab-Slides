class LabCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		alert("TEST");

		this.innerHTML = `
			<div>
				<h2>HEYO!!</h2>
			</div>
		`;
	}
}

customElements.define("lab-card", LabCard);