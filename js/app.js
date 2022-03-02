const searchInputBox = document.getElementById('search-input-box');
const resultContainer = document.getElementById('result-container');
const detailsContainer = document.getElementById('details-container');
const errorMessage = document.getElementById('error-message');

const searchBtn =async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputBox.value}`);
    const data = await res.json();
    // console.log(data);
    displayResult(data);
}

const displayResult = (phones) =>{
    // console.log(phones);
    searchInputBox.value='';
    resultContainer.innerHTML='';
    if(phones.status){
        phones.data.forEach(phone =>{
            // console.log(phone);
            errorMessage.innerText='';
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
                <div class="d-flex justify-content-center details-button">
                    <button onclick="detailsBtn('${phone.slug}')" class="btn-secondary rounded px-2 py-1">Details  <i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            `;
            resultContainer.appendChild(div);
        });
    }
    else{
        resultContainer.innerHTML='';
        errorMessage.innerText='No Match Found';
    }
}

const detailsBtn =async(id) =>{
    // console.log(id);
    detailsContainer.innerHTML='';
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    showDetails(data.data);
}

const showDetails =(details) =>{
    console.log(details);
    console.log(details.mainFeatures.sensors.map(x=>x));
    const div = document.createElement('div');
    div.className='row shadow rounded';
    div.innerHTML=`
    <div class="text-center col-12 col-md-6 col-lg-6 col-sm-12 col-xl-6">
        <img class="p-2" src="${details.image}" alt="">
        <h2>${details.name}</h2>
        <p>${details.releaseDate? details.releaseDate:'No release date found'}</p>
    </div>
    <div class="text-center col-12 col-md-6 col-lg-6 col-sm-12 col-xl-6">
        <h5>Main Features:</h5>
        <p>Chipset : ${details.mainFeatures.chipSet}</p>
        <p>Display Size : ${details.mainFeatures.displaySize}</p>
        <p>Memory : ${details.mainFeatures.memory}</p>
        <p>Storage : ${details.mainFeatures.storage}</p>
        <p>Sensors : ${details.mainFeatures.sensors.slice(0,3)},
        ${details.mainFeatures.sensors.slice(3)}</p>
    </div>
    `;
    detailsContainer.appendChild(div);
}