export interface Feature {
	type: "Feature",
	properties: Record<string, string>,
	
	geometry: {
		type: "Point",
		coordinates: number[]
	}
}