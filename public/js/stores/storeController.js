var app = angular.module('MyApp');

app.controller('Store.storeController',[
    '$scope', '$http', '$state',
    function ($scope, $http, $state){
        console.log('store controller working');

        $scope.stores={};


        // for creating posts
        $scope.create = function(id){
            console.log('create workingas');
            if($scope.editStore.$valid == true){
                if(id != null || id != undefined){
                    console.log('update');
                    $scope.update(id);
                    return;
                }
                console.log('create working');

                $http({
                    method:'Post',
                    url:'/stores',
                    data: $scope.stores
                })
                .success (function(response){
                    console.log('item saved to db')
                    $state.go('store');
                })
            }
            else{
                console.error('something is wrong with the form')
            }
        }

        //for reading all the posts
        $scope.readAll = function (){
            console.log('reading stores');
            $http({
                method:'GET',
                url:'/stores'
                // ?_sort=id&_order=DESC'
            })
            .success(function(response){
                console.log('the objects:', response);
                $scope.storesList = response;
            })
        }


        //for reading post by id
        $scope.readById = function (id){

            $http({
                method: 'GET',
                url:'/stores/' + id
            })
            .success( function(response){
                console.log('this is the post object from server:' , response);
                $scope.stores = response;
            })
        }


        //for editing posts
        $scope.update = function(id){
            console.log('update post working');
            $http ({
                url:'/stores/' + id,
                method:'PUT',
                data: $scope.stores
            })
            .success(function (response){
                $state.go('store-view', {id: id});
                console.log('this is the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }
        // delete function
        $scope.delete = function(id){
            console.log('update post working');
            $http ({
                url:'/stores/' + id,
                method:'DELETE',
                data: $scope.stores
            })
            .success(function (response){
                $state.go('store');
                console.log('this is the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }


        function setup (){
            var pageState = $state.current.name;
            if(pageState == 'store'){
                $scope.readAll();
            }
            else if(pageState == 'store-view'){
                var storesId = $state.params.id;
                $scope.readById(storesId);
            }
            else if (pageState == 'store-update'){
                var postId = $state.params.id;
                $scope.readById(storesId);
                $scope.mode = 'Edit Store';
                $scope.styleClass = 'warning';
            }
            else if(pageState == 'store-create'){
                $scope.mode = 'Create Store';
                $scope.styleClass = 'success';

            }
        }

        setup();
    }
]);
