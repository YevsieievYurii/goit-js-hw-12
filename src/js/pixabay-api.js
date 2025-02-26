import axios from 'axios';
const API_KEY = '48924645-79e9b00d1f962ef58b63a0249';

export async function fetchImages(query, page = 1, perPage = 40) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  
  try {
    const response = await axios.get(url);
    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }
    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}