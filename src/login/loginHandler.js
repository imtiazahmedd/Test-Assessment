import { firebase } from "../firebaseConfig";

const login = (payload) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((res) => {
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                });
        })
};
export default login