import AboutPage from './about.component.js';
import AppPage from './app.component.js';
import HomePage from './home.component.js';

let routes = [
  {
    path: "/about/",
    component: AboutPage,
    // url: `${this.app.name}/about.html`,
    options: {
      transition: "f7-push",
    },
  },
  {
    path: "/app/",
    component: AppPage,
    // url: `${this.app.name}/app.html`,
    options: {
      transition: "f7-push",
    },
  },
  {
    path: "/",
    component: HomePage,
    // url: "index.html",
    options: {
      transition: "f7-push",
    },
  },
];

export default routes;
