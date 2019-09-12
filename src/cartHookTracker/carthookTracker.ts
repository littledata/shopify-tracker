import { getGaCookie } from '../common/getGaCookie';

$.post('https://transactions.littledata.io/clientID', {
    clientID: getGaCookie(),
    // @ts-ignore
    cartID: CHDataObject.checkout_session,
});
