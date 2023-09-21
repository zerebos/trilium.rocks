export default function addExternalLinks() {
    const mapping = {
        EGFtX8Uw96FQ: "https://github.com/zadam/trilium"
    };
    
    for (const id in mapping) {
        const links = document.querySelectorAll<HTMLAnchorElement>(`a[href*="${id}"]`);
        if (!links.length) {console.warn(`Could not find link to note id ${id}`); continue;}
        for (const link of links) {
            link.href = mapping[id as keyof typeof mapping];
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
    }
}