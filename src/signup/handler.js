import { firebase } from "../firebaseConfig";

const register = (payload) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((res) => {
            const userRef = firebase.database().ref("users");
            userRef.push({
                email: payload.email.toLowerCase(),
                first_name: payload.first_name,
                last_name: payload.last_name
            })
                .then(() => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);
                });
        }
        ).catch((error) => {
            reject(error)
        })
    }
    )
};
export default register