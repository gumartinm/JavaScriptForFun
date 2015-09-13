(function () {
  'use strict';

  angular
    .module('app.users')
    .constant('USERS', {
      ROOTSCOPE: {
        BROADCAST: 'USERS_ROOTSCOPE_BROADCAST'
      },
      SCOPE: {
        EMIT_FACT: 'USERS_SCOPE_EMIT_FACT'
      }
    });

})();
