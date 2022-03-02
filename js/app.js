// Declaring Global Variables
const searchInputBox = document.getElementById('search-input-box');
let oldSearchKeyword = document.getElementById('search-keyword');
const resultContainer = document.getElementById('result-container');
const errorMessage = document.getElementById('error-message');
const showMore = document.getElementById('show-more');
const numberOfResults = document.getElementById('number-of-results');
const spinners = document.getElementById('spinners');
const modalBody = document.getElementById('modal-body');
// spinner functionalities
const spinnerShow = (istrue) =>{
    if(istrue){
        spinners.classList.remove('d-none');
    }
    else{
        spinners.classList.add('d-none');
    }
}
// Search Button functionalities
const searchBtn =async() =>{
    errorMessage.innerText='';
    spinnerShow(true);
    showMore.classList.add('d-none');
    numberOfResults.innerText='';
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputBox.value.toLowerCase()}`);
    const data = await res.json();
    displayResult(data);
}

// showing result on UI
const displayResult = (phones) =>{
    searchInputBox.value='';
    resultContainer.innerHTML='';
    spinnerShow(false);
    if(phones.status){
        numberOfResults.innerText=`Total ${phones.data.length} results found!`;
        phones.data.slice(0,20).forEach(phone =>{
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
                    <button onclick="detailsBtn('${phone.slug}')" type="button" class="btn btn-secondary rounded px-2 py-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details <i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            `;
            resultContainer.appendChild(div);
        });
        if(phones.data.length>20){
            showMore.classList.remove('d-none');
        }
    }
    else{
        resultContainer.innerHTML='';
        errorMessage.innerText='No Match Found';
    }
}
// Details Button functionalities
const detailsBtn =async(id) =>{
    modalBody.innerHTML='';
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    showDetails(data.data);
}
// Showing Detailed info as a MODAL on UI
const showDetails =(details) =>{
    const div = document.createElement('div');
    div.className='row';
    div.innerHTML=`
    <div class="text-center col-12 col-md-12 col-lg-12 col-sm-12 col-xl-12">
        <div class="phone-image">
            <img class="p-2" src="${details.image}" alt="">
        </div>
        <h2 class="mt-2 fw-bold">${details.name}</h2>
        <p>${details.releaseDate? details.releaseDate:'No release date found'}</p>
    </div>
    <div class="text-center col-12 col-md-6 col-lg-6 col-sm-12 col-xl-6">
        <h5 class="fw-bold">Main Features:</h5>
        <p><span class="fw-bolder">Chipset :</span> ${details.mainFeatures.chipSet}</p>
        <p><span class="fw-bolder">Display Size :</span>  ${details.mainFeatures.displaySize}</p>
        <p><span class="fw-bolder">Memory :</span> ${details.mainFeatures.memory}</p>
        <p><span class="fw-bolder">Storage :</span> ${details.mainFeatures.storage}</p>
        <p class="text-wrap"><span class="fw-bolder">Sensors :</span> ${details.mainFeatures.sensors.slice(0,2)}
        ${details.mainFeatures.sensors.slice(2,4)? details.mainFeatures.sensors.slice(2,4):''}
        ${details.mainFeatures.sensors.slice(4,6)? details.mainFeatures.sensors.slice(4,6):''}
        ${details.mainFeatures.sensors.slice(6)? details.mainFeatures.sensors.slice(6):''}</p>
    </div>
    <div class="text-center col-12 col-md-6 col-lg-6 col-sm-12 col-xl-6">
        <h5 class="fw-bold">Other Features:</h5>
        <p><span class="fw-bolder">Bluetooth :</span> ${details.others.Bluetooth}</p>
        <p><span class="fw-bolder">GPS :</span> ${details.others.GPS}</p>
        <p><span class="fw-bolder">NFC :</span> ${details.others.NFC}</p>
        <p><span class="fw-bolder">Radio :</span> ${details.others.Radio}</p>
        <p><span class="fw-bolder">USB :</span> ${details.others.USB}</p>
        <p><span class="fw-bolder">WLAN :</span> ${details.others.WLAN}</p>
    </div>
    `;
    modalBody.appendChild(div);
}
// Storing searchKeyword
searchInputBox.addEventListener('keyup',function(){
    let keyWord = (searchInputBox.value);
    oldSearchKeyword.innerText=keyWord;
});
// Show More Button functionalities
const showMoreBtn =async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${oldSearchKeyword.innerText.toLowerCase()}`);
    const data = await res.json();
    showRestPhone(data.data.slice(20));
}
// Showing rest phones in UI
const showRestPhone = (restPhones) =>{
    showMore.classList.add('d-none');
    restPhones.forEach(phone=>{
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
                    <button onclick="detailsBtn('${phone.slug}')" type="button" class="btn btn-secondary rounded px-2 py-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details <i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            `;
            resultContainer.appendChild(div);
    });
}