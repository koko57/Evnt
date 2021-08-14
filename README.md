# Evnt
Evnt planning full stack app with authentication and database hosted on MongoDB Atlas.

![Screenshot](https://raw.githubusercontent.com/koko57/portfolio/master/static/img/evnt.png)

## Built with
Front End: React, Redux, React Router
Back End: Node.js (Express), Mongoose, Passport

## Prerequisities
To install and run the app you need to have Node.js installed on your machine.
If you don't have Node.js installed you can either download it from [Node.js page](https://nodejs.org/en/download/) or using Homebrew:

```bash
brew install node
```

## Installation
Download/clone the repo then run

```bash
# Install dependencies for server
npm install

# Install dependencies for client
cd client && npm install

```
To run the client/server navigate back to parent directory and:

```bash
# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000

```
## Live version
https://evnt57.herokuapp.com/

## License
This project is licensed under the MIT License

MIT © [Agata Kosior](https://github.com/koko57)
