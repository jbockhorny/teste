
const carouselFirst = document.querySelector('.carousel-first')
const CarouselSecond = document.querySelector('.carousel-second')

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

  carouselFirst.innerHTML = `
  <div class="carousel-Launch swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img class="d-block w-100" src="${item[0].images[0].url}"  alt="Poster do Filme ${item[0].title}">
    </div>
    <div class="swiper-slide">
      <img class="d-block w-100" src="${item[1].images[0].url}"  alt="Poster do Filme ${item[1].title}">
    </div>
    <div class="swiper-slide">
      <img class="d-block w-100" src="${item[2].images[0].url}"  alt="Poster do Filme ${item[2].title}">
    </div>
    <div class="swiper-slide">
      <img class="d-block w-100" src="${item[3].images[0].url}"  alt="Poster do Filme ${item[3].title}">
    </div>
    <div class="swiper-slide">
      <img class="d-block w-100" src="${item[4].images[0].url}"  alt="Poster do Filme ${item[4].title}">
    </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>`

  var swiperFirst = new Swiper('.swiper-container', {

    direction: "horizontal",
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    slidesPerGroup: 3,
    height: 200,
    slidesOffsetBefore: 0,

    breakpoints: {
      1024: {
        slidesPerView: 3,
      },

      820: {
        slidesPerView: 3,
      },

      640: {
        slidesPerView: 2
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

    scrollbar: {
      el: ".swiper-scrollbar",
    },
  })
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

function templateCategories(cat) {

  for (let [categoria, objCategories] of cat) {
    console.log(objCategories)

    CarouselSecond.innerHTML += `
      <div class="carousel-catalog swiper-container">
      <h4>${categoria}</h4>
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      </div>`
    for (let cat = 0; cat < objCategories.length; cat++) {
      document.querySelector('.swiper-wrapper').innerHTML += `
        <div class="swiper-slide">
        <img class="cardCategories" src="${objCategories[cat].images[0].url}" alt="Card do filme"></img>
        </div>`
    }


    var swiper = new Swiper('.swiper-container', {
      direction: "horizontal",
      loop: true,
      spaceBetween: 6,
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

      scrollbar: {
        el: ".swiper-scrollbar",
      },
    })
  }
}
getApi()