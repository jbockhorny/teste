
const carousel = document.querySelector('.carousel-first')
const sectionCard = document.querySelector('.carousel-second')

const url = 'https://sky-frontend.herokuapp.com/movies';

function getApi() {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      templateCarousel(data[0].items)
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
  for (let cat = 0; cat < objCategories.length; cat++) {
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
  templateCategories(categories)
}

  function templateCategories(categories){

    for (let [categoria, objCategories] of categories) {

      sectionCard.innerHTML += `
      <div class="swiper-container">
      <h4>${categoria}</h4>
      <div class="swiper-wrapper">
      </div>
      </div>`
  
      for (let cat = 0; cat < objCategories.length; cat++) {
          document.querySelector('.swiper-wrapper').innerHTML += `
        <div class="swiper-slide">
        <img class="cardCategories" src="${objCategories[cat].images[0].url}" alt="Card do filme"></img>
        </div>`
      }
  
      //   document.querySelector('.swiper-wrapper').innerHTML += `
      // <div class="swiper-slide">
      // <img class="cardCategories" src="${categoria[cat].images[0].url}" alt="Card do filme ${categoria[cat].title}"></img>
      // </div>`
    }
  
  
    // categories.forEach((objCategories, categoria) => {
    //   sectionCard.innerHTML += `
    //   <div class="div-carousel swiper-container">
    //   <h4>${categoria}</h4>
    //   <div class="swiper-wrapper">
  
    //   </div>
    //   </div>`
    // ${banana()}
  
    //     function banana(){
    //     for (let cat = 0; cat < objCategories.length; cat++) {
    //       console.log(objCategories[cat])
    //       document.querySelector('.swiper-wrapper').innerHTML += `
    // <div class="swiper-slide">
    // <img class="cardCategories" src="${objCategories[cat].images[0].url}" alt="Card do filme ${objCategories[cat].title}"></img>
    // </div>`
    //     }
  
  
      document.querySelector('.swiper-container').innerHTML += `
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      `
    // }, categories)
  
    var mySwiper = new Swiper('.swiper-container', {
      direction: "horizontal",
      loop: true,
      spaceBetween: 10,
      slidesPerView: 6,
      slidesPerGroup: 6,
      height: 200,
      slidesOffsetBefore: 0,
  
      breakpoints: {
        1024: {
          slidesPerView: 6,
        },
  
        820: {
          slidesPerView: 4,
        },
  
        640: {
          slidesPerView: 3,
        },
  
        340: {
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
  
      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    })
  }
getApi()

