export default function fixActiveLink() {
    const active = document.querySelector("#menu strong");
    if (!active) return; // Something is really wrong
    const link = document.createElement("a");
    link.className = "type-text active";
    link.href = ``;
    link.textContent = active.textContent;
    active.replaceWith(link);
    const id = document.body.dataset.noteId;
    link.href = `./${id}`;
}