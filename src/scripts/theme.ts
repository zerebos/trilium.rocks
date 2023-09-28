export default function setupThemeSelector() {
    const themeSwitch: HTMLInputElement = document.querySelector(".theme-selection input")!;
    themeSwitch?.addEventListener("change", () => {
        if (themeSwitch.checked) {
            document.body.classList.add("theme-dark");
            document.body.classList.remove("theme-light");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
            localStorage.setItem("theme", "light");
        }
    });

    const preference = localStorage.getItem("theme");
    if (preference) {
        if (preference === "dark") {
            document.body.classList.add("theme-dark");
            document.body.classList.remove("theme-light");
        }
        else {
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
        }
    }
}