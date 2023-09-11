import styled from 'styled-components';

export const ImageGalleryItem = styled.li`
  flex-basis: calc((100% - 30px) / 4);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(0.9);

  :hover,
  :focus {
    transform: scale(1.1);
    transition: transform 250ms linear;
  }
`;
