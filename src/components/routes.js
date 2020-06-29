import Todoslist from './Todoslist';
import TimeOver from './TimeOver';
import Registration from './Registration';
import Description from './Description';
import Enter from './Enter';
import Self from './Self';
import Product from './Product';
import NotFound from './NotFound';
import NewRegistration from './NewRegistration';
import Congrats from './Congrats';
import Profile from './Profile';
import { getRandom, getRaiting } from './fetchData';


const routes = [
  {
    path: ["/", "/hi", "/ho", "/telegram"],
    exact: true,
    component: Registration
  },
  {
    path: '/appear',
    exact: true,
    component: Todoslist,
  },
  {
    path: '/contacts',
    exact: true,
    component: Description
  },
  {
    path: '/smash',
    exact: true,
    component: Self,
    fetchInitialData: () => getRandom()
  },
  {
    path: '/salamba',
    exact: true,
    component: TimeOver
  },
  {
    path: '/enter',
    exact: true,
    component: Enter
  },
  {
    path: '/registration',
    exact: true,
    component: NewRegistration
  },
  {
    path: ['/profile', '/change'],
    exact: true,
    component: Profile,
    fetchInitialData: () => getRaiting()
  },
  {
    component: NotFound
  }
]


export default routes;
