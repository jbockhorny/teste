const carouselFirst = document.querySelector(".carousel-first");
const carouselSecond = document.querySelector(".carousel-second");

const url = "https://sky-frontend.herokuapp.com/movies";

function getApi() {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			templateCarousel(data[0].items);
			getCategories(data[2].movies);
		});
}

function templateCarousel(item) {
	carouselFirst.innerHTML = `
	<div class="carousel-Launch swiper-container">
	<div class="swiper-wrapper">
	</div>
    </div>`
	for (let it in item) {
		document.querySelector('.swiper-wrapper').innerHTML += `
	<div class="swiper-slide">
		<img class="d-block w-100" src="${item[it].images[0].url}"  alt="Poster do Filme ${item[0].title}">
	</div>`

	}

	var swiperFirst = new Swiper(".swiper-container", {
		direction: "horizontal",
		loop: true,
		spaceBetween: 10,
		slidesPerGroup: 1,
		height: 200,
		slidesOffsetBefore: 0,
		centeredSlides: true,
		lazy: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		effect: "coverflow",
		coverflowEffect: {
			rotate: 25,
			stretch: 10,
			depth: 300,
			modifier: 1,
			slideShadows: true,
		},

		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			820: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 2,
			},
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
	});
}

function templateCategories(cat) {
	for (let [categoria, objCategories] of cat) {
		let name = categoria.split(" ")[0].toLowerCase();

		carouselSecond.innerHTML += `
			<div class="carousel-catalog swiper-container ${name}">
			<h4 c>${categoria}</h4>
			<div class="swiper-wrapper ${name}">
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
			</div> <br><br>`;

		for (card of objCategories) {
			document.querySelector(".swiper-wrapper." + name).innerHTML += `
				<div class="swiper-slide">
					<img class="cardCategories" src="${card.images[0].url}" alt="Card do filme"></img>
				</div>`;
		}

		setTimeout(function () {
			createSwipe(".swiper-container." + name);
		}, 500);
	}
}

function createSwipe(ref) {
	var swiper = new Swiper(ref, {
		direction: "horizontal",
		loop: false,
		spaceBetween: 10,
		slidesPerView: 3,
		slidesPerGroup: 3,
		height: 200,
		slidesOffsetBefore: 0,

		breakpoints: {
			640: {
				slidesPerView: 5,
				slidesPerGroup: 5,
			},

			820: {
				slidesPerView: 6,
				slidesPerGroup: 6,
			},

			1024: {
				slidesPerView: 7,
				slidesPerGroup: 7,
			},
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
	});
}

function getCategories(objCategories) {

	let categories = new Map();

	for (let cat in objCategories) {
		let splits = objCategories[cat].categories.split(", ");

		let card = objCategories[cat];

		splits.forEach((element) => {
			let cardsCategories = categories.get(element);

			if (cardsCategories === undefined) {
				categories.set(element, [card]);
			} else {
				cardsCategories.push(card);
			}
		});
	}
	templateCategories(categories);
}

// function get(objCategories) {
// 	let categories = [];

// 	for (let cat in objCategories) {
// 		let splits = objCategories[cat].categories.split(", ");
// 		let card = objCategories[cat];

// 		splits.forEach((element) => {
// 			if (categories[element] === undefined) {
// 				categories[element] = [];
// 			}

// 			categories[element].push(card);
// 		});
// 	}

// 	console.log(categories);

//  templateCategories(categories);
// }

getApi();
