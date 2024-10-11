import { getData } from "./productData.mjs";

export async function getAlerts() {
    try {
        const alerts = await getData("alerts");
        return alerts;
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return [];
    }
}

export async function renderAlerts() {
    const alerts = await getAlerts();

    if (alerts.length === 0) {
        return;
    }
    
    const main = document.querySelector("main");
    const alertSection = document.createElement("section");

    alertSection.id = "alert-section"

    alerts.forEach((alert) => {
        const message = document.createElement("p");
        message.textContent = alert.message;
        message.style.color = alert.color;
        message.style.backgroundColor = alert.background;
        alertSection.appendChild(message);
    });

    main.prepend(alertSection);
}