/**
 * This specifically fixes when you have empty corners
 * like on tables with column and row headers
 */
export default function fixTableHeaders() {
    const headers = document.querySelectorAll("th");
    for (const header of headers) {
        if (!header.textContent?.trim()) header.classList.add("empty");
    }
}