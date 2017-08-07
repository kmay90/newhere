class AppCategoriesContentSubController {
    constructor($scope, CategoryService, OfferService, MapService, $state, $rootScope) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$rootScope.showMap = false;
        this.showMap = false;
        this.showOffers = false;
        this.category = {};
        this.filteredOffers;
        this.CategoryService = CategoryService;
        this.OfferService = OfferService;
        this.MapService = MapService;
        this.state = $state;
        this.offersCallback = (offers) => {
            this.offers = offers;
            this.MapService.setMarkers(offers);
        };
        this.CategoryService.bySlug($state.params.slug, (category) => {
            this.category = category;
            if (!this.category.children.length) {
                this.showOffers = true;
            }
            this.CategoryService.getOffers(this.offersCallback);
        });

    }

    toggleMap() {
        this.showMap = !this.showMap;
        this.$rootScope.showMap = !this.$rootScope.showMap;
    }

    showOffer(id) {
        this.state.go('app.start.detail', {
            id: id
        });
    }
}

export const AppCategoriesContentSubComponent = {
    templateUrl: './views/app/components/app-categories-content-sub/app-categories-content-sub.component.html',
    controller: AppCategoriesContentSubController,
    controllerAs: 'vm',
    bindings: {}
}