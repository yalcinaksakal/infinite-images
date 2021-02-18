const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const apiKey = "d4CnJqNpq4sVKzysderC8O8KDCabyOy7K7aNYj8yh9Q";

let photosArray = [];

let initialImageLoad = 5;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const apiURL = () =>
  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImageLoad}`;

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialImageLoad = 30;
  }
};

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = function () {
  totalImages += photosArray.length;
  photosArray.forEach(photo => {
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//get photos
const getPhotos = async function () {
  try {
    const response = await fetch(apiURL());
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {}
};

//check to see if scrolling near bottom of page, Load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    //console.log("get photos");
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
