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
           var timeout;
               var context = this, args = arguments;
               var later = function() {
                   timeout = null;
                   if (!immediate) func.apply(context, args);
               };
               var callNow = immediate && !timeout;
               clearTimeout(timeout);
               timeout = setTimeout(later, wait);
               if (callNow) func.apply(context, args);

       };

var searchFunction = function(event){
    var _this = $(event.target).val();
    return debounce(function(){
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
                            $.ajax({
                                url : 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+$(event.target).text()+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json',
                                success: function(result){
                                    $(event.target).parents('.searchParent').find('.artistInfo').html(result.artist.bio.content);
                                }
                            })
                        })
                    },
                    error : function(){ }
                })
       }
    },2500,true)
};
       return this.each(function(index, element){
           $(element).append('<div class="searchParent">'+
               '<div class="searchDiv">'+
               '<input type="search" class="artistSearch" placeholder="Search with artist name">'+
               '<ul></ul>'+
               '</div><div class="artistInfo"></div>'+
               '</div>');
           $(element).find('.artistSearch').on('keyup', searchFunction);
       });
   }
})( jQuery, window, document );