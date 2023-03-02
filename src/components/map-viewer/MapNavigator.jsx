import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

function PngViewer(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handlePan = (event) => {
    setPosition({ x: event.panX, y: event.panY });
  };

  const handleZoom = (event) => {
    setScale(event.scale);
  };

  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={0}
      defaultPositionY={0}
      onPanning={handlePan}
      onZoom={handleZoom}
      limitToBounds={false}
      minScale={0.5}
      maxScale={5}
      centerContent={false}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          {/* <button onClick={zoomIn}>Zoom In</button>
          <button onClick={zoomOut}>Zoom Out</button>
          <button onClick={resetTransform}>Reset</button> */}
          <TransformComponent>
            <img src={props.src} style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }} />
            {props.children}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}

export default PngViewer;
