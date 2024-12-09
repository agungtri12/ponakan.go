const board = document.getElementById("game-board");
const rollDiceButton = document.getElementById("roll-dice");
const diceFace = document.getElementById("dice-face");
const diceResult = document.getElementById("dice-result");
const turnIndicator = document.getElementById("turn");

const players = [
    { name: "Pemain 1", position: 1, color: "player1" },
    { name: "Pemain 2", position: 1, color: "player2" }
];

let currentPlayer = 0;

// Objek ular dan tangga
const snakes = { 98: 56, 65: 52, 47: 19, 34: 6 };
const ladders = { 3: 22, 8: 26, 20: 77, 36: 57 };

// Pola titik di dadu
const dicePatterns = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
};

// Ambil elemen audio untuk suara menangis dan sorak
const cryingSound = document.getElementById("crying-sound");
const cheeringSound = document.getElementById("cheering-sound");

// Buat papan permainan
function createBoard() {
    for (let i = 100; i > 0; i--) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;

        if (snakes[i]) cell.innerHTML += "<span>🐍</span>";
        if (ladders[i]) cell.innerHTML += "<span>🔝</span>";

        cell.textContent += i;
        board.appendChild(cell);
    }
}

// Gambar pola titik dadu
function drawDice(number) {
    diceFace.innerHTML = ""; // Hapus pola sebelumnya
    const dots = dicePatterns[number];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "face-cell";
        if (dots.includes(i)) {
            const dot = document.createElement("div");
            dot.className = "dot";
            cell.appendChild(dot);
        }
        diceFace.appendChild(cell);
    }
}

// Gerakkan pemain di papan
function movePlayer(player, steps) {
    // Hapus pemain dari posisi sebelumnya
    const currentCell = document.getElementById(`cell-${player.position}`);
    currentCell.querySelector(`.${player.color}`)?.remove();

    player.position += steps;

    // Cek ular atau tangga
    if (snakes[player.position]) {
        alert(`${player.name} digigit ular! Turun ke ${snakes[player.position]}`);
        cryingSound.play(); // Putar suara menangis
        player.position = snakes[player.position];
    } else if (ladders[player.position]) {
        alert(`${player.name} menaiki tangga! Naik ke ${ladders[player.position]}`);
        cheeringSound.play(); // Putar suara sorak
        player.position = ladders[player.position];
    }

    // Pastikan posisi tidak lebih dari 100
    if (player.position > 100) player.position = 100;

    // Tempatkan pemain pada posisi baru
    const nextCell = document.getElementById(`cell-${player.position}`);
    const playerMarker = document.createElement("div");
    playerMarker.classList.add("player", player.color);
    nextCell.appendChild(playerMarker);
}

// Reset permainan
function resetGame() {
    players.forEach(player => {
        player.position = 0;
        document.querySelector(`.${player.color}`)?.remove();
    });
    currentPlayer = 0;
    turnIndicator.textContent = `Giliran: ${players[currentPlayer].name}`;
    players.forEach(player => movePlayer(player, 0));
}

// Fungsi untuk lempar dadu dan jalankan giliran
rollDiceButton.addEventListener("click", () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    drawDice(dice);
    diceResult.textContent = `Hasil Dadu: ${dice}`;

    const player = players[currentPlayer];
    movePlayer(player, dice);

    // Cek kemenangan
    if (player.position >= 100) {
        alert(`${player.name} menang!`);
        resetGame();
        return;
    }

    // Pindah ke pemain berikutnya
    currentPlayer = (currentPlayer + 1) % players.length;
    turnIndicator.textContent = `Giliran: ${players[currentPlayer].name}`;
});

// Inisialisasi papan dan pemain
createBoard();
players.forEach(player => movePlayer(player, 0));
drawDice(1);
