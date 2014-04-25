module.exports = function(attr, confirms) {
  return function(Model) {
    Model.validate(function*(instance) {
      if(instance[attr] !== instance[confirms]) instance.error(attr, 'does not match ' + confirms);
    });
  };
};
