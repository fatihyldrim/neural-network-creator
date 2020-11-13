
  		//SeÃ§ilen text dosyasÄ±nÄ±n iÃ§eriÄŸini veri setine atar.		
  		var openFile = function(event) {
  			var input = event.target;
  			var reader = new FileReader();
  			reader.onload = function(){
  				var text = reader.result;
  				var node = document.getElementById('veri');
  				node.innerText = text;

  			};      
  			reader.readAsText(input.files[0]);
  		};


  		$(document).ready(function () {

        	//Hidden layer sayÄ±sÄ±nÄ± ayarlamak iÃ§in
        	var i = 0;
        	$(function () {
        		$(document).on('click', '.btn-add', function (e) {
        			e.preventDefault();
        			i++;   

              //add layer                 
              $('ul.autogrid li.hiddenlayer:nth-last-child(2)').after('<li class="hiddenlayer"><div><center><p>1</p></center></div></li>');

//$('<li><center><p>'+(parseInt( $('ul.autogrid  li:nth-last-child(2)').text() ) +1 )+'</p></center></li>').appendTo('ul.autogrid li:nth-last-child(2)');

var controlForm = $('.controls #form:first'),
currentEntry = $(this).parents('.entry:first'),
newEntry = $(currentEntry.clone()).appendTo(controlForm);

newEntry.find('#neuralcount').val(1);

var lcount = $('.layercount');

var optionlar = newEntry.find('#optradio');
optionlar.attr('name','optradio'+String(lcount.length));

        		   	//arakatman ayarlarÄ±ndaki 1 2 3 
               for (var i = 1; i < lcount.length+1; i++) {                		

                var lcountspan = lcount[i-1];
                lcountspan.innerText=String(i);
              }
              getSetHeight();
              createLines();
              controlForm.find('.entry:not(:last) .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-success').addClass('btn-danger')
              .html('<span class="fa fa-minus fa-sm"></span>');
            }).on('click', '.btn-remove', function (e) {
             $(this).parents('.entry:first').remove();
             var lcount = $('.layercount');

        			//arakatman ayarlarÄ±ndaki 1 2 3 
        			for (var i = 1; i < lcount.length+1; i++) {                		

        				var lcountspan = lcount[i-1];
        				lcountspan.innerText=String(i);
        			}

              //remove layer
              if( $('ul.autogrid li').length>1)
                $('ul.autogrid li.hiddenlayer:nth-last-child(2)').remove();
              
              getSetHeight();
              createLines();
              e.preventDefault();
              return false;                
            });
          });

        });


      //layer neuron count settings
      function getSetHeight() {

       var adet = 0 ;
       var c = 1;
       $("ul li").each(function(){
         var a = $('ul li:nth-child('+String(c)+') center').length;
         if( a > adet){
          adet = a;
        }
        c++;

      });
       var h = 150*adet-80;

       $('ul li').css("height",h); 
       $('svg').css("height",h+700)
     }


     function hiddentik(argument) {

      var layerRank = $(argument).prev().text();


      var whichLayer = $('.hiddenlayer')[layerRank-1];

      var hiddenlayerneuroncount = $(whichLayer).find(">:first-child").find(">center").get().length;


      if (argument.value == (hiddenlayerneuroncount+1)) {
        $('<center class="hiddenlayerneuron"><p>1</p></center>').appendTo($(whichLayer).find(">:first-child"));

      }  
      else if (argument.value == (hiddenlayerneuroncount-1)) {        
       $(whichLayer).find(">:first-child").find(">center.hiddenlayerneuron:last-child").remove();
     }

     getSetHeight();
     createLines();


   }

   var inputlayerneuroncount = 1;
   function inputtik(argument) {

    if (argument.value == (inputlayerneuroncount+1)) {
      $('<center class="inputlayerneuron"><p>1</p></center>').appendTo('ul.autogrid li.inputlayer div');
      inputlayerneuroncount++;
    }  
    else if (argument.value == (inputlayerneuroncount-1)) {
      $('ul.autogrid center.inputlayerneuron:last-child').remove();
      inputlayerneuroncount--;
    }
    getSetHeight();
    createLines();

  }

  var outputlayerneuroncount = 1;
  function outputtik(argument) {


    if (argument.value == (outputlayerneuroncount+1)) {
      $('<center class="outputlayerneuron"><p>1</p></center>').appendTo('ul.autogrid li.outputlayer div');
      outputlayerneuroncount++;
    }  
    else if (argument.value == (outputlayerneuroncount-1)) {
      $('ul.autogrid center.outputlayerneuron:last-child').remove();
      outputlayerneuroncount--;
    }    
    createLines();
    getSetHeight();
  }

  function resetAll() {
    window.location.reload();
  }


  $(document).ready(function(){

    $('#max-col').on('change',function(){
      $('.autogrid').removeClass (function (index, css) {
        return (css.match (/(^|\s)max-col\S+/g) || []).join(' ');
      });
      $('ul').addClass('max-col-'+$(this).val());
    })

    $('#add-element').on('click',function(){
      $('ul').append('<li><center><p>'+(parseInt( $('ul li:last-child').text() ) +1 )+'</p></center></li>');
    })

    $('#remove-element').on('click',function(){
      if( $('ul li').length>1)
        $('ul li:last-child').remove();
    })

    function add_layer() {
     $('ul').append('<li><center><p>'+(parseInt( $('ul li:last-child').text() ) +1 )+'</p></center></li>');
   }
   function remove_layer() {
     if( $('ul li').length>1)
      $('ul li:last-child').remove();
  }
  
});