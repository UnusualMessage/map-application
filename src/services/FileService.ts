class FileService {
	get = async (url : string) => {
		const response = await fetch(url);
		return response.text();
	};
}

export default FileService;