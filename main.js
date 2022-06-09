var $$ = Dom7;

import Model from "./model.js";

import Routes from "./routes.js";
import V3Store from "/vee3/vee_store.js";

/**
 * Framework7 Demonstration
 */
export default class Main {
    constructor(config) {
        V3Store.instanceId(config.app.instancedid);
        // The App, the one you are running
        this.app = config.app;
        // Store reference to the Api
        this.api = config.api;
        var Api = config.api;
        // Framework7 stuff
        this.app.f7 = new Framework7({
            // App root element
            el: "#app",
            // App Name
            name: "Me",
            // App id
            id: "com.myapp.test",
            // Enable swipe panel
            panel: {
                swipe: true,
            },
            // Add default routes
            routes: Routes,

            store: Model.get_store(this.api),
        });

        // Event handler for when data goes stale
        this.app.f7.on("stale", () => {
            this.app.f7.store.dispatch('get_apps')
        });

        var mainView = this.app.f7.views.create(".view-main");
    }

    /**
     * Main start point for the app
     * @param {*} params
     */
    async init(params) {
        // Navigate to Home
        this.app.f7.views.main.router.navigate('/')

        this.app.f7.store.dispatch('get_profile')

        this.app.f7.store.dispatch('get_apps')

        this.app.f7.store.dispatch('get_groups')

    }
}