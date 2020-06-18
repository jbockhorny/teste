const carousel = document.getElementById('carousel')
const sectionCard = document.getElementById('card')


const url = 'https://sky-frontend.herokuapp.com/movies';
getApi()

function getApi() {

  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.map(element => {
      getCarouel(element.items)
    })
  })
  fetch(url)
  .then(res => res.json())
  .then(d => {
    d.map(el => {
      getCategories(el.movies)
    })
  })
}


function getCarouel(e) {
  carousel.innerHTML =
    `<div class="carousel-item active">
      <img class="d-block w-100" src="${e[0].images[0].url}"  alt="Poster do Filme ${e[0].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${e[1].images[0].url}"  alt="Poster do Filme ${e[1].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${e[2].images[0].url}"  alt="Poster do Filme ${e[2].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${e[3].images[0].url}"  alt="Poster do Filme ${e[3].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${e[4].images[0].url}"  alt="Poster do Filme ${e[4].title}">
      <div class="carousel-caption d-none d-md-block"></div>
    </div>`

}

function getCategories(e) {
  // console.log(e.categories)
  templateCategories(e)
}

function templateCategories(e) {
  sectionCard.innerHTML = `<p>Ação e Aventura<p>`
  for (let elem in e) {
    for (let pudim in e[elem].images) {

      if (e[elem].categories.indexOf("Ação e Aventura") >= 0)
        sectionCard.innerHTML +=

          `<div class="card" style="margin: 10px">
    <img class="card-img-top" style="max-width: 18rem;" src="${e[elem].images[pudim].url}" alt="Card image cap">
   </div>`
      break;
    }
  }
}
