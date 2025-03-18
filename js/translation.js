import { Translator, Language, setActiveLanguage } from "https://tyuxx.github.io/tyuLIB/lib/ddcTranslate/translator.js";

var translator = new Translator([
    new Language("English", "en-us", {
        "toggleTheme": "Toggle Dark Mode",
        "start": "Start",
        "stop": "Stop",
        "refreshAlgorithms": "Refresh Algorithms",
        // New keys for script.js
        "selectAlgorithmInfo": "Select an algorithm to begin",
        "selectAlgorithmFirst": "Please select an algorithm first!",
        "noneOption": "None",
    }, false),
    new Language("Türkçe", "tr-tr", {
        "toggleTheme": "Karanlık Modu Aç/Kapat",
        "start": "Başlat",
        "stop": "Durdur",
        "refreshAlgorithms": "Algoritmaları Yeniden Yükle",
        // New keys for script.js
        "selectAlgorithmInfo": "Başlamak için bir algoritma seçin",
        "selectAlgorithmFirst": "Lütfen önce bir algoritma seçin!",
        "noneOption": "Hiçbiri",
    }, false),
]);

let languageSelect = document.getElementById("lSelect");
for (const lang of translator.langlist) {
    let option = document.createElement("option");
    option.value = lang.id;
    option.innerText = lang.name;
    languageSelect.appendChild(option);
}
languageSelect.addEventListener("change", () => {
    setActiveLanguage(languageSelect.value);
    translator.translatePageToActive();
    console.log("Language changed to " + languageSelect.value);
});

window.translator = translator;