import { Component } from 'react';
import { ImageGallery } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components';

export class Gallery extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  showModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  render() {
    const { images } = this.props;
    const { showModal, largeImageURL } = this.state;

    return (
      <>
        {images.length > 0 && (
          <ImageGallery>
            <GalleryItem images={images} showModal={this.showModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal toogleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
