import Vue from "vue";
import VueRouter from "vue-router";
import ExplorePage from "../views/ExplorePage.vue";
import Category from "../views/Category.vue";
import AppInfo from "../views/AppInfo.vue";
import SearchResults from "../views/SearchResults.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "explore",
		component: ExplorePage,
	},
	{
		path: "/category",
		name: "category",
		component: Category,
	},
	{
		path: "/appPage",
		name: "appPage",
		component: AppInfo,
	},
	{
		path: "/searchPage",
		name: "searchPage",
		component: SearchResults,
	},
	{
		path: "/settingsPage",
		name: "settingsPage",
		component: Settings,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
