const searchInputBox = document.getElementById('search-input-box');


const searchBtn =async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputBox.value}`);
    const data = await res.json();
    displayResult(data.data);
}

const displayResult = (phones) =>{
    console.log(phones);
}