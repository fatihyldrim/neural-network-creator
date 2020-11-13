
//setting weigths using three dimensional array
//first are layers
//second are neurons in that layer
//third are neurons in next layer
var w = [[,,]];

function setWeight() {
	
	var neuronCount = 0;
	var weigthCount = 0;

	w = [[,,]];
	
	var weigthText = $('#weightsTextarea');
	weigthText.text("");
	
	var layers = $('ul.autogrid li');


	layers.each(function(e){ //layer
		if (e != layers.length-1) {


			var thisLayer= this;
			var thisNeurons = $(this).find('>div').find('>center');
			//console.log("e:"+String(e));
			for (var i = 0; i < thisNeurons.length; i++) {

				//console.log("i:"+String(i));
				neuronCount++;
				var nextNeurons = $(thisLayer).next().find('>div').find('>center');
				for (var j = 0; j < nextNeurons.length; j++) {
					//console.log("j:"+String(j));
				//random between 0-1 : 0.56
				var weigth = Math.floor((Math.random() * 100) ) / 100;

				w[[e,i,j]] = weigth;
				//console.log(w[e,i,j]);

				weigthCount++;

				if(e == 0){
					weigthText.append("Input Neuron("+String(i+1)+") Weigth("+String(j+1)+") = " + String(weigth));	
				}
				else{
					weigthText.append("Layer("+String(e)+") Neuron("+String(i+1)+") Weigth("+String(j+1)+") = " + String(weigth));
				}
				
				weigthText.append("\n");
				//console.log("e:"+String(e)+"i:"+String(i)+"j:"+String(j));
			}

		}	
		weigthText.append("\n");

	}
});

	var outputNeuron = $('#outputdegeri').val();
	$('#neuronCountLabel').text(neuronCount+Number(outputNeuron));
	$('#weightCountLabel').text(weigthCount);

	
}



function inputOutputText() {

	var data = $('#veri').val();

	inputText(data);
	outputText(data);

	var inputcount = Number($('#inputcount').val());
	var outputcount = Number($('#outputdegeri').val());

	var veriler = $('#veri').val().split("\n");


	for (var i = 0; i < veriler.length; i++) {
		
		var datarow = veriler[i].split("  ");

		var inputs = [inputcount];
		var outputs = [outputcount];

		for (var j = 0; j < inputcount; j++) {

			inputs[j] = datarow[j];	
		}

		var z = 0;
		
		for (var k = inputcount; k < (outputcount+inputcount); k++) {

			outputs[z] = datarow[k];	
			z=+1;

		}

		CalculateValuesAndErrors(inputs,outputs);
	}

}

function CalculateValuesAndErrors(input,output){
	console.log(input);
	console.log(output);

	var layer = $('.hiddenlayer');


	//first hidden number
	//second neuron nummber in that neuron
	var hiddenNeuronValues = [[,]];

	//function types
	var functions = $('.optradio');
	var func = [];



	for (var i = 0; i < functions.length; i++) {
		if (functions[i].checked) {
			func.push(i%3);
		}
	}


	if (functions.length / 3 != func.length) {
		alert("Transfer function is missing!");
		return;
	}


	var layerneuron = $(layer[0]).find('>div').find('>center');

	for (var j = 0; j < layerneuron.length; j++) {

		var result = 0;
		for (var i = 0; i < input.length; i++) {

			result += input[i] * w[[0,i,j]];
		}
		
		hiddenNeuronValues[[0,j]] = funcs(func[0],result);
	}


	for (var k = 1; k < layer.length; k++) {

		var layerneuron = $(layer[k]).find('>div').find('>center');
		var layerneuronback = $(layer[k-1]).find('>div').find('>center');
		for (var j = 0; j < layerneuron.length; j++) {

			var result = 0;
			for (var i = 0; i < layerneuronback.length; i++) {

				result += hiddenNeuronValues[[k-1,i]] * w[[k,i,j]];
			}
			hiddenNeuronValues[[k,j]] = funcs(func[k],result);
		}
	}

	var k = layer.length;

	var layerneuron = $(".outputlayer>div>center");
	var layerneuronback = $(layer[k-1]).find('>div').find('>center');
	for (var j = 0; j < layerneuron.length; j++) {

		var result = 0;
		for (var i = 0; i < layerneuronback.length; i++) {

			result += hiddenNeuronValues[[k-1,i]] * w[[k,i,j]];
		}
		hiddenNeuronValues[[k,j]] = funcs(func[k],result);
	}
	

	OutputAndError(hiddenNeuronValues,output);

	//console.log(hiddenNeuronValues);


}

var countofoutput = 1;
function OutputAndError(value,output){

	var resultcount = $("#veri").val().split("\n").length;

	var inputcount = Number($('#inputcount').val());
	var outputcount = Number($('#outputdegeri').val());

	var rowcout = 0;
	if (inputcount > outputcount) rowcout = inputcount;
	else rowcout = outputcount;

	var area3 = $("#area3");
	var area4 = $("#area4");

	var index = $(".hiddenlayer").length;

	for (var j = 0; j < outputcount; j++) {

		area3.append("CALCULATED("+String(countofoutput)+") temp("+String(j+1)+") ="+String(parseFloat(Math.round(value[[index,j]] * 100) / 100).toFixed(2)));
		area3.append("\n");

		area4.append("ERROR("+String(countofoutput)+") temp("+String(j+1)+") ="+String(parseFloat(Math.round(( output[j] - value[[index,j]]) * 100) / 100).toFixed(2)));
		area4.append("\n");
	}
	for (var i = 0; i < resultcount-outputcount-2; i++) {
		area4.append("\n");
		area3.append("\n");
	}
	area3.append("-----------------");
	area3.append("\n");
	area4.append("-----------------");
	area4.append("\n");
	countofoutput ++;
}

function funcs(index,result){
	//tansig
	if (index == 0) { 

		return  2/(1+Math.exp(-2*result))-1;
	}
	//logsig
	else if (index == 1) {

		return 1 / (1 + Math.exp(-1*result));
	}
	else{

		return result;
	}

}

function inputText(data) {

	var girisDegeriText = $('#area1'); 
	var dataLine = data.split('\n');
	var girisCount = $('#inputcount').val();

	for (var i = 0; i < dataLine.length; i++){

		var lineEach = dataLine[i].split('  ');

		for (var j = 0; j < girisCount; j++) {
			girisDegeriText.append('INPUT('+String(j+1)+') temp('+String(i+1)+') = ');
			girisDegeriText.append(lineEach[j]);
			girisDegeriText.append('\n');
		}

		girisDegeriText.append('------------------------');
		girisDegeriText.append('\n');
	}
}

function outputText(data) {

	var girisDegeriText = $('#area2'); 
	var dataLine = data.split('\n');
	var cikisCount = $('#outputdegeri').val();
	var girisCount = $('#inputcount').val();

	for (var i = 0; i < dataLine.length; i++){

		var lineEach = dataLine[i].split('  ');		
		var a=0;

		for (var j = girisCount; j < lineEach.length; j++) {
			a++;
			girisDegeriText.append('OUTPUT('+String(a)+') temp('+String(i+1)+') = ');
			girisDegeriText.append(lineEach[j]);
			girisDegeriText.append('\n');	
		}

		for (var k = 0; k < girisCount-a; k++) {
			girisDegeriText.append('\n');	
		}

		girisDegeriText.append('------------------------');
		girisDegeriText.append('\n');
	}
}