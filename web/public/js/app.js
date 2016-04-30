'use strict';
var app = angular.module('fox-chat', ['ngMaterial', 'ngAnimate', 'ngCookies', 'ngMdIcons', 'ngResource','ngRoute']);
var webServerBaseUrl = "http://" + window.location.hostname + ":"+ window.location.port;
var serverBaseUrl = '';
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
