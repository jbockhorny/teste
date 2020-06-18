const carousel = document.getElementById('carousel')
const sectionCard = document.getElementById('card')

const url = 'https://sky-frontend.herokuapp.com/movies';

function getApi() {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.map(element => {
        templateCarousel(element.items)
      })
    })
  fetch(url)
    .then(res => res.json())
    .then(data => {
      getCategories(data[2].movies)
    })
}


function templateCarousel(item) {
  carousel.innerHTML =
    `<div class="carousel-item active">
      <img class="d-block w-100" src="${item[0].images[0].url}"  alt="Poster do Filme ${item[0].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${item[1].images[0].url}"  alt="Poster do Filme ${item[1].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${item[2].images[0].url}"  alt="Poster do Filme ${item[2].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${item[3].images[0].url}"  alt="Poster do Filme ${item[3].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${item[4].images[0].url}"  alt="Poster do Filme ${item[4].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>`

}

function getCategories(objCategories) {
  let categories = new Map();
  for (let i = 0; i < objCategories.length; i++) {
    let splits = objCategories[i].categories.split(', ');
    console.log(splits)
    splits.forEach(element => {
      let cardsCategories = categories.get(element);
      if (cardsCategories === undefined) {
        cardsCategories = [objCategories[i]];
        categories.set(element, cardsCategories);
      } else {
        cardsCategories.push(objCategories[i])
      }
    });
  }

  categories.forEach(function (objCategories, categoria) {
    let titleCategoria = document.createElement('h5')
    sectionCard.appendChild(titleCategoria)
    let divCategoria = document.createElement('div')
    sectionCard.appendChild(divCategoria);
    divCategoria.classList.add('div-categoria')
    titleCategoria.innerHTML += categoria
    for (let i = 0; i < objCategories.length; i++) {
      let menuCard = document.createElement('div');
      divCategoria.appendChild(menuCard);
      menuCard.classList.add('menuCard')
      menuCard.innerHTML += `<img class="cardCategories" src="${objCategories[i].images[0].url}" alt="Card do filme">`
    }
  }, categories)
}
getApi()