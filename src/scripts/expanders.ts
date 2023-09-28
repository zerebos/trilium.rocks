export default function setupExpanders() {
    const expanders = Array.from(document.querySelectorAll("#menu .collapse-button"));
    for (const ex of expanders) {
        ex.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            // ex.parentElement.parentElement.classList.toggle("expanded");
            ex.closest(".submenu-item")?.classList.toggle("expanded");
        });
    }

    const activeLink = document.querySelector("#menu a.active");
    if (activeLink) {
        let parent = activeLink.parentElement;
        const mainMenu = document.getElementById("#menu");
        while (parent && parent !== mainMenu) {
            if (parent.matches(".submenu-item")) {
                parent.classList.add("expanded");
            }
            parent = parent.parentElement;
        }
    }
}