# UI Centric question

![alt text](https://raw.githubusercontent.com/hung-phan/zendesk-test/master/ui-question/screenshot.gif "application screenshot")

Using my personal project [boilerplate](https://github.com/hung-phan/koa-react-isomorphic)

## Requirement
- Install [yarn](https://github.com/yarnpkg/yarn)

## Run project in development mode

```bash
$ yarn install
$ yarn run watch
$ yarn run dev
```

## Run project in production mode

```bash
$ yarn install
$ yarn run build
$ SECRET_KEY=your_env_key yarn start
```

### Docker container

```bash
$ docker-compose up
```

Access `http://localhost:3000` to see the application
