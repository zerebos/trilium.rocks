export default function addSideNav() {
    const categories = document.querySelectorAll("#menu > ul > li > ul > li");
    for (const cat of categories) cat.classList.add("category");
    const active = document.querySelector("#menu .active");
    const treeToClone = active?.closest(".category.submenu-item") ?? active?.closest(".submenu-item.hidden");
    if (!treeToClone) return; // probably homepage
    const layout = document.querySelector("#layout");
    const sidebar = document.createElement("ul");
    sidebar.id = "sidebar";
    const clone = treeToClone.cloneNode(true);
    /*const title = document.createElement("div");
    title.className = "title";
    title.append(clone.querySelector("p > a"));
    sidebar.append(title);
    sidebar.append(clone.querySelector("ul"));*/
    sidebar.append(clone);
    if (sidebar.querySelectorAll("li").length <= 1) return;
    layout?.prepend(sidebar);
}