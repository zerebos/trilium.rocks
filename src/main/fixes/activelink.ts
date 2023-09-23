/**
 * For some reason Trilium share chooses to have the
 * active link be just a <strong> rather than a true
 * link with a special style. This fixes that and
 * turns the <strong> back into an actual link
 * with the correct note id.
 */
export default function fixActiveLink() {
    const active = document.querySelector("#menu strong");
    if (!active) return; // Something is really wrong
    
    // Currently active note id is stored on body
    const id = document.body.dataset.noteId;

    // Create the new link
    const link = document.createElement("a");
    link.className = "type-text active";
    link.href = ``;
    link.textContent = active.textContent;
    link.href = `./${id}`;

    // Replace the <strong>
    active.replaceWith(link);
}