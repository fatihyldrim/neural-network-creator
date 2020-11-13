

function setLayerCountValues() {
  var neuronLabel = $('#neuronCountLabel');
  var weightLabel = $('#weightCountLabel');

  var neuronCount = 0;
  var weigthCount = 0;

  var layers = $('ul.autogrid li');

  layers.each(function(e){ //layer
    if (e != layers.length-1) {
      var thisLayer= this;
      var thisNeurons = $(this).find('>div').find('>center');

      for (var i = 0; i < thisNeurons.length; i++) {

        neuronCount++;
        var nextNeurons = $(thisLayer).next().find('>div').find('>center');
        for (var j = 0; j < nextNeurons.length; j++) {

          weigthCount++;
        }

      } 
    }
  });

  neuronLabel.text(neuronCount);
  weightLabel.text(weigthCount);
}

      //layer & neuron lines create
      function createLines() {

        $('svg').html("");

        var x1=0;
        var x2=0;
        var y1=0;
        var y2=0;
        var n = [];
        var count=0;
        var NS = "http://www.w3.org/2000/svg";
        
        $("ul li").each(function(){

          n[count] = $(this).find(">:first-child").find(">center");
          count++;
        });
        

        for (var i = 0; i < n.length-1; i++) {
         var neuron = n[i].get();
         var neuron2 = n[i+1].get();
         
         for (var j = 0; j < neuron.length; j++) {
           x1 = neuron[j].offsetLeft+25;
           y1 = neuron[j].offsetTop+25;

           for (var k = 0; k < neuron2.length; k++) {
            x2 =  neuron2[k].offsetLeft+25;
            y2 = neuron2[k].offsetTop+25;


            var ln = document.createElementNS(NS, "line")
            $(ln).attr({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2
            }).css({
              "stroke": "#F1654C",
              "stroke-width": "3px"
            });
            $('svg').append(ln);

          }
        }

      }

      
      setWeight();
    }