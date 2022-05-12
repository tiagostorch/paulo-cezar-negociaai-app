import { environment } from 'src/environments/environment';

// Check if is running in dev environment to use a proxy configuration
export const BASE_URL: string = document.URL.indexOf("http://localhost:81") == 0 ? environment.proxy : environment.api;

export const APISERVICE = {
	LOGIN: BASE_URL + "authenticate",
	GET_DEALS: BASE_URL + "deal/search",
	DEAL: BASE_URL + "deal",
	GET_DELIVERY_FEE: BASE_URL + "deal/{id}/delivery?userId={userId}",
	GET_DEAL_BIDS: BASE_URL + "deal/{ID}/bid",
	GET_MY_BIDS: BASE_URL + "bid?userId={userId}",
};

export const MOCKSERVICE = {
	LOGIN: "assets/mock/user-login-mock.json",
	GET_DEALS: "assets/mock/deals-mock.json",
	DEAL: null,
	GET_DELIVERY_FEE: "assets/mock/delivery-mock.json",
	GET_DEAL_BIDS: "assets/mock/deal-bids-mock.json",
	GET_MY_BIDS: "assets/mock/my-bids-mock.json"
};

// To run in a real webservice, change the mock property in environment file.
export const WEBSERVICE = environment.mock ? MOCKSERVICE : APISERVICE;
