describe('app.example', function() {
  'use strict';

  describe('state', function() {
    var view = {
      example: 'app/example/example.html'
    };
    var $state;

    beforeEach(function() {
      module('app.example');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /example route to users View template', function() {
      expect($state.get('example').templateUrl).toEqual(view.example);
    });

  });

});
