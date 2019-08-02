/* global $, CHDataObject */
var CHDataObject: {
	checkout_session: string,
}

import { getGaCookie } from '../common/getGaCookie'

$.post('https://transactions.littledata.io/clientID', {
	clientID: getGaCookie(),
	cartID: CHDataObject.checkout_session,
})
