const objKey = require('../index');
const camelCase = require('../index').camelCase;
const CamelCase = require('../index').CamelCase;
const decamelize = require('../index').decamelize;
const assert = require('power-assert');
describe('test', () => {
  it('参数1空', () => {
    assert.throws(() => {
      objKey();
    }, new TypeError('sourceObje must be an object'))
  });

  it('参数2空', () => {
    let ret = objKey({a:1})
    assert.deepEqual(ret,{a:1})
  });

  it('a-->A b-->B   options is object', () => {
    let ret = objKey({a: 1, b: 2}, {a: 'A', b: 'B'})
    assert.deepEqual(ret, {A: 1, B: 2})
  });

  it('c这个key本来就不存在   不会有新key', () => {
    let ret = objKey({a: 1, b: 2}, {c: 'C'})
    assert.deepEqual(ret, {a: 1, b: 2})
  });

  it('a映射到一个已存在的b 等于删了原来的b的值了', () => {
    let ret = objKey({a: 1, b: 2}, {a: 'b'})
    assert.deepEqual(ret, {b: 1})
  });


  it('a映射到一个已存在的b  等于删了原来的b的值了', () => {
    let ret = objKey({b:2, a: 1}, {a: 'b'})
    assert.deepEqual(ret, {b: 1})
  });
  
// options 为 function
  it('不返回时取原来的key', () => {
    let ret = objKey({a: 1}, key => {return undefined})
    assert.deepEqual(ret, {a: 1})
  });

  it('_  转 -', () => {
    let ret = objKey({abc_def: 1}, key => key.replace(/_/g, '-'))
    assert.deepEqual(ret, {['abc-def']: 1})
  });


  it('驼峰', () => {
    let ret = camelCase({abc_def: 1})
    assert.deepEqual(ret, {['abcDef']: 1})
  });

  it('驼峰 首写字母大写', () => {
    let ret = CamelCase({abc_def: 1})
    assert.deepEqual(ret, {['AbcDef']: 1})
  });

  it('自定义分割字符 默认为_', () => {
    let ret = decamelize({abcDef: 1})
    assert.deepEqual(ret, {['abc_def']: 1})
  });


  it('自定义分割字符 驼峰 ---> -', () => {
    let ret = decamelize({abcDef: 1}, '-')
    assert.deepEqual(ret, {['abc-def']: 1})
  });

  it('自定义分割字符 驼峰 ---> -', () => {
    let ret = decamelize({AbcDef: 1}, '-')
    assert.deepEqual(ret, {['abc-def']: 1})
  });

});