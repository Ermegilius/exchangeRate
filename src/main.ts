interface ExchangeRate {
	[key: string]: number;
}
interface ExchangeRatesResponse {
	result: string;
	documentation: string;
	terms_of_use: string;
	time_last_update_unix: number;
	time_last_update_utc: string;
	time_next_update_unix: number;
	time_next_update_utc: string;
	base_code: string;
	conversion_rates: ExchangeRate;
}

class FetchWrapper {
	baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	get(endpoint: string): Promise<ExchangeRatesResponse> {
		return fetch(this.baseURL + endpoint).then((response) => response.json());
	}

	put(endpoint: string, body: any): Promise<any> {
		return this._send("put", endpoint, body);
	}

	post(endpoint: string, body: any): Promise<any> {
		return this._send("post", endpoint, body);
	}

	delete(endpoint: string, body: any): Promise<any> {
		return this._send("delete", endpoint, body);
	}

	_send(method: string, endpoint: string, body: any): Promise<any> {
		return fetch(this.baseURL + endpoint, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((response) => response.json());
	}
}

//TODO
/* The goal of this project is to show the user the conversion rate between 2 currency pairs.
  The currency chosen on the left is the base currency and the currency chosen on the right is the target currency.
  The app starts at 1 USD = 1 USD.
  
  The API you need to use in this challenge is exchangerate-api.com.
  You can create a free account and browse the documentation.
  
  The free plan on this API allows you to perform 1,500 requests per month.
  Remember that every time you type in the editor, the browser preview will refresh,
  causing a new API request. In order not to exceed your limit, we recommend commenting out the
  fetch/FetchWrapper related code after you get it to work the first time. */

//Notes:
// Sign up for a free account on exchange <a href="https://www.exchangerate-api.com/">https://www.exchangerate-api.com/</a>
// Copy the example request
// Please check the documentation link, read Standard Requests documentation
// Sending a GET request to <a href="https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD">https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD</a>
// Above will give you exchange rate compared to USD

// TODO: WRITE YOUR TYPESCRIPT CODE HERE

// A global variable that references the HTML select element with the id base-currency
const baseCurrency = document.getElementById("base-currency") as HTMLSelectElement;
let baseCurrencyValue: string;

// A global variable that references the HTML select element with the id target-currency
const targetCurrency = document.getElementById("target-currency") as HTMLSelectElement;
let targetCurrencyValue: string;

// A global variable that references the HTML paragraph element with the id conversion-result
const conversionResult = document.getElementById("conversion-result") as HTMLParagraphElement;
let conversionResultValue = conversionResult.textContent;

// A global variable that stores the conversion rates as an object mapping currency codes to numbers.
let rates: ExchangeRate;

const API_KEY = "0df6f25e2a14ffd353be9284";

// Event listeners trigger a new API call when the currency selections change.
baseCurrency.addEventListener("change", getConversionRates);
targetCurrency.addEventListener("change", getConversionRates);

function getConversionRates() {
	// Update the selected currency values
	baseCurrencyValue = baseCurrency.value;
	targetCurrencyValue = targetCurrency.value;

	// Create a new FetchWrapper instance using the updated base currency.
	const api = new FetchWrapper(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrencyValue}/`);

	// Make the API call. The API returns an object which we parse to choose the right currency pair.
	api.get("").then((data: ExchangeRatesResponse) => {
		rates = data.conversion_rates;
		const rate = rates[targetCurrencyValue];
		conversionResult.textContent = `${rate}`;
	});
}
