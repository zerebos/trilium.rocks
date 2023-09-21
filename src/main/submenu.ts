const submenuBlacklist = ["ZapIU17QNEyU"]
//if (item.innerHTML.includes(submenuBlacklist[0])) item.className += " hidden";
/*function fixSubMenu() {
    const items = document.querySelectorAll("#menu > ul > li");
    for (const item of items) {
        const sublist = item.querySelector("ul");
        if (sublist) {
            if (sublist.children.length) {
                item.className = "submenu";
            }
            else {
                sublist.remove();
            }
        }
    }
}*/

export default function fixSubMenu() {
    const items = document.querySelectorAll("#menu ul li");
    for (const item of items) {
        const sublist = item.querySelector("ul");
        if (sublist) {
            if (sublist.children.length) {
                const ihtml = item.innerHTML;
                for (const bl of submenuBlacklist) {
                    if (!ihtml.includes(bl)) continue;
                    item.classList.add("hidden");
                }
                item.classList.add("submenu-item");
                sublist.classList.add("submenu");
                if (sublist.querySelector("ul")?.children.length) sublist.classList.add("hasSubmenu");
            }
            else {
                sublist.remove();
            }
        }
    }
}