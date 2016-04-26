'use strict';
var app = angular.module('fox-chat', ['ngMaterial', 'ngAnimate', 'ngMdIcons', 'ngResource','ngRoute']);
var serverBaseUrl = '';
var webServerBaseUrl = "http://" + window.location.hostname + ":"+ window.location.port;

// set routing to angular partials
app.controller('themeController', function themeController ($scope) {});
app.config(function($routeProvider,$locationProvider, $mdThemingProvider)
    {
        $locationProvider.html5Mode({enabled: true, requireBase: false});

        // ng-view routing
        $routeProvider.
            when('/',
                {templateUrl:'/partials/main_view', controller:'mainCtrl'});

        // use theme
        $mdThemingProvider.theme('customTheme')
            .primaryPalette('orange');
    }
);
