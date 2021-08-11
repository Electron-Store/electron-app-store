export async function createRequest(route = "", data = "") {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	const response = await fetch(
		`https://electron-app-store.herokuapp.com/${route}?${data}`,
		requestOptions
	);
	const responseData = await response.json();
	return responseData;
}

export function toQueryString(obj) {
	let str = [];
	for (var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
}
