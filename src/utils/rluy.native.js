import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  fork,
  take,
  select,
  call,
  all,
  put,
  race,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

class Rluy {
  constructor() {
    this.isDebug = false;
    this.routingComponent = {};
    this.sagaMiddleware = {};
    this.appReducers = {};
    this.actionStategy = [];
    this.effects = {};
    this.JsxElement = {};
    this.errorFn = void 666;
    this._store = null;
  }
  onError(fn) {
    this.errorFn = fn;
  }
  *rootWatcher() {
    while (1) {
      const {type, ...others} = yield take(this.actionStategy);
      if (this.isDebug) {
        console.info(`[saga-action-types]:  '${type}' `, 'payload:', others);
      }
      const fn = this.effects[type];
      if (fn !== void 666) {
        try {
          const wholeState = yield select(state => state);
          yield call(
            fn,
            {
              state: wholeState,
              fork,
              take,
              select,
              call,
              put,
              race,
              takeEvery,
              takeLatest,
            },
            others
          );
        } catch (e) {
          this.errorFn(e);
        }
      }
    }
  }
  *rootSaga() {
    yield all([fork(this.rootWatcher.bind(this))]);
  }

  addController(controller) {
    const name = controller.name;
    console.log(controller.name);
    if (name === void 666) {
      throw new SyntaxError(`controller needs a \`unique\` name`);
    }
    if (this.appReducers[name]) {
      throw new SyntaxError(`controller for name '${name}' exist`);
    }

    Object.keys(controller.effects).forEach(key => {
      this.actionStategy.push(key);
      this.effects[key] = controller.effects[key];
    });

    const controllerState = controller.state || {};
    const reducer = (state = controllerState, {type, payload}) => {
      const func = controller.reducers[type];
      if (func) {
        return func(state, {type, payload});
      }
      return state;
    };

    this.appReducers[name] = reducer;
  }

  init() {
    this.sagaMiddleware = createSagaMiddleware(this.rootSaga);
  }

  run(isDebug) {
    if (isDebug === true) this.isDebug = true;
    this.init();
    const store = createStore(
      combineReducers(this.appReducers),
      applyMiddleware(this.sagaMiddleware)
    );
    this._store = store;
    this.sagaMiddleware.run(this.rootSaga.bind(this));
    return this._store;
  }
}

const RluyInstance = new Rluy();
export default RluyInstance;
