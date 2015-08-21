describe('app.welcome', function() {
  'use strict';

  describe('state', function() {
    var view = {
      welcome: 'app/welcome/welcome.html'
    };
    var $state;

    beforeEach(function() {
      module('app.welcome');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /welcome route to welcome View template', function() {
      expect($state.get('welcome').templateUrl). toEqual(view.welcome);
    });

  });

});
