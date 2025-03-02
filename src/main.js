const factsButton = document.querySelector('#facts-button');
const imagesButton = document.querySelector('#images-button');
const errorText = document.querySelector('.error-text');

factsButton.addEventListener('click', () => {
    let factsRequested = document.querySelector('#facts-input').value;
    const maxFacts = 50; 
    const minFacts = 1;
    
    if(factsRequested >= minFacts && factsRequested <= maxFacts) {
        getFacts(factsRequested);
    } else if(factsRequested < minFacts || factsRequested === '') {
        getFacts(minFacts);
    }else if(factsRequested > maxFacts) {
        getFacts(maxFacts);
    }
})


imagesButton.addEventListener('click', () => {
    let imagesRequested = Number(document.querySelector('#images-input').value);
    const maxImages = 10; 
    const minImages = 1;
    
    if(imagesRequested >= minImages && imagesRequested <= maxImages) {
        getImages(imagesRequested);
    } else if(imagesRequested < minImages || imagesRequested === '') {
        getImages(minImages);
    }else if(imagesRequested > maxImages) {
        getImages(maxImages);
    }
})




async function getFacts(factsToBeFetched) {
    try{
        factsButton.textContent = 'Processing...';
        factsButton.setAttribute("disabled", true);


        errorText.classList.replace('visible', 'invisible');

        const response = await fetch(`https://meowfacts.herokuapp.com/?count=${factsToBeFetched}`);

        const responseObject = await response.json();
        let responseArray = responseObject.data;
       
        let factsList = document.querySelector('.facts-list');
        factsList.innerHTML = '';
    
        let imagesDisplay = document.querySelector('.images-container');
        imagesDisplay.innerHTML = '';
        
    
        for(let i=0; i<responseArray.length; i++) {
            const fact = responseArray[i];
    
            factsList.innerHTML += `<li>${fact}</li>`;
    
        }
    } catch{
        errorText.classList.replace('invisible', 'visible');
    } finally{
        factsButton.textContent = 'submit';
        factsButton.removeAttribute("disabled");
    }

};


async function getImages(imagesToBeFetched) {
    try{
        imagesButton.textContent = 'Processing...';
        imagesButton.setAttribute("disabled", true);

        errorText.classList.replace('visible', 'invisible');

        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10`);

        const responseArray = await response.json();
        
        let imagesDisplay = document.querySelector('.images-container');
        imagesDisplay.innerHTML = '';
    
        let factsList = document.querySelector('.facts-list');
        factsList.innerHTML = '';
        
    
        for(let i=0; i<imagesToBeFetched; i++) {
            const imageUrl = responseArray[i].url;
    
            imagesDisplay.innerHTML += `<img src="${imageUrl}">`;
    
        }
    } catch{
        errorText.classList.replace('invisible', 'visible');
    } finally{
        imagesButton.textContent = 'submit';
        imagesButton.removeAttribute("disabled");
    }

};