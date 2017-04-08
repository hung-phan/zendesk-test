# How to run

## Install yarn

```bash
$ npm install -g yarn
```

## Install project dependencies

```bash
$ yarn
```

## Run tests

```bash
$ yarn test
```

## Use lib

In `javascript-questions` folder, run this (to run code in es6 environment):

```bash
$ ./node_modules/.bin/babel-node
```

In the javascript REPL, enter the following:

```javascript
> const stringCompression = require("./src/stringCompression").default;

> console.log(stringCompression("aaaabbaaaababbbcccccccccccc"));
a4b2a4b1a1b3c12

> console.log(stringCompression("aabcccccaaa"));
a2b1c5a3

> const checkURIs = require("./src/checkURIs").default;

> console.log(checkURIs("http://abc.com:80/~smith/home.html", "http://ABC.com/%7Esmith/home.html"));
true

> console.log(checkURIs("http://abc.com/drill/down/foo.html", "http://abc.com/drill/further/../down/./foo.html"));
true

> console.log(checkURIs("http://abc.com/foo.html?a=1&b=2", "http://abc.com/foo.html?b=2&a=1"));
true

> console.log(checkURIs("http://abc.com/foo.html?a=1&b=2&a=3", "http://abc.com/foo.html?a=3&a=1&b=2"));
false
```
