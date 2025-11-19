function removeLast() {
  const s1 = document.getElementById("s1").value;
  const s2 = document.getElementById("s2").value;
  const resultDiv = document.getElementById("result");

  if (s1.trim() === "" || s2.trim() === "") {
    resultDiv.innerHTML = "Будь ласка, введіть обидва рядки!";
    return;
  }

  // Знаходимо останнє входження s2 у s1
  const index = s1.lastIndexOf(s2);

  if (index === -1) {
    // Якщо збігів немає — повертаємо рядок без змін
    resultDiv.innerHTML = `
      <b>У рядку S1 немає підрядка "${s2}".</b><br>
      Результат: ${s1}
    `;
  } else {
    // Видаляємо останнє входження s2
    const newString = s1.slice(0, index) + s1.slice(index + s2.length);

    resultDiv.innerHTML = `
      <b>Початковий рядок S1:</b> ${s1}<br>
      <b>Підрядок S2:</b> ${s2}<br><br>
      <b>Результат:</b> ${newString}
    `;
  }
}
