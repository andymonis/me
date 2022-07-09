/**
 *
 */
 export default (props, { $h, $store }) => {
    let profile = $store.state.profile;
  
    /*
    activated: new Date(user.activated).toUTCString(),
    avatar: user.avatar !== "" ? user.avatar : pixel,
    description: user.description,
    email: user.email,
    id: user.id,
    nickname: user.nickname,
    role: user.role,
    */

    const on_profile_update = async(evt) => {
    }

    const on_apps_checkname = async(evt) => {
        console.log("Check Name");

        // set_page_props();
        let id = $$(".app-id input")[0].value
        $store.dispatch("APP_EXISTS", { id: id });
    }

    return () => $h`
        <div class="page">
            <!-- Top Navbar -->
            <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                <div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Back</span></a></div>
                    <div class="title">Profile</div>
                </div>
            </div>
            <div class="page-content">
                <div class="block-title">Core Details</div>
                <div class="list inline-labels no-hairlines-md">
                    <ul>
                        <!-- ID -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">Id</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.id}" placeholder="Your profile ID" disabled required="" validate="" />
                                </div>
                            </div>
                        </li>
                        <!-- Activated -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">Activated</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.activated}" placeholder="Date Activated" disabled required="" validate="" />
                                </div>
                            </div>
                        </li>
                        <!-- Avatar -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">Avatar</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.avatar}" placeholder="Your Avatar" validate="" />
                                </div>
                            </div>
                        </li>
                        <!-- Description -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">About You</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.description}" placeholder="About you" validate="" />
                                </div>
                            </div>
                        </li>
                        <!-- Email -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">Email</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.email}" placeholder="Your email address" validate="" />
                                </div>
                            </div>
                        </li>
                        <!-- Roles -->
                        <li class="item-content item-input item-input-with-info app-id">
                            <div class="item-inner">
                                <div class="item-title item-label">Roles</div>
                                <div class="item-input-wrap">
                                    <input type="text" value="${profile.role}" placeholder="Your profile roles" disabled required="" validate="" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <button @click=${(evt) => on_profile_update} class="col button button-fill">Check</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
  };
  