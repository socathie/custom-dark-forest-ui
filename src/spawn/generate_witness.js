const wc = require("./witness_calculator.js");
//const { readFileSync } = require("fs");

module.exports.generateWitness = async function (input) {
	const response = await fetch('spawn.wasm');
	const buffer = await response.arrayBuffer();
	console.log(buffer);
	let buff;

	await wc(buffer).then(async witnessCalculator => {
		buff = await witnessCalculator.calculateWTNSBin(input, 0);
	});
	return buff;
}