// import isEqual from 'fast-deep-equal';

//  const bindCurrentValueAndChangeValue = (
//   currentObj: any,
//   changeObj: any
// ) => {
//   console.log(!isEqual(currentObj, changeObj));
//   console.log(currentObj, changeObj);
//   return !isEqual(currentObj, changeObj);
// };

// export default bindCurrentValueAndChangeValue;

import isEqual from 'fast-deep-equal';

const bindCurrentValueAndChangeValue = (
  currentObj: Record<string, any>,
  changeObj: Record<string, any>
): boolean => {
  const normalizedChangeObj = { ...changeObj };

  Object.keys(currentObj).forEach((key) => {
    if (normalizedChangeObj[key] === undefined) {
      normalizedChangeObj[key] = '';
    }
  });

  console.log('Current:', currentObj);
  console.log('Change (normalized):', normalizedChangeObj);

  // keluarkan status true jika ada perubahan
  console.log('Is Equal:', isEqual(currentObj, normalizedChangeObj));

  return !isEqual(currentObj, normalizedChangeObj);
};

export default bindCurrentValueAndChangeValue;
