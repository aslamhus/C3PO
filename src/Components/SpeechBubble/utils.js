import { constraints } from '../GameStage/constraints';

export const reduceConstraintPositions = (acc, constraint) => {
  acc[constraint] = `${constraintBounds[`${constraint}Percent`] * 100}%`;
  // calculate percent values
  const opposite = constraints[constraint].opposite;
  if (opposite != 'width' && opposite != 'height') {
    acc[opposite] = '';
  }
  return acc;
};
