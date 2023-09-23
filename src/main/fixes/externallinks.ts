/**
 * This function just lets us map some note links to be external links.
 * This was originally designed to link the Trilium GitHub via a note.
 */
export default function addExternalLinks(mapping: Record<string, string>) {
    for (const id in mapping) {
        const links = document.querySelectorAll<HTMLAnchorElement>(`a[href*="${id}"]`);
        if (!links.length) {
            // eslint-disable-next-line no-console
            console.warn(`Could not find link to note id ${id}`);
            continue;
        }
        for (const link of links) {
            link.href = mapping[id];
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
    }
}