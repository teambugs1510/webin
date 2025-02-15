document.addEventListener("DOMContentLoaded", function () {
    let savedColor = localStorage.getItem("themeColor") || "#ff69b4";
    let textColor = localStorage.getItem("textColor") || "#ffffff";
    let bgColor = localStorage.getItem("bgColor") || "#ffffff";
    applyTheme(savedColor, textColor, bgColor);
    loadCustomThemes();
});

function changeTheme(color, textColor, bgColor) {
    localStorage.setItem("themeColor", color);
    localStorage.setItem("textColor", textColor);
    localStorage.setItem("bgColor", bgColor);
    applyTheme(color, textColor, bgColor);
}

function applyTheme(color, textColor, bgColor) {
    document.documentElement.style.setProperty('--main-color', color);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--bg-color', bgColor);
}

function applyPresetTheme(preset) {
    const themes = {
        "default": ["#ff69b4", "#ffffff", "#ffa500"],
        "dark": ["#000000", "#ffffff", "#808080"],
        "blue": ["#007bff", "#ffffff", "#87cefa"]
    };
    
    if (themes[preset]) {
        changeTheme(...themes[preset]);
    }
}

function saveCustomTheme() {
    const themeName = document.getElementById("themeName").value.trim();
    const primaryColor = document.getElementById("themeSelector").value;
    const textColor = document.getElementById("textColor").value;
    const bgColor = document.getElementById("bgColor").value;

    if (!themeName) {
        alert("Please enter a theme name.");
        return;
    }

    let customThemes = JSON.parse(localStorage.getItem("customThemes")) || {};
    customThemes[themeName] = [primaryColor, textColor, bgColor];
    localStorage.setItem("customThemes", JSON.stringify(customThemes));

    loadCustomThemes();
}

function loadCustomThemes() {
    let customThemes = JSON.parse(localStorage.getItem("customThemes")) || {};
    let themeSelect = document.getElementById("customThemes");
    
    themeSelect.innerHTML = '<option value="">Select a custom theme</option>';
    for (let theme in customThemes) {
        let option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        themeSelect.appendChild(option);
    }
}

function applyCustomTheme(themeName) {
    let customThemes = JSON.parse(localStorage.getItem("customThemes")) || {};
    if (customThemes[themeName]) {
        changeTheme(...customThemes[themeName]);
    }
}
