angular.module('ZenQuizz').factory("Breadcrumbs", function () {
  var crumbs = [];
  return {
    crumbs:function () {
      return crumbs;
    },
    setCrumbs:function (newCrumb) {
      crumbs = newCrumb;
    },
    isEmpty:function () {
      return crumbs.length == 0;
    },
    pushCrumb:function(newCrumb) {
      crumbs.push(newCrumb);
    }

  };
});
