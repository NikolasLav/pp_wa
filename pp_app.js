// ensure app

let tg = window.Telegram.WebApp;
//tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#FF00FF";

btn = document.getElementById('submit');

// current date
var today = new Date().toISOString().split('T')[0];
document.getElementById('start-date').value = today;
document.getElementById('start-date').max = today;
document.getElementById('end-date').value = today;
document.getElementById('end-date').max = today;

// forbidden symbols replace function
var counterparty_name = document.getElementById('counterpartyName');
[counterparty_name].forEach(function(element){
    element.addEventListener('change', function(e) {
        element.value = element.value.replace(/[»,«]/g, "\"")
    });
});
[counterparty_name].forEach(function(element){
    element.addEventListener('change', function(e) {
        if (element.value.length > 30 && element.value.length < 5) {
            element.style.background = "#ebabab";
                        btn.style.background = "#e3292c"
            btn.textContent = "Проверьте форму"
            btn.setAttribute('disabled','disabled');
        } else {
            element.style.background = "#aafac1"

            btn.style.background = "blue"
            btn.textContent = "Поиск"
            btn.removeAttribute("disabled");
        };
    });
});

// sending data
document.getElementById("tg").addEventListener("submit", function(e){
    e.preventDefault();

    let data = {
        counterpartyName: this.counterpartyName.value,
        startDate: this.startDate.value,
        endDate: this.endDate.value
    };
    console.log(JSON.stringify(data, null, 4));
    tg.MainButton.setText("Производим поиск платежа");
    tg.MainButton.show();
    tg.sendData(JSON.stringify(data, null, 4));
});