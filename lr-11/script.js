$(document).ready(function () {

    const allWords = [
        { en: "apple", ua: "яблуко" },
        { en: "house", ua: "дім" },
        { en: "water", ua: "вода" },
        { en: "sun", ua: "сонце" },
        { en: "book", ua: "книга" },
        { en: "cat", ua: "кіт" },
        { en: "dog", ua: "собака" },
        { en: "tree", ua: "дерево" },
        { en: "milk", ua: "молоко" },
        { en: "rain", ua: "дощ" }
    ];

    let words = [...allWords];

    let step = 0;
    let correct = 0;
    let wrong = 0;
    let currentWord = null;

    function updateStats() {
        $("#step").text(`Крок: ${step}/10`);
        $("#correct").text(`Вірно: ${correct}`);
        $("#wrong").text(`Невірно: ${wrong}`);
    }

    function showNextWord() {

        if (words.length === 0) {
            showResult();
            return;
        }

        const index = Math.floor(Math.random() * words.length);
        currentWord = words[index];

        words.splice(index, 1);

        $("#card").text(currentWord.en);
        $("#inputWord").val("").prop("disabled", false);
        $("#checkBtn").prop("disabled", false);
    }

    $("#card").on("click", function () {
        if (step === 0) {
            step = 1;
            updateStats();
            showNextWord();
        }
    });

    $("#checkBtn").on("click", function () {
        let userAnswer = $("#inputWord").val().trim().toLowerCase();

        if (userAnswer === "") {
            alert("Введіть переклад!");
            return;
        }

        if (userAnswer === currentWord.ua) {
            correct++;
        } else {
            wrong++;
        }

        step++;
        updateStats();

        if (step > 10) {
            showResult();
        } else {
            showNextWord();
        }
    });

    function showResult() {
        $("#inputWord").prop("disabled", true);
        $("#checkBtn").prop("disabled", true);

        let score = correct;
        let level;

        if (score >= 9) level = "Відмінний рівень!";
        else if (score >= 7) level = "Добрий рівень.";
        else if (score >= 5) level = "Задовільний рівень.";
        else level = "Потрібно більше практики.";

        $("#resultText").html(`
            Правильно: <b>${correct}</b><br>
            Неправильно: <b>${wrong}</b><br><br>
            <b>${level}</b>
        `);

        $("#modal").fadeIn(300);
    }

    $("#closeModal").on("click", function () {
        $("#modal").fadeOut(300);
    });

});
