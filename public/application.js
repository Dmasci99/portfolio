
/// reference path="_reference.ts" />
(function() {
    //provide our application with appropriate dependencies for Angular
    var application = angular.module("application", ['ngRoute', 'ngResource']);
        
    angular.element(document).ready(function () {
        //once document is loaded, bootstrap angular
        angular.bootstrap(document, ["application"]);
    });
    
    /******************************************************************
    *
    *							SERVICE
    *
    ******************************************************************/
    application.factory('Todos', ['$resource', function($resource) {
        return $resource('/todos/:id', null, {
            'update': {
                method: 'PUT'
            }
        });
    }]);
    
    /******************************************************************
    *
    *							CONTROLLERS
    *
    ******************************************************************/
    /*****************************************
    *				Todo Controller
    ******************************************/
    application.controller('TodoController', ['$scope', 'Todos', function($scope, Todos) {
        /*************  Variables  *************/
        $scope.editing = [];
        $scope.username = '';
        $scope.userTodos = [];
        
              
        /*************  Functions  *************/
        //Set User Name
        $scope.setUserName = function(userName) {
            $scope.username = userName; //grab the current user's username
            $scope.todos = Todos.query(function() {
                $scope.userTodos = []; //reset todos array - for repeated use
                $scope.todos.forEach(function(todo) {
                    if (todo.username == $scope.username) {
                        //Limit the todo's seen to the current User
                        $scope.userTodos.push(todo);
                    }
                });
                $scope.todos = $scope.userTodos;
            });
        };
        
        //Save New Todo
        $scope.save = function() {
            // ???? what is newTodo and where is it defined?
            if (!$scope.newTodo || $scope.newTodo.length < 1) {
                return;
            }
            //Create new Todo Obect
            var todo = new Todos({
                name: $scope.newTodo,
                username: $scope.username
            });
            //Save Todo Object to DB and clear data
            todo.$save(function() {
                $scope.todos.push(todo);
                $scope.newTodo = '';
            });            
        };
        
        //Update Existing Todo
        $scope.update = function(index) {
            var todo = $scope.todos[index];
            //passes the current todo object to be updated in the 
            //DB based on it's ID. 
            Todos.update({
                id: todo._id,
            }, todo);
            $scope.editing[index] = false;
        };
        
        //Enter into Edit Mode
        $scope.edit = function(index) {
            //Create a copy of the existing object
            $scope.editing[index] = angular.copy($scope.todos[index]);
        };
        
        //Cancel Edit Mode
        $scope.cancel = function(index) {
            //Return without saving any data
            $scope.todos[index] = angular.copy($scope.editing[index]);
            $scope.editing[index] = false;
        };
        
        //Remove Todo
        $scope.remove = function(index) {
            var todo = $scope.todos[index];
            //passes the current todo object to be deleted in the 
            //DB based on it's ID. 
            Todos.remove({
                id: todo._id
            }, function() {
                //remove 1 object; beginning with current object
                $scope.todos.splice(index, 1);
            });
            $scope.editing[index] = false;
        };
        
        //Check how many todos are still to be completed
        $scope.remainingTodos = function() {
            var count = 0;
            
            //use angular to refer to the objects OUTSIDE of this scope?
            angular.forEach($scope.todos, function(todo) {
                //Limit calculations to current users' tasks
                if ($scope.username == todo.username) {
                    todo.completed ? count : count++;
                }
            });     
            return count;            
        };
        
        //Check how many todos belong to current user
        $scope.totalTodos = function() {
            var count = 0;
            //Iterate through each Todo and count how many there are
            angular.forEach($scope.todos, function(todo) {
                if ($scope.username == todo.username) {
                    count++;
                }
            });
            return count;
        };
        
        //Show an input based on caller
        $scope.showAddInput = function() {
            if ($scope.addInput == true) {
                $scope.addInput = false;
                $scope.open = false;
            }                
            else {
                $scope.addInput = true;
                $scope.open = true;
            }                
        };
        
    }]);    
    
    /*****************************************
    *			Todo Details Controller
    ******************************************/
    application.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', '$location',
        function($scope, $routeParams, Todos, $location) {
        
        /*************  Variables  *************/
        //Set current todo Object based on url passed through url
        $scope.todo = Todos.get({
            id: $routeParams.id
        });
        
        /*************  Functions  *************/
        //update details
        $scope.update = function() {
            Todos.update({
                id: $scope.todo._id
            }, $scope.todo, function() {
                //why does this need to be it's own function?
                //can't it just pass $location.url('/') as one
                //of the parameters for Todos.update()?
                $location.url('/');
            });
        };
        
        //cancel update
        $scope.cancel = function() {
            $location.url('/');  
        };
        
        //remove Task
        $scope.remove = function() {
            Todos.remove({
                id: $scope.todo._id
            }, function() {
                //why does this need to be it's own function?
                //can't it just pass $location.url('/') as one
                //of the parameters for Todos.update()?
                $location.url('/');
            });
        };
        
    }]);
    
    /******************************************************************
    *
    *							ROUTES
    *
    ******************************************************************/
    application.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/todos.html',
            controller: 'TodoController'
        }).when('/:id', {
            templateUrl: '/todoDetails.html',
            controller: 'TodoDetailCtrl'
        });
    }]);
       
})();
//# sourceMappingURL=app.js.map