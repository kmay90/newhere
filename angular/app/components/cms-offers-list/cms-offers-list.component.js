class CmsOffersListController{
    constructor($sessionStorage, OfferService, NgoService, $filter, $state, $translate, DialogService){
        'ngInject';
        var vm = this;
        vm.menu = {
          isOpen:false
        };
        vm.loading = true;
        vm.isNgoPublished = false;
        this.$sessionStorage = $sessionStorage;
        this.$filter = $filter;
        this.$state = $state;
        this.$translate = $translate;
        this.DialogService = DialogService;
        this.NgoService = NgoService;
        this.OfferService = OfferService;
        if(this.cms){
          this.NgoService.fetchAll().then((response) => {
              vm.ngos = response;
          });
        }

        this.selectedOffers = [];
        this.query = {
            order: '-id',
            limit: 10,
            page: 1
        };
        this.search = {
            show: false,
            query: ''
        }
        if(this.$sessionStorage.offerQuery){
          this.query = this.$sessionStorage.offerQuery;
        }
        this.listOrderByColumn = '-organisation';
        // this.onOrderChange = (order) => {
        //     //console.log("onOrderChange " + order);
        //     return vm.offers = this.$filter('orderBy')(vm.offers, [order], true);
        // };
        // this.onPaginationChange = (page, limit) => {
        //     //console.log(page, limit);
        // };
        this.getOffers = ()=>{
            if (this.cms) {
                vm.$sessionStorage.offerQuery = vm.query;
                vm.promise = this.OfferService.fetchFiltered(vm.query, (response) => {
                    vm.offers = response;
                    vm.loading = false;
                    vm.count = response.count;
                });
            } else {
                this.OfferService.fetchMyOffers(this.query, (response) => {
                    vm.offers = response;
                    vm.loading = false;
                    vm.count = response.count;
                    vm.isNgoPublished = response.ngoPublished;
                });
            }
        };
        this.getOffers();
    }

    toggleEnabled(offer) {
        this.OfferService.toggleEnabled(offer);
    }
    bulkToggleEnabled(enabled){
      this.OfferService.bulkAssign(this.selectedOffers, 'enabled' ,enabled, (list) =>{
        angular.forEach(list, (item) => {
          angular.forEach(this.offers, (offer, key) => {
            if(offer.id == item.id){
              offer.enabled = enabled;
            }
          });
        });
        this.selectedOffers = [];
        this.DialogService.hide();
      });
    }

    remove() {
        //@todo translation!!!
      this.DialogService.prompt('Deleting Offers?', 'You are about to delete offer(s). Type in DELETE and confirm?', 'Delete Secret').then((response) => {
         if (response === "DELETE") {
             this.OfferService.bulkRemove(this.selectedOffers, (list) => {
                 this.selectedOffers = [];
                 angular.forEach(list, (item) => {
                     angular.forEach(this.offers, (offer, key) => {
                         if(offer.id == item.id){
                             this.offers.splice(key, 1);
                         }
                     });
                 });
             });
         } else {
             this.DialogService.alert('Not correct', 'Thankfully, you entered the wrong secret. So nothing is going to change... for now.');
         }
      });
    }
    updateNgo(offer){
      this.OfferService.save(offer);
    }
    assignNgo(){
      this.DialogService.fromTemplate('assignToNgo', {
         controller: () => this,
         controllerAs: 'vm'
      });
    }

    assignSave(){
      this.OfferService.bulkAssign(this.selectedOffers, 'ngo_id',this.ngo.id, (list) =>{
        angular.forEach(list, (item) => {
          angular.forEach(this.offers, (offer, key) => {
            if(offer.id == item.id){
              offer.ngo_id = this.ngo.id;
            }
          });
        });
        this.selectedOffers = [];
        this.DialogService.hide();
      });
    }
    cancel(){
        if (this.cms) {
            this.DialogService.hide();
        } else {
            alert("go back");
        }
    }
    $onInit(){
    }
}

export const CmsOffersListComponent = {
    templateUrl: './views/app/components/cms-offers-list/cms-offers-list.component.html',
    controller: CmsOffersListController,
    controllerAs: 'vm',
    bindings: {
      cms: '='
    }
}
