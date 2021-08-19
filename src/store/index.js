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
		async getExploreFeed(state) {
			state.loading = true;
			state.exploreFeed = await createRequest("explore-feed");
			console.log(state.exploreFeed);
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
				console.log(state.selectedCategory);
			}
			if (router.currentRoute.fullPath !== "/category") {
				router.push("/category");
			}
		},
		async selectApp(state, payload) {
			console.log(payload);
			state.loading = true;
			state.selectedApp = await createRequest(
				"get-app",
				toQueryString({ appID: payload })
			);
			console.log(state.selectedApp);
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
			console.log(state.searchResults);
			state.loading = false;
			if (router.currentRoute.fullPath !== "/searchPage") {
				router.push("/searchPage");
			}
		},
		toggleDownloadWidget(state) {
			state.showDownloadWidget = !state.showDownloadWidget;
		},
		addToDownloads(state, payload) {
			state.downloads.push(payload);
		},
		updateDownload(state, payload) {
			const index = state.downloads.findIndex((d) => d.id === payload.id);
			state.downloads[index].fileSize = payload.fileSize;
			state.downloads[index].percent = payload.percent;
			state.downloads[index].state = payload.state;
		},
		updateDownloadState(state, payload) {
			const index = state.downloads.findIndex((d) => d.id === payload.id);
			state.downloads[index].state = payload.state;
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
