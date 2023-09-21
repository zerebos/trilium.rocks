export default function generateTOC() {
    const slugify = (text: string) => text.toLowerCase().replace(/[^\w]/g, "-");
    const buildItem = (heading: Element) => {
        const slug = slugify(heading.textContent ?? "");

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

    const getNum = (el: Element) => parseInt(el.tagName.replace("H","").replace("h",""));

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

        while(--index && window.scrollY + 50 < (sections[index] as HTMLElement).offsetTop) {}

        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');
    }
      
    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    const layout = document.querySelector("#layout");
    layout?.classList.add("toc");
    layout?.append(toc)
}