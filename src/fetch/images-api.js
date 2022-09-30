const URL = "https://pixabay.com/api/";
const KEY = "29099820-015ce301a6c1b4fc2f744a348";

function fetchImages(imageName, page = 1) {
  return fetch(
    `${URL}?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => response.json());
}

export default fetchImages;
