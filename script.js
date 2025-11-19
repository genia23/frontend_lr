document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Створюємо контейнер
    const container = document.createElement("div");
    container.className = "container";

    // Поле вводу
    const input = document.createElement("input");
    input.placeholder = "Введіть питання...";

    // Кнопка
    const btn = document.createElement("button");
    btn.textContent = "Запитати кулю";

    // Куля
    const ball = document.createElement("div");
    ball.className = "ball";

    const answer = document.createElement("div");
    answer.className = "answer";
    answer.textContent = "—"; // порожня відповідь

    ball.appendChild(answer);

    container.appendChild(input);
    container.appendChild(btn);
    container.appendChild(ball);
    body.appendChild(container);

    // Українські відповіді
    const answers = [
        "Так",
        "Ні",
        "Можливо",
        "Схоже на те",
        "Сумніваюсь",
        "Запитай пізніше",
        "Безперечно",
        "Однозначно ні",
        "Ймовірність висока",
        "Мало шансів"
    ];

    // Обробка кліку
    btn.addEventListener("click", () => {
        const question = input.value.trim();

        if (question.length < 3) {
            answer.textContent = "Потрібне коректне питання!";
            return;
        }

        const random = Math.floor(Math.random() * answers.length);
        answer.textContent = answers[random];
    });
});
