const dropdownContainer = document.querySelector("#dropdown-container");
const btnBook1 = document.querySelector("#book1");
const btnBook2 = document.querySelector("#book2");
const btnBook3 = document.querySelector("#book3");
const btnBook4 = document.querySelector("#book4");
const btnBook5 = document.querySelector("#book5");

const chart = document.querySelector('#chart');

let myChart;
btnBook1.addEventListener("click",(e)=>{
    if(myChart != undefined){
        myChart.destroy();
    }
    const obj = {book : 1};
    const init = {
        method : 'post',
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(obj)
    };

    fetch('/pencarian/grafik/show',init).then(onSuccess).then(showResult);

    function onSuccess(response){
        return response.json();
    }

    function showResult(data){
        console.log(data);
    }
    const arrLabel = ['a','b','c'];
    const arrData = [12, 19, 3, 5, 2, 3];
    dropdownContainer.textContent = "Book 1";
    myChart =new Chart(chart, {
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
});
btnBook2.addEventListener("click",(e)=>{
    dropdownContainer.textContent = "Book 2";
});
btnBook3.addEventListener("click",(e)=>{
    dropdownContainer.textContent = "Book 3";
});
btnBook4.addEventListener("click",(e)=>{
    dropdownContainer.textContent = "Book 4";
});
btnBook5.addEventListener("click",(e)=>{
    dropdownContainer.textContent = "Book 5";
});
