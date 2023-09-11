import { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from 'components/Button/Button.styled';
import { Loader } from 'components/Loader/Loader';
import * as ApiService from 'services/images';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 12;

const height = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);
window.scrollTo(0, height);

export class App extends Component {
  perPage = PER_PAGE;

  state = {
    value: '',
    page: 1,
    perPage: this.perPage,
    images: [],
    isLoading: false,
    isEmpty: false,
    isVisible: false,
  };

  getImages = async (value, page) => {
    this.setState({ isLoading: true });
    if (!value) {
      return;
    }

    try {
      const { hits, totalHits } = await ApiService.getImages(value, page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true, isLoading: false });
        toast.error('Images are not found. Enter other word', {
          position: toast.POSITION.TOP_RIGHT,
          toastId: Date.now(),
        });
      }

      this.setState(({ images, page, perPage }) => ({
        images: [...images, ...hits],
        isVisible: page < Math.ceil(totalHits / perPage),
      }));
    } catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: Date.now(),
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = value => {
    if (!value) {
      toast.warn('Enter the word', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: Date.now(),
      });
      return;
    }

    this.setState({
      value: value,
      page: 1,
      images: [],
      isEmpty: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.getImages(value, page);
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isEmpty, isVisible } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <Gallery images={images} />
        {!isEmpty && isVisible && (
          <ButtonLoadMore onClick={this.onLoadMore}>Load More</ButtonLoadMore>
        )}
        {isLoading && <Loader />}
        <ToastContainer transition={Zoom} theme="dark" />
      </>
    );
  }
}
