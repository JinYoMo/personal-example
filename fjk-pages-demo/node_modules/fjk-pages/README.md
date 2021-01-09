# fjk-pages

## 一个已发布到npm的用于封装自动化构建工作流Gulp-CLI

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ yarn add fjk-pages

# or npm
$ npm install fjk-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const fjkPages = require('fjk-pages')
const result = fjkPages('fjk')
// result => 'fjk@fjk.me'
```

## API

<!-- TODO: Introduction of API -->

### fjkPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'fjk.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

