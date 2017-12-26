module.exports = class Params {
  constructor(params) {
    this.params = params;
  }

  setOptions(gen) {
    this.params.forEach(param => {
      if (param.option) {
        gen.option(param.name, param.option);
      }
    });
  }

  getQuestions(gen) {
    return this.params.filter(param => param.question).map(param => Object.assign({
      name: param.name,
      message: param.option ? param.option.desc : ''
    }, param.question(gen)));
  }
};
