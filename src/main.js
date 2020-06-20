
const carousel = document.getElementById('carousel')
const sectionCard = document.getElementById('card')

// const titleSection = document.querySelector('.title-card')
// const divSection = document.querySelector('.div-section')
// const menuCard = document.querySelector('.card-section')

// const divSwiper = document.getElementById('swiper')

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
  for(let cat in objCategories){
    let splits = objCategories[cat].categories.split(', ');
    splits.forEach(element => {
      let cardsCategories = categories.get(element);
      if (cardsCategories === undefined) {
        cardsCategories = [objCategories[cat]];
        categories.set(element, cardsCategories);
      } else {
        cardsCategories.push(objCategories[cat])
      }
    });
  }

  categories.forEach((objCategories, categoria) => {

    let divCarousel = document.createElement('div')
    sectionCard.appendChild(divCarousel)
    divCarousel.classList.add('swiper-container', 'divCarousel')
    
    let titleSection = document.createElement('h5')
    titleSection.innerHTML += categoria
    divCarousel.classList.add('titleSection')
    
    let divSection = document.createElement('div')
    divCarousel.appendChild(divSection);
    divSection.classList.add('swiper-wraper')
    
    for(let cat in objCategories){
      divSection.innerHTML += `
      <div class="swiper-slide>
      <img class="cardCategories" src="${objCategories[cat].images[0].url}" alt="Card do filme">
      </div>`
    }
    divCarousel.innerHTML += `
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    `
  }, categories)
}

getApi()

var swiper = new Swiper ('.div-carousel', {

direction: "horizontal",
loop: true,
spaceBetween: 10,
slidesPerView: 6,
slidesPerGroup: 6,
height: 200,
slidesOffsetBefore: 0,

breakpoints: {
  1024: {
    slidesPerView: 5,
  },

  820:{
    slidesPerView: 4,
  },

  640:{
    slidesPerView: 3,
  },

  340:{
    slidesPerView: 1,
  }
},

pagination: {
  el: ".swiper-pagination",
},

navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},

scrollbar: {
  el: ".swiper-scrollbar",
},
})

