import React, { useState, useEffect } from 'react';
import { baseInstance } from '../api/config.js';
import styled from 'styled-components';
import Sun from '../assets/img/Sun.png';
import upbutton from '../assets/img/upbutton.png';
import downbutton from '../assets/img/downbutton.png';

function BasicSticker() {
  const StickerBox = ({ imageURL }) => {
    return (
      <StickerBoxContainer>
        {imageURL &&
          imageURL.map((url, index) => (
            <StickerImage
              key={index}
              src={url}
              alt={`StickerPage-${stickerPageNum}-${index}`}
            />
          ))}
      </StickerBoxContainer>
    );
  };

  const [stickerPageNum, setStickerPageNum] = useState(1);
  const [imageURL, setImageURL] = useState([]);

  const handleUpButtonClick = () => {
    if (stickerPageNum < 7) {
      setStickerPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const handleDownButtonClick = () => {
    if (stickerPageNum > 1) {
      setStickerPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await baseInstance.get(
          `/api/v1/static/stickers?page=${stickerPageNum}`,
        );
        const imageData = response.data.data.st_image_urls;
        setImageURL(imageData);
      } catch (error) {
        console.error('Error fetching image from API', error);
      }
    };

    fetchImage();
  }, [stickerPageNum]);

  return (
    <BasicStickerContainer>
      {[...Array(6)].map((_, index) => (
        <StickerBox key={index} imageURL={imageURL} />
      ))}
      <StyledSun src={Sun} alt="Sun" />
      <StyledUpButton
        onClick={handleUpButtonClick}
        src={upbutton}
        alt="UpButton"
      />
      <StyledDownButton
        onClick={handleDownButtonClick}
        src={downbutton}
        alt="DownButton"
      />
      <ScrollContainer />
    </BasicStickerContainer>
  );
}

const BasicStickerContainer = styled.div`
  flex-wrap: nowrap;
  flex-direction: row;
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  text-align: center;
`;

const StyledSun = styled.img`
  position: absolute;
  z-index: 10;
  width: 10.25rem;
  height: 7.0625rem;
  top: -1.9375rem;
  left: -2.6875rem;
`;

const StyledUpButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -3.12356rem;
  left: 6.65625rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledDownButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -4.5rem;
  left: 6.66625rem;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const ScrollContainer = styled.div`
  width: 13.25rem;
  height: 3.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: -4.75rem;
  left: 1.1rem;
`;
const StickerBoxContainer = styled.div`
  align-items: center;
  width: 7.625rem;
  height: 10rem;
  flex-shrink: 0;
  background: #aaaaaa;
`;

export default BasicSticker;
