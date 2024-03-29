# library-react

<p align="center">
    <img alt="License" src="https://img.shields.io/github/license/SirJohanot/library-react">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/SirJohanot/library-react">
</p>

## About

A front-end application for the library-spring project, built with React JS.

## Installation

1. Download and unzip the source code
2. Specify the `REACT_APP_API_URL` in the [.env](/.env) file with the URL of the deployed [library-spring](https://github.com/SirJohanot/library-spring) API (if left unspecified, the app will assume the following url: `http://localhost:8080`)
3. `npm install` to install the dependencies
4. `npm run build` to build the app
5. `serve -s build` to deploy the app

### Alternatively, use [Docker](https://www.docker.com/):

1. `docker build -t <image_name> .`
2. `docker run -d -p <desired_host_port>:3000 <image_name>`

## Screenshots

![Screenshot](./docs/screenshots/screenshot-1.png)
![Screenshot](./docs/screenshots/screenshot-3.png)
![Screenshot](./docs/screenshots/screenshot-2.png)
![Screenshot](./docs/screenshots/screenshot-4.png)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Serve](https://www.npmjs.com/package/serve)

## Developers

- [Johanot](https://github.com/SirJohanot)
- [Aliaksandr](https://github.com/SashaMed)

## License

Project Library React is distributed under the MIT license.