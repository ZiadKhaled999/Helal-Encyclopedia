const surahList = document.getElementById("surahList");
const surahContent = document.getElementById("surahContent");
const mainPage = document.getElementById("mainPage");
const quranPage = document.getElementById("quranPage");

let surahData = [];
let displayMode = "verseByVerse"; // Default mode
let currentSurah = null;

// Load Quran Data
fetch("Quran.json")
  .then((response) => response.json())
  .then((data) => {
    surahData = data;
    displaySurahs(surahData);
  })
  .catch((error) => console.error("Error loading Quran data:", error));

// Display Surahs List
function displaySurahs(surahs) {
  surahList.innerHTML = "";
  surahs.forEach((surah) => {
    const surahItem = document.createElement("div");
    surahItem.classList.add("surah-item");
    surahItem.innerHTML = `
      <span class="surah-number">${surah.Number}</span>
      <span class="surah-name">${surah.Name}</span>
      <div class="surah-details">عدد الآيات: ${surah.Number_Verses} | النزول: ${surah.Descent}</div>
    `;
    surahItem.onclick = () => loadSurah(surah);
    surahList.appendChild(surahItem);
  });
}

// Toggle Display Mode (inside Surah view)
function toggleDisplayMode() {
  displayMode = displayMode === "verseByVerse" ? "fullSurah" : "verseByVerse";
  document.getElementById("toggleDisplay").textContent =
    displayMode === "verseByVerse" ? "📖 عرض السورة كاملة" : "🔍 عرض آية بآية";

  if (currentSurah) {
    loadSurah(currentSurah); // Reload the Surah in the new mode
  }
}

// Load Surah Content
function loadSurah(surah) {
  currentSurah = surah;
  mainPage.style.display = "none";
  quranPage.style.display = "flex";

  // Insert Bismillah if needed (except Surah 1 & 9)
  const bismillah =
    surah.Number !== 9 && surah.Number !== 1
      ? '<div class="bismillah" style="color: blueviolet;">بِسْمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</div>'
      : "";

  let contentHTML = `
    <button id="toggleDisplay" class="toggle-button" onclick="toggleDisplayMode()">
      ${displayMode === "verseByVerse" ? "📖 عرض السورة كاملة" : "🔍 عرض آية بآية"}
    </button>
  `;

  if (displayMode === "fullSurah") {
    // Full Surah Mode
    contentHTML += `
      <div class="full-surah">
        <p class="full-surah-text" style="color: blueviolet;">${bismillah} ${surah.Surah}</p>
        <p class="full-surah-translation">${surah.Surah_English}</p>
      </div>
    `;
  } else {
    // Verse-by-Verse Mode
    contentHTML += bismillah; // Add Bismillah at the top

    contentHTML += surah.Array_Verses[0]
      .map(
        (ayah) => `
        <div class="ayah-block">
          <p class="ayah-text" style="color: blueviolet;">${ayah.ar} (${ayah.id})</p>
          <p class="ayah-translation">${ayah.en}</p>
        </div>
      `
      )
      .join("");
  }

  surahContent.innerHTML = contentHTML;
}



// Go Back to Main Page
window.goBack = function () {
  quranPage.style.display = "none";
  mainPage.style.display = "block";
};



