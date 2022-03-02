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
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        resultContainer.appendChild(div);
    });
}