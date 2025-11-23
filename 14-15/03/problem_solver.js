function verify() {
    let a = parseFloat(document.getElementById("num").value); // Получаем значение из input

    if (isNaN(a)) { // Проверяем, является ли ввод числом
        document.getElementById("result").value = "Ошибка: введите число";
        return;
    }

    let result;
    if (a < 62) {
        result = a**2 + 4 + 5; // Формула для a < 62
    } else {
        result = 1/(a**2) + 4*a + 5; // Формула для a >= 62
    }

    document.getElementById("result").value = result; // Выводим результат
}

// Вешаем обработчик на кнопку после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("verify").addEventListener('click', verify);
});
