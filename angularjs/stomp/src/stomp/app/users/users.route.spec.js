describe('app.users', function() {
  'use strict';

  describe('state', function() {
    var view = {
      users: 'app/users/users.html'
    };
    var $state;

    beforeEach(function() {
      module('app.users');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /users route to users View template', function() {
      expect($state.get('users').templateUrl).toEqual(view.users);
    });

  });

});
