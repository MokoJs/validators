module.exports = function(attr) {
  return function(Model) {
    Model.validate(function *(instance) {
      if(instance[attr] === undefined) instance.error(attr, 'field required');
    });
  };
};
