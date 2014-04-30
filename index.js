var required = require('./lib/required.js'),
    confirms = require('./lib/confirms.js'),
    type     = require('./lib/type.js'),
    instance = require('./lib/instance.js'),
    format   = require('./lib/format.js');

module.exports = function validators(Model) {
  var check = checkAttr.bind(Model);
  Model.on('attr', check);
  Object.keys(Model.attrs).forEach(check);
};

exports.formatStrings = {};
exports.formatStrings.email = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
exports.formatStrings.url = /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i;
exports.formatStrings.cc = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
exports.formatStrings.phoneNumber = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;


function checkAttr(attr) {
  var opts = this.attrs[attr];

  if(opts.required) this.use(required(attr));
  if(opts.confirms) this.use(confirms(attr, opts.confirms));

  if(typeof opts.type == 'string')   this.use(type(attr, opts.type));
  if(typeof opts.type == 'function') this.use(instance(attr, opts.type));
  if(opts.format) {
    if(typeof opts.format == 'string') {
      switch(opts.format) {
        case 'phone':
          this.use(format(attr, exports.formatStrings.phoneNumber, 'is not a valid phone number'))
          break;
        case 'url':
          this.use(format(attr, exports.formatStrings.url, 'is not a valid url'))
          break;
        case 'email':
          this.use(format(attr, exports.formatStrings.email, 'is not a valid email'))
          break;
        case 'creditcard':
          this.use(format(attr, exports.formatStrings.cc, 'is not a valid credit card number'))
          break;
      }
    } else if(opts.format instanceof RegExp) {
      this.use(format(attr, opts.format));
    }
  }
}

