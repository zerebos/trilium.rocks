/**
 * General premise here is to find all submenus/sublists
 * and give them a submenu class. Then any list item 
 * that contains one of these submenus gets a submenu-item 
 * class. Additionally, any sublist that itself has a 
 * sublist is given the class hasSubmenu.
 */
export default function fixSubMenu(submenuBlacklist: string[]) {
    // Get every list item in the navigation
    const items = document.querySelectorAll("#menu ul li");
    for (const item of items) {
        const sublist = item.querySelector("ul");
        
        // If the list item has no submenu, ignore and move on
        if (!sublist) continue;

        // There seems to be some weird edge cases where a 
        // sublist ul is added but has no list items and
        // in trilium the corresponding note has no children
        if (!sublist.children.length) {
            sublist.remove();
            continue;
        }

        // If the submenu is part of our blacklist, then
        // give it the hidden class. This is for pages
        // that have no subcategories and only a long
        // list of subpages.
        const ihtml = item.innerHTML;
        for (const bl of submenuBlacklist) {
            if (!ihtml.includes(bl)) continue;
            item.classList.add("hidden");
        }

        // Finally, add the corresponding classes to the elements
        item.classList.add("submenu-item");
        sublist.classList.add("submenu");

        // Currently, this is only used by the sidebar styles to
        // adjust margins. TODO: Might be worth investigating a
        // different method.
        if (sublist.querySelector("ul")?.children.length) sublist.classList.add("hasSubmenu");

    }
}