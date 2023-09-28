const slugify = (text: string) => text.toLowerCase().replace(/[^\w]/g, "-");

const getDepth = (el: Element) => parseInt(el.tagName.replace("H","").replace("h",""));

const buildItem = (heading: Element) => {
    const slug = slugify(heading.textContent ?? "");

    const anchor = document.createElement("a");
    anchor.className = "toc-anchor";
    anchor.setAttribute("href", `#${slug}`);
    anchor.setAttribute("name", slug);
    anchor.setAttribute("id", slug);
    anchor.textContent = "#";

    const link = document.createElement("a");
    link.setAttribute("href", `#${slug}`);
    link.textContent = heading.textContent;
    link.addEventListener("click", e => {
        const target = document.querySelector(`#${slug}`);
        if (!target) return;

        e.preventDefault();
        e.stopPropagation();
        
        target.scrollIntoView({behavior: "smooth"});
    });

    heading.append(anchor);

    const li = document.createElement("li");
    li.append(link);
    return li;
};

/**
 * Generate a ToC from all heading elements in the main content area.
 * This should go to full h6 depth and not be too opinionated. It 
 * does assume a "sensible" structure in that you don't go from
 * h2 > h4 > h1 but rather h2 > h3 > h2 so you change by 1 and end
 * up at the same level as before.
 */
export default function setupToC() {
    // Get all headings from the page and map them to already built elements
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    if (headings.length <= 1) return; // But if there are none, let's do nothing
    const items = headings.map(h => buildItem(h));
    
    // Setup the ToC list
    const toc = document.createElement("ul");
    toc.id = "toc";

    // Get the depth of the first content heading on the page.
    // This depth will be used as reference for all other headings.
    // headings[0] === the <h1> from Trilium
    const firstDepth = getDepth(headings[1]);

    // Loop over ALL headings including the first
    for (let h = 0; h < headings.length; h++) {
        // Get current heading and determine depth
        const current = headings[h];
        const currentDepth = getDepth(current);

        // If it's the same depth as our first heading, add to ToC
        if (currentDepth === firstDepth) toc.append(items[h]);

        // If this is the last element then it will have already
        // been added as a child or as same depth as first
        let nextIndex = h + 1;
        if (nextIndex >= headings.length) continue;

        // Time to find all children of this heading
        const children = [];
        const childDepth = currentDepth + 1;
        let depthOfNext = getDepth(headings[nextIndex]);
        while (depthOfNext > currentDepth) {
            // If it's the expected depth, add as child
            if (depthOfNext === childDepth) children.push(nextIndex);
            nextIndex++;

            // If the next index is valid, grab the depth for next loop
            // TODO: could this be done cleaner with a for loop?
            if (nextIndex < headings.length) depthOfNext = getDepth(headings[nextIndex]);
            else depthOfNext = currentDepth; // If the index was invalid, break loop
        }

        // If this heading had children, add them as children
        if (children.length) {
            const ul = document.createElement("ul");
            for (const c of children) ul.append(items[c]);
            items[h].append(ul);
        }
    }

    // Setup a moving "active" in the ToC that adjusts with the scroll state
    const sections = headings.slice(1);
    const links = toc.querySelectorAll("a");
    function changeLinkState() {
        let index = sections.length;

        // Work backkwards to find the first matching section
        while (--index && window.scrollY + 50 < (sections[index] as HTMLElement).offsetTop) {} // eslint-disable-line no-empty

        // Update the "active" item in ToC
        links.forEach((link) => link.classList.remove("active"));
        links[index].classList.add("active");
    }
    
    // Initial render
    changeLinkState();
    window.addEventListener("scroll", changeLinkState);

    // Create the toc wrapper
    const pane = document.createElement("div");
    pane.id = "toc-pane";
    
    // Create the header
    const header = document.createElement("h3");
    header.textContent = "On This Page";
    pane.append(header);
    pane.append(toc);

    // Finally, add the ToC to the end of layout. Give the layout a class for adjusting widths.
    const layout = document.querySelector("#right-pane");
    layout?.classList.add("toc");
    layout?.append(pane);
}