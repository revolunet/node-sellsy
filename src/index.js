import OAuth from "oauth";

import Customers from "./Customers";
import Documents from "./Documents";

const DEFAULT_ENDPOINT = "https://apifeed.sellsy.com/0";

const api = {
    url: "/",
    requestTokenUrl: "/request_token",
    accessTokenUrl: "/access_token",
};

function Sellsy({ creds = {}, endPoint = DEFAULT_ENDPOINT } = {}) {
    this.creds = creds;
    this.endPoint = endPoint;
    this.customers = new Customers(this);
    this.documents = new Documents(this);
}

Sellsy.prototype.api = function ({
    method = "Infos.getInfos",
    params = {},
} = {}) {
    const getOauth = () => {
        return new OAuth.OAuth(
            this.endPoint + api.requestTokenUrl,
            this.endPoint + api.accessTokenUrl,
            this.creds.consumerKey,
            this.creds.consumerSecret,
            "1.0",
            null,
            "PLAINTEXT"
        );
    };

    return new Promise((resolve, reject) => {
        const postData = {
            request: 1,
            io_mode: "json",
            do_in: JSON.stringify({
                method: method,
                params: params,
            }),
        };

        getOauth().post(
            this.endPoint + api.url,
            this.creds.userToken,
            this.creds.userSecret,
            postData,
            function (e, data) {
                // res
                try {
                    if (e) {
                        return reject(e);
                    }
                    if (data.error) {
                        return reject(data.error);
                    }
                    resolve(JSON.parse(data));
                } catch (err) {
                    reject(err);
                }
            }
        );
    });
};

export default Sellsy;
