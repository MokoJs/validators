var required = require('./lib/required.js'),
    confirms = require('./lib/confirms.js'),
    type     = require('./lib/type.js'),
    instance = require('./lib/instance.js');

module.exports = function(Model) {
  var check = checkAttr.bind(Model);
  Model.on('attr', check);
  Object.keys(Model.attrs).forEach(check);
};

function checkAttr(attr) {
  var opts = this.attrs[attr];

  if(opts.required) this.use(required(attr));
  if(opts.confirms) this.use(confirms(attr, opts.confirms));

  if(typeof opts.type == 'string')   this.use(type(attr, opts.type));
  if(typeof opts.type == 'function') this.use(instance(attr, opts.type));
}

