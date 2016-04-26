'use strict';
var app = angular.module('fox-chat', ['ngMaterial', 'ngAnimate', 'ngMdIcons', 'ngResource','ngRoute']);

// set routing to angular partials
app.controller('themeController', function themeController ($scope) {});
app.config(function($routeProvider,$locationProvider, $mdThemingProvider)
    {
        $locationProvider.html5Mode({enabled: true, requireBase: false});

        // ng-view routing
        $routeProvider.
            when('/',
                {templateUrl:'/partials/main', controller:'mainCtrl'})

        // use theme
        $mdThemingProvider.theme('customTheme')
            .primaryPalette('orange')
    }
);

// connect to server on port
var serverBaseUrl = 'http://localhost:3030';
