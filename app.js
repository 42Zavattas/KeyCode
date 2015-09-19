import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';

const app = new Fluxible({ component: Application });

app.registerStore(RouteStore);
app.registerStore(ApplicationStore);

module.exports = app;
