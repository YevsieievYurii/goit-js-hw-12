import { fetchImages } from './js/pixabay-api.js';
import {
  renderImageGallery,
  showLoadingIndicator,
  hideLoadingIndicator,
  showError,
  showNoResultsMessage,
  clearGallery,
  scrollPage
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('#load-more');
let query = '';
let page = 1;
const perPage = 40;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = searchInput.value.trim();


  if (!query) {
    alert('Please enter a search term.');
    return ;
  }

  page = 1;
  loadMoreBtn.classList.add('hidden');
  clearGallery();

  try {
    showLoadingIndicator();
    const { images, totalHits } = await fetchImages(query, page, perPage);
    renderImageGallery(images);

    searchInput.value = ''; 

    if(totalHits > perPage) {
      loadMoreBtn.classList.remove('hidden');
    }

  } catch (error) {
    showError('Something went wrong! Please try again later.');
  } finally {
    hideLoadingIndicator();
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page++;

  try {
    showLoadingIndicator();
    const { images, totalHits } = await fetchImages(query, page, perPage);
    renderImageGallery(images, true);
    scrollPage();
    
    if (page * perPage >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      showError("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showError('Something went wrong! Please try again later.');
  } finally {
    hideLoadingIndicator();
  }
});
