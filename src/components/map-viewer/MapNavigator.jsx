import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {useRecoilState} from 'recoil'
import { mainMapPositionState, mainMapScaleState } from '../../lib/atoms/mapAtoms';

function MapNavigator(props) {
  const [mainMapPosition, setMainMapPosition] = useRecoilState(mainMapPositionState);
  const [mainMapScale, setMainMapScale] = useRecoilState(mainMapScaleState);

  const handlePanZoom = (scale) => {
    setMainMapPosition({ x: scale.state.positionX, y: scale.state.positionY });
    setMainMapScale(scale.state.scale);
  };


  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={0}
      defaultPositionY={0}
      onTransformed={(scale) => { handlePanZoom(scale) }}
      limitToBounds={true}
      minScale={0.5}
      maxScale={5}
      centerContent={false}
      limitToWrapperBounds={true}
      limitToWrapperBoundsPadding={50}
      doubleClick={{disabled:true}}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <TransformComponent>
            <img src={props.src} style={{ transform: `translate(${mainMapPosition.x}px, ${mainMapPosition.y}px) scale(${mainMapScale})` }} />
            {props.children}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}

export default MapNavigator;
