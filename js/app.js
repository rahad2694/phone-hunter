// Declaring Global Variables
const searchInputBox = document.getElementById('search-input-box');
let oldSearchKeyword = document.getElementById('search-keyword');
const resultContainer = document.getElementById('result-container');
const detailsContainer = document.getElementById('details-container');
const closeBtn = document.getElementById('close-button');
const errorMessage = document.getElementById('error-message');
const showMore = document.getElementById('show-more');

searchInputBox.addEventListener('keyup',function(){
    let keyWord = (searchInputBox.value);
    oldSearchKeyword.innerText=keyWord;
});
// Search Button functionalities
const searchBtn =async() =>{
    closeBtn.classList.add('d-none');
    detailsContainer.innerHTML='';
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputBox.value}`);
    const data = await res.json();
    // console.log(data);
    displayResult(data);
}

// showing result on UI
const displayResult = (phones) =>{
    console.log(phones);
    searchInputBox.value='';
    resultContainer.innerHTML='';
    if(phones.status){
        phones.data.slice(0,20).forEach(phone =>{
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
                    <button onclick="detailsBtn('${phone.slug}')" class="btn-secondary rounded px-2 py-1"><a class="text-decoration-none text-white" href="#">Details</a>  <i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            `;
            resultContainer.appendChild(div);
        });
        showMore.classList.remove('d-none');
    }
    else{
        resultContainer.innerHTML='';
        errorMessage.innerText='No Match Found';
    }
}
// Details Button functionalities
const detailsBtn =async(id) =>{
    // console.log(id);
    detailsContainer.innerHTML='';
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    showDetails(data.data);
}
// Showing Detailed info on UI
const showDetails =(details) =>{
    // console.log(details);
    closeBtn.classList.remove('d-none');
    const div = document.createElement('div');
    div.className='row shadow rounded pt-2';
    div.innerHTML=`
    <div class="text-center col-12 col-md-4 col-lg-4 col-sm-12 col-xl-4">
        <div class="phone-image">
            <img class="p-2" src="${details.image}" alt="">
        </div>
        <h2 class="mt-2">${details.name}</h2>
        <p>${details.releaseDate? details.releaseDate:'No release date found'}</p>
    </div>
    <div class="text-center col-12 col-md-4 col-lg-4 col-sm-12 col-xl-4">
        <h5>Main Features:</h5>
        <p>Chipset : ${details.mainFeatures.chipSet}</p>
        <p>Display Size : ${details.mainFeatures.displaySize}</p>
        <p>Memory : ${details.mainFeatures.memory}</p>
        <p>Storage : ${details.mainFeatures.storage}</p>
        <p>Sensors : ${details.mainFeatures.sensors.slice(0,3)},
        ${details.mainFeatures.sensors.slice(3)}</p>
    </div>
    <div class="text-center col-12 col-md-4 col-lg-4 col-sm-12 col-xl-4">
        <h5>Other Features:</h5>
        <p>Bluetooth : ${details.others.Bluetooth}</p>
        <p>GPS : ${details.others.GPS}</p>
        <p>NFC : ${details.others.NFC}</p>
        <p>Radio : ${details.others.Radio}</p>
        <p>USB : ${details.others.USB}</p>
        <p>WLAN : ${details.others.WLAN}</p>
    </div>
    `;
    detailsContainer.appendChild(div);
}
// Close(X) Button functionalities
closeBtn.addEventListener('click',function(){
    detailsContainer.innerHTML='';
    closeBtn.classList.add('d-none');
});
// Show More Button functionalities
const showMoreBtn =async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${oldSearchKeyword.innerText}`);
    const data = await res.json();
    showRestPhone(data.data.slice(20));
}
const showRestPhone = (restPhones) =>{
    console.log(restPhones);
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
                    <button onclick="detailsBtn('${phone.slug}')" class="btn-secondary rounded px-2 py-1"><a class="text-decoration-none text-white" href="#">Details</a>  <i class="fas fa-info-circle"></i></button>
                </div>
            </div>
            `;
            resultContainer.appendChild(div);
    });
}