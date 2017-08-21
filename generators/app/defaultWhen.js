module.exports = (gen, name, filter) => answers => {
  const optVal = gen.options[name];
  if (optVal !== undefined) {
    answers[name] = filter ? filter(optVal) : optVal;
    return false;
  }
  return true;
};
