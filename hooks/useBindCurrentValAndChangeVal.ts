import isEqual from 'fast-deep-equal';

const bindCurrentValueAndChangeValue = (
  currentObj: unknown,
  changeObj: unknown
) => {
  console.log(!isEqual(currentObj, changeObj));
  console.log(currentObj, changeObj);
  return !isEqual(currentObj, changeObj);
};

export default bindCurrentValueAndChangeValue;
