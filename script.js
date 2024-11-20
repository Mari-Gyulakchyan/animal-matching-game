const animalListElement = document.querySelector('.game-board');
const currentAnimalImage = document.querySelector('.currentAnimalImg');
const currentAnimalName = document.querySelector('.currentAnimalName');
const scoreDisplay = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const finalScoreDisplay = document.querySelector('.scoreValue');
const newGameButton = document.querySelector('#newGameButton');
const timerDisplay = document.querySelector('.timer');
const startScreen = document.querySelector('.start-screen');
const startGameButton = document.querySelector('#startGameButton');
const gameContainer = document.querySelector('.game-container');

let selectedAnimal;
let score = 0;
let countdownInterval;
const initialTime = 55;
let remainingTime = initialTime;

scoreDisplay.innerHTML = score;

function displayAnimalList() {
    animalListElement.innerHTML = '';
    animals.sort(() => Math.random() - 0.5);
    animals.forEach(animal => {
        animalListElement.innerHTML += `
            <div class="animal-item" data-id="${animal.id}">
                <img src="animal/${animal.thumbImg}" alt="${animal.name}">
                <h3>${animal.name}</h3>
            </div>
        `;
    });

    const animalItems = document.querySelectorAll('.animal-item');
    animalItems.forEach(item => {
        item.onclick = function () {
            const selectedId = parseInt(item.getAttribute('data-id'));
            if (selectedId === selectedAnimal.id) {
                score += 10;
                scoreDisplay.innerHTML = score;
                selectRandomAnimal();
            }
        };
    });
}

function selectRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    selectedAnimal = animals[randomIndex];
    currentAnimalImage.src = `./animal/${selectedAnimal.thumbImg}`;
    currentAnimalName.innerHTML = selectedAnimal.name;
}

function startNewGame() {
    score = 0;
    scoreDisplay.innerHTML = score;
    gameOverScreen.style.display = 'none';
    displayAnimalList();
    selectRandomAnimal();
    startTimer();
}

function startTimer() {
    clearInterval(countdownInterval);
    remainingTime = initialTime;
    countdownInterval = setInterval(() => {
        timerDisplay.innerHTML = `⏰00:${remainingTime.toString().padStart(2, '0')}`;
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            gameOverScreen.style.display = 'flex';
            finalScoreDisplay.innerHTML = score;
        }
    }, 1000);
}

// Initialize game
newGameButton.onclick = startNewGame;
displayAnimalList();
selectRandomAnimal();



startGameButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    startTimer()
});
