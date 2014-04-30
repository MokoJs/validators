# Moko Validators

A plugin that provides a bunch of validators for
[moko](https://github.com/MokoJs/moko).

## Example Usage

```js
var Person = moko('Person').attr('name', { required: true }),
    validation = require('moko-validators');
    
Person.use(validation);
``` 

## Basic Validators

### Required

Verifies that a field is present.

```js
User.attr('username', {required: true});
```

### Confirms

Verifies that a field equals another field.

```js
User.attr('password')
    .attr('passwordConfirmation', { confirms: 'password' });
```

### Type

Checks that a field is of a given type

```js
User.attr('name', {type: 'string'});
```

In addition to string support for primitives, you can also pass in a
constructor.

```js
User.attr('parent', { type: User });

// Or

User.attr('name', { type: String });
```

## Format Validators

Verify the value of a field against a regex pattern. `moko-validators`
comes with a few regex strings built in under the `formatStrings`
object.

### Format

Validates the field against the given regular expression

```js
User.attr('name', {format: /\w+ \w+/ });
```

### Phone Number

Validates the field against a (North American) phone number format

```js
User.attr('phone', {format: 'phone' });
```


### Email Address

Validates the field against a email address format

```js
User.attr('email', {format: 'email' });
```

### URL

Validates the field against a URL format

```js
User.attr('website', {format: 'url' });
```

### Credit Card

Validates the field against a credit card format.

```js
User.attr('cc', {format: 'creditcard' });
````
