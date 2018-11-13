import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

//Custom Reducers

const firebaseConfig = {
	apiKey: "AIzaSyB-15qf3xPawnwk73n5LjKHJYILe8YcFA8",
  authDomain: "react-client-panel-a69ee.firebaseapp.com",
  databaseURL: "https://react-client-panel-a69ee.firebaseio.com",
  projectId: "react-client-panel-a69ee",
  storageBucket: "react-client-panel-a69ee.appspot.com",
  messagingSenderId: "862371337642"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  //only needed when using firestore
  useFirestoreForProfile: true
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);

//Initialize firestore
//const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, compose(
	reactReduxFirebase(firebase),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

