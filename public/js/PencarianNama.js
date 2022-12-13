const dropdownContainer = document.querySelector("#dropdown-container");
const btnBook1 = document.querySelector("#book1");
const btnBook2 = document.querySelector("#book2");
const btnBook3 = document.querySelector("#book3");
const btnBook4 = document.querySelector("#book4");
const btnBook5 = document.querySelector("#book5");

const inputContainer = document.querySelector('#input-container');
const dataContainer = document.querySelector('.data-container');
let bookChosen = 0;
inputContainer.classList.add('hidden');
const paginationContainer = document.querySelector('.pagination');

const inputText = document.querySelector('#input-text');

const btnCari = document.querySelector('#btn-cari');
btnBook1.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 1";
    bookChosen = 1;
    inputContainer.classList.remove('hidden');
    inputText.value = "";
    clearData();
});

btnBook2.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 2";
    bookChosen = 2;
    inputContainer.classList.remove('hidden');
    clearData();
});

btnBook3.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 3";
    bookChosen = 3;
    inputContainer.classList.remove('hidden');
    clearData();
});

btnBook4.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 4";
    bookChosen = 4;
    inputContainer.classList.remove('hidden');
    clearData();
});

btnBook5.addEventListener("click", (e) => {
    dropdownContainer.textContent = "Book 5";
    bookChosen = 5;
    inputContainer.classList.remove('hidden');
    clearData();
});

btnCari.addEventListener("click", () => {
    getCount(bookChosen, inputText.value).then(res => {
        let banyakPage = Math.ceil((res[0].jumlah) / 10);
        paginationContainer.replaceChildren();
        makePagination(banyakPage);
        const tombol = document.querySelectorAll('.page-link');
        const tombolWrap = document.querySelectorAll('.page-item');
        tombolWrap[0].classList.add('active');
        let before = 0;
        for (let i of tombol) {
            i.addEventListener('click', () => {
                tombolWrap[before].classList.remove('active');
                before = i.textContent - 1;
                tombolWrap[i.textContent - 1].classList.add('active');

                getData(bookChosen, inputText.value, i.textContent - 1);
            });
        }
    });
    getData(bookChosen, inputText.value, 0);
});

function getCount(bookNumber, namaCari) {
    const obj = { book: bookNumber, name: namaCari };
    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    };

    const jumlah = fetch('/pencarian/nama/hitungJumlah', init).then(onSuccess);
    function onSuccess(response) {
        return response.json();
    }
    return jumlah;
}

function clearData() {
    inputText.value = "";
    paginationContainer.replaceChildren();
    dataContainer.replaceChildren();
}

function getData(bookNumber, namaCari, startIdx) {
    const obj = { book: bookNumber, name: namaCari, start: startIdx };
    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    };

    fetch('/pencarian/nama/cariNama', init).then(onSuccess).then(showResult);
    function onSuccess(response) {
        return response.json();
    }

    function showResult(data) {
        showData(data);
    }

}

function showData(data) {
    dataContainer.replaceChildren();
    const container = document.createElement('div');
    container.classList.add('oneDataContainer');
    const source = document.createElement('span');
    source.classList.add('source-container');
    source.textContent = "source";
    const target = document.createElement('span');
    target.classList.add('target-container');
    target.textContent = "target";
    const weight = document.createElement('span');
    weight.classList.add('weight-container');
    weight.textContent = "weight";
    container.appendChild(source);
    container.appendChild(target);
    container.appendChild(weight);
    dataContainer.appendChild(container);
    for (let i of data) {
        const container = document.createElement('div');
        container.classList.add('oneDataContainer');
        const source = document.createElement('span');
        source.classList.add('source-container');
        source.textContent = i.source;
        const target = document.createElement('span');
        target.classList.add('target-container');
        target.textContent = i.target;
        const weight = document.createElement('span');
        weight.classList.add('weight-container');
        weight.textContent = i.weight;
        container.appendChild(source);
        container.appendChild(target);
        container.appendChild(weight);
        dataContainer.appendChild(container);
    }
}

function makePagination(jumlahPage) {
    for (i = 0; i < jumlahPage; i++) {
        const li = document.createElement('li');
        li.classList.add("page-item");
        const btn = document.createElement('button');
        btn.classList.add('page-link');
        btn.classList.add(`${i + 1}`);
        btn.innerText = `${i + 1}`;
        li.appendChild(btn);
        const page = document.querySelector('.pagination');
        page.appendChild(li);
    }
}