
const result = document.querySelector('#result');
const pagesDiv = document.querySelector('#pages');

let actualPage = 1;
let totalPages;
let nextIterator;

explanation()
window.onload = () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', validateForm);
    pagesDiv.addEventListener('click', adressPagination);
};

function validateForm(e) {
    e.preventDefault();

    const searchTopic = document.querySelector('#Topic').value;

    if(searchTopic === '') {
        // message de error
        showAlert('Add a Topic');
        return;
    }

    searchPictures();
}


// Muestra una alert de error o correcto
function showAlert(message) {
    const alert = document.querySelector('.bg-red-100');
    if(!alert) {
        const alert = document.createElement('p');

        alert.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );
    
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;
    
        form.appendChild(alert);
    
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}


// Busca las images en una API
function searchPictures() {
    const searchTopic = document.querySelector('#Topic').value;

    const key = '1732750-d45b5378879d1e877cd1d35a6';
    const url = `https://pixabay.com/api/?key=${key}&q=${searchTopic}&per_page=30&page=${actualPage}`;

    fetch(url) 
        .then(response => response.json())
        .then( result => {
            totalPages = calculatePages(result.totalHits);

            // console.log(totalPages)

            showsImages(result.hits);
        });


}

function showsImages(images, pages ) {

    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }

    images.forEach( image => {

        const { likes, views, previewURL, largeImageURL } = image;
        result.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
                <div class="bg-white ">
                    <img class="w-full" src=${previewURL} alt={tags} />
                    <div class="p-4">
                        <p class="card-text">${likes} Likes</p>
                        <p class="card-text">${views} Views </p>
        
                        <a href=${largeImageURL} 
                        rel="noopener noreferrer" 
                        target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">show Image</a>
                    </div>
                </div>
            </div>
            `;
    });


    if(!nextIterator) {
        showsPagination();
    }
 
}

function showsPagination() {
    // recorrer el iterador
    nextIterator = createPaginacion(totalPages);
    while( true ) {
        const { value, done } = nextIterator.next();

        if(done) return;

        // Crear botón de sig
        const buttonNext = document.createElement('a');
        buttonNext.href = "#";
        buttonNext.dataset.page = value;
        buttonNext.textContent = value;
        buttonNext.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mx-auto', 'mb-10', 'font-bold', 'uppercase', 'rounded');
        pagesDiv.appendChild(buttonNext);
    }
}

function calculatePages(total) {
    return parseInt( Math.ceil( total / 30 ));
}


// Crear el generador
function *createPaginacion(total) {
    console.log(total);
    for( let i = 1; i <= total; i++) {
        yield i;
    }
}

function adressPagination(e) {
    if(e.target.classList.contains('siguiente')) {

        actualPage= Number( e.target.dataset.page);
        searchPictures();
        form.scrollIntoView();
    }
    
    function explanation() {
        const explanationUser = window.alert('In this project an example of a Pictures search engine will be shown. The propose of this project is to show that i am able to work with APIs, bootstrap, css, html, tailwind and javascript.');
    }
}
