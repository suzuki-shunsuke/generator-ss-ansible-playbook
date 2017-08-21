module.exports = name => name.split('-').reduce(
  (prevVal, currentVal) => {
    return `${prevVal}${currentVal[0].toUpperCase()}${currentVal.slice(1)}`;
  });
