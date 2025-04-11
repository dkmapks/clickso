let money = 0;
let rank = "Newbie";
let clickValue = 1;

const ranks = ["Newbie", "Amateur", "Pro", "Master"];
const moneyDisplay = document.getElementById("money");
const rankDisplay = document.getElementById("rank");
const clickButton = document.getElementById("clickButton");
const shopButtons = document.querySelectorAll(".upgrade");
const leaderboard = document.getElementById("leaderboard");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");
const modMenu = document.getElementById("modMenu");
const unlockModButton = document.getElementById("unlockMod");
const addMoneyButton = document.getElementById("addMoney");
const addRankButton = document.getElementById("addRank");
const modCodeInput = document.getElementById("modCode");

// Click button logic
clickButton.addEventListener("click", () => {
  money += clickValue;
  updateDisplay();
});

// Shop upgrades
shopButtons.forEach(button => {
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost);
    const boost = parseInt(button.dataset.boost);
    if (money >= cost) {
      money -= cost;
      clickValue += boost;
      updateDisplay();
    } else {
      alert("Not enough money!");
    }
  });
});

// Update display
function updateDisplay() {
  moneyDisplay.textContent = money;
  rankDisplay.textContent = rank;

  // Update rank based on money
  if (money >= 1000) rank = ranks[3];
  else if (money >= 500) rank = ranks[2];
  else if (money >= 100) rank = ranks[1];
  else rank = ranks[0];
}

// Save game
saveButton.addEventListener("click", () => {
  const gameState = {
    money,
    rank,
    clickValue
  };
  localStorage.setItem("clickerGameSave", JSON.stringify(gameState));
  alert("Game saved!");
});

// Load game
loadButton.addEventListener("click", () => {
  const savedState = JSON.parse(localStorage.getItem("clickerGameSave"));
  if (savedState) {
    money = savedState.money;
    rank = savedState.rank;
    clickValue = savedState.clickValue;
    updateDisplay();
  } else {
    alert("No saved game found!");
  }
});

// Unlock mod menu
unlockModButton.addEventListener("click", () => {
  if (modCodeInput.value === "7432") {
    modMenu.style.display = "block";
    alert("Mod menu unlocked!");
  } else {
    alert("Incorrect code!");
  }
});

// Mod menu functionality
addMoneyButton.addEventListener("click", () => {
  money += 1000;
  updateDisplay();
});

addRankButton.addEventListener("click", () => {
  const currentRankIndex = ranks.indexOf(rank);
  if (currentRankIndex < ranks.length - 1) {
    rank = ranks[currentRankIndex + 1];
    updateDisplay();
  } else {
    alert("You are already at the highest rank!");
  }
});

// Leaderboard (example, for future implementation)
function updateLeaderboard() {
  leaderboard.innerHTML = "<li>Player1: 1000</li><li>Player2: 800</li>";
}

// Initialize game
updateDisplay();
updateLeaderboard();
