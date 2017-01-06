'use strict';

var app = angular.module('MyApp',['ui.router']);

app.config([
    '$stateProvider',
    function ($stateProvider){
        $stateProvider
        .state('home',{
            url:'/home',
            template:'<h2>home</h2>'
        })
        .state('about',{
            url:'/about',
            template:'<h2>about</h2>'
        })
        .state('contact',{
            url:'/contact',
            template:'<h2>contact</h2>'
        });

        //--------------------------------------------
        //store routing
        $stateProvider
        .state('store',{
            url: '/store',
            templateUrl:'/templates/store/list.html',
            controller: 'Store.storeController'
        })
        .state('store-update',{
            url: '/store/:id/update',
            templateUrl:'/templates/store/edit.html',
            controller: 'Store.storeController'
        })
        .state('store-create',{
            url: '/store/create',
            templateUrl:'/templates/store/edit.html',
            controller: 'Store.storeController'
        })
        .state('store-view',{
            url: '/store/:id',
            templateUrl:'/templates/store/view.html',
            controller: 'Store.storeController'
        });

        //--------------------------------------------
        //pet routing
        // $stateProvider
        // .state('petsList',{
        //     url: '/cart',
        //     templateUrl:'/templates/cart/view.html',
        //     controller: 'Cart.CartController'
        // });


    }
])
