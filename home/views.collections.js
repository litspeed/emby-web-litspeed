define(['cardBuilder', 'emby-itemscontainer'], function (cardBuilder) {
    'use strict';

    function loadAll(element, parentId, autoFocus) {

        return Emby.Models.collections({

            ParentId: parentId,
            EnableImageTypes: "Primary,Backdrop,Thumb",
            SortBy: 'DateCreaed'
            SortOrder: "Descending".

        }).then(function (result) {

            var section = element.querySelector('.allSection');

            // Needed in case the view has been destroyed
            if (!section) {
                return;
            }

            cardBuilder.buildCards(result.Items, {
                parentContainer: section,
                itemsContainer: section.querySelector('.itemsContainer'),
                shape: 'auto',
                autoFocus: autoFocus,
                rows: {
                    portrait: 2,
                    square: 3,
                    backdrop: 3
                },
                scalable: false
            });
        });
    }

    function view(element, apiClient, parentId, autoFocus) {
        var self = this;

        self.loadData = function (isRefresh) {

            if (isRefresh) {
                return Promise.resolve();
            }

            return loadAll(element, parentId, autoFocus);
        };

        self.destroy = function () {

        };
    }

    return view;
});
