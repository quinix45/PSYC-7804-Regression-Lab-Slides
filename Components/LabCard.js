class LabCard extends HTMLElement {
	constructor() {
		super();
		const template = document.getElementById("lab-card-template").content;
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(template.cloneNode(true));
	}

	connectedCallback() {
		
		const labNumber = this.getAttribute('lab-number');
		
		let labNumberBox = this.shadowRoot.getElementById('lab-number-box');
		labNumberBox.innerText = labNumber;

		let slidesButton = this.shadowRoot.getElementById('slides-button');
		slidesButton.onclick = () => window.open(`./Slides%20Files/Lab%20${labNumber}.html`, '_blank');

		let codeLink = this.shadowRoot.getElementById('code-link');
		codeLink.setAttribute('href', `./Slides Files/Lab Code/Lab ${labNumber} Code.Rmd`);
		codeLink.setAttribute('download', `Lab_${labNumber}_code.Rmd`);

		let activityLink = this.shadowRoot.getElementById('activity-link');
		activityLink.setAttribute('href', `./Lab Activities/Lab ${labNumber} Activity.Rmd`);
		activityLink.setAttribute('download', `Lab_${labNumber}_activity.Rmd`);
	}
}

customElements.define("lab-card", LabCard);