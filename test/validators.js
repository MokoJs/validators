require('co-mocha');

var expect = require('expect.js'),
    validators = require('../'),
    moko = require('moko');

describe('Moko validators', function() {
  var User;

  describe('basic validations', function() {
    describe('required', function() {
      before(function() {
        User = moko('User').attr('name', { required: true });
        User.use(validators);
      });

      it('adds an error if field is missing', function*() {
        var user = yield new User();
        expect(yield user.isValid()).to.be(false);
        expect(user.errors('name')).to.eql(['field required']);
      });
    });

    describe('confirms', function() {
      before(function() {
        User = moko('User')
          .attr('password', { required: true })
          .attr('passwordConfirmation', { confirms: 'password' });
        User.use(validators);
      });

      it('adds an error if the fields dont match', function*() {
        var user = yield new User();
        user.password = '12345';
        expect(yield user.isValid()).to.be(false);
        expect(user.errors('passwordConfirmation')).to.eql(['does not match password']);
      });
    });
  });
});
