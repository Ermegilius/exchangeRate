# Currency Converter App

This project is a TypeScript-based web application that shows the conversion rate between two currency pairs using the [ExchangeRate-API](https://www.exchangerate-api.com/).

## Overview

-   **Purpose:**  
    Display the conversion rate between a base currency and a target currency. The app starts at 1 USD = 1 USD and updates the rate dynamically when the user changes the currency selections.

-   **API:**  
    Uses the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch the latest conversion rates. The free plan allows up to 1,500 requests per month.

## Features

-   Dynamic API calls when the user changes the selected base or target currency.
-   Displays conversion rates in real-time.
-   Utilizes TypeScript interfaces to enforce data types.

## Setup

1. **Clone the Repository**

    ```bash
    git clone <your-repo-url>
    cd exchangeRate
    ```

2. **Install Dependencies**

    Ensure you have Node.js and npm installed on your machine:

    ```bash
    npm install
    ```

3. **Configure API Key**

    Sign up for a free account at [ExchangeRate-API](https://www.exchangerate-api.com/) to obtain an API key.  
    Open `src/main.ts` and replace the placeholder API key with your own:

    ```typescript
    const API_KEY = "YOUR_API_KEY_HERE";
    ```

    Right now my API key is exposed in the code. It's fa learning project so I'm not worried about it. But in a real project, you should store your API key in a `.env` file and use `dotenv` to load it.

## Usage

-   **Development Mode:**  
    After installing dependencies, you can run the application using the development server via the following command:

    ```bash
    npm run dev
    ```

-   **Production Build:**  
    To create a production build, use the following command:

```sh
npm run build
npm run preview
```

This will generate a `dist` folder containing the compiled JavaScript files.
Once the preview server starts, open http://localhost:4173 in your browser.

-   **Docker**

The container is published on Docker Hub. To pull and run the published image, use:

```sh
docker pull --platform ermegilius/exchange-rate:latest # for x86
docker pull --platform linux/amd64 ermegilius/exchange-rate:latest # for ARM

docker run -p 5000:5000 ermegilius/exchange-rate:latest # for x86
docker run --platform linux/amd64 -p 5001:5000 ermegilius/exchange-rate:latest # for ARM
```

The app will be accessible at http://localhost:5000 # for x86 and http://localhost:5001 # for ARM.

## Project Structure

-   **src/main.ts**  
    Contains the main application logic including:

    -   DOM element references for base and target currency selectors.
    -   Event listeners to trigger API requests upon currency changes.
    -   The `getConversionRates` function, which fetches the conversion rates, parses the response, and updates the conversion result on the page.
    -   The `FetchWrapper` class that handles API calls with methods for GET, POST, PUT, and DELETE.

-   **Interfaces**
    -   `ExchangeRate`: Defines a mapping of currency codes to rates.
    -   `ExchangeRatesResponse`: Describes the structure of the API response.

## Notes

-   **API Request Limit:**  
    The free API plan allows 1,500 requests per month. To avoid unexpected overages, it's recommended to comment out or optimize the API code after initial testing.

## License

This project uses the [MIT License](LICENSE).

## Acknowledgements

-   Thanks to [ExchangeRate-API](https://www.exchangerate-api.com/) for providing free access to currency conversion data.
