(function () {
  'use strict';

  angular
    .module('app.welcome')
    .controller('WelcomeAccountController', WelcomeAccountController);

  /**
   * @ngdoc controller
   * @name app.welcome.controller:WelcomeAccountController
   *
   * @description
   * WelcomeAccountController controller.
   */
  /* @ngInject */
  function WelcomeAccountController() {
    var vm = this;
    var birthDate = {
      city: 'classified',
      birthDate: 'private'
    };

    // http://www.w3.org/International/questions/qa-personal-names
    vm.yourChoice = vm.fullName + ' / ' + 'This field would be the user\'s choice';

    vm.birthDate = birthDate;
  }

})();
