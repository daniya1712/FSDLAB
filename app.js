angular.module('employeeApp', []).controller('EmployeeController', function($scope, $http) {
    $http.get('employees.json').then(function(response) {
        $scope.employees = response.data;
      },
      function(error) {
        console.error('Error fetching employee data:', error);
      });
  });
