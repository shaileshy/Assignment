/**
 * Created by manoj.kumar on 16-12-2016.
 */

;(function ( $, window, document, undefined ) {
    'use strict';
   $.fn.widget = function(options){
       var setting = $.extend({
           onsearch : searchArtist
       },options);


       function searchArtist(){

       }

       function debounce(func, wait, immediate) {
           var timeout, result;
           return function() {
               var context = this, args = arguments, later, callNow;
               later = function() {
                   timeout = null;
                   if (!immediate) {
                       result = func.apply(context, args);
                   }
               };
               callNow = immediate && !timeout;
               clearTimeout(timeout);
               timeout = setTimeout(later, wait);
               if (callNow) {
                   result = func.apply(context, args);
               }
               return result;
           };
       }

var searchFunction = function(event){
    var _this = $(event.target).val();
       if(_this.length) {
                $.ajax({
                    url : 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+_this+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json',
                    success : function(response){
                        var html = "";
                        response.results.artistmatches.artist.forEach(function(element,index){
                            html += '<li>'+element.name+'</li>';
                         });
                        $(event.target).parent().find('ul').empty().append(html);
                        $('.searchDiv ul li').on('click',function(event){
                            $(event.target).closest('.searchDiv').find('input[type="search"]').val($(event.target).text());

                            $.ajax({
                                url : 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+$(event.target).text()+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json',
                                success: function(result){
                                    $(event.target).parents('.searchParent').find('.artistInfo').html(result.artist.bio.content  || "No desciption available");
                                    var similarthtml = '';
                                    result.artist.similar.artist.forEach(function(element,index){
                                        similarthtml += '<li>'+element.name+'</li>';
                                    });
                                    $(event.target).closest('.searchDiv').find('ul').empty();
                                    $('#sidebarArtist').empty().append(similarthtml);
                                }
                            })

                        })
                    },
                    error : function(){ }
                })
       }
};
       return this.each(function(index, element){
           $(element).append('<div class="searchParent">'+
               '<div class="searchDiv">'+
               '<input type="search" class="artistSearch" placeholder="Search with artist name">'+
               '<ul></ul>'+
               '</div><div class="artistInfo"></div>'+
               '</div>');
           $(element).find('.artistSearch').on('keyup', debounce(searchFunction,300,false));
       });
   }
})( jQuery, window, document );