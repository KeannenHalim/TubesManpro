const dropdownContainer = document.querySelector("#dropdown-container");
const btnBook1 = document.querySelector("#book1");
const btnBook2 = document.querySelector("#book2");
const btnBook3 = document.querySelector("#book3");
const btnBook4 = document.querySelector("#book4");
const btnBook5 = document.querySelector("#book5");
btnBook1.addEventListener("click",()=>{
    dropdownContainer.textContent = "Book 1";
});
btnBook2.addEventListener("click",()=>{
    dropdownContainer.textContent = "Book 2";
});
btnBook3.addEventListener("click",()=>{
    dropdownContainer.textContent = "Book 3";
});
btnBook4.addEventListener("click",()=>{
    dropdownContainer.textContent = "Book 4";
});
btnBook5.addEventListener("click",()=>{
    dropdownContainer.textContent = "Book 5";
});
