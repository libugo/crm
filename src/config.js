import {useQuasar} from "quasar";

const $q = useQuasar();
/**
 * @author libug
 */
const DEV_SERVER = "http://192.168.92.129:8580/",
  BUILD_SERVER = "http://nj-server.libug.top/";
export const BASE_BACK_URL = BUILD_SERVER;
export const Upload_Server_URL = BASE_BACK_URL + "upload/img";
export const Upload_Payment_Img_Server_URL = BASE_BACK_URL + "upload/payment-img";

export const Img_Server_Path = BASE_BACK_URL + "img/";
export const Payment_Img_Server_Path = BASE_BACK_URL + "payment-img/";
