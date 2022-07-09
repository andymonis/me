import AboutPage from './about.component.js';
import AppPage from './app.component.js';
import HomePage from './home.component.js';
import ProfilePage from './profile.component.js';

let routes = [
  {
    path: "/about/",
    component: AboutPage,
    options: {
      transition: "f7-push",
    },
  },
  {
    path: "/app/",
    component: AppPage,
    options: {
      transition: "f7-push",
    },
  },
  {
    path: "/profile/",
    component: ProfilePage,
    options: {
      transition: "f7-push",
    },
  },
  {
    path: "/",
    component: HomePage,
    options: {
      transition: "f7-push",
    },
  },
];

export default routes;
