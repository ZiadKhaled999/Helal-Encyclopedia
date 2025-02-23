// Fetch Adhkar data from the JSON file
async function fetchAdhkar() {
    try {
        const response = await fetch('./adhkarMenu.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayCategories(Object.values(data));
    } catch (error) {
        console.error("Error fetching Adhkar data:", error);
    }
}

// Display categories dynamically
function displayCategories(data) {
    const container = document.getElementById('container');
    const backButton = document.getElementById('backButton');
    const contentView = document.getElementById('contentView');
    const categoryTitle = document.getElementById('categoryTitle');
    const itemsContainer = document.getElementById('itemsContainer');

    container.style.display = 'flex';
    contentView.style.display = 'none';

    container.innerHTML = '';
    data.forEach((category) => {
        const card = document.createElement('div');
        card.className = 'dhikr';
        card.innerText = category.category || "غير معروف";

        // On click, show category items
        card.addEventListener('click', () => {
            showCategoryItems(category);
        });

        container.appendChild(card);
    });

    function showCategoryItems(category) {
        container.style.display = 'none';
        contentView.style.display = 'flex';
        backButton.style.display = 'block';
        categoryTitle.textContent = category.category;

        itemsContainer.innerHTML = '';
        category.array.forEach((item) => {
            const textContainer = document.createElement('div');
            textContainer.className = 'text-container';

            const title = document.createElement('h3');
            title.textContent = item.title;

            const adhkar = document.createElement('p');
            adhkar.className = 'text';
            adhkar.textContent = item.adhkar;

            const description = document.createElement('p');
            description.textContent = item.description;

            const source = document.createElement('p');
            source.textContent = `المصدر: ${item.source}`;

            const count = document.createElement('span');
            count.className = 'count';
            count.textContent = `تكرار ${item.repetition} مرة`;

            textContainer.appendChild(title);
            textContainer.appendChild(adhkar);
            textContainer.appendChild(description);
            textContainer.appendChild(source);
            textContainer.appendChild(count);
            itemsContainer.appendChild(textContainer);
        });
    }

    backButton.addEventListener('click', () => {
        container.style.display = 'flex';
        contentView.style.display = 'none';
        backButton.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', fetchAdhkar);

