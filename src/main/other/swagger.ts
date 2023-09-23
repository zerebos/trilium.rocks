import SwaggerUI, {SwaggerUIOptions} from "swagger-ui";


declare const SwaggerUIBundle: typeof SwaggerUI;
const opts: SwaggerUIOptions = {
    url: "https://raw.githubusercontent.com/zadam/trilium/master/src/etapi/etapi.openapi.yaml"
};

/**
 * Add swagger to the ETAPI page!
 */
export default function injectSwagger() {
    // Check if it's the ETAPI page, otherwise avoid dependency
    const noteId = document.body.dataset.noteId;
    if (noteId !== "pPIXi0uwF5GX") return; // TODO: make this a param
    const main = document.getElementById("main")!;
    main.innerHTML = "";
    opts.domNode = main;
    // Add the swagger-ui styles from unpkg
    // TODO: make this hosted by trilium
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css";
    document.head.append(link);

    // Add the swagger-ui script too
    // TODO: make this hosted by trilium
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js";
    script.addEventListener("load", () => {
        // This immediately generated the swagger-ui in the main element
        SwaggerUIBundle(opts); // eslint-disable-line new-cap
    });
    document.head.append(script);
}