let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#FF00FF";

const mainButton = tg.MainButton;
let btn = document.getElementById('submit'); // добавлен `let`

// Установка текущей даты
var today = new Date().toISOString().split('T')[0];
document.getElementById('start-date').value = today;
document.getElementById('start-date').max = today;
document.getElementById('end-date').value = today;
document.getElementById('end-date').max = today;

// Обработка параметров из URL
let params = new URLSearchParams(document.location.search);
if (params.has('o')) {
    let organizationName = params.get('o');
    let query = params.get('q');
    let organization = document.getElementById('organizationName');
    let counterparty = document.getElementById('counterpartyName');

    if (organization) organization.value = organizationName;
    if (counterparty) counterparty.value = query;
}
// Замена запрещённых символов
var counterparty_name = document.getElementById('counterpartyName');

if (counterparty_name) {
    counterparty_name.addEventListener('input', function () {
        this.value = this.value.replace(/[»,«]/g, '"');
    });

    counterparty_name.addEventListener('input', function () {
        if (this.value.length < 3 || this.value.length > 100) {
            this.style.background = "#ebabab";
            btn.style.background = "#e3292c";
            btn.textContent = "Проверьте форму";
            btn.setAttribute('disabled', 'disabled');
        } else {
            this.style.background = "#aafac1";
            btn.style.background = "#2488FF";
            btn.textContent = "Поиск";
            btn.removeAttribute("disabled");
        }
    });
}

// Отправка формы
document.getElementById("tg").addEventListener("submit", function (e) {
    e.preventDefault();

    let data = {
        organizationName: this.organizationName.value,
        counterpartyName: this.counterpartyName.value,
        startDate: this.startDate.value,
        endDate: this.endDate.value
    };

    console.log(JSON.stringify(data, null, 4));
    tg.MainButton.setText("Производим поиск платежа");
    tg.MainButton.show();
    tg.sendData(JSON.stringify(data)); // без `null, 4` — Telegram не любит многострочные JSON
});

tg.onEvent('mainButtonClicked', function () {
    tg.close();
});
