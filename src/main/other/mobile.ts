const parseHTML = (html: string, fragment = false) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const node = template.content.cloneNode(true);
    if (fragment) return node;
    return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
};

const goBackString = `<li id="go-back"><p><a class="type-text" href="#">↩ Back to Main Menu</a></p></li>`;
const menuButtonString = `<button id="menuButton" class="expand left" aria-label="Menu">
<span class="rectangle"></span>
<span class="rectangle"></span>
<span class="rectangle"></span>
</button>`;

const isMobileAgent = /Mobi/.test(navigator.userAgent);
const isMobileSize = window.matchMedia("only screen and (max-width: 760px)").matches;

// TODO: maybe re-work this to have #sidebar be later than #menu
// then use #menu.expanded ~ #sidebar for showing the sidebar
// that way less JS is involved to make mobile work properly
export default function makeMobileMenu() {
    if (!isMobileAgent && !isMobileSize) return; // If nothing indicates mobile, bail out
    const menuWrap = document.querySelector("#menu");
    const mainMenu = document.querySelector("#menu > ul");
    if (!menuWrap || !mainMenu) return; // Something went really wrong...
    const sidebar = document.querySelector("#sidebar");

    const toggleMenu = (event: MouseEvent) => {
        event.stopPropagation(); // Don't preventDefault to allow links
        
        const isVisible = menuWrap.classList.contains("expanded");

        if (isVisible) {
            menuWrap.classList.remove("expanded");
            if (sidebar) {
                mainMenu.classList.remove("active");
                if (!sidebar.classList.contains("active")) sidebar.classList.add("active");
            }
        }
        else {
            menuWrap.classList.add("expanded");
        }
    };

    const menuButton = parseHTML(menuButtonString) as HTMLButtonElement;
    menuButton.addEventListener("click", toggleMenu);

    window.addEventListener("click", e => {
        const isVisible = menuWrap.classList.contains("expanded");
        if (!isVisible) return; // This is only for when the menu is open
        toggleMenu(e);
    });

    
    if (sidebar) {        
        const goBackButton = parseHTML(goBackString) as HTMLLIElement;
        goBackButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            mainMenu.classList.add("active");
            sidebar.classList.remove("active");
        });

        sidebar.prepend(goBackButton);
    }


    if (sidebar) sidebar.classList.add("active");
    else mainMenu.classList.add("active");

    menuWrap.append(menuButton);
    if (sidebar) menuWrap.append(sidebar);
}