import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { createRequest, toQueryString } from "../utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		exploreFeed: [
			{
				title: "Featured",
				apps: [],
			},
		],
		selectedCategory: {
			name: "Explore",
			apps: [],
		},
		selectedApp: null,
		searchResults: null,
		cache: new Map(),
		loading: false,
		showDownloadWidget: false,
		downloads: [],
		settings: {
			darkMode: false,
			saveFolder: "Default Downloads Folder",
		},
	},
	mutations: {
		setLoadingState(state, payload) {
			state.loading = payload;
		},
		async getExploreFeed(state) {
			state.loading = true;
			state.exploreFeed = await createRequest("explore-feed");
			state.loading = false;
		},
		async selectCategory(state, payload) {
			if (state.cache.has(payload)) {
				state.selectedCategory = state.cache.get(payload);
			} else {
				state.loading = true;
				state.selectedCategory = await createRequest(
					"get-category",
					toQueryString({
						category: payload,
					})
				);
				state.loading = false;
				state.cache.set(state.selectedCategory.name, state.selectedCategory);
			}
			if (router.currentRoute.fullPath !== "/category") {
				router.push("/category");
			}
		},
		async selectApp(state, payload) {
			state.loading = true;
			state.selectedApp = await createRequest(
				"get-app",
				toQueryString({ appID: payload })
			);
			router.push("/appPage");
			state.loading = false;
		},
		async searchApp(state, payload) {
			state.loading = true;
			state.searchResults = await createRequest(
				"search-app",
				toQueryString({
					query: payload,
				})
			);
			state.loading = false;
			if (router.currentRoute.fullPath !== "/searchPage") {
				router.push("/searchPage");
			}
		},
		toggleDownloadWidget(state, payload) {
			if (payload == "Open") {
				state.showDownloadWidget = true;
			} else if (payload == "Close") {
				state.showDownloadWidget = false;
			} else {
				state.showDownloadWidget = !state.showDownloadWidget;
			}
		},
		restoreDownloadsData(state, payload) {
			state.downloads = payload;
		},
		addToDownloads(state, payload) {
			state.downloads.unshift(payload);
		},
		updateDownload(state, payload) {
			const index = state.downloads.findIndex((d) => d.id === payload.id);
			const targetDownload = state.downloads[index];
			const updatedDownload = Object.assign(targetDownload, payload);
			state.downloads[index] = updatedDownload;
			if (updatedDownload.state != "Downloading") {
				saveData(state.downloads);
			}
		},
		updateDownloadState(state, payload) {
			const index = state.downloads.findIndex((d) => d.id === payload.id);
			state.downloads[index].state = payload.state;
		},
		removeDownload(state, payload) {
			const index = state.downloads.findIndex((d) => d.id === payload);
			state.downloads.splice(index, 1);
			saveData(state.downloads);
		},
		setSettings(state, payload) {
			state.settings = payload;
		},
		updateSetting(state, payload) {
			state.settings[`${payload[0]}`] = payload[1];
		},
	},
	actions: {},
	modules: {},
});

function saveData(downloads) {
	localStorage.setItem("downloads", JSON.stringify(downloads));
}
