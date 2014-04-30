require('co-mocha');

var expect = require('expect.js'),
    validators = require('../'),
    moko = require('moko');

moko.use(validators);

describe('Moko validators', function() {
  var User;
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

    describe('format', function() {
      describe('regex', function() {
        var User;

        it('adds an error if it does not match the regex', function*() {
          User = moko('User').attr('name', {format: /\w+ \w+/});
          var user = yield new User({name: 'sam'});
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('name')).to.eql(['does not match format']);
          user.name = 'Bob Smith';
          expect(yield user.isValid()).to.be(true);
        });
      });
      describe('built in', function() {
        it('works with phone', function*() {
          User = moko('User').attr('phone', {format: 'phone'});
          var user = yield new User({phone: 'sam'});
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('phone')).to.eql(['is not a valid phone number']);
          user.phone = '(555) 555-3123';
          expect(yield user.isValid()).to.be(true);
        });

        it('works with url', function*() {
          User = moko('User').attr('homePage', {format: 'url'});
          var user = yield new User({homePage: 'sam'});
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('homePage')).to.eql(['is not a valid url']);
          user.homePage = 'http://google.com';
          expect(yield user.isValid()).to.be(true);
        });

        it('works with email', function*() {
          User = moko('User').attr('email', {format: 'email'});
          var user = yield new User({email: 'sam'});
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('email')).to.eql(['is not a valid email']);
          user.email = 'sam@google.com';
          expect(yield user.isValid()).to.be(true);
        });

        it('works with creditcard', function*() {
          User = moko('User').attr('cc', {format: 'creditcard'});
          var user = yield new User({cc: 'sam'});
          expect(yield user.isValid()).to.be(false);
          expect(user.errors('cc')).to.eql(['is not a valid credit card number']);
          user.cc = '378282246310005';
          expect(yield user.isValid()).to.be(true);
        });
      });
    });
  });
});
