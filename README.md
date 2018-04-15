# Serverless, AWS Lambda, Node.js and Webpack boilerplate

## Introducton

This project uses the serverless, webpack and node.js frameworks to produce bundled AWS lambda functions.

### Webpack 

Webpack has been used to enable developers to use ES6 syntax, benefit from webpack module capabilities as well as provide the ability to produce minified individual functions for deployment. Webpack also enables developers to pre-process Javascript using all of the available Webpack plugins.

## Setup

It is essential that you use a node version greater than 8.0.* to run this project.
A number of global node.js modules are required to start using this project locally, of which are listed below:

* yarn
* serverless
* serverless-offline

Packages can be installed globally using the following command:

    npm install -g <package-name>

Once the above node.js packages have been installed globally, you need to install all project dependencies by executing the `yarn` command.

## Running in Development mode.

The boilerplate project has been setup to run with a local S3 instance as an example of how to work locally with AWS Services. The configuration for the local S3 instance can be found in the `serverless.yml` file. 

The project can be run locally by executing the `yarn start` command. Doing so will run `serverless-offline` with the webpack plugin.

## Test

Testing is provided using NYC, Mocha, Chai and Sinon. Tests are located in the `test/unit` directory and can be run by executing the `yarn test` command. Doing so will run all tests as well as print out the test coverage report in the terminal. A html report will also be produced, this is located in the `coverage` directory.

## Building

The AWS Lambda functions are built via the `yarn build` command. Executing the `build` command will run webpack, bundling each function into a separate zip file located in the `.serverless` directory.