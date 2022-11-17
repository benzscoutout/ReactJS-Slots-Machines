const test = {
    ga: "",
    ga_4: "G-P4R31P5B1T",

    firbaseConfig: {
        authDomain: "monday-club-48189.firebaseapp.com",
        projectId: "monday-club-48189",
        storageBucket: "monday-club-48189.appspot.com",
        appId: "1:59628633346:web:2a0c2fa4d80ca1ed87961b",
        measurementId: "G-DM31RQF8RH"
    },
    api:{
        x_api_key: "SEBGO59guINkCWHjIbfF6eydjuMMo6IljUpTTEmnetU",
        url: "https://asia-southeast1-monday-club-48189.cloudfunctions.net",
        genie_recommend: "/genie-recommend"
    }
 

};


const prod = {
    ga: "",
    ga_4: "G-P4R31P5B1T",
    firbaseConfig: {
        authDomain: "monday-club-48189.firebaseapp.com",
        projectId: "monday-club-48189",
        storageBucket: "monday-club-48189.appspot.com",
        appId: "1:59628633346:web:2a0c2fa4d80ca1ed87961b",
        measurementId: "G-DM31RQF8RH"
    },
    api:{
        x_api_key: "SEBGO59guINkCWHjIbfF6eydjuMMo6IljUpTTEmnetU",
        url: "https://asia-southeast1-monday-club-48189.cloudfunctions.net",
        genie_recommend: "/genie-recommend"
    }
};

const config = process.env.REACT_APP_ENVIRONMENT === 'production'
    ? prod
    : test;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};