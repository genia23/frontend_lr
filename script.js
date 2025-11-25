document.addEventListener("DOMContentLoaded", () => {
    const labsContainer = document.getElementById("labs");

    const start = 7;
    const end = 12;

    for (let i = start; i <= end; i++) {
        const labDiv = document.createElement("a");
        labDiv.className = "lab-card";
        labDiv.href = `lr-${i}/index.html`;

        labDiv.innerHTML = `
            <img src="lr-${i}.png" alt="LR-${i}">
            <div class="lab-title">Лабораторна робота №${i}</div>
        `;

        labsContainer.appendChild(labDiv);
    }
});