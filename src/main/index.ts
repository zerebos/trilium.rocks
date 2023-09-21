import fixActiveLink from "./fixactivelink";
import fixTableHeaders from "./fixtableheaders";
import highlight from "./highlight";
import buildSidenav from "./sidenav";
import buildBreadcrumbs from "./breadcrumbs";
import fixSubMenu from "./submenu";
import generateTOC from "./toc";
import addExternalLinks from "./externallinks";

// https://instance-name/api/notes/vW1cXaYNN7OM/download


try{fixActiveLink();} catch(e){console.error(e)}
try{highlight();} catch(e){console.error(e)}
try{fixTableHeaders();} catch(e){console.error(e)}
// try{addLogo();} catch{}

try{fixSubMenu();} catch(e){console.error(e)}
try{buildSidenav();} catch(e){console.error(e)}
try{buildBreadcrumbs();} catch(e){console.error(e)}
try{generateTOC();} catch(e){console.error(e)}
try{addExternalLinks();} catch(e){console.error(e)}