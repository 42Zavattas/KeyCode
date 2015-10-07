'use strict';

import Fluxible from 'fluxible';

import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import GameStore from './stores/GameStore';
import AuthStore from './stores/AuthStore';

import CookiePlugin from './plugins/CookiePlugin';
import ApiPlugin from './plugins/ApiPlugin';

const app = new Fluxible({ component: Application });

app.plug(ApiPlugin);
app.plug(CookiePlugin);

app.registerStore(RouteStore);
app.registerStore(GameStore);
app.registerStore(AuthStore);
app.registerStore(ApplicationStore);

export default app;
