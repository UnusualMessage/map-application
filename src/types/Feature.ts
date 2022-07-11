export type Feature = {
	type: "Feature",
	properties: {[index: string] : string},
	
	geometry: {
		type: "Point",
		coordinates: number[]
	}
}