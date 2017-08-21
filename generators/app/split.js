// split.js

module.exports = function split(input) {
  const items = [];
  input.split(' ').forEach(item => {
    item = item.trim();
    if (item.length) {
      items.push(item);
    }
  });
  return items;
};
