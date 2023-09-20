// https://instance-name/api/notes/vW1cXaYNN7OM/download

function addHljs() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "api/notes/cVaK9ZJwx5Hs/download";
    document.head.append(link);

    const script = document.createElement("script");
    script.src = "api/notes/6PVElIem02b5/download";
    script.addEventListener("load", () => {
        hljs.registerAliases(["application-javascript-env-frontend", "application-javascript-env-backend"], {languageName: "javascript"});
        hljs.addPlugin({
            "after:highlight": (result) => {
                // Add api global
                result.value = result.value.replaceAll(/([^A-Za-z0-9])api\./g, function(match, prefix) {
                    return `${prefix}<span class="hljs-variable language_">api</span>.`;
                });

                // Add jquery global
                result.value = result.value.replaceAll(/([^A-Za-z0-9\.])\$\((.+)\)/g, function(match, prefix, variable) {
                    return `${prefix}<span class="hljs-variable language_">$(</span>${variable}<span class="hljs-variable language_">)</span>`;
                });
            }
        })
        hljs.highlightAll();
    });
    document.head.append(script);
}

function fixTableHeaders() {
    Array.from(document.querySelectorAll("th")).forEach(el => {
        if (!el.textContent.trim()) el.classList.add("empty");
    });
}

/*Array.from(document.querySelectorAll("pre code")).forEach(el => {
    if (el.className.includes("javascript-env")) el.className = "language-javascript";
});*/

function addLogo() {
    const logo = document.createElement("img");
    logo.src = "https://raw.githubusercontent.com/zadam/trilium/master/images/icon-color.svg";
    logo.id = "logo";
    document.querySelector("#menu > p").append(logo);
}


function fixActiveLink() {
    const active = document.querySelector("#menu strong");
    const link = document.createElement("a");
    link.className = "type-text active";
    link.href = ``;
    link.textContent = active.textContent;
    active.replaceWith(link);
    const id = document.body.dataset.noteId;
    link.href = `./${id}`;
    
    /*fetchNote().then(note => {
        link.href = `./${note.noteId}`;
    });*/
}

function addSideNav() {
    const categories = document.querySelectorAll("#menu > ul > li > ul > li");
    for (const cat of categories) cat.classList.add("category");
    const active = document.querySelector("#menu .active");
    const treeToClone = active.closest(".category.submenu-item") ?? active.closest(".submenu-item.hidden");
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
    layout.prepend(sidebar);
}


async function buildBreadcrumbs() {
    const main = document.getElementById("main");
    const placeholder = document.createElement("div");
    placeholder.id = "breadcrumbs";
    const pspan = document.createElement("span");
    const plink = document.createElement("a");
    pspan.append(plink);
    plink.href = "#";
    plink.textContent = document.getElementById("title").textContent;
    placeholder.append(pspan);
    main.prepend(placeholder);
    
    const container = document.createElement("div");
    container.id = "breadcrumbs";

    // const notePath = [];
    
    let currentNote, parentId;
    do {
        currentNote = await fetchNote(parentId);
        const span = document.createElement("span");
        const link = document.createElement("a");
        link.className = "type-text";
        link.href = `./${currentNote.noteId}`;
        link.textContent = currentNote.title;
        // notePath.splice(0, 0, link);
        span.append(link);
        container.prepend(span)
        parentId = currentNote.parentNoteIds[0];
        if (parentId === "_share") {
            link.textContent = "";
            const logo = document.createElement("img");
            logo.src = "https://raw.githubusercontent.com/zadam/trilium/master/images/icon-black.svg";
            link.append(logo);
        }
    } while(parentId !== "_share")
        
    if (container.children.length === 1) return;
    
    placeholder.replaceWith(container);
    /*let currentNote = await fetchNote();
    let parentId = currentNote.parentNoteIds[0];
    while (parentId !== "_share") {
        notePath.splice(0, 0, currentNote.title);
        parentId = currentNote.parentNoteIds[0];
        currentNote = await fetchNote(parentId);
    }*/
    
    // console.log(notePath);
}



function buildBreadcrumbsFromNav() {
    const container = document.createElement("ul");
    container.id = "breadcrumbs";
    
    const current = document.querySelector("#menu .active");
    const wrap = document.createElement("li");
    wrap.append(current.cloneNode(true));
    container.prepend(wrap);
    let next = current.closest("ul");
    while (next) {
        const clone = next.previousElementSibling.querySelector("a").cloneNode(true);
        const wrap = document.createElement("li");
        wrap.append(clone);
        container.prepend(wrap);
        next = next.parentElement.closest("ul");
        if (!next) {
            clone.textContent = "";
            const logo = document.createElement("img");
            logo.src = "https://raw.githubusercontent.com/zadam/trilium/master/images/icon-black.svg";
            clone.append(logo);
        }
    }
    
    // We don't need this at root
    if (container.children.length === 1) return;
    
    const main = document.getElementById("main");
    main.prepend(container);
}

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

function fixSubMenu() {
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


function generateTOC() {
    const slugify = text => text.toLowerCase().replace(/[^\w]/g, "-");
    const buildItem = (heading) => {
        const slug = slugify(heading.textContent);

        const anchor = document.createElement("a");
        anchor.setAttribute("href", `#${slug}`);
        anchor.setAttribute("name", slug);
        anchor.setAttribute("id", slug);
        anchor.textContent = "#";

        const link = document.createElement("a");
        link.setAttribute("href", `#${slug}`);
        link.textContent = heading.textContent;

        heading.append(anchor);

        const li = document.createElement("li");
        li.append(link);
        return li;
    };

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const items = headings.map(h => buildItem(h));
    if (headings.length <= 1) return;

    const getNum = el => parseInt(el.tagName.replace("H","").replace("h",""));

    const toc = document.createElement("ul");
    toc.id = "toc";
    const first = headings[1];
    const firstDepth = getNum(first);

    for (let h = 0; h < headings.length; h++) {
        const current = headings[h];
        const currentDepth = getNum(current);
        if (currentDepth === firstDepth) toc.append(items[h]);

        let nextIndex = h + 1;
        if (nextIndex >= headings.length) continue;

        const children = [];
        const childDepth = currentDepth + 1;
        let nextDepth = getNum(headings[nextIndex]);
        while (nextDepth > currentDepth) {
            if (nextDepth === childDepth) children.push(nextIndex);
            nextIndex++;
            if (nextIndex < headings.length) nextDepth = getNum(headings[nextIndex]);
            else nextDepth = currentDepth;
        }

        if (children.length) {
            const ul = document.createElement("ul");
            for (const c of children) ul.append(items[c]);
            items[h].append(ul);
        }
    }

    const sections = headings.slice(1);
    const links = toc.querySelectorAll("a");
    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');
    }
      
    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    const layout = document.querySelector("#layout");
    layout.classList.add("toc");
    layout.append(toc)
}

function addExternalLinks() {
    const mapping = {
        EGFtX8Uw96FQ: "https://github.com/zadam/trilium"
    };
    
    for (const id in mapping) {
        const links = document.querySelectorAll(`a[href*="${id}"]`);
        if (!links.length) {console.warn(`Could not find link to note id ${id}`); continue;}
        for (const link of links) {
            link.href = mapping[id];
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
    }
}



try{fixActiveLink();} catch(e){console.error(e)}
try{addHljs();} catch(e){console.error(e)}
try{fixTableHeaders();} catch(e){console.error(e)}
// try{addLogo();} catch{}

try{fixSubMenu();} catch(e){console.error(e)}
try{addSideNav();} catch(e){console.error(e)}
try{buildBreadcrumbsFromNav();} catch(e){console.error(e)}
try{generateTOC();} catch(e){console.error(e)}
try{addExternalLinks();} catch(e){console.error(e)}