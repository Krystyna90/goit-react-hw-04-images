import { useState, useEffect } from "react";
import fetchImages from "../fetch/images-api";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMore from "./LoadMore/LoadMore";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default function App() {
  const [imageName, setImageName] = useState("");
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setIsLoading((prevState) => !prevState);

    fetchImages(imageName, page)
      .then(({ hits, totalHits }) => {
        const imagesArray = hits.map((hit) => ({
          id: hit.id,
          description: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        setImages([...images, ...imagesArray]);
        setImagesOnPage(imagesArray.length);
        setTotalImages(totalHits);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setIsLoading((prevState) => !prevState));
  }, [imageName, page]);

  const getSearchRequest = (imgName) => {
    if (imgName !== imageName) {
      setImageName(imgName);
      setPage(1);
      setImages([]);
      setError(false);
    }
  };

  const onNextFetch = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const openModal = (e) => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === "IMG") {
      setShowModal((prevModal) => !prevModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <LoadMore onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
    </div>
  );
}
