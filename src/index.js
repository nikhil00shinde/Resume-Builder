import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./redux/reducer/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import firebaseConfig from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const reduxStore = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebase)
	)
);
// jaise ki thunk me, hum jab return karte hain function usme humhe dispatch milta hain,
// usi tarah humhe chahiye firebase and firestore ka access esliye hum use kare hain redux-firestore and react-redux-firebase

ReactDOM.render(
	<BrowserRouter>
		<Provider store={reduxStore}>
			<ReactReduxFirebaseProvider
				firebase={firebase}
				config={firebaseConfig}
				dispatch={reduxStore.dispatch}
				createFirestoreInstance={createFirestoreInstance}
			>
				<App />
			</ReactReduxFirebaseProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
