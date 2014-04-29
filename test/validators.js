require('co-mocha');

var expect = require('expect.js'),
    validators = require('../');

describe('Moko validators', function() {
  var User;
  before(function() {
    moko = require('moko');
    moko.use(validators);
  });

  describe('basic validations', function() {
    describe('required', function() {
      before(function() {
        User = moko('User').attr('name', { required: true });
      });

      it('adds an error if field is missing', function*() {
        var user = yield new User();
        expect(yield user.isValid()).to.be(false);
        expect(user.errors('name')).to.eql(['field required']);
        user.name = 'Bob';
        expect(yield user.isValid()).to.be(true);
      });
    });

    describe('confirms', function() {
      before(function() {
        User = moko('User')
          .attr('password', { required: true })
          .attr('passwordConfirmation', { confirms: 'password' });
      });

      it('adds an error if the fields dont match', function*() {
        var user = yield new User();
        user.password = '12345';
        expect(yield user.isValid()).to.be(false);
        expect(user.errors('passwordConfirmation')).to.eql(['does not match password']);
        user.passwordConfirmation = '12345';
        expect(yield user.isValid()).to.be(true);
      });
    });

    describe('type validators', function() {
      describe('string-type validator', function() {
        before(function() {
          User = moko('User')
            .attr('name', { type: 'string' });
        });

        it('adds an error if the field is the wrong type', function*() {
          var user = yield new User();
          user.name = 1234;
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('name')).to.eql(['must be type string']);
          user.name = 'Bob';
          expect(yield user.isValid()).to.be(true);
        });
      });

      describe('function-type validator', function() {
        before(function() {
          User = moko('User')
            .attr('name', { type: String });
        });

        it('adds an error if the field is the wrong type', function*() {
          var user = yield new User();
          user.name = 1234;
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('name')).to.eql(['must be type string']);
          user.name = 'Bob';
          expect(yield user.isValid()).to.be(true);
        });
      });
    });
  });
});
