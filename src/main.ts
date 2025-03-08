document.addEventListener("DOMContentLoaded", () => {
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

	// Get references to HTML elements
	const baseCurrency = document.getElementById("base-currency") as HTMLSelectElement;
	const targetCurrency = document.getElementById("target-currency") as HTMLSelectElement;
	const conversionResult = document.getElementById("conversion-result") as HTMLParagraphElement;

	let baseCurrencyValue: string = baseCurrency.value;
	let targetCurrencyValue: string = targetCurrency.value;
	let rates: ExchangeRate;

	const API_KEY = "0df6f25e2a14ffd353be9284";

	// Event listeners trigger a new API call when the currency selections change.
	baseCurrency.addEventListener("change", getConversionRates);
	targetCurrency.addEventListener("change", getConversionRates);

	// Initial fetch of conversion rates on page load.
	getConversionRates();

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
});
