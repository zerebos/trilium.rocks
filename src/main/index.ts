/* eslint-disable no-console */
import fixActiveLink from "./fixes/activelink";
import fixTableHeaders from "./fixes/tableheaders";
import highlight from "./other/highlight";
import buildSidenav from "./navigation/sidenav";
import buildBreadcrumbs from "./navigation/breadcrumbs";
import fixSubMenu from "./fixes/submenu";
import generateTOC from "./navigation/toc";
import addExternalLinks from "./fixes/externallinks";
import injectSwagger from "./other/swagger";

// https://instance-name/api/notes/vW1cXaYNN7OM/download

const EXTERNAL_LINKS = {
    EGFtX8Uw96FQ: "https://github.com/zadam/trilium"
};

function $try<T extends (...a: unknown[]) => unknown>(func: T, ...args: Parameters<T>) {
    try {
        func.apply(func, args);
    }
    catch (e) {
        console.error(e);
    }
}

// const $try = (func, ...args) => {
//     try {
//         func.apply()
//     }
// };

// Perform fixes first
$try(fixActiveLink);
$try(fixTableHeaders);
$try(fixSubMenu);
$try(addExternalLinks, EXTERNAL_LINKS);

// Now layout changes
$try(buildBreadcrumbs);
$try(buildSidenav);
$try(generateTOC);

// Finally, other features
$try(highlight);
$try(injectSwagger);


// try {fixActiveLink();}
// catch (e) {console.error(e);}

// try {highlight();}
// catch (e) {console.error(e);}

// try {fixTableHeaders();}
// catch (e) {console.error(e);}

// try{addLogo();}
// catch{}


// try {fixSubMenu();}
// catch (e) {console.error(e);}

// try {buildSidenav();}
// catch (e) {console.error(e);}

// try {buildBreadcrumbs();}
// catch (e) {console.error(e);}

// try {generateTOC();}
// catch (e) {console.error(e);}

// try {addExternalLinks(EXTERNAL_LINKS);}
// catch (e) {console.error(e);}
