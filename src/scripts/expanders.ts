function anchorToId(anchor: HTMLAnchorElement) {
    return anchor.href.replace("./", "");
}

const stored = localStorage.getItem("expanded") ?? "[]";
let parsed: string[];
try {
    parsed = JSON.parse(stored) as string[];
}
catch (e) {
    parsed = [];
}
const state = new Set(parsed);
const submenus = Array.from(document.querySelectorAll("#menu .submenu-item"));
for (const sub of submenus) {
    try {
        if (state.has(anchorToId(sub.children[0] as HTMLAnchorElement))) sub.classList.add("expanded");
    }
    catch (e) {
        // TODO: create logger
        console.warn("Could not restore expanded state"); // eslint-disable-line no-console
        console.error(e); // eslint-disable-line no-console
    }
}

export default function setupExpanders() {
    const expanders = Array.from(document.querySelectorAll("#menu .collapse-button"));
    for (const ex of expanders) {
        ex.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            // ex.parentElement.parentElement.classList.toggle("expanded");
            ex.closest(".submenu-item")?.classList.toggle("expanded");
            const id = anchorToId(ex.closest("a")!);
            if (state.has(id)) state.delete(id);
            else state.add(id);
            localStorage.setItem("expanded", JSON.stringify([...state]));
        });
    }

    // In case a linked article lead to a new tree
    const activeLink = document.querySelector("#menu a.active");
    if (activeLink) {
        let parent = activeLink.parentElement;
        const mainMenu = document.getElementById("#menu");
        while (parent && parent !== mainMenu) {
            if (parent.matches(".submenu-item") && !parent.classList.contains("expanded")) {
                parent.classList.add("expanded");
            }
            parent = parent.parentElement;
        }
    }
}