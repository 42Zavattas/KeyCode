import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import GameStore from './stores/GameStore';

import fetchrPlugin from 'fluxible-plugin-fetchr';

const app = new Fluxible({ component: Application });

app.plug(fetchrPlugin({
  xhrPath: '/api'
}));

app.registerStore(RouteStore);
app.registerStore(GameStore);
app.registerStore(ApplicationStore);

export default app;
