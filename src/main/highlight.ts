import {HLJSApi} from "highlight.js";

declare const hljs: HLJSApi;

export default function addHljs() {
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