import {atom} from 'recoil'

export const mainMapPositionState = atom({
  key: 'mainMapPositionState', // unique ID (with respect to other atoms/selectors)
  default: { x: 0, y: 0 }, // default value (aka initial value)
});

export const mainMapScaleState = atom({
  key: 'mainMapScaleState', // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});