
// ======================= script.js =======================
function goToPage(pageNumber) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector('.page-' + pageNumber).classList.add('active');

    if (pageNumber === 2) loadCards();
    if (pageNumber === 3) loadDatePlan();
}

const cardsData = [
    { img: './media/roseday.png', text: 'Day 1 – Rose Day 🌹 This day was for the girl who is as soft and beautiful as a rose, someone whose presence itself feels gentle and special.' },
    { img: './media/proposeday.png', text: 'Day 2 – Propose Day 💍 I could propose to you a thousand times if you let me, because every single time, I’d still choose you as my partner all over again.' },
    { img: './media/chocolateday.png', text: 'Day 3 - Chocolate Day 🍫 Thoda late ho Gaya tha but dusre din humne manage kar liya tha 😗...' },
    { img: './media/teddyday.png', text: "Day 4 - Teddy Day 🧸 Abh meri teddy ko kisi aur teddy ki kya jarurat hai... Bas khud ko mujhe gift kar de... I'll also get one 😉..." },
    { img: './media/promiseday.png', text: "Day 5 – Promise Day 🤞🏻 I have given many promises but I forget to give you one... That after every fight, I'll be the who will love you the most among both of us.." },
    { img: './media/hugday.jpeg', text: 'Day 6 – Hug Day 🫂 Yeh toh bohot baad me Mila but I felt so relaxed in your arms that I just wanted to be there for hours 🫠' },
    { img: './media/kissday.jpeg', text: 'Day 7 – Kiss Day 😘 Yeh bol nahi sakte... Thoda sensor wala topic hai but we both know 😗' },
    { img: './media/intro.webp', text: 'One Last Step 💖 (Click to Continue)' }
];

const datePlanData = [
    {
        img: './media/moviedate.jpeg',
        title: 'Movie Time 🎥',
        text: 'Mene socha kyu na pehle ek movie ho jaye jaha ache se ek dusre ke baaju me baith kar saath me hase aur roye 😗'
    },
    {
        img: './media/foodadda.jpeg',
        title: 'Lunch Together 🍽️',
        text: "Haa haa don't worry... Tune joh boli thi wohi jagah hai... Usko bhi plan me include Kiya hai mene 😉"
    },
    {
        img: './media/afterlunch.jpeg',
        title: 'Peaceful Evening 🌅',
        text: 'Here we can go so that we can have some beautiful and peaceful quality time and end the day with some sweet memories... 😁'
    }
];

function loadCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';

    let index = 0;

    const interval = setInterval(() => {
        const data = cardsData[index];

        const card = document.createElement('div');
        card.className = 'card';

        // Split text into title and description more accurately
        const text = data.text;

        // Pattern to match "Day X - Name emoji" followed by description
        // This captures the day number, name, and emoji as title
        const matchPattern = /^(Day \d+\s*[–-]\s*.+?[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])\s+(.+)$/u;
        const match = text.match(matchPattern);

        let title, description;
        if (match) {
            title = match[1].trim(); // Day + number + name + emoji
            description = match[2].trim(); // Rest of the text
        } else {
            // Fallback: find the first occurrence of common description starter words
            const descriptionStarters = ['This', 'I could', 'Mene', 'Abh', 'Yeh', 'Thoda', 'One Last'];
            let splitIndex = -1;

            for (const starter of descriptionStarters) {
                splitIndex = text.indexOf(starter);
                if (splitIndex > 0) { // Must be after some content (day info)
                    break;
                }
            }

            if (splitIndex > 0) {
                // Find the space before the starter word
                const prevSpace = text.lastIndexOf(' ', splitIndex - 1);
                if (prevSpace > 0) {
                    title = text.substring(0, prevSpace).trim();
                    description = text.substring(prevSpace + 1).trim();
                } else {
                    title = text.substring(0, splitIndex).trim();
                    description = text.substring(splitIndex).trim();
                }
            } else {
                // Ultimate fallback - split after first 5 words
                const words = text.split(' ');
                title = words.slice(0, 5).join(' ');
                description = words.slice(5).join(' ');
            }
        }

        card.innerHTML = `
            <img src="${data.img}" onerror="this.src='./media/placeholder.jpg'">
            <h3 class="card-title">${title}</h3>
            <p class="card-description">${description}</p>
        `;

        // Navigate to page 3 only on the last card (8th card, index 7)
        if (index === cardsData.length - 1) {
            card.addEventListener('click', () => goToPage(3));
            card.style.cursor = 'pointer';
            card.style.border = '2px solid #ff758c';
        }

        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), 100);

        index++;
        if (index === cardsData.length) clearInterval(interval);
    }, 1000);
}

function loadDatePlan() {
    const grid = document.getElementById('dateCardsGrid');
    grid.innerHTML = '';

    let index = 0;

    const interval = setInterval(() => {
        const data = datePlanData[index];

        const card = document.createElement('div');
        card.className = 'date-card';

        card.innerHTML = `
            <img src="${data.img}" onerror="this.src='./media/placeholder.jpg'">
            <h3>${data.title}</h3>
            <p>${data.text}</p>
        `;

        grid.appendChild(card);
        setTimeout(() => card.classList.add('show'), 200);

        index++;
        if (index === datePlanData.length) {
            clearInterval(interval);
            // Show the "Are you ready" button after all cards are loaded
            setTimeout(() => {
                document.getElementById('readyBtnContainer').classList.remove('hidden');
            }, 1000);
        }
    }, 1200);
}
