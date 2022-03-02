const searchInputBox = document.getElementById('search-input-box');
const resultContainer = document.getElementById('result-container');

const searchBtn =async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputBox.value}`);
    const data = await res.json();
    // console.log(data);
    displayResult(data.data);
}

const displayResult = (phones) =>{
    // console.log(phones);
    phones.forEach(phone =>{
        console.log(phone);
        const div = document.createElement('div');
        div.className ='col d-flex justify-content-center';
        div.innerHTML=`
        <div class="card w-75 p-3 shadow rounded">
            <div class="phone-image d-flex justify-content-center">
                <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
        </div>
        `;
        resultContainer.appendChild(div);
    });
}