const matches = (filter: string, ...values: string[]): boolean => {
	const regExp = /['"\s]+/g;

	filter = filter.toLowerCase().replace(regExp, "");

	let matches = false;
	for (let value of values) {
		value = value.toLowerCase().replace(regExp,  "");
		if (value.includes(filter)) {
			matches = true;
			return matches;
		}
	}

	return matches;
};

export default matches;