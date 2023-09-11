import axios from 'axios';

const API_KEY = '36684005-bee5d5c8682e5aa73080486ab';
const BASE_URL = 'https://pixabay.com/api/';

export const getImages = async (value, page) => {
  const { data } = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${value}`,
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
    },
  });
  return data;
};
