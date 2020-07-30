const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// boolean trigger
let ready = false;
// a counter
let imagesLoaded = 0;
// total amount loaded
let totalImages = 0;

let photosArray = [];
// used in if statement below Get photos from Unspalsh API 
let isInitialLoad = true;

// Unspash API
let initialCount = 5
const apiKey = '6ObxMplYziQhmBhanzQ6UXh-Ye0LspIqp9Blu8273X4';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&query=work out`;
// creating a function to change image count
function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&query=work out`;
}
// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for links and photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // loop function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create empty <a> link tag to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    // Put <img> inside <a>, then put both inside imageContainer
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// Get photos from Unspalsh API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // Since if statement true will change picCount to 30
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30)
      isInitialLoad = false;
    }
  } catch (error) {

  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();