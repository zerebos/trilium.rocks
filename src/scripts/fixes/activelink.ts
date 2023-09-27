/**
 * For some reason Trilium share chooses to have the
 * active link be just a <strong> rather than a true
 * link with a special style. This fixes that and
 * turns the <strong> back into an actual link
 * with the correct note id.
 * 
 * TODO: make it fix aliases too
 */
export default function fixActiveLink(aliases: Record<string, string>) {
    const active = document.querySelector("#menu strong");
    if (!active) return; // Something is really wrong
    
    // Currently active note id is stored on body
    const id = document.body.dataset.noteId!;
    const href = aliases[id] ?? id;

    // Create the new link
    const link = document.createElement("a");
    link.className = "type-text active";
    link.href = ``;
    link.textContent = active.textContent;
    link.href = `./${href}`;

    // Replace the <strong>
    active.replaceWith(link);
}