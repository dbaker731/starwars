angular.module( 'StarShip' ).service( 'starshipService', function( $http, $q ){

  var baseUrl = 'http://swapi.co/api/';
  var nextPageUrl = null;


  this.getCharacters = function(){
    return $http
    .get( baseUrl + 'people' )
    .then( function( people ){
      nextPageUrl = people.data.next;
      return people;
    });
  };


  this.getStarships = function( urlArray ){
    var starshipArray = [];
    var dfd = $q.defer();

    for (var i = 0; i < urlArray.length; i++) {
      $http.get( urlArray[ i ] ).then( function( starship ) {
        starshipArray.push( starship.data );

        if (starshipArray.length === urlArray.length ) {
          dfd.resolve( starshipArray );

        }

      });
    }

    return dfd.promise;
  };


  this.getNextPage = function(){
    return $http.get( nextPageUrl )
    .then( function( people ){
      nextPageUrl = people.data.next;
      return people;
    });
  };

});
