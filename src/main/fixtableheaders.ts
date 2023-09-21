export default function fixTableHeaders() {
    Array.from(document.querySelectorAll("th")).forEach(el => {
        if (!el.textContent?.trim()) el.classList.add("empty");
    });
}