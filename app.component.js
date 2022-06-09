var $$ = Dom7;

import Events from "./events.js";

let initialised = false;

/**
 *
 */
export default (props, { $h, $f7, $store, $on, $f7router }) => {

    let app = $store.getters.app || {};
    let logs = $store.getters.logs || [];
    let latest = {timestamp:0,cloned:null,built:null,deployed:null,cleaned:null};
    logs.onUpdated((arr)=>{
        arr.forEach((c,i,a)=>{
            if(c.timestamp>latest.timestamp){
                latest.timestamp = c.timestamp;
                latest.when = new Date(c.timestamp).getFullYear() + "-" + (new Date(c.timestamp).getMonth() + 1) + "/" + new Date(c.timestamp).getDate() + " " + new Date(c.timestamp).getHours() + ":" + new Date(c.timestamp).getMinutes() + ":" + new Date(c.timestamp).getSeconds();
                latest.cloned = c.cloned;
                latest.built = c.built;
                latest.deployed = c.deployed;
                latest.cleaned = c.cleaned;
            }
        })
    });

    const get_logs = () => {
        // Check if the page is displayed (otherwise stop i.e. don't set next timeout)
        let el = $$("#app-viewer");
        if(el.length > 0){
            // Dispatch Event to get logs
            $store.dispatch("logs", app.value);
            // Set timer again 
            setTimeout(get_logs, 5000);
        }
    }

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

    $on('pageAfterIn', (e, page) => { 
        // Get the latest logs  
        get_logs();
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

    const on_apps_deploy_status = async(evt) => {
        $store.dispatch("logs", app.value);
    }

    return () => $h `
    <div id="app-viewer" class="page" name="app">
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
                <div>
                    <!-- <button @click=${(evt) => on_apps_deploy_status(evt)} class="button color-red button-large button-round button-fill">refresh</button> -->
                    <div class="block block-strong" style="display:flex;justify-content: space-around;">
                        <div style="display:flex;flex-direction:column;border: 1px solid #007aff;border-radius: 10px;padding: 5px;margin: 5px;"><span>time</span><span class="">${latest.when}</span></div>
                        <div class="${JSON.stringify(latest.cloned)}" style="display:flex;flex-direction:column;border: 1px solid #007aff;border-radius: 10px;padding: 5px;margin: 5px;"><span>clone</span><span>${JSON.stringify(latest.cloned)}</span></div>
                        <div class="${JSON.stringify(latest.built)}" style="display:flex;flex-direction:column;border: 1px solid #007aff;border-radius: 10px;padding: 5px;margin: 5px;"><span>built</span><span>${JSON.stringify(latest.built)}</span></div>
                        <div class="${JSON.stringify(latest.deployed)}" style="display:flex;flex-direction:column;border: 1px solid #007aff;border-radius: 10px;padding: 5px;margin: 5px;"><span>deploy</span><span>${JSON.stringify(latest.deployed)}</span></div>
                        <div class="${JSON.stringify(latest.cleaned)}" style="display:flex;flex-direction:column;border: 1px solid #007aff;border-radius: 10px;padding: 5px;margin: 5px;"><span>ready</span><span>${JSON.stringify(latest.cleaned)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
};