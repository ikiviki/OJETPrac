/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(
  ['ojs/ojcore',
    'knockout',
    'accUtils',
    'jquery',
    'ojs/ojarraydataprovider',
    'ojs/ojlabel', 'ojs/ojchart', 'ojs/ojlistview', 'ojs/ojmodule-element', 'ojs/ojavatar'],
  function (oj,ko, accUtils, $, ArrayDataProvider) {

    function DashboardViewModel() {
      var self = this;




      // PRAC 3
      // List view from local json
      var url = "js/store_data.json";                 // link to local json file
      self.activityDataProvider = ko.observable();    // gets data for Activities list
      self.itemsDataProvider = ko.observable();       // gets data for Items list
      self.itemData = ko.observable('');              // holds data for Item details
      self.pieSeriesValue = ko.observableArray([]);   // holds data for pie chart

      // Activity Selection observables
      self.activitySelected = ko.observable(false);
      self.selectedActivity = ko.observable();
      self.firstSelectedActivity = ko.observable();
      

      // Item selection observables
      self.itemSelected = ko.observable(false);
      self.selectedItem = ko.observable();
      self.firstSelectedItem = ko.observable();

      // Get Activities objects from file using jQuery method and a method to return a Promise
      $.getJSON(url).then(function (data) {
        // Create variable for Activities list and populate using key attribute fetch
        var activitiesArray = data;
        self.activityDataProvider(new oj.ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));

        // // Create variable for Items list and populate list using key attribute fetch
        // var itemsArray = data[0].items;
        // self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: 'id' }));

        // // Populate Items details using the first child item
        // self.itemData(data[0].items[0]);

        // // Create variable for Pie Chart series and populate observable
        // var pieSeries = [
        //   { name: "Quantity in Stock", items: [self.itemData().quantity_instock] },
        //   { name: "Quantity Shipped", items: [self.itemData().quantity_shipped] }
        // ];
        // self.pieSeriesValue(pieSeries);
      });



      /**
       * Handle selection from Activities List
       */
      self.selectedActivityChanged = function (event) {
        // Check whether click is an Activity selection or deselection
        if (event.detail.value.length != 0) {
          // If selection, populate and display list

          // Create variable for items list using firstSelectedXxx API from List View
          var itemsArray = self.firstSelectedActivity().data.items;
          // Populate items list using DataProvider fetch or key attribute
          self.itemsDataProvider(new oj.ArrayDataProvider(itemsArray, { keyAttributes: "id" }));
          // Set List View properties
          self.activitySelected(true);
          self.itemSelected(false);
          // Clear item selection
          self.selectedItem([]);
          self.itemData();
        } else {
          // If deselection, hide list
          self.activitySelected(false);
          self.itemSelected(false);
        }
      };


      /**
       * Handle selection from Activity Items list
       */
      self.selectedItemChanged = function (event) {
        // Check whether click is an Activity item selection or deselection
        if (event.detail.value.length != 0) {
          // If selection, populate and display list
          self.itemData(self.firstSelectedItem().data);
          var pieSeries = [
            { name: "Quantity in Stock", items: [self.itemData().quantity_instock] },
            { name: "Quantity Shipped", items: [self.itemData().quantity_shipped] }
          ];
          // Update the pie chart with the data
          self.pieSeriesValue(pieSeries);
          self.itemSelected(true);
        } else {
          // If deselection, hide list
          self.itemSelected(false);
        }
      }








    // DEFINE -> 'ojs/ojselectsingle'
    // // PRAC 1
    // // Select Single (drop down)
    // var types = [
    //   { value: 'pie', label: 'Pie' },
    //   { value: 'bar', label: 'Bar' },
    //   { value: 'line', label: 'Line' }
    // ];

    // self.chartTypes = new ArrayDataProvider(types, { keyAttributes: 'value' });

    // self.val = ko.observable('pie'); // Chart selection observable and default value



    // // PRAC 2
    // // Bar Chart
    // // self.stackValue = ko.observable('off');
    // // self.orientationValue = ko.observable('vertical');
    // var chartData = [
    //   { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
    //   { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
    //   { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
    //   { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
    //   { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
    //   { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
    //   { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
    //   { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
    // ];

    // self.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });







    // /** 
    // * Define the oj-module inline template for Activity Items list
    // */
    // var lg_xl_view = '<h1><oj-label for="itemsList">Activity Items</oj-label></h1>' +
    //   '<oj-list-view style="font-size: 18px">' +
    //   '<ul>' +
    //   '<li>' +
    //   '<div class="oj-flex-item">' +
    //   '<p>SureCatch Baseball Glove</p>' +
    //   '<p>Western R16 Helmet</p>' +
    //   '<p>Western C1 Helmet</p>' +
    //   '<p>Western Bat</p>' +
    //   '</div>' +
    //   '</li>' +
    //   '<li>' +
    //   '<div class="oj-flex-item">' +
    //   '<p>Air-Lift Tire Pump</p>' +
    //   '<p>Intact Bike Helmet</p>' +
    //   '<p>Nimbus Bike Tire</p>' +
    //   '<p>Refill Water Bottle</p>' +
    //   '<p>Swift Boys 21 Speed</p>' +
    //   '</div>' +
    //   '</li>' +
    //   '</ul>' +
    //   '</oj-list-view>';


    // //Display this content for small and medium screen sizes
    // var sm_md_view = '<div id="sm_md" style="background-color:lightcyan; padding: 10px; font-size: 10px">' +
    //   '<h1><oj-label for="itemsList">Activity Details</oj-label></h1>' +
    //   '<oj-list-view style="font-size: 18px">' +
    //   '<ul>' +
    //   '<li>' +
    //   '<div class="oj-flex-item">' +
    //   '<p>SureCatch Baseball Glove</p>' +
    //   '<p>Western R16 Helmet</p>' +
    //   '<p>Western C1 Helmet</p>' +
    //   '<p>Western Bat</p>' +
    //   '</div>' +
    //   '</li>' +
    //   '</ul>' +
    //   '</oj-list-view>' +
    //   '</div>';


    // DEFINE ->
    // 'ojs/ojhtmlutils',
    // 'ojs/ojresponsiveutils',
    // 'ojs/ojresponsiveknockoututils',

    // // Identify the screen size and display the content for that screen size
    // var lgQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);

    // self.large = ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
    // self.moduleConfig = ko.pureComputed(function () {
    //   var viewNodes = HtmlUtils.stringToNodeArray(self.large() ? lg_xl_view : sm_md_view);
    //   return { view: viewNodes };
    // });

    // /** 
    // * End of oj-module code
    // */



    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    self.connected = function () {
      accUtils.announce('Dashboard page loaded.', 'assertive');
      document.title = "Dashboard";
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    self.disconnected = function () {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    self.transitionCompleted = function () {
      // Implement if needed
    };
  }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);
