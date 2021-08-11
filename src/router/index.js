import Vue from "vue";
import VueRouter from "vue-router";
import Category from "../views/Category.vue";
import AppInfo from "../views/AppInfo.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "categories",
		component: Category,
	},
	{
		path: "/appPage",
		name: "appPage",
		component: AppInfo,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
