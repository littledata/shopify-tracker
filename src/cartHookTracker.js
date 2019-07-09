/* global $, CHDataObject */
import { getGaCookie } from './getGaCookie'

$.post('https://transactions.littledata.io/clientID', {
	clientID: getGaCookie(),
	cartID: CHDataObject.checkout_session,
})
