$(document).ready(function () {

    const allWords = {
        easy: [
            { en: "apple", ua: "яблуко" },
            { en: "house", ua: "дім" },
            { en: "water", ua: "вода" },
            { en: "sun", ua: "сонце" },
            { en: "book", ua: "книга" }
        ],
        medium: [
            { en: "cat", ua: "кіт" },
            { en: "dog", ua: "собака" },
            { en: "tree", ua: "дерево" },
            { en: "milk", ua: "молоко" },
            { en: "rain", ua: "дощ" },
            { en: "car", ua: "автомобіль" },
            { en: "flower", ua: "квітка" }
        ],
        hard: [
            { en: "knowledge", ua: "знання" },
            { en: "environment", ua: "довкілля" },
            { en: "opportunity", ua: "можливість" },
            { en: "communication", ua: "спілкування" },
            { en: "technology", ua: "технологія" },
            { en: "government", ua: "уряд" },
            { en: "international", ua: "міжнародний" }
        ]
    };

    let step = 0;
    let correct = 0;
    let wrong = 0;
    let currentWord = null;
    let words = [];
    let totalSteps = 0;

    function resetGame() {
        step = 0;
        correct = 0;
        wrong = 0;
        words = [];
        updateStats();
        $("#modal").hide();
        $("#card").text("Оберіть рівень складності");
        $("#inputWord").val("").prop("disabled", true);
        $("#checkBtn").prop("disabled", true);
        $(".difficulty-levels").show();
    }

    function updateStats() {
        $("#step").text(`Крок: ${step}/${totalSteps}`);
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

        step++;
        updateStats();

        $("#card").text(currentWord.en);
        $("#inputWord").val("").prop("disabled", false).focus();
        $("#checkBtn").prop("disabled", false);
    }

    $(".level-btn").on("click", function() {
        const level = $(this).data("level");
        words = [...allWords[level]];
        totalSteps = words.length;
        step = 0;
        $(".difficulty-levels").hide();
        showNextWord();
    });

    $("#checkBtn").on("click", function () {
        let userAnswer = $("#inputWord").val().trim().toLowerCase();

        if (userAnswer === "") return;

        if (userAnswer === currentWord.ua) correct++;
        else wrong++;

        showNextWord();
    });

    $("#inputWord").on("input", function() {
        $(this).val($(this).val().replace(/[^а-яА-ЯіІїЇєЄґҐ' -]/g, ''));
    });

    $("#restartBtn").on("click", function() {
        resetGame();
    });

    function showResult() {
        $("#inputWord").prop("disabled", true);
        $("#checkBtn").prop("disabled", true);

        let score = correct;
        let level;

        if (score >= totalSteps * 0.9) level = "Відмінний рівень!";
        else if (score >= totalSteps * 0.7) level = "Добрий рівень.";
        else if (score >= totalSteps * 0.5) level = "Задовільний рівень.";
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
