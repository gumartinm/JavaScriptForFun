describe('app.shared-stomp', function() {
  'use strict';

  describe('state', function() {
    var view = {
      example: 'app/shared-stomp/shared-stomp.html'
    };
    var $state;

    beforeEach(function() {
      module('app.shared-stomp');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /shared-stomp route to users View template', function() {
      expect($state.get('shared-stomp').templateUrl).toEqual(view.example);
    });

  });

});
