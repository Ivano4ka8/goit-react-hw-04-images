import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export const Form = styled.form`
  display: flex;
  align-content: center;
  justify-content: center;
  background: repeating-linear-gradient(45deg, black, transparent 100px);
`;

export const Input = styled.input`
  width: 400px;
  color: ${({ theme }) => theme.colors.white};
  background: black;
  border: none;
  padding: 8px;
  outline: none;
  height: 100%;
`;

export const ButtonSearch = styled.button`
  background: repeating-radial-gradient(black, transparent 100px);
  gap: 8px;
  padding: 8px;
`;

export const SearchIcon = styled(FaSearch)`
  fill: ${({ theme }) => theme.colors.white};
`;
