module.exports = (gen, params, optionNames) => {
  const questions = params.getQuestions(gen);
  const invQuestions = {};
  questions.forEach(question => {
    invQuestions[question.name] = question;
  });
  return gen.prompt(questions).then(answers => {
    const ret = {};
    optionNames.forEach(name => {
      if (gen.options[name] === undefined) {
        ret[name] = answers[name];
      } else {
        const filter = invQuestions[name].filter;
        ret[name] = filter ? filter(gen.options[name]) : gen.options[name];
      }
    });
    gen.answers = ret;
  });
};
