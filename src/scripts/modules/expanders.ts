// In case a linked article lead to a new tree
// const activeLink = document.querySelector("#menu a.active");
// if (activeLink) {
//     let parent = activeLink.parentElement;
//     const mainMenu = document.getElementById("#menu");
//     while (parent && parent !== mainMenu) {
//         if (parent.matches(".submenu-item") && !parent.classList.contains("expanded")) {
//             parent.classList.add("expanded");
//         }
//         parent = parent.parentElement;
//     }
// }

export default function setupExpanders() {
    const expanders = Array.from(document.querySelectorAll("#menu .submenu-item"));
    for (const ex of expanders) {
        ex.addEventListener("click", e => {
            if ((e.target as Element).closest(".submenu-item,.item") !== ex) return;
            e.preventDefault();
            e.stopPropagation();
            const ul = ex.querySelector("ul")!;
            ul.style.height = `${ul.scrollHeight}px`;
            setTimeout(() => ex.classList.toggle("expanded"), 1);
            setTimeout(() => ul.style.height = ``, 200);
        });
    }
}