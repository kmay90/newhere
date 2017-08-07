angular.module('app', [
    'app.run',
    'app.filters',
    'app.services',
    'app.directives',
    'app.components',
    'app.routes',
    'app.config',
    'app.partials'
]);

angular.module('app.run', []);
angular.module('app.routes', []);
angular.module('app.filters', []);
angular.module('app.services', ['ui-leaflet']);
angular.module('app.config', ['ngCookies']);
angular.module('app.directives', []);
angular.module('app.components', [
    'ui.router', 'md.data.table', 'ngMaterial', 'angular-loading-bar',
    'restangular', 'ngStorage', 'satellizer', 'ui.tree', 'dndLists', 'angular.filter', 'textAngular',
    'ngSanitize', 'flow', 'ngMessages', 'mgo-angular-wizard', 'bw.paging',
    'pascalprecht.translate', 'ui-leaflet', 'nemLogging'
]);