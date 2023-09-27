/**
 * This generates a docs-style sidebar navigation using the Trilium tree
 */
export default function addSideNav() {
    // Give all tier 2 list items category class... TODO: should this be done elsewhere?
    const categories = document.querySelectorAll("#menu > ul > li > ul > li");
    for (const cat of categories) cat.classList.add("category");

    // Use the active link as our reference point
    const active = document.querySelector("#menu .active");

    // From the active link, find the nearest category that is also a submenu item
    // If there is none, try to grab the nearest hidden submenu item (for non-
    // category style pages)
    const treeToClone = active?.closest(".category.submenu-item") ?? active?.closest(".submenu-item.hidden");
    if (!treeToClone) return; // If neither exist, 99% chance it's the homepage

    // Clone the found node and add it to the sidebar
    const sidebar = document.createElement("ul");
    sidebar.id = "sidebar";
    const clone = treeToClone.cloneNode(true);
    sidebar.append(clone);

    // If there's only a single item... probably not worth having a sidebar
    if (sidebar.querySelectorAll("li").length <= 1) return;

    // Add the sidebar to the front of the layout container
    const layout = document.querySelector("#layout");
    layout?.prepend(sidebar);
}