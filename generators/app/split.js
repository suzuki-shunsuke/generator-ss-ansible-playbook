// Split.js

module.exports = input => {
  const items = [];
  input.split(' ').forEach(item => {
    item = item.trim();
    if (item.length) {
      items.push(item);
    }
  });
  return items;
};
