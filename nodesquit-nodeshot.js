// ==UserScript==
// @name        Nodesquit One
// @namespace   leone@inventati.org
// @include     http://map.ninux.org*
// @version     1
// @grant       none
// ==/UserScript==

if(!window.jQuery) {
  
  console.error('ERR: jQuery not loaded.');
  
} else {
  
  function nodeLatLon(node, json) {
    var r = []
    $.each(json, function(index, value){
      $.each(value, function(index, value){
        if(value.name == node){
          r = [value.lat, value.lng];
          return false;
        }
      });
    });
    return r;
  }
  
  function genUrl(n, m) {
    var url = '';
    
    return url;
  }
  
  function pulisci(text) {
    var n = text.indexOf('-');
    var m = text.indexOf(':');
    
    m = text.substring(n+2, m);
    n = text.substring(0, n-1);
    
    return [n, m];
  }
  
  function appendBtn() {
    //console.log('appendBtn called');
    $('div.distance-link').each(function(index, element){
      if(!($(element).hasClass('squit'))){
        
        var nodi = pulisci($(element).text());
        var n = nodi[0];
        var m = nodi[1];
        
        $.get('http://map.ninux.org/nodes.json', function(data){

          n = nodeLatLon(n, data);
          m = nodeLatLon(m, data);

          var hwt = 'http://www.heywhatsthat.com/profiler.html';
          url = hwt+'?na='+n[0]+'&no='+n[1]+'&ma='+m[0]+'&mo='+m[1];
          
          $(element).addClass('squit');
          
          //console.log(url);
          var btn = '<a class="link-hide" target="blank" href="'+url+'">profilo</a>';
          $(element).append(btn);

        }, 'json').fail(function(){
          console.error('Failed to get nodes.json');
        });
        
        
        
      }
    });
    
  }
  
  console.log('NSOne');
  
  $(window).load(function(){
    setInterval(appendBtn, 2000);
  });
  
}