describe('app.rest', function() {
  'use strict';

  describe('state', function() {
    var view = {
      rest: 'app/rest/rest.html'
    };
    var $state;

    beforeEach(function() {
      module('app.rest');

      inject(function(_$state_) {
        $state = _$state_;
      });
    });

    it('should map /rest route to rest View template', function() {
      expect($state.get('rest').templateUrl). toEqual(view.rest);
    });

  });

});
