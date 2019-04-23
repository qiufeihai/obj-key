# obj-key

> 转换一个对象的key值


## Install

```
$ npm install obj-key
```


## Usage

```js
const objKey = require('obj-key');
const camelCase = require('obj-key').camelCase;
const CamelCase = require('obj-key').CamelCase;
const decamelize = require('obj-key').decamelize

objKey({a: 1, b: 2}, {a: 'A', b: 'B'}) // 对象方式映射
//=> '{A: 1, B: 2}'

objKey({abc_def: 1}, key => key.replace(/_/g, '-')) // 函数方式
//=> 'abc-def'

camelCase({abc_def: 1}) // 驼峰式
//=> 'abcDef

CamelCase({abc_def: 1}) // 驼峰式，手写字母大写
//=> 'AbcDef

decamelize({abcDef: 1}) // 驼峰转自定义字符，默认为_
//=> 'abc_def'

decamelize({abcDef: 1}, '-') // 驼峰转自定义字符，默认为_
//=> 'abc-def'
```


## API

### objKey(sourceObj, options)

### objKey.camelCase(sourceObj)

### objKey.CamelCase(sourceObj)

### ### objKey.decamelize(sourceObj)

#### sourceObj

Type: `Object`

#### options

Type: `Object | Function`<br>


## Related

- [`camelcase`](https://github.com/sindresorhus/camelcase) for the inverse.

- [`camelcase`](https://github.com/sindresorhus/camelcase) - The lowerCamelCase variant
