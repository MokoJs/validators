var is = require('../deps/instance.js');

module.exports = function instance(attr, type) {
  return function(Model) {
    Model.validate(function *(instance) {
      var val = instance[attr];
      if(val !== undefined && !is(val, type)) {
        instance.error(attr, "must be type " + type.name.toLowerCase());
      }
    });
  };
};
