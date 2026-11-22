# Kawa Common Language

_Because practicing language should be like drinking a good old fashioned mug of Kawa._

## Forewords

**This package provides a set of stateless utilities and helpers which encapsulate javascript (in a node context).**

⚠️ **Important Note** :
I made this package mainly for my personal usage in order to simplify my own code, respecting my own code conventions. If I finally publish it on npm, the main purpose is my own benefits. **BUT** if this one could help me, perhaps it could help others. So enjoy, but don't complain if it doesn't fit what you expect.

## Install

In order to use this library, just execute this command on your project :

    npm install kawa-commons-lang

## Documentation

| Name                    | Description                                                   |
| :---------------------- | :------------------------------------------------------------ |
| [boolean](#boolean)     | Utilities dedicated to boolean primitive management.          |
| [errors](#errors)       | Utilities dedicated to error management.                      |
| [function](#function)   | Utilities dedicated to manage functions.                      |
| [number](#number)       | Utilities dedicated to manage numbers.                        |
| [integer](#integer)     | Utilities dedicated to manage integer values.                 |
| [timestamp](#timestamp) | Utilities dedicated to manage timestamp.                      |
| [string](#string)       | Utilities dedicated to string management.                     |
| [date](#date)           | Utilities dedicated to manage string with date / time format. |
| [uuid](#uuid)           | Utilities dedicated to manage string with UUID format.        |
| [undefined](#undefined) | Utilities dedicated to undefined management.                  |

## boolean

#### check(**value**) : boolean

- This function is used to _"check"_ a given boolean.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
- returns the given `value` if, and only if, this one is valid `boolean`.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a valid `boolean`.
- Example:

```javascript
const { boolean } = require('kawa-commons-lang');
boolean.check(); // ⇨ CommonError: The value MUST be a boolean.
boolean.check('not a boolean'); // ⇨ CommonError: The value MUST be a boolean.
boolean.check(false); // ⇨ false
boolean.check(true); // ⇨ true
```

#### clean(**value**, _options_) : boolean

- This function is used to _"clean"_ a given boolean in order to retrieve safely a valid `boolean`.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
  - `options` (`object`) _optional_ : a set of options.
    - `dft` : if this one is a valid `boolean`, returns this when given value is not a valid `boolean`.
- returns:
  - when the given `value` is a valid `boolean`, return it.
  - when the given `value` is **NOT** valid `boolean` and `options.dft` is a valid `boolean`, return options.dft.
  - when the given `value` and `options.dft` are **NOT**, return `false`.
- Example:

```javascript
const { boolean } = require('kawa-commons-lang');
boolean.clean(); // ⇨ false
boolean.clean(true); // ⇨ true
boolean.clean('not a boolean'); // ⇨ false
boolean.clean('not a boolean', { dft: true }); // ⇨ true
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `boolean` primitive.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
- returns: `true` if, and only if, the given value is `boolean` primitive..
- Example:

```javascript
const { boolean } = require('kawa-commons-lang');
boolean.is(true); // ⇨ true
boolean.is(false); // ⇨ true
boolean.is(); // ⇨ false
boolean.is('true'); // ⇨ false
```

#### not(value) : boolean

- This function is used to know safely if a given value is **NOT** a valid `boolean` primitive.
- parameter(s) :
  - value (`boolean`) : a given value.
- returns:
  - a `boolean` equals to `true` if, and only if, the given `value` is **NOT** a `boolean` primitive.
- Example:

```javascript
const { boolean } = require('kawa-commons-lang');
boolean.not(true); // ⇨ false
boolean.not(false); // ⇨ false
boolean.not(); // ⇨ true
boolean.not('true'); // ⇨ true
```

#### resolve(**value**) : boolean

- This function is like _"check"_, but asynchronous.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
- resolves the given `value` if, and only if, this one is valid `boolean`.
- rejects an error :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a valid `boolean`.
- Example:

```javascript
const { boolean } = require('kawa-commons-lang');
boolean.resolve(); // ⇨ reject CommonError: The value MUST be a boolean.
boolean.resolve('not a boolean'); // ⇨ reject CommonError: The value MUST be a boolean.
boolean.resolve(false); // ⇨ resolve false
boolean.resolve(true); // ⇨ resolve true
```

## errors

#### new(message, cause) : CommonError

- This function is used to create a new error, initialized with a message and, optionnaly, a root cause.
- parameter(s) :
  - message (`string`) : a given value used as error message. Should be a string. If invalid or missing, will be replaced by a generic valid string.
  - cause (`string` | `Error`) _optionnal_ : a given value used as cause. Should be an instance of Error or a string. _(If cause is a string, this one will be encapsulated in a generic Error)_.
- example:

```javascript
const { errors } = require('kawa-commons-lang');
throw errors.new('An error message.', new Error('due to an example'));
```

## function

#### async(**value**) : boolean

- This function is used to execute a given function in an ascynchronous way.
- parameter(s) :
  - value (`function`) : a given value.
- resolves:
  - `undefined` when the given value is not a valid function.
  - the value returned by the given value when valid and executed.
- resolves:
  - the error thrown when by the given value is a valid function and its call throw an error.
- Example:

```javascript
const { fn } = require('kawa-commons-lang');
fn.async().then(thing => console.log(`An ${thing} thing is resolved.`));
fn.async(4).then(thing => console.log(`An ${thing} thing is resolved.`));
fn.async(() => 3).then(three => console.log(`${three} is resolved.`));
fn.async(() => throw new Error('PAF!')).catch(error => console.log(`Rejected PAF : `, error));
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `function`.
- parameter(s) :
  - value (`function`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is a valid `function`.
- Example:

```javascript
const { fn } = require('kawa-commons-lang');
fn.is(); // ⇨ false
fn.is('NOT A FUNCTION'); // ⇨ false
fn.is(() => {}); // ⇨ true
```

#### not(value) : boolean

- This function is used to know safely if a given value is **NOT** a valid `function`.
- parameter(s) :
  - value (`number`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is **NOT** a valid `function`.
- Example:

```javascript
const { fn } = require('kawa-commons-lang');
fn.not(); // ⇨ true
fn.not('NOT A NUMBER'); // ⇨ true
fn.not(() => {}); // ⇨ false
```

#### reject(**value**) : function

- This function is used reject the value.
- parameter(s) :
  - **`value`** (`function`) : the value to reject.
- rejects the given value.
- Example:

```javascript
const { fn } = require('kawa-commons-lang');

return fn
  .reject('racism')
  .then(racism => console.log(`${racism} will never be resolved.`))
  .catch(racism => console.error(`but ${racism} will always be rejected.`));
```

#### resolve(**value**) : function

- This function is used to resolve a given value.
- parameter(s) :
  - **`value`** (`function`) : a given value.
- resolves the given value.
- Example:

```javascript
const { fn } = require('kawa-commons-lang');

return fn
  .resolve('love')
  .then(love => console.log(`I always ${love} it, when it's resolved.`))
  .catch(love => console.error(`Never the ${love} will rejected !`));
```

## number

#### check(**value**, _options_) : number

- This function is used to _"check"_ a given value.
- parameter(s) :
  - **`value`** (`number`) : a given value.
  - **`options`** (`object`) _optional_ : a given value.
    - **`minimum`** (`number`) : the minimum value accepted (value must be greater or equals than).
    - **`exclusiveMinimum`** (`number`) : the exclusive minimum value accepted (value must be strictly greater than).
    - **`maximum`** (`number`) : the maximum value accepted (value must be smaller or equals than).
    - **`exclusiveMaximum`** (`number`) : the exclusive maximum value accepted (value must be strictly smaller than).
- returns the given `number` if, and only if, this one is valid, and respect options.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `number`.
  - when a valid minimum is given and the `value` is smaller than this one.
  - when a valid exclusiveMinimum is given and the `value` is smaller or equals than this one.
  - when a valid maximum is given and the `value` is greater than this one.
  - when a valid exclusiveMaximum is given and the `value` is greater or equals than this one.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.int.check(); // ⇨ CommonError: The value MUST be an integer.
number.int.check('not an integer'); // ⇨ CommonError: The value MUST be an integer.
number.int.check(10, { minimum: 11 }); // ⇨ CommonError: The value MUST be greater or equals than 11.
number.int.check(10, { exclusiveMinimum: 10 }); // ⇨ CommonError: The value MUST be greater than 10.
number.int.check(10, { maximum: 9 }); // ⇨ CommonError: The value MUST be smaller or equals than 9.
number.int.check(10, { exclusiveMaximum: 10 }); // ⇨ CommonError: The value MUST be smaller than 10.
number.int.check(3.14); // ⇨ 3.14
number.int.check(42); // ⇨ 42
```

#### clean(**value**, _options_) : boolean

- This function is used to _"clean"_ a given value in order to retrieve safely a valid `number`.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
  - `options` (`object`) _optional_ : a set of options.
    - `dft` : if this one is a valid `number`, used to substitute a given value which is not a `number`.
    - `min` : if this one is a valid `number` and the given (or substituted) is smaller than this one, `min` will be returned.
    - `max` : if this one is a valid `number` and the given (or substituted) is greater than this one, `max` will be returned.
- returns:
  - when the given `value` is not a valid `number` and no valid `dft` was given, return 0.
  - when the given `value` is not a valid `number` and a valid `dft` was given, return `dft`.
  - when a valid `min` is given and the `value` (valid or substituted) is smaller than `min`, return `min`.
  - when a valid `max` is given and the `value` (valid or substituted) is smaller than `max`, return `max`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.clean(); // ⇨ 0
number.clean('a'); // ⇨ 0
number.clean(10, { min: 11 }); // ⇨ 11
number.clean(10, { max: 9 }); // ⇨ 9
number.clean('b', { dft: 42 }); // ⇨ 42
number.clean('c', { dft: 'd' }); // ⇨ 0
number.clean('e', { min: 11, dft: 10 }); // ⇨ 11
number.clean('f', { max: 9, dft: 10 }); // ⇨ 9
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `number`.
- parameter(s) :
  - value (`number`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is a valid `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.is(); // ⇨ false
number.is('NOT A NUMBER'); // ⇨ false
number.is(3.14); // ⇨ true
```

#### not(value) : boolean

- This function is used to know safely if a given value is **NOT** a valid `number`.
- parameter(s) :
  - value (`number`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is **NOT** a valid `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.not(); // ⇨ true
number.not('NOT A NUMBER'); // ⇨ true
number.not(3.14); // ⇨ false
```

#### resolve(**value**, _options_) : number

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`number`) : a given value.
  - **`options`** (`object`) _optional_ : a given value.
    - **`minimum`** (`number`) : the minimum value accepted (value must be greater or equals than).
    - **`exclusiveMinimum`** (`number`) : the exclusive minimum value accepted (value must be strictly greater than).
    - **`maximum`** (`number`) : the maximum value accepted (value must be smaller or equals than).
    - **`exclusiveMaximum`** (`number`) : the exclusive maximum value accepted (value must be strictly smaller than).
- resolves the given `number` if, and only if, this one is valid, and respect options.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `number`.
  - when a valid minimum is given and the `value` is smaller than this one.
  - when a valid exclusiveMinimum is given and the `value` is smaller or equals than this one.
  - when a valid maximum is given and the `value` is greater than this one.
  - when a valid exclusiveMaximum is given and the `value` is greater or equals than this one.
- Example:

```javascript
const { number } = require('kawa-commons-lang');

return number
  .resolve(3.14, { minimum: 3, maximum: 4 })
  .then(object => console.log('Valid integer !'))
  .catch(error => console.error('Invalid integer : ', error));
```

### integer

#### check(**value**, _options_) : number

- This function is used to _"check"_ a given value.
- parameter(s) :
  - **`value`** (`number`) : a given value.
  - **`options`** (`object`) _optional_ : a given value.
    - **`minimum`** (`number`) : the minimum value accepted (value must be greater or equals than).
    - **`exclusiveMinimum`** (`number`) : the exclusive minimum value accepted (value must be strictly greater than).
    - **`maximum`** (`number`) : the maximum value accepted (value must be smaller or equals than).
    - **`exclusiveMaximum`** (`number`) : the exclusive maximum value accepted (value must be strictly smaller than).
- returns the given `number` if, and only if, this one is valid, and respect options.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an integer `number`.
  - when a valid minimum is given and the `value` is an integer smaller than this one.
  - when a valid exclusiveMinimum is given and the `value` is an integer smaller or equals than this one.
  - when a valid maximum is given and the `value` is an integer greater than this one.
  - when a valid exclusiveMaximum is given and the `value` is an integer greater or equals than this one.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.int.check(); // ⇨ CommonError: The value MUST be an integer.
number.int.check('not an integer'); // ⇨ CommonError: The value MUST be an integer.
number.int.check(3.14); // ⇨ CommonError: The value MUST be an integer.
number.int.check(10, { minimum: 11 }); // ⇨ CommonError: The value MUST be greater or equals than 11.
number.int.check(10, { exclusiveMinimum: 10 }); // ⇨ CommonError: The value MUST be greater than 10.
number.int.check(10, { maximum: 9 }); // ⇨ CommonError: The value MUST be smaller or equals than 9.
number.int.check(10, { exclusiveMaximum: 10 }); // ⇨ CommonError: The value MUST be smaller than 10.
number.int.check(42); // ⇨ 42
```

#### clean(**value**, _options_) : boolean

- This function is used to _"clean"_ a given value in order to retrieve safely a valid integer `number`.
- parameter(s) :
  - **`value`** (`boolean`) : a given value.
  - `options` (`object`) _optional_ : a set of options.
    - `dft` : if this one is a valid integer `number`, used to substitute a given value which is not an integer `number`.
    - `min` : if this one is a valid integer `number` and the given (or substituted) is smaller than this one, `min` will be returned.
    - `max` : if this one is a valid integer `number` and the given (or substituted) is greater than this one, `max` will be returned.
- returns:
  - when the given `value` is not a valid integer `number` and no valid `dft` was given, return 0.
  - when the given `value` is not a valid integer `number` and a valid `dft` was given, return `dft`.
  - when a valid `min` is given and the `value` (valid or substituted) is smaller than `min`, return `min`.
  - when a valid `max` is given and the `value` (valid or substituted) is smaller than `max`, return `max`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.int.clean(); // ⇨ 0
number.int.clean(3.14); // ⇨ 0
number.int.clean(10, { min: 11 }); // ⇨ 11
number.int.clean(10, { max: 9 }); // ⇨ 9
number.int.clean(3.14, { dft: 42 }); // ⇨ 42
number.int.clean(3.14, { dft: 26.12 }); // ⇨ 0
number.int.clean(3.14, { min: 11, dft: 10 }); // ⇨ 11
number.int.clean(3.14, { max: 9, dft: 10 }); // ⇨ 9
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid integer `number`.
- parameter(s) :
  - value (`number`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is a valid integer `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.int.is(); // ⇨ false
number.int.is('NOT A NUMBER'); // ⇨ false
number.int.is(3.14); // ⇨ false
number.int.is(42); // ⇨ true
```

#### not(value) : number

- This function is used to know safely if a given value is **NOT** a valid integer `number`.
- parameter(s) :
  - value (`number`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is **NOT** a valid integer `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.int.not(); // ⇨ true
number.int.not('NOT A NUMBER'); // ⇨ true
number.int.not(3.14); // ⇨ true
number.int.not(42); // ⇨ false
```

#### resolve(**value**, _options_) : number

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`number`) : a given value.
  - **`options`** (`object`) _optional_ : a given value.
    - **`minimum`** (`number`) : the minimum value accepted (value must be greater or equals than).
    - **`exclusiveMinimum`** (`number`) : the exclusive minimum value accepted (value must be strictly greater than).
    - **`maximum`** (`number`) : the maximum value accepted (value must be smaller or equals than).
    - **`exclusiveMaximum`** (`number`) : the exclusive maximum value accepted (value must be strictly smaller than).
- resolves the given `number` if, and only if, this one is valid, and respect options.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an integer `number`.
  - when a valid minimum is given and the `value` is an integer smaller than this one.
  - when a valid exclusiveMinimum is given and the `value` is an integer smaller or equals than this one.
  - when a valid maximum is given and the `value` is an integer greater than this one.
  - when a valid exclusiveMaximum is given and the `value` is an integer greater or equals than this one.
- Example:

```javascript
const { number } = require('kawa-commons-lang');

return number.int
  .resolve(42, { minimum: 41, maximum: 100 })
  .then(object => console.log('Valid integer !'))
  .catch(error => console.error('Invalid integer : ', error));
```

### timestamp

#### check(**value**) : number

- This function is used to _"check"_ a value.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns the given `value` if, and only if, this one is a valid timestamp.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an integer `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');

number.timestamp.check(); // ⇨ throws CommonError: 'The value MUST be an integer.'
number.timestamp.check('NOT A VALID TIMESTAMP'); // ⇨ throws CommonError: 'The value MUST be an integer.'
number.timestamp.check(3.14); // ⇨ throws CommonError: 'The value MUST be an integer.'
number.timestamp.check(372296700000); // ⇨372296700000
```

#### fromString(**value**) : number

- This function is used to convert a string into a timestamp.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns the `string` converted in a timestamp (`number`) if the given value is a valid `string` which respect one of the valid date / time format.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an integer `string`.
  - when the given `value` does not respect a valid date / time format.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.timestamp.fromString(); // ⇨ CommonError : 'The value MUST be a string.'
number.timestamp.fromString(2); // ⇨ CommonError : 'The value MUST be a string.'
number.timestamp.fromString('NOT A DATE / TIME'); // ⇨ CommonError : 'The value MUST have a valid date/time format.'
number.timestamp.fromString('1981-10-18T23:45:00.000Z'); // ⇨372296700000
```

#### now() : number

- This function is used to retrieve the current timestamp.
- returns the current timstamp.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.timestamp.now(); // ⇨ 1795258500770
```

#### resolve(**value**) : number

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`number`) : a given value.
- resolves the given `number` if, and only if, this one is a valid one.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an integer `number`.
- Example:

```javascript
const { number } = require('kawa-commons-lang');

return number.timestamp
  .resolve(372296700000)
  .then(object => console.log('Valid timestamp !'))
  .catch(error => console.error('Invalid timestamp : ', error));
```

#### toISOString(**value**) : string

- This function is used to convert a timestamp to an ISO `string`.
- parameter(s) :
  - **`value`** (`object`) : a given value.
- returns the timstamp converted in an ISO Date / Time `string`.
- throws :
  - when the given value is not a timestamp.
- Example:

```javascript
const { number } = require('kawa-commons-lang');
number.timestamp.toISOString(); // ⇨ CommonError : 'The value MUST be an integer.'
number.timestamp.toISOString(372296700000); // ⇨ '1981-10-18T23:45:00.000Z'
```

## object

#### check(**value**) : string

- This function is used to _"check"_ a value.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns the given `value` if, and only if, this one is a valid `object`.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an `object`.
- Example:

```javascript
const { string } = require('kawa-commons-lang');

string.check(); // ⇨ throws CommonError: The value MUST be an object.
string.check(2); // ⇨ throws CommonError: The value MUST be an object.
string.check({}); // ⇨ {}
string.check(new Error('Bim ?...')); // ⇨ Error : ('Bim ?...')
```

#### getClass(**value**) : string

- This function is used to retrieve the class of an object.
- parameter(s) :
  - **`value`** (`object`) : a given value.
- returns the class of the given value if, and only if, this one is a valid object.
- Example:

```javascript
const { object } = require('kawa-commons-lang');
object.getClass(); // ⇨ null
object.getClass(2); // ⇨ null
object.getClass({}); // ⇨ Object
object.getClass(new Error('PAF!')); // ⇨ Error
```

#### getClassName(**value**) : string

- This function is used to retrieve the class name of an object.
- parameter(s) :
  - **`value`** (`object`) : a given value.
- returns the class name of the given value if, and only if, this one is a valid object.
- Example:

```javascript
const { object } = require('kawa-commons-lang');
object.getClassName(new Error('PAF!')); // ⇨ 'Error'
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `object`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is an `object`.
- Example:

```javascript
const { object } = require('kawa-commons-lang');
object.is(); // ⇨ false
object.is('NOT OBJECT'); // ⇨ false
object.is({}); // ⇨ true
object.is(new Error('HELL-o !')); // ⇨ true
```

#### not(**value**) : boolean

- This function is used to know safely if a given value is **NOT** a valid `object`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **not** an `object`.
- Example:

```javascript
const { object } = require('kawa-commons-lang');
object.not(); // ⇨ true
object.not('NOT OBJECT'); // ⇨ true
object.not({}); // ⇨ false
object.not(new Error('HELL-o !')); // ⇨ false
```

#### resolve(**value**) : object

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`object`) : a given value.
- resolves the given `object` if, and only if, this one is a valid one.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** an `object`.
- Example:

```javascript
const { object } = require('kawa-commons-lang');

return object
  .resolve({ universe: { meaning: 42 } })
  .then(object => console.log('Valid object !'))
  .catch(error => console.error('Invalid object : ', error));
```

## string

#### check(**value**, _{ minLength, maxLength, pattern}_) : string

- This function is used to _"check"_ a value.
- parameter(s) :
  - **`value`** (`string`) : a given value.
  - `options` (`object`) _optionaly_ :
    - _`minLength`_ (`number`) : The minimum length of the value.
    - _`maxLength`_ (`number`) : The minimum length of the value.
    - _`pattern`_ (`string`|`RegExp`|`pattern`): The pattern that have to be respected by the value.
- returns the given `value` if, and only if, this one is valid `string` and respects options.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when options contains a valid minLength the given `value` have a length smaller than this one.
  - when options contains a valid maxLength the given `value` have a length greater than this one.
  - when options contains a valid pattern and the given `value` does not match this one.
- Example:

```javascript
const { string } = require('kawa-commons-lang');

string.check(); // ⇨ throws CommonError: The value MUST be a string.
string.check(2); // ⇨ throws CommonError: The value MUST be a string.
string.check('hello'); // ⇨ `hello`
string.check('hello', { minLength: 6 }); // ⇨ throws CommonError: `The value MUST have, at least, 6 caracter(s).`
string.check('hello', { maxLength: 4 }); // ⇨ throws CommonError: `The value e CANNOT have more than 4 caracter(s).`
string.check('hell', { pattern: '[0-9]{4}$' }); // ⇨ throws CommonError: `The value MUST match the [[0-9]{4}$] pattern.`
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `string`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is a `string`.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.is(); // ⇨ false
string.is(2); // ⇨ false
string.is('NOT EMPTY'); // ⇨ true
```

#### isBlank(**value**) : boolean

- This function is used to know safely if a given value is blank (that is to say empty `string` or containing spaces only).
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string`, have a length equals to 0 or contains spaces only.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.isBlank(); // ⇨ true
string.isBlank(2); // ⇨ true
string.isBlank(''); // ⇨ true
string.isBlank(' '); // ⇨ true
string.isBlank('NOT BLANK'); // ⇨ false
```

#### isEmpty(**value**) : boolean

- This function is used to know safely if a given value is an empty `string`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string` OR have a length equals to 0.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.isEmpty(); // ⇨ true
string.isEmpty(2); // ⇨ true
string.isEmpty(''); // ⇨ true
string.isEmpty(' '); // ⇨ false
string.isEmpty('NOT EMPTY'); // ⇨ false
```

#### length(**value**) : number

- This function is used to retrieve safely the length of a given value.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns when the given value is a valid string, return the length of this one, else 0.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.length(); // ⇨ 0
string.trim(4); // ⇨ 0
string.trim(''); // ⇨ 0
string.trim(' '); // ⇨ 1
string.trim('string'); // ⇨ 6
```

#### not(**value**) : boolean

- This function is used to know safely if a given value is **NOT** a valid `string`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string`.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.not(); // ⇨ true
string.not(2); // ⇨ true
string.not('NOT EMPTY'); // ⇨ false
```

#### notBlank(**value**) : boolean

- This function is used to know safely if a given value is **NOT** blank (that is to say not empty `string` and not containing spaces only).
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is a `string` with a length greater than 0 and that not contains spaces only.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.notBlank(); // ⇨ false
string.notBlank(2); // ⇨ false
string.notBlank(''); // ⇨ false
string.notBlank(' '); // ⇨ false
string.notBlank('NOT BLANK'); // ⇨ true
```

#### notEmpty(**value**) : boolean

- This function is used to know safely if a given value is **NOT** an empty `string`.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string` which have a length equals to 0.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.notEmpty(); // ⇨ false
string.notEmpty(2); // ⇨ false
string.notEmpty(''); // ⇨ false
string.notEmpty(' '); // ⇨ true
string.notEmpty('NOT EMPTY'); // ⇨ true
```

#### resolve(**value**, _{ minLength, maxLength, pattern}_) : string

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`string`) : a given value.
  - `options` (`object`) _optionaly_ :
    - _`minLength`_ (`number`) : The minimum length of the value.
    - _`maxLength`_ (`number`) : The minimum length of the value.
    - _`pattern`_ (`string`|`RegExp`|`pattern`): The pattern that have to be respected by the value.
- resolves the given `value` if, and only if, this one is valid `string` and respects options.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when options contains a valid minLength the given `value` have a length smaller than this one.
  - when options contains a valid maxLength the given `value` have a length greater than this one.
  - when options contains a valid pattern and the given `value` does not match this one.
- Example:

```javascript
const { string } = require('kawa-commons-lang');

return string
  .resolve('A valid string.', { minLength: 1, maxLength: 50 })
  .then(date => console.log('Valid string !'))
  .catch(error => console.error('Invalid string : ', error));
```

#### test(**value**, **pattern**) : boolean

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`string`) : a given value.
  - **`pattern`** (`string`|`RegExp`|`pattern`): The pattern used to test the value.
- returns :
  - if a valid pattern was given : true if, and only if, the value is a `string` and respects the given pattern.
  - if the given pattern is missing or invalid : true if, and only if, the value is a `string`.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.test(); // ⇨ false
string.test(4); // ⇨ false
string.test(''); // ⇨ true
string.test('1234', /^[0-9]{4}$/); // ⇨ true
string.test('4567', '[0-9]{4}$'); // ⇨ true
string.test('4567', new RegExp('[0-9]{4}$')); // ⇨ true
string.test('abcd', new RegExp('[0-9]{4}$')); // ⇨ false
```

#### trim(**value**) : string

- This function is used to trim safely a given value.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns:
  - when the given value is not a string or missing, return a void string.
  - when the given value is a valid string, return this one trimmed.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.trim(); // ⇨ ''
string.trim(4); // ⇨ ''
string.trim(''); // ⇨ ''
string.trim(' '); // ⇨ ''
string.trim('string'); // ⇨ 'string'
string.trim(' string '); // ⇨ 'string'
```

### date

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `string` which respects one of the date / time format.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is a `string` AND respect date / time format.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.date.is(); // ⇨ false
string.date.is('NOT A VALID UUID'); // ⇨ false
string.date.is('1981-10-19T00:45:12.364+01:00'); // ⇨ true
```

#### not(**value**) : boolean

- This function is used to know safely if a given value is **NOT** a valid `string` which respects one of the date / time format.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string` OR **NOT** respect date / time format.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.date.not(); // ⇨ true
string.date.not('NOT A VALID UUID'); // ⇨ true
string.date.not('1981-10-19T00:45:12.364+01:00'); // ⇨ false
```

#### check(**value**) : string

- This function is used to _"check"_ a given string in order to validate that this one is a date (with or without time).
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns the given `value` if, and only if, this one is valid `string` wich respect a date format.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when the given `value` does not match one of the date pattern.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.date.check(); // ⇨ CommonError: The value MUST be a string.
string.date.check(14); // ⇨ CommonError: The value MUST be a string.
string.date.check('NOT-A-DATE'); // ⇨ CommonError: `The value MUST have a valid date / time format.`
string.date.check('1981-10-19T00:45:12.364+01:00'); // ⇨ eeba9a56-992c-47dd-99ed-a5ac92c759a2
```

#### resolve(**value**) : string

- This function is used like the _"check"_ one, but asynchonous.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- resolves the given `value` if, and only if, this one is valid `string` wich respect a date format.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when the given `value` does not match one of the date pattern.
- Example:

```javascript
const { string } = require('kawa-commons-lang');

return string.date
  .resolve('1981-10-19T00:45:12.364+01:00')
  .then(date => console.log('Valid date !'))
  .catch(error => console.error('Invalid date : ', error));
```

### uuid

#### check(**value**) : string

- This function is used to _"check"_ a given string in order to validate that this one is a UUID.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns the given `value` if, and only if, this one is valid `UUID`.
- throws :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when the given `value` does not match to a UUID pattern.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.uuid.check(); // ⇨ CommonError: The value MUST be a string.
string.uuid.check(14); // ⇨ CommonError: The value MUST be a string.
string.uuid.check('NOT-A-UUID'); // ⇨ CommonError: The value MUST match the [/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/] pattern.
string.uuid.check('eeba9a56-992c-47dd-99ed-a5ac92c759a2'); // ⇨ eeba9a56-992c-47dd-99ed-a5ac92c759a2
```

#### is(**value**) : boolean

- This function is used to know safely if a given value is a valid `string` which respects UUID format.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is `string` AND respect UUID format.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.uuid.is(); // ⇨ false
string.uuid.is('NOT A VALID UUID'); // ⇨ false
string.uuid.is('9d88a922-8a49-40ce-9804-c48b377f8f76'); // ⇨ true
```

#### not(**value**) : boolean

- This function is used to know safely if a given value is **NOT** a valid `string` which respects UUID format.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- returns: `true` if, and only if, the given value is **NOT** a `string` OR **NOT** respect UUID format.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
string.uuid.not(); // ⇨ true
string.uuid.not('NOT A VALID UUID'); // ⇨ true
string.uuid.not('9d88a922-8a49-40ce-9804-c48b377f8f76'); // ⇨ false
```

#### random() : string

- This function return a randomly generated V4 UUID.
- returns a new randomly generated V4 UUID.
- Example:

```javascript
const { string } = require('kawa-commons-lang');
console.log('This a brand new UUID : ' + string.uuid.random());
```

#### resolve(**value**) : string

- This function is like the _"check"_ function, but asynchronous.
- parameter(s) :
  - **`value`** (`string`) : a given value.
- resolves the given `value` if, and only if, this one is valid `UUID`.
- rejects :
  - when the given `value` is missing (`undefined`).
  - when the given `value` is **NOT** a `string`.
  - when the given `value` does not match to a UUID pattern.
- Example:

```javascript
const { string } = require('kawa-commons-lang');

return string.uuid
  .resolve('eeba9a56-992c-47dd-99ed-a5ac92c759a2')
  .then(uuid => console.log('Valid UUID !'))
  .catch(error => console.error('Invalid UUID : ', error));
```

## undefined

#### is(**value**) : boolean

- This function is used to know safely if a given value is undefined.
- parameter(s) :
  - value (`*`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is undefined.
- Example:

```javascript
const { undefined } = require('kawa-commons-lang');
undefined.is(); // ⇨ true
undefined.is(undefined); // ⇨ true
undefined.is('NOT UNDEFINED'); // ⇨ false
undefined.is(false); // ⇨ false
```

#### not(value) : boolean

- This function is used to know safely if a given value is not undefined.
- parameter(s) :
  - value (`*`) : a given value.
- returns:
  - `true` if, and only if, the given `value` is not undefined.
- Example:

```javascript
const { undefined } = require('kawa-commons-lang');
undefined.not(); // ⇨ false
undefined.not(undefined); // ⇨ false
undefined.not('NOT UNDEFINED'); // ⇨ true
undefined.not(false); // ⇨ true
```
