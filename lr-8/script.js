let userScore = 0;
let compScore = 0;

// --- Отримати імʼя користувача ---
let userName = prompt("Введіть ім'я:");
if (!userName || userName.trim().length < 2) {
    userName = "User";
}
document.getElementById("userName").textContent = userName;


// --- Основна логіка гри ---
const btn = document.getElementById("generateBtn");
btn.addEventListener("click", () => {

    if (userScore === 3 || compScore === 3) {
        location.reload();
        return;
    }

    const userNum = Math.floor(Math.random() * 10) + 1;
    const compNum = Math.floor(Math.random() * 10) + 1;

    document.getElementById("userNumber").textContent = userNum;
    document.getElementById("compNumber").textContent = compNum;

    let message = "";

    if (userNum > compNum) {
        userScore++;
        message = `${userName} отримує бал!`;
    } else if (compNum > userNum) {
        compScore++;
        message = "Комп'ютер отримує бал!";
    } else {
        message = "Нічия!";
    }

    document.getElementById("userScore").textContent = userScore;
    document.getElementById("compScore").textContent = compScore;
    document.getElementById("message").textContent = message;

    // Перевірка завершення гри
    if (userScore === 3) {
        document.getElementById("message").textContent = `${userName} переміг!`;
        btn.textContent = "Restart";
    }

    if (compScore === 3) {
        document.getElementById("message").textContent = "Комп'ютер переміг!";
        btn.textContent = "Restart";
    }
});
