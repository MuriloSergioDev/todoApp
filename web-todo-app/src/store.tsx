import { createStore } from 'redux';
import rootReducer from './reducers/root.reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
    rootReducer,
    composeEnhancers()
);



export default store;