"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the mind-blowing ${chalk.blue("rootaid")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "App Name",
        default: "myapp"
      },
      {
        type: "confirm",
        name: "mongodb",
        message: "Install MongoDB and Mongoose?",
        default: true
      }
      // {
      //   type: "input",
      //   name: "web",
      //   message: "Koa or Express as web framework?",
      //   default: true,
      //   options: ["Koa", "Express"]
      // }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const src = this.sourceRoot();
    const dest = this.destinationPath(`${this.props.name}`);

    //The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    if (!this.props.mongodb) copyOpts.globOptions.ignore.push(src + "/db.ts");

    this.fs.copy(src, dest, copyOpts);

    const files = ["index.ts", "package.json"];

    const opts = {
      name: this.props.name,
      mongodb: this.props.mongodb
    };

    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`${this.props.name}/${file}`),
        opts,
        copyOpts
      );
    });
  }

  install() {
    const appDir = path.join(process.cwd(), this.props.name);
    process.chdir(appDir);
    this.npmInstall();
  }
};
