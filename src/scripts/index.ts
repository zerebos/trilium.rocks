// import fixActiveLink from "./fixes/activelink";
// import fixTableHeaders from "./fixes/tableheaders";
import highlight from "./other/highlight";
// import buildSidenav from "./navigation/sidenav";
// import buildBreadcrumbs from "./navigation/breadcrumbs";
// import fixSubMenus from "./fixes/submenu";
import generateTOC from "./navigation/toc";
// import addExternalLinks from "./fixes/externallinks";
// import injectSwagger from "./other/swagger";
// import makeMobileMenu from "./other/mobile";
import setupExpanders from "./expanders";
import setupMobileMenu from "./mobile";
import setupSearch from "./search";
import setupThemeSelector from "./theme";


// const ETAPI_REF_NOTE_ID = "pPIXi0uwF5GX";
// const HIDDEN_SUBMENUS = ["blog"];
// const EXTERNAL_LINKS = {
//     EGFtX8Uw96FQ: "https://github.com/zadam/trilium",
//     dXAKFE0fJtom: "https://discord.gg/eTaTXUgcBr"
// };
// const ALIASES = {
//     WqBnya4Ye8rS: "",
//     ZapIU17QNEyU: "blog"
// };

function $try<T extends (...a: unknown[]) => unknown>(func: T, ...args: Parameters<T>) {
    try {
        func.apply(func, args);
    }
    catch (e) {
        console.error(e); // eslint-disable-line no-console
    }
}

/**
 * Lots of these functions seem to depend on each other indirectly
 * through DOM changes or classes or what-have-you. This is
 * obviously not ideal as it makes things less clear, and also
 * makes TypeScript less helpful.
 * 
 * TODO: Find a good way of restructuring that allows things
 * to act a bit more harmoniously.
 * 
 * TODO: Make use of esbuild's define api to enable a debug
 * build that contains all the console logs and such.
 */

// Perform fixes first
// $try(fixActiveLink, ALIASES);
// $try(fixTableHeaders);
// $try(fixSubMenus, HIDDEN_SUBMENUS);
// $try(addExternalLinks, EXTERNAL_LINKS);

// Now layout changes
// $try(buildBreadcrumbs);
// $try(buildSidenav);
$try(generateTOC);

// Finally, other features
$try(highlight);
// $try(injectSwagger, ETAPI_REF_NOTE_ID);

$try(setupExpanders);
$try(setupMobileMenu);
$try(setupSearch);
$try(setupThemeSelector);
// $try(makeMobileMenu);

/**
 * This was removed because both the title change and the opengraph
 * additions are now handled by a traefik plugin that rewrites
 * the body of the http request, that way the change does not
 * require client-side JS. This is important for sites wishing
 * to display that information.
 * 
 * TODO: Determine how reasonable it would be to move more
 * of these modules over to a traefik rewrite plugin. This gives
 * a better experience to end users, SEO, etc.
 */
// $try(addOpenGraphMeta);
