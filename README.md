# Task Boards

The scrum board that is easy and low commitment for medium to
small projects or whatever else you want to use it for

Check it our here [task-boards.herokuapp.com](https://taskboards.herokuapp.com)

## Setup for Development

### Ensure that you have npm and node installed

If you are not sure if you do, type `node -v`,
and `npm -v`, and it will either say `command not found`
or tell you a version number.

If any of the above are not installed, using homebrew,
type `brew install node`

We are on `npm 6`, and `node 8-11`

### Clone the repository onto your computer

Clone the repository

```bash
git clone git@github.com:sambehrens/task-boards.git
```

Change directory to task-boards

```bash
cd task-boards
```

### Install dependencies

To install all dependencies, run:

```bash
npm run install-all
```

### Add config/secrets.js

We keep our database key secret, ask sambehrens
for the keys

```js
// config/secrets.js
module.exports = {
    mongoURI: '<mongo database secret key>'
};
```

You can also start a local mongo database and use that key instead.
See [installing mongodb](https://docs.mongodb.com/manual/installation/).

### Start development server

To start the development server, run:

```bash
npm run start:dev
```

Instead of adding a secrets.js file you can export the
mongo uri as an environment variable:

```bash
export MONGO_URI=<mongodb uri> yarn start:dev
```

### Testing

To run react component tests (located in sibling `tests` folders of component files):

```bash
npm run test:client
```

To run API tests (located in `/test/`):

```bash
npm run test:server
```

To run selenium tests (located in `/test/selenium`):

Start the client app

```bash
npm run start:client
```

In a separate shell run the tests:

```bash
npm run test:selenium
```

### Publish your changes

To merge your changes into production, follow the
merge strategy
[here.](https://github.com/dog-house-development/poodl/wiki/Git-Merging-Strategy)
