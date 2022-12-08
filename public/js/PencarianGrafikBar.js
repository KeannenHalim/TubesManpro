const dropdownContainer = document.querySelector("#dropdown-container");
const btnBook1 = document.querySelector("#book1");
const btnBook2 = document.querySelector("#book2");
const btnBook3 = document.querySelector("#book3");
const btnBook4 = document.querySelector("#book4");
const btnBook5 = document.querySelector("#book5");

const chart = document.querySelector('#chart');

let myChart;
function showChart(bookNumber){
    if (myChart != undefined) {
        myChart.destroy();
    }
    const obj = { book: bookNumber };
    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    };

    fetch('/pencarian/grafik/show', init).then(onSuccess).then(showResult);

    function onSuccess(response) {
        return response.json();
    }

    function showResult(data) {
        const arrLabel = data.Label;
        const arrData = data.Data;
        myChart = new Chart(chart, {
            type: 'bar',
            data: {
                labels: arrLabel,
                datasets: [{
                    label: 'number of Interactions',
                    data: arrData,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
btnBook1.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 1";
    showChart(1);
});
btnBook2.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 2";
    showChart(2);
});
btnBook3.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 3";
    showChart(3);
});
btnBook4.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 4";
    showChart(4);
});
btnBook5.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 5";
    showChart(5);
});
