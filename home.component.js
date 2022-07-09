/**
 *
 */
export default (props, { $h, $store, $f7router }) => {

    let profile = $store.getters.profile;
    let apps = $store.getters.apps || [];
    let groups = $store.getters.groups || [];

    const on_apps_select = (evt, data) => {
        // Set the selected app to be the one just clicked
        // $store.state.app = data;
        $store.dispatch("SET_APP", data);
        // Navigate to the App viewer
        $f7router.navigate('/app/', { transition: 'f7-push' })
    }

    const on_profile_update = (evt, data) => {
        // Navigate to the App viewer
        $f7router.navigate('/profile/', { transition: 'f7-push' })
    }

    const on_apps_new = (evt) => {
        // Set the selected app to be the one just clicked
        $store.state.app = {};
        // Navigate to the App viewer
        $f7router.navigate('/app/', { transition: 'f7-push' })
    }

    const on_signout = (evt) => {
        console.log("Signing out");
        // Navigate to the App viewer
        $store.dispatch('signout', {})
    }

    // /secure/deauthorize

    return () => $h `
    <div class="page">
        <!-- Top Navbar -->
        <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
                <div class="title">Me</div>
            </div>
        </div>

        <!-- Bottom Toolbar -->
        <div class="toolbar toolbar-bottom">
            <div class="toolbar-inner">
            <!-- Toolbar links -->
            <a href="/about/" class="btn_get_profile link"></a>
            <a href="#" @click=${(evt) => on_signout(evt)} class="link">Sign out</a>
            </div>
        </div>

        <!-- Scrollable page content -->
        <div class="page-content">
            <!--
            Profile Top
            -->
            <div class="profile list media-list">
                <ul>
                    <li class="item-content">
                        <div class="item-media">
                            <img src="${profile.value.avatar}" style="width: 40px; height: 40px; border-radius: 50%;" />
                        </div>
                        <div class="item-inner">
                            <div class="item-title-row">
                                <div class="item-title">${profile.value.nickname}</div>
                            </div>
                            <div class="item-subtitle">${profile.value.role}</div>
                            <div class="item-text">${profile.value.description}</div>
                        </div>
                        <div>
                            <a @click=${(evt) => on_profile_update(evt)} class="button">update</a>
                        </div>
                    </li>
                </ul>
            </div> 

            <!-- APPS -->
            <div class="card">
                <div class="card-header">
                    <span>Apps:</span>
                    <a @click=${(evt) => on_apps_select(evt)} class="button">new</a>
                </div>
                <div class="card-content">
                    <div class="list media-list no-safe-areas">
                        <ul>
                            ${apps.value.map((el,index,arr) => $h`
                            <li @click=${(evt) => on_apps_select(evt,el)} class="item-content">
                                <div class="item-media">
                                    <img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44" />
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">${el.name}</div>
                                    </div>
                                    <div class="item-subtitle">${el.description}</div>
                                </div>
                            </li>
                            `)}   
                        </ul>
                    </div>
                </div>
                <div class="card-footer"> <span></span><span></span></div>
            </div>

            <!-- GROUPS -->
            <div class="card" style="display:none;">
                <div class="card-header">Groups:</div>
                <div class="card-content">
                    <div class="list media-list no-safe-areas">
                        <ul>
                            ${groups.value.map((el,index,arr) => $h`
                            <li class="item-content">
                                <div class="item-media">
                                    <img src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44" />
                                </div>
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">${el.name}</div>
                                    </div>
                                    <div class="item-subtitle">${el.description}</div>
                                </div>
                            </li>
                            `)}   
                        </ul>
                    </div>
                </div>
                <div class="card-footer"> <span></span><span></span></div>
            </div>
        </div>
    </div>
`;
};