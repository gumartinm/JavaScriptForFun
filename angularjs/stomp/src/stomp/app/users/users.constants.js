(function () {
  'use strict';

  angular
    .module('app.users')
    .constant('USERS', {
      ROOTSCOPE: {
        BROADCAST: 'USERS_ROOTSCOPE_BROADCAST',
        BROADCAST_TO_SENCONDCHILD: 'USERS_ROOTSCOPE_BROADCAST_TO_SENCONDCHILD'
      },
      SCOPE: {
        EMIT_FACT: 'USERS_SCOPE_EMIT_FACT',
        BROADCAST_TO_SENCONDCHILD: 'USERS_SCOPE_BROADCAST_TO_SENCONDCHILD'
      }
    });

})();
