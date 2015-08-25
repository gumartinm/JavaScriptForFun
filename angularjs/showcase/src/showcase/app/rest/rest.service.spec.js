describe('app.rest', function() {
  'use strict';

  var $httpBackend;
  var $log;
  var cars;

  beforeEach(function() {
    module('app.rest');

    inject(function(_$httpBackend_, _$log_, _cars_) {
      $httpBackend = _$httpBackend_;
      $log = _$log_;
      cars = _cars_;
    });
  });

  describe('cars service', function () {

    it('should invoke GET all cars', function () {
      $httpBackend.expectGET('/api/cars').respond({});

      cars.getAll();

      $httpBackend.flush();
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
