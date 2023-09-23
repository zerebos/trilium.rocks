// TODO: move to common location
const parseHTML = (html: string, fragment = false) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const node = template.content.cloneNode(true);
    if (fragment) return node;
    return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
};


// TODO: See if there's a way to inject this without client-side js
const metaString = `<!-- HTML Meta Tags -->
<meta name="description" content="A website for guides, reference, showcase, inspiration, and more, all for Trilium Notes! Not convinced? Come see for yourself just what Trilium can do.">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://trilium.rocks/">
<meta property="og:type" content="website">
<meta property="og:title" content="{{title}}">
<meta property="og:description" content="A website for guides, reference, showcase, inspiration, and more, all for Trilium Notes! Not convinced? Come see for yourself just what Trilium can do.">
<meta property="og:image" content="https://github.com/zadam/trilium/wiki/images/screenshot.png">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="trilium.rocks">
<meta property="twitter:url" content="https://trilium.rocks/">
<meta name="twitter:title" content="{{title}}">
<meta name="twitter:description" content="A website for guides, reference, showcase, inspiration, and more, all for Trilium Notes! Not convinced? Come see for yourself just what Trilium can do.">
<meta name="twitter:image" content="https://github.com/zadam/trilium/wiki/images/screenshot.png">

<!-- Meta Tags Generated via https://opengraph.dev -->`;


export default function addOpenGraphMeta() {
    const currentTitle = document.querySelector("title")!;
    currentTitle.textContent = currentTitle.textContent === "Trilium Rocks" ? "Trilium Rocks - Home" : `Trilium Rocks - ${currentTitle.textContent}`;
    const nodes = parseHTML(metaString.replaceAll("{{title}}", currentTitle.textContent)) as NodeListOf<HTMLMetaElement>;
    for (const node of nodes) {
        document.head.append(node);
    }
}