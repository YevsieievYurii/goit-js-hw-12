import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImageGallery(images, append = false) {
  const gallery = document.querySelector('.gallery');
  if (!append) gallery.innerHTML = '';

  images.forEach(image => {
    const imgCard = `
      <div class="photo-card">
        <a href="${image.largeImageURL}" class="gallery__item">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery__image" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML('beforeend', imgCard);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

export function showLoadingIndicator() {
  document.querySelector('.loading').classList.remove('hidden');
}

export function hideLoadingIndicator() {
  document.querySelector('.loading').classList.add('hidden');
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function scrollPage() {
  const gallery = document.querySelector('.gallery');
  const cardHeight = gallery.firstElementChild?.getBoundingClientRect().height || 0;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}

export function showNoResultsMessage() {
  iziToast.info({
    title: 'No Results',
    message: 'Sorry, there are no images matching your search query. Please try again!',
  });
}

