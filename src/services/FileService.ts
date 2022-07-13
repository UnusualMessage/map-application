import File from "../api/File";

class FileService {
	get = async (url: string): Promise<File> => {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
		};
		
		const response = await fetch(url, options);
		return response.json();
	};
}

export default FileService;