(function () {
  'use strict';

  angular
    .module('app.rest')
    .controller('Rest', Rest);

  /**
   * @ngdoc controller
   * @name app.rest.controller:Rest
   *
   * @requires $location
   *
   * <p>
   * <br>
   * {@link https://docs.angularjs.org/api/ng/service/$location $location}
   * </p>
   *
   * @description
   * Rest controller.
   */
  /* @ngInject */
  function Rest($location) {
    var vm = this;
    vm.example = {
      text: 'try to send data',
      word: /^\s*\w*\s*$/,
      singleModel: 1
    };
  }

})();
