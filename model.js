// import { createStore } from 'framework7';
var $$ = Dom7;

import Events from "./events.js";
import V3Store from "/vee3/vee_store.js";

class Model {
    get_store(api) {
        let _store = Framework7.createStore({
            state: {
                profile: {
                    id: "",
                    nickname: "",
                    role: "",
                    description: "",
                    avatar: ""
                },
                // Page App model
                app: {
                    id: undefined,
                    git_url: undefined,
                    secure: false,
                    description: undefined
                },
                apps: [],
                groups: [],
                logs: [],
                last_msg: "",
            },
            getters: {
                profile({ state }) {
                    return state.profile;
                },
                app({ state }) {
                    return state.app;
                },
                apps({ state }) {
                    return state.apps;
                },
                groups({ state }) {
                    return state.groups;
                },
                errors({ state }) {
                    return state.errors;
                },
                logs({ state }) {
                    return state.logs;
                },
            },
            actions: {
                // Page App Setter
                async SET_APP({ state }, app) {
                    state.app.id = app ? app.id : "";
                    state.app.git_url = app ? app.git_url : "";
                    state.app.secure = app ? app.secure : false;
                    state.app.description = app ? app.description : "";
                },
                // handler receives custom data in second argument
                async get_profile({ state }) {
                    let user = await api.$post("/services/user/profile/get", {});
                    // Create a transparent pixel
                    let pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                    // Update the profile
                    state.profile = {
                        id: user.id,
                        nickname: user.nickname,
                        role: user.role,
                        description: user.description,
                        avatar: user.avatar !== "" ? user.avatar : pixel
                    };
                },

                async get_apps({ state }) {
                    let res = await api.$post("/services/apps/list/my", {});
                    state.apps = res.apps;
                },

                async get_groups({ state }) {
                    let res = await api.$post("/services/groups/get/my", {});
                    state.groups = res.groups;
                },

                async signout({ state }, app_details) {
                    // Delete the auth token. Do I need to await this? maybe just do it anyway 
                    let res = api.$post("/secure/deauthorize", {});

                    // Redirect to default page
                    window.location.assign(`${window.location.origin}/app/default`);
                },

                async update_app({ state }, app_details) {
                    // Update the App details
                    await api.$post("/services/apps/update", app_details);
                    // Refresh Apps List
                    _store.dispatch("get_apps", {})
                },

                async create_app({ state }, app_details) {
                    // Update the App details
                    let result = await api.$post("/services/apps/create", app_details);
                    // Dispatch the result
                    console.log("create_app")
                },

                async deploy_app({ state }, app_details) {
                    // Update the App details
                    let result = await api.$post("/services/apps/deploy", app_details);
                    // Refresh Apps List
                    _store.dispatch("get_apps", {})
                },
                async logs({state}, app_details){
                    // let data1 = await V3Store.$shared_get('notes1');
                    let logs = await V3Store.$private_query(`app_${app_details.id}`);

                    state.logs = logs.obj;
                },

                async APP_EXISTS({ state }, data) {
                    // Update the App details
                    let result = await api.$post("/services/apps/exists", { id: data.id });

                    // Raise event
                    Events.fire("APP_EXISTS", result)
                },
            },
        });

        return _store;
    }
}

export default new Model();