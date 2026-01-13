
# Wallet & Investment Flow

This is a simple mobile investment flow application built with React Native and Expo. The application consists of three screens: Home, Wallet, and Opportunity Details.

## Getting Started

To run the application, you need to have Node.js and Expo CLI installed. Then, follow these steps:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npx expo start
   ```

This will open a new browser tab with the Expo Developer Tools. You can then run the application on a physical device using the Expo Go app or on a simulator.

## Project Structure

The project is structured as follows:

- `api/`: Contains the mock API for fetching data.
- `app/`: Contains the screen components and navigation setup.
- `assets/`: Contains the static assets like images and fonts.
- `components/`: Contains the reusable components used across the application.
- `constants/`: Contains the constants like colors and styles.
- `context/`: Contains the React Context for state management.
- `hooks/`: Contains the custom hooks.
- `types/`: Contains the TypeScript type definitions.
- `utils/`: Contains the utility functions.

## State Management

State is managed using a combination of React Context and the `useState` and `useEffect` hooks. The `AppContext` provides a centralized store for the application's data, including the user's balance, investment opportunities, and transactions.

The `useAppState` hook provides a convenient way to access the application's state from any component. The `AppProvider` component is responsible for fetching the initial data and providing the state to the rest of the application.

## Data Handling

All data is mocked and served from the `api/mock.ts` file. The `getBalance`, `getOpportunities`, and `getTransactions` functions simulate network requests with a delay. The `invest` function simulates an investment by updating the balance and creating a new transaction.

Monetary values are handled as numbers and formatted as currency using the `formatCurrency` utility function. Dates are handled as strings and formatted using the `formatDate` utility function.

## Potential Improvements

With more time, I would make the following improvements:

- **Error Handling:** Improve the error handling to provide more specific error messages to the user.
- **Testing:** Add unit and integration tests to ensure the application is working correctly.
- **UI/UX:** Improve the UI/UX to make the application more user-friendly.
- **Real API:** Replace the mock API with a real API to fetch data from a server.
- **Authentication:** Add user authentication to protect the user's data.
- **Offline Support:** Add offline support to allow the user to use the application without an internet connection.
