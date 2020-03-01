module.exports = plop => {
  plop.setGenerator("example", {
    description: "Action for Example",
    prompts: [
      {
        type: "list",
        name: "layout",
        choices: ["example", "example-full"],
        message: "Please choice layout?"
      },
      {
        type: "input",
        name: "file",
        message: "What is the file?"
      },
      {
        type: "input",
        name: "title",
        message: "What is the title?"
      },
      {
        type: "input",
        name: "shortdesc",
        message: "What is the shortdesc?"
      },
      {
        type: "input",
        name: "docs",
        message: "What is the docs?"
      },
      {
        type: "input",
        name: "tags",
        message: "What is the tags?"
      },
      {
        type: "confirm",
        name: "hasResources",
        default: false,
        message: "Does it have resources?"
      }
    ],
    actions: answer => {
      const actions = [];

      actions.push({
        type: "add",
        path: `examples/${answer.file}.html`,
        templateFile: `plop/templates/example/html.hbs`,
        abortOnFail: true
      });

      actions.push({
        type: "add",
        path: `examples/${answer.file}.css`,
        templateFile: `plop/templates/example/css.hbs`,
        abortOnFail: true
      });

      actions.push({
        type: "add",
        path: `examples/${answer.file}.js`,
        templateFile: `plop/templates/example/js.hbs`,
        abortOnFail: true
      });

      return actions;
    }
  });
};
