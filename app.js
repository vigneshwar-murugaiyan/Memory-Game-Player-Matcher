const cardArray = [
    { name: 'virat', img: 'img/vk.jfif' },
    { name: 'msd', img: 'img/msd.jfif' },
    { name: 'rohit', img: 'img/rohit.jfif' },
    { name: 'bum', img: 'img/bum.jfif' },
    { name: 'jaddu', img: 'img/jaddu.jfif' },
    { name: 'babar', img: 'img/brasam.jfif' },
    { name: 'virat', img: 'img/vk.jfif' },
    { name: 'msd', img: 'img/msd.jfif' },
    { name: 'rohit', img: 'img/rohit.jfif' },
    { name: 'bum', img: 'img/bum.jfif' },
    { name: 'jaddu', img: 'img/jaddu.jfif' },
    { name: 'babar', img: 'img/brasam.jfif' }
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const cardChosen = [];
const cardChosenIds = [];
const cardsWon = [];
const resultDisplay = document.querySelector('#result');

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1];

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        alert('You clicked the same image!');
    } else if (cardChosen[0] === cardChosen[1]) {
        alert('You found a match!');
        cards[optionOneId].setAttribute('src', 'img/whitescrn.jfif');
        cards[optionTwoId].setAttribute('src', 'img/whitescrn.jfif');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        alert('Sorry, try again');
    }
    cardChosen.length = 0;
    cardChosenIds.length = 0;
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all!';
        partyCelebration(); // Call the party celebration function
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Function to trigger the party celebration
function partyCelebration() {
    var end = Date.now() + 5 * 1000;

    // Confetti colors
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
