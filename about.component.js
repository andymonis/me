/**
 *
 */
export default (props, { $h, $store }) => {
  let list = ["item 1", "item 2"];
  let apps = $store.state.apps;

  return () => $h`
    <div class="page">
        <!-- Top Navbar -->
        <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
            <div class="left"><a href="#" class="link back"><i class="icon icon-back"></i><span class="if-not-md">Back</span></a></div>
                <div class="title">Me - About</div>
            </div>
        </div>
        <div class="page-content">
            <p>${apps.length}</p>
            <ul>
                ${list.map((item) => $h`<li>${item}</li>`)}
            </ul>
        </div>
    </div>
`;
};
