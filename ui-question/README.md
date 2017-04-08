# UI Centric question

![alt text](https://raw.githubusercontent.com/hung-phan/zendesk-test/master/ui-question/screenshot.gif "application screenshot")

Using my personal project [boilerplate](https://github.com/hung-phan/koa-react-isomorphic)

## Requirement
- Install [yarn](https://github.com/yarnpkg/yarn)
- Install docker and docker-compose [link](https://docs.docker.com/docker-for-mac/)

## To run application

```bash
$ docker-compose up
```

And access `http://localhost:3000` to see the application

## Run in other modes

### Development mode

```bash
$ yarn install
$ yarn run watch
$ yarn run dev
```

### Production mode

```bash
$ yarn install
$ yarn run build
$ SECRET_KEY=your_env_key yarn start
```
