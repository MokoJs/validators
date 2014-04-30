module.exports = function(attr, regex, message) {
  var message = message || 'does not match format';
  return function(Model) {
    Model.validate(function*(instance) {
      if(instance[attr] && !regex.test(instance[attr])) {
        instance.error(attr, message);
      }
    });
  };
}
