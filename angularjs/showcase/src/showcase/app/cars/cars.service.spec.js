describe('app.cars', function() {
  'use strict';

  var $httpBackend;
  var $log;
  var id = 666;
  var carResponseSuccess = {
    content: 'Car: false',
    id: id
  };
  var carsResponseSuccess = [
    carResponseSuccess
  ];
  var carsResponseError = 'Error: connect ECONNREFUSED';
  var cars;
  var API;

  beforeEach(function() {
    module('app.cars');

    inject(function(_$httpBackend_, _$log_, _cars_, _API_) {
      $httpBackend = _$httpBackend_;
      $log = _$log_;
      cars = _cars_;
      API = _API_;
    });
  });

  describe('cars service', function () {

    it('should invoke GET all cars without error', function () {
      var respValue;

      $httpBackend.expectGET(API.CARS).respond(200, carsResponseSuccess);
      cars.getAll().then(function(resp) {
        respValue = resp;
      });
      $httpBackend.flush();

      expect(carsResponseSuccess).toEqual(respValue);
    });

    it('should invoke GET all cars with error', function () {
      var reasonValue;

      $httpBackend.expectGET(API.CARS).respond(400, carsResponseError);
      cars.getAll().then(function() {}, function(reason) {
        reasonValue = reason;
      });
      $httpBackend.flush();

      expect(carsResponseError).toEqual(reasonValue);
    });

    it('should invoke GET car by id without error', function () {
      var respValue;

      $httpBackend.expectGET(API.CAR.replace(':carId', id)).respond(200, carResponseSuccess);
      cars.getById(id).then(function(resp) {
        respValue = resp.data;
      });

      $httpBackend.flush();

      expect(carResponseSuccess).toEqual(respValue);
    });

    it('should invoke GET car by id with error', function () {
      var reasonValue;

      $httpBackend.expectGET(API.CAR.replace(':carId', id)).respond(400, carsResponseError);
      cars.getById(id).then(function() {}, function(reason) {
        reasonValue = reason.data;
      });

      $httpBackend.flush();

      expect(carsResponseError).toEqual(reasonValue);
    });

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

});
