export function RoutesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    var getView = (viewName) => {
        return `./views/app/pages/${viewName}/${viewName}.page.html`;
    };
    var getAppView = (viewName) => {
        return `./views/app/pages/app/${viewName}/${viewName}.page.html`;
    };

    var getCmsView = (viewName) => {
        return `./views/app/pages/cms/${viewName}/${viewName}.page.html`;
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                front: {
                    templateUrl: getView('main')
                },
                'header@app': {
                    templateUrl: getAppView('header')
                },
                'footer@app': {},
                'main@app': {}
            }
        })
        .state('app.start', {
            abstract: true,
            data: {},
            views: {
                'header@app': {
                    templateUrl: getAppView('header')
                },
                'main@app': {
                    templateUrl: getAppView('start')
                },
                'footer@app': {
                    templateUrl: getAppView('footer')
                }
            }
        })
        .state('app.start.categories', {
            url: '/start',
            data: {},
            views: {
                'content@app.start': {
                    templateUrl: getAppView('categories')
                }
            }
        })
        .state('app.start.categories.sub', {
            url: '/:slug',
            data: {},
            views: {
                'content@app.start': {
                    templateUrl: getAppView('categories-sub')
                },
                'toolbar@app.start': {
                    templateUrl: getAppView('categories-toolbar')
                }
            }
        })

    .state('app.start.detail', {
        url: '/offer/:id',
        data: {
            hideFilter: true
        },
        splitScreen: true,
        views: {
            'content@app.start': {
                templateUrl: getAppView('offer-detail')
            },
            'toolbar@app.start': {
                templateUrl: getAppView('categories-toolbar')
            }
        }
    })

    .state('app.landing', {
            url: '/',
            data: {},
            views: {
                'main@app': {
                    templateUrl: getView('landing'),
                    controller: function($window, $state) {
                        if ($window.localStorage.language) {
                            $state.go('app.start.categories');
                        }
                    }
                }
            }
        })
        .state('app.ngoLanding', {
            url: '/',
            data: {},
            views: {
                'main@app': {
                    templateUrl: getView('ngoLanding')
                }
            }
        })
        .state('app.login', {
            url: '/login',
            data: {}, //{auth: true} would require JWT auth for this route
            views: {
                'main@app': {
                    templateUrl: getView('login')
                }
            }
        })

    .state('app.ngoRegister', {
            url: '/ngoRegister',
            data: {}, //{auth: true} would require JWT auth for this route
            views: {
                'main@app': {
                    templateUrl: getView('ngo-register')
                }
            }
        })
        .state('app.forgotpassword', {
            url: '/forgotpassword',
            data: {}, //{auth: true} would require JWT auth for this route
            views: {
                'main@app': {
                    templateUrl: getView('forgot-password')
                }
            }
        })
        .state('app.resetpassword', {
            url: '/reset-password/{token}',
            data: {}, //{auth: true} would require JWT auth for this route
            views: {
                'main@app': {
                    templateUrl: getView('reset-password')
                }
            }
        })
        .state('app.myngo', {
            url: '/my-ngo',
            data: {
                auth: true,
                roles: ['organisation-admin', 'organisation-user']
            },
            views: {
                'main@app': {
                    templateUrl: getView('my-ngo'),
                    controller: function($scope, $window) {
                        $scope.isNgoAdmin = ($window.localStorage.roles.indexOf("organisation-admin") > -1);
                    }
                }
            }
        })
        .state('app.ngo', {
            url: '/ngo/{id}',
            data: {}, //{auth: true} would require JWT auth for this route
            views: {
                'main@app': {
                    templateUrl: getView('ngo')
                }
            }
        })
        .state('app.offers', {
            url: '/offers',
            data: {
                auth: true,
                roles: ['organisation-admin', 'organisation-user']
            },
            views: {
                'main@app': {
                    templateUrl: getView('offers')
                }
            }
        })
        .state('app.offers.new', {
            url: '/new',
            data: {
                auth: true,
                roles: ['organisation-admin', 'organisation-user']
            },
            views: {
                'main@app': {
                    templateUrl: getView('offer-new')
                }
            }
        })
        .state('app.offers.details', {
            url: '/{id}',
            data: {
                auth: true,
                roles: ['organisation-admin', 'organisation-user']
            },
            views: {
                'main@app': {
                    templateUrl: getView('offer-detail')
                }
            }
        })
        .state('app.impressum',{
          url:'/impressum-agbs',
          views:{
            'main@app':{
              templateUrl:getView('impressum')
            }
          }
        })

    //
    // CMS
    //
    .state('cms', {
            abstract: true,
            url: '/cms',
            views: {
                cms: {
                    templateUrl: getCmsView('main')
                },
                header: {
                    templateUrl: getCmsView('header')
                },
                footer: {
                    templateUrl: getCmsView('footer')
                },
                front: {}
            }
        })
        .state('cms.dashboard', {
            url: '/dashboard',
            data: {
                auth: true,
                roles: ['admin', 'superadmin', 'moderator']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('dashboard')
                }
            }
        })
        .state('cms.categories', {
            url: '/categories',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('categories')
                }
            }
        })
        .state('cms.categories.details', {
            url: '/:id',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'details': {
                    templateUrl: getCmsView('category')
                }
            }
        })
        .state('cms.languages', {
            url: '/languages',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('language')
                }
            }
        })

    .state('cms.users', {
            url: '/users',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('users')
                }
            }
        })
        .state('cms.users.roles', {
            url: '/roles',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('roles')
                }
            }
        })
        .state('cms.translations', {
            url: '/translations',
            data: {
                auth: true,
                roles: ['admin', 'superadmin', 'moderator']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('translations')
                }
            }
        })
        .state('cms.ngos', {
            url: '/ngos',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('ngos')
                }
            }
        })
        .state('cms.ngos.users', {
            url: '/users/{id}',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('ngo-users')
                }
            }
        })

    .state('cms.filters', {
            url: '/filters',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('filters')
                }
            }
        })
        .state('cms.filters.details', {
            url: '/:id',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'details': {
                    templateUrl: getCmsView('filter')
                }
            }
        })
        .state('cms.offers', {
            url: '/offers',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('offers')
                }
            }
        })
        .state('cms.offers.new', {
            url: '/new',
            data: {},
            views: {
                'main@cms': {
                    templateUrl: getCmsView('new-offer')
                }
            }
        })
        .state('cms.offers.detail', {
            url: '/{id}',
            data: {
                auth: true,
                roles: ['admin', 'superadmin']
            },
            views: {
                'main@cms': {
                    templateUrl: getCmsView('offer-detail')
                }
            }
        });
}
