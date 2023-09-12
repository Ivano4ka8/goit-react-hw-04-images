import { useEffect, useState, useRef } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from 'components/Button/Button.styled';
import { Loader } from 'components/Loader/Loader';
import * as ApiService from 'services/images';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const height = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);
window.scrollTo(0, height);

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    console.log(signal.addEventListener);
    console.log(controller);

    const getImages = async (value, page) => {
      setLoading(true);

      try {
        const { hits, totalHits } = await ApiService.getImages(
          value,
          page,
          signal
        );

        if (hits.length === 0) {
          setEmpty(true);
          setLoading(false);

          toast.error('Images are not found. Enter other word', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: Date.now(),
          });
        }

        setImages([...images, ...hits]);
        setVisible(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        console.log({ error });
        if (error.code !== 'AbortError') {
          toast.error('Something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: Date.now(),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getImages(value, page, controller);

    return () => {
      controller.abort(reason);
    };
  }, [page, value]);

  const handleSubmit = value => {
    if (!value) {
      toast.warn('Enter the word', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: Date.now(),
      });
      return;
    }

    setValue(value);
    setPage(1);
    setImages([]);
    setEmpty(false);
  };

  const onLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  // export class App extends Component {
  //   perPage = PER_PAGE;

  //   state = {
  //     value: '',
  //     page: 1,
  //     perPage: this.perPage,
  //     images: [],
  //     isLoading: false,
  //     isEmpty: false,
  //     isVisible: false,
  //   };

  //   getImages = async (value, page) => {
  //     this.setState({ isLoading: true });
  //     if (!value) {
  //       return;
  //     }

  //     try {
  //       const { hits, totalHits } = await ApiService.getImages(value, page);

  //       if (hits.length === 0) {
  //         this.setState({ isEmpty: true, isLoading: false });
  //         toast.error('Images are not found. Enter other word', {
  //           position: toast.POSITION.TOP_RIGHT,
  //           toastId: Date.now(),
  //         });
  //       }

  //       this.setState(({ images, page, perPage }) => ({
  //         images: [...images, ...hits],
  //         isVisible: page < Math.ceil(totalHits / perPage),
  //       }));
  //     } catch (error) {
  //       toast.error('Something went wrong', {
  //         position: toast.POSITION.TOP_RIGHT,
  //         toastId: Date.now(),
  //       });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   };

  //   handleSubmit = value => {
  //     if (!value) {
  //       toast.warn('Enter the word', {
  //         position: toast.POSITION.TOP_RIGHT,
  //         toastId: Date.now(),
  //       });
  //       return;
  //     }

  //     this.setState({
  //       value: value,
  //       page: 1,
  //       images: [],
  //       isEmpty: false,
  //     });
  //   };

  //   componentDidUpdate(prevProps, prevState) {
  //     const { value, page } = this.state;
  //     if (prevState.value !== value || prevState.page !== page) {
  //       this.getImages(value, page);
  //     }
  //   }

  //   onLoadMore = () => {
  //     this.setState(prevState => ({
  //       page: prevState.page + 1,
  //     }));
  //   };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Gallery images={images} />
      {!isEmpty && isVisible && (
        <ButtonLoadMore onClick={onLoadMore}>Load More</ButtonLoadMore>
      )}
      {isLoading && <Loader />}
      <ToastContainer transition={Zoom} theme="dark" />
    </>
  );
};
