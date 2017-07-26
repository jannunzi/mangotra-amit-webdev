/**
 * Created by cammy on 7/25/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage,
            "findPageByName" : findPageByName
        };
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var _pages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    _pages.push(pages[p]);
                }
            }
            return _pages;
        }

        function findPageByName(pageName, websiteId) {
            for(var p in pages) {
                if(pages[p].websiteId === websiteId && pages[p].name === pageName) {
                    return pages[p].name;
                }
            }
            return false;
        }

        function findPageById(pid, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
        }

        function updatePage(page, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === page._id) {
                    pages[p] = page;
                }
            }
        }

        function deletePage(page, wid) {
            for(var p in pages) {
                if(pages[p].websiteId === wid && pages[p]._id === page._id) {
                    delete pages[p];
                }
            }
        }
    }
})();