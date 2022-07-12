import {Strategy} from "../../types/Strategy";

export default class Parser {
	file: string;
	strategy: Strategy;
	
	constructor(file: string, strategy: Strategy) {
		this.file = file;
		this.strategy = strategy;
	}
	
	parse = () => {
		return this.strategy(this.file);
	};
}