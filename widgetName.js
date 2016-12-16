/**
 * Created by manoj.kumar on 16-12-2016.
 */
'use strict';
;(function ( $, window, document, undefined ) {

   $.fn.widget = function(element){
       return this.each(function(index, element){
           $(element).append('<div>'+
               '<input type="search" placeholder="search with Artist"><button>Search by Artist</button>'+
               '<ul></ul>'+
               '</div>');
           $(element).find('button').on('click', function(event){
               $.ajax({
                   url: '/searchArtist/'+$(element).find('input[type="search"]').val(),
                   success : function(data){
                       var searchResult = data.searchResult;
                       var similarResults = data.similarArtists;
                       var builtHTML ="";
                       var builtHTML2 ="";
                       $(element).find('ul').empty();
                       searchResult.forEach(function(element){
                           builtHTML += '<li><a target="_blank" href="'+element.url+'" class="artistInfo">'+element.name+'</a></li>';
                       });
                       $(element).find('ul').append(builtHTML);
                       $('#sidebarArtist').empty();
                       similarResults.forEach(function(element){
                           builtHTML2 += '<li><a target="_blank" href="'+element.url+'" class="artistInfo">'+element.name+'</a></li>';
                       });
                       $('#sidebarArtist').append(builtHTML2);

                   },
                   error : function(){ }
               })
           });
       });
   }
})( jQuery, window, document );