import React from 'react';
import { TiDelete } from 'react-icons/ti';
import ColoredIcons from './ColoredIcons';
function Image({ image, removeImage }) {
  return (
    <div className="relative p-3">
      <span
        className="absolute top-0.5 right-0.5 z-10"
        onClick={removeImage(image)}
        style={{ cursor: 'pointer' }}
      >
        <ColoredIcons icon={<TiDelete />} size={40} />
      </span>

      <img alt="" src={image.src} />
    </div>
  );
}
export default Image;
