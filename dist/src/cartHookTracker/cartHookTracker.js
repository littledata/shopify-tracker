/* global $, CHDataObject */
import { getGaCookie } from '../common/getGaCookie';
$.post('https://transactions.littledata.io/clientID', {
    clientID: getGaCookie(),
    cartID: CHDataObject.checkout_session,
});
