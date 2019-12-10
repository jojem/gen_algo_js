"use strict";

let products = [{
	name: "iPhone 6",
	purchases: 3101
},{
	name: "Samsung Galaxy A50",
	purchases: 485
},{
	name: "Huawei Nova 2",
	purchases: 1107
},{
	name: "Samsung Galaxy M20",
	purchases: 251
},{
	name: "iPhone 5",
	purchases: 2433
},{
	name: "Galaxy A5",
	purchases: 1966
},{
	name: "One Plus 6",
	purchases: 1076
},{
	name: "Samsung Galaxy Note 9",
	purchases: 977
},{
	name: "Asus ZenFone Max Pro",
	purchases: 287
},{
	name: "Xiaomi Mi 9",
	purchases: 832
},{
	name: "Lenovo K6 Note",
	purchases: 825
},{
	name: "LG G7",
	purchases: 725
},{
	name: "HTC U11",
	purchases: 625
},{
	name: "One Plus 7",
	purchases: 542
},{
	name: "Pacophone",
	purchases: 1231
},{
	name: "ZTE Axon 10 Pro",
	purchases: 511
},{
	name: "Huawei Honor 9",
	purchases: 3107
},{
	name: "Xiaomi Mi Mix 2S",
	purchases: 498
},{
	name: "Huawei Mate X",
	purchases: 932
},{
	name: "Huawei P20",
	purchases: 453
},{
	name: "Huawei P30",
	purchases: 399
},{
	name: "Huawei P Smart 2019",
	purchases: 174
},{
	name: "Xiaomi Mi 9T",
	purchases: 386
},{
	name: "Meizu",
	purchases: 1125
},{
	name: "iPhone 11 Pro Max",
	purchases: 355
},{
	name: "Xiaomi Mi A2",
	purchases: 3253
},{
	name: "Honor 20",
	purchases: 611
},{
	name: "Xiaomi Redmi 7",
	purchases: 1901
},{
	name: "Vivo V11i",
	purchases: 326
},{
	name: "Sony Xperia XA2 Plus",
	purchases: 213
},{
	name: "iPhone X",
	purchases: 2256
},{
	name: "Samsung Galaxy S10",
	purchases: 969
}];



class Individ {
	constructor(){
		this.genome = [];
		this.phenotip = 0;

	}

	createIndiv(){
		 while (this.genome.length != countOfGenes){
			let index = Math.floor(Math.random() * countOfProducts);
			// console.log('index', index);

			if (!(contains(this.genome, index))){
				this.genome.push([index, products[index].purchases]);
			}
		}
	}

	checkPhenotip(){
		this.phenotip = 0;
		for(let item of this.genome){
			this.phenotip += item[1]; 
		}
		return this.phenotip;
	}
}




function crossengover(a, b){
	let cross = Math.floor(Math.random()*2)+1;
	// console.log('cross', cross);
	let indiv1 = new Individ();
	let indiv2 = new Individ();

	// console.log('indiv1 ', indiv1);
	// console.log('indiv2 ', indiv2);


	for(let i = 0; i < cross; i++){
		if (!(contains(indiv1.genome, a.genome[i][0]))){
			indiv1.genome.push(a.genome[i]);
		}
		// console.log('become ', a.genome[i]);
	}

	for(let i = cross; i < countOfGenes; i++){
		if (!(contains(indiv1.genome, b.genome[i][0]))){
			indiv1.genome.push(b.genome[i]);
		}
		// console.log('become ', b.genome[i]);
	}
	indiv1.createIndiv();
	indiv1.checkPhenotip();
	// console.log('NEW INDIV 1 ', indiv1);
	childs.push(indiv1);



	for(let i = 0; i < cross; i++){
		if (!(contains(indiv2.genome, b.genome[i][0]))){
			indiv2.genome.push(b.genome[i]);
		}
		// console.log('become ', b.genome[i]);
	}

	for(let i = cross; i < countOfGenes; i++){
		if (!(contains(indiv2.genome, a.genome[i][0]))){
			indiv2.genome.push(a.genome[i]);
		}
		// console.log('become ', a.genome[i]);
	}
	indiv2.createIndiv();
	indiv2.checkPhenotip();
	// console.log('NEW INDIV 2 ', indiv2);
	childs.push(indiv2);
}





function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == elem) {
            return true;
        }
    }
    return false;
}



function sortByPhenotip(arr){
	arr.sort((a, b) => a.phenotip > b.phenotip ? -1 : 1);
}

function sortGenomByIndex(arr){
	for(let indiv of arr){
		indiv.genome.sort((a, b) => a[0] > b[0] ? 1 : -1);
	}
}



let countOfProducts = products.length;
let countOfGenes = 3;
let countOfGeneration = 10;
let iterations = 5;
let generation = Array.from(Array(countOfGeneration), () => new Individ());

for(let i = 0; i < countOfGeneration; i++){
	generation[i].createIndiv();
	generation[i].checkPhenotip();
}

sortGenomByIndex(generation);
sortByPhenotip(generation);
console.log(generation);

let childs = [];

for(let iter = 0; iter < iterations; iter++){
	for(let i = 0; i < countOfGeneration-1; i++){
		console.log('\na = ', generation[i], '\nb = ', generation[i+1]);

		crossengover(generation[i], generation[i+1]);
	}
	crossengover(generation[countOfGeneration-1], generation[0]);

	sortGenomByIndex(childs);
	sortByPhenotip(childs);

	console.log(childs);


	for(let i = 0; i < countOfGeneration; i++){
		generation[i] = childs[i];
	}
	console.log(generation);
	childs = [];
}

for(let i = 0; i < countOfGenes; i++){
	console.log(products[generation[0].genome[i][0]].name);
}

document.write('<div class = "elem"><div> ' + products[generation[0].genome[0][0]].name + '</div><div> '  + products[generation[0].genome[0][0]].purchases+ '</div></div>');
document.write('<div class = "elem"><div> ' + products[generation[0].genome[1][0]].name + '</div><div> '  + products[generation[0].genome[1][0]].purchases+ '</div></div>');
document.write('<div class = "elem"><div> ' + products[generation[0].genome[2][0]].name + '</div><div> '  + products[generation[0].genome[2][0]].purchases+ '</div></div>');



