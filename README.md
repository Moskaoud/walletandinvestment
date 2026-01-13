# Wallet & Investment Flow (React Native Take-Home)

This project implements a simple mobile investment flow using **React Native**, **Expo**, and **TypeScript**.

## Project Overview

The app consists of three main screens:
1.  **Home**: Displays balance summary and a list of investment opportunities.
2.  **Wallet**: Displays balance summary and a list of historical transactions.
3.  **Opportunity Details**: Allows the user to view details and invest in a fund.

## How to Run

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the app**:
    ```bash
    npx expo start
    ```
3.  **Run**: Press `a` for Android, `i` for iOS (simulator required), or scanning the QR code with Expo Go.

---

## Technical Decisions

### 1. State Management
I chose to use **React Context API** (`AppProvider` & `useAppState`) for this application.
*   **Reasoning**: For a strictly defined scope of 3 screens and shared data (Balance, Opportunities, Transactions), Redux or Zustand would be overkill. React Context provides a lightweight dependency-injection mechanism perfect for sharing the "global" wallet state without prop drilling.
*   **Implementation**: The `context/state.tsx` file encapsulates all data fetching, state updates, and business logic (like the `invest` function), keeping the UI components clean and focused on rendering.

### 2. Money Handling
Money values are stored as **numbers** (floats) for calculation ease in this demo, but formatted strictly using `Intl.NumberFormat`.
*   **Formatting**: The helper `utils/format.ts` ensures all values are displayed as `SAR` currency (e.g., `1,000.00 SAR`).
*   **Precision**: In a real production environment, I would handle money values as **integers (cents/halalas)** or use a dedicated library like `currency.js` or `dinero.js` to avoid JavaScript floating-point errors (e.g., `0.1 + 0.2 !== 0.3`).

### 3. Business Logic & Validation
The logic for investing is centralized in the `invest` function within the Context:
*   It checks client-side if `available balance >= amount`.
*   Optimistically updates the UI state (deducts available, adds invested, appends transaction).
*   Handles errors gracefully if the mock API fails.

---

## Future Improvements

If I had more time, I would improve the following:

1.  **Robust Money Math**: as mentioned, switching to integer-based math or a Decimal library to prevent potential floating-point precision issues.
2.  **Persisted State**: Integrating `AsyncStorage` or `Mmkv` to persist the user's balance and transactions across app restarts.
3.  **Better Testing**: Adding unit tests (Jest) for the `invest` logic and snapshot tests for the UI components.
4.  **Accessibility**: Improving accessibility labels and hints for screen readers.
5.  **Styling**: Implementing a more sophisticated theming system (maybe utilizing `react-native-paper` or `tamagui`) instead of raw StyleSheet objects.
