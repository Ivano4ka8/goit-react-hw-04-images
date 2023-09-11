import styled from 'styled-components';

export const ButtonLoadMore = styled.button`
  display: block;

  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ theme }) => theme.spacing(10)};

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  border-radius: ${({ theme }) => theme.spacing(2)};

  padding: 15px 30px;
  text-transform: uppercase;
  font-weight: bold;

  background: linear-gradient(45deg, black, transparent);
  color: white;
`;
