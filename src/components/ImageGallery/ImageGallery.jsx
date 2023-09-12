import { useState } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components';

export const Gallery = ({ images }) => {
  const [isModal, setIsModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const toogleModal = () => {
    setIsModal(!isModal);
  };

  const showModal = largeImageURL => {
    setIsModal(true);
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      {images.length > 0 && (
        <ImageGallery>
          <GalleryItem images={images} showModal={showModal} />
        </ImageGallery>
      )}

      {isModal && (
        <Modal toogleModal={toogleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};
