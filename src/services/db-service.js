import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import config from "../config";

export default function ApiServices() {
    const app = initializeApp(config.firbaseConfig);
    const db = getFirestore(app);
    return {
        async writeUserData(eventName, result, ip, bet, amount) {
            try {
                const docRef = await addDoc(collection(db, "genie-bls"), {
                    event_name: eventName,
                    event_result: result,
                    ip_address: ip,
                    bet: bet,
                    amount: amount,
                    timeStamp: new Date().toISOString()
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async addUserData(ip) {
            try {
                const docRef = await addDoc(collection(db, "genie-bls-users"), {
                    amount: 0,
                    ip_address: ip,
                    timeStamp: new Date().toISOString()
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async updateUsers(id,amount, ip) {
            try {

                const washingtonRef = doc(db, "genie-bls-users", id);

                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, {
                    amount: amount
                });
              
                console.log("Update Success: ", ip);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async checkRecommend(ip){
            var params = { ip: ip }


            return fetch(config.api.url + config.api.genie_recommend + "?" + new URLSearchParams(params), {
                method: 'GET', headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(res => res.json()).catch(err => console.log(err))
        }
    }
}