export default function buildBreadcrumbsFromNav() {
    const container = document.createElement("ul");
    container.id = "breadcrumbs";
    
    const current = document.querySelector("#menu .active");
    if (!current) return; // Something went really wrong
    const wrap = document.createElement("li");
    wrap.append(current.cloneNode(true));
    container.prepend(wrap);
    let next = current.closest("ul");
    while (next) {
        const clone = next?.previousElementSibling?.querySelector("a")?.cloneNode(true);
        if (!clone) continue; // This also means something went very wrong
        const wrap = document.createElement("li");
        wrap.append(clone);
        container.prepend(wrap);
        next = next?.parentElement?.closest("ul") ?? null;
        if (!next) {
            clone.textContent = "";
            const logo = document.createElement("img");
            logo.src = "https://raw.githubusercontent.com/zadam/trilium/master/images/icon-black.svg";
            clone.appendChild(logo);
        }
    }
    
    // We don't need this at root
    if (container.children.length === 1) return;
    
    const main = document.getElementById("main");
    main?.prepend(container);
}