import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import educationReducer from "./educationReducer";
import documentReducer from "./documentReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
	contact: contactReducer,
	education: educationReducer,
	document: documentReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	auth: authReducer,
});

export default rootReducer;
