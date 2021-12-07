var $$ = Dom7;

import Events from "./events.js";

let initialised = false;

/**
 *
 */
export default (props, { $h, $f7, $store, $on, $f7router }) => {
    let app = $store.getters.app || {};

    // Register Events handlers ONLY ONCE
    if (!initialised) {
        console.log("Init")

        Events.on("APP_EXISTS", (data) => {
            // Toast if app exists, will not allow creation of duplicate
            if (data.exists) {
                $f7.toast.create({
                    text: `AppId '${data.app_id}' is currently used, please select another id`,
                    closeTimeout: 2000,
                    position: 'top',
                }).open()
            } else {
                $f7.toast.create({
                    text: `AppId '${data.app_id}' is ok.`,
                    closeTimeout: 2000,
                    position: 'top',
                }).open()
            }
        })

        initialised = true;
    }
    // Defaults to blank (for creating a new app)
    let value = app.value || {};



    $on('pageBeforeIn', (e, page) => {
        let el = $$(".app-setting-secure");
        if (value.secure === true) {
            $$(".app-setting-secure select option[value=true]")[0].setAttribute("selected", "")
        } else if (value.secure === false) {
            $$(".app-setting-secure select option[value=false]")[0].setAttribute("selected", "")
        }

    });

    const on_apps_update = (evt) => {

        let action = "create_app"
        if (value.id) {
            action = "update_app"
        }
        console.log(`on_apps_updated: ${action}`)

        // Get the form input values
        let id = $$(".app-id input");
        let name = $$(".app-id input");
        // let name = $$(".app-setting-name input");
        let git_url = $$(".app-setting-git_url input");
        let secure = $$(".app-setting-secure select");
        let description = $$(".app-setting-description input");
        // Create new object and apply values
        let _app = Object.assign({}, value, {
            id: id[0].value,
            name: name[0].value,
            git_url: git_url[0].value,
            secure: secure[0].value,
            description: description[0].value
        });
        // Dispatch change to server
        $store.dispatch(action, _app);

        // $f7router.back()
    }

    const on_apps_deploy = (evt) => {
        console.log("deploy");

        $store.dispatch("deploy_app", app.value);
    }

    const on_apps_checkname = async(evt) => {
        console.log("Check Name");

        // set_page_props();
        let id = $$(".app-id input")[0].value
        $store.dispatch("APP_EXISTS", { id: id });
    }

    return () => $h `
    <div class="page" name="app">
        <!-- Top Navbar -->
        <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
            <div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Back</span></a></div>
                <div class="title">${value.name}</div>
            </div>
        </div>
        <div class="page-content app-settings">
            <div class="block-title">App Settings</div>
            <div class="list inline-labels no-hairlines-md">
                <ul>
                    <!-- ID -->
                    <li class="item-content item-input item-input-with-info app-id">
                        <div class="item-inner">
                            <div class="item-title item-label">Id</div>
                            <div class="item-input-wrap">
                                <input type="text" value="${value.id}" placeholder="App Name" required="" validate="" />
                                <span class="input-clear-button"></span>
                                <div class="item-input-info">Required App Id</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="row">
                            <button @click=${(evt) => on_apps_checkname(evt)} class="col button button-fill">Check</button>
                        </div>
                    </li>
                    <!-- Url -->
                    <li class="item-content item-input item-input-with-info app-setting-git_url">
                        <div class="item-inner">
                            <div class="item-title item-label">Url</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${value.git_url}" placeholder="App Git Url" required="" validate="" />
                                    <span class="input-clear-button"></span>
                                <div class="item-input-info">Required App Git-Url</div>
                            </div>
                        </div>
                    </li>
                    <!-- Secure -->
                    <li class="item-content item-input item-input-with-value app-setting-secure">
                        <div class="item-inner">
                            <div class="item-title item-label">Secure</div>
                                <div class="item-input-wrap input-dropdown-wrap">
                                <select placeholder="Please choose..." class="input-with-value">
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <!-- description -->
                    <li class="item-content item-input item-input-with-info app-setting-description">
                        <div class="item-inner">
                            <div class="item-title item-label">Description</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${value.description}" placeholder="Description" required="" validate="" />
                                    <span class="input-clear-button"></span>
                                <div class="item-input-info">Optional App Description</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- Action buttons -->
                <div class="block block-strong">
                    <div class="row">
                        <!--<button @click=${(evt) => on_apps_checkname(evt)} class="col button button-fill">Check</button>-->
                        <button @click=${(evt) => on_apps_update(evt)} class="col button button-fill">Save</button>
                        <button @click=${(evt) => on_apps_deploy(evt)} class="col button button-fill">Deploy</button>
                    </div>
                </div>
                <!-- Check Availability -->
                <!--<div class="item-inner">
                    <button @click=${(evt) => on_apps_checkname(evt)} class="button color-green button-large button-round button-fill">Check Available</button>
                </div>-->
                <!-- Save -->
                <!--<div class="item-inner">
                    <button @click=${(evt) => on_apps_update(evt)} class="button button-large button-round button-fill">Save</button>
                </div>-->
                <!--<div class="item-inner">
                    <button @click=${(evt) => on_apps_deploy(evt)} class="button color-red button-large button-round button-fill">Deploy</button>
                </div>-->
            </div>
        </div>
    </div>
`;
};