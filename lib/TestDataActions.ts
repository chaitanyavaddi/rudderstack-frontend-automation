import * as CryptoJS from 'crypto-js';
import { testConfig } from '../testConfig';


export class TestDataActions {

    async decryptPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        // const cipher = CryptoJS.AES.encrypt('Demouat@09',key);
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(testConfig.password, key).toString(CryptoJS.enc.Utf8);
    }

}