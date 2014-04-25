module.exports = function(Model) {
  var check = checkAttr.bind(Model);
  Model.on('attr', check);
  Object.keys(Model.attrs).forEach(check);
};

function checkAttr(attr) {
  var opts = Model.attrs[attr];
}

