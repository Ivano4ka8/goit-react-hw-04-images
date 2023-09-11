import { ImageGalleryItem } from './ImageGalleryItem.styled';

export const GalleryItem = ({ images, showModal }) => {
  return images.map(({ largeImageURL, id, webformatURL, tags }) => {
    return (
      <ImageGalleryItem key={id} onClick={() => showModal(largeImageURL)}>
        <img src={webformatURL} alt={tags} />
      </ImageGalleryItem>
    );
  });
};
