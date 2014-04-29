var checkType = require('../deps/type.js');

module.exports = function(attr, type) {
  return function(Model) {
    Model.validate(function*(instance) {
      if(type != checkType(instance[attr])) instance.error(attr, 'must be type ' + type);
    });
  };
}
