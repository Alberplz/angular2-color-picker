# Throwback

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> An asynchronous middleware pattern.

## Installation

```sh
npm install throwback --save
```

## Usage

Compose asynchronous functions (promise-based)

```js
import { compose } from 'throwback'

const fn = compose([
  async function (req, res, next) {
    console.log(1)

    try {
      await next()
    } catch (err) {
      console.log('throwback', err)
    }

    console.log(4)
  },
  async function (req, res, next) {
    console.log(2)

    return next()
  }
])

// Callback runs at the end of the stack, before
// the middleware bubbles back to the beginning.
fn({}, {}, function (req, res) {
  console.log(3)

  res.status = 404
})
```

## Inspiration

Built for [`popsicle`](https://github.com/blakeembrey/popsicle) and inspired by [`koa-compose`](https://github.com/koajs/compose).

## License

MIT

[npm-image]: https://img.shields.io/npm/v/throwback.svg?style=flat
[npm-url]: https://npmjs.org/package/throwback
[downloads-image]: https://img.shields.io/npm/dm/throwback.svg?style=flat
[downloads-url]: https://npmjs.org/package/throwback
[travis-image]: https://img.shields.io/travis/blakeembrey/throwback.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/throwback
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/throwback.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/throwback?branch=master
