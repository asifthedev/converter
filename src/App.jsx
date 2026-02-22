import { useCallback, useMemo, useState } from "react";
import swapIcon from "./assets/swap-icon.svg";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import ButtonComp from "./components/ButtonComp";

/**
 * Root application component.
 * Renders a currency converter UI with two InputBoxes (source and target),
 * a swap button, and displays loading/error states.
 */
function App() {
  // -- State ------------------------------------------------------------------
  const [amount, setAmount] = useState(1); // The value the user types in the "From" field.
  const [fromCurrency, setFromCurrency] = useState("usd"); // Source currency code.
  const [toCurrency, setToCurrency] = useState("pkr"); // Target currency code.

  // -- Derived data -----------------------------------------------------------

  // Fetch exchange rates for the selected source currency.
  const {
    data: currencyInfo,
    isLoading,
    error,
  } = useCurrencyInfo(fromCurrency);

  // Build a list of available currency codes from the fetched data.
  const currencyOptions = useMemo(
    () => Object.keys(currencyInfo),
    [currencyInfo],
  );

  // Compute the converted amount whenever the inputs or rates change.
  // This is derived state, so useMemo is preferred over useState + useEffect.
  const convertedAmount = useMemo(() => {
    const rate = currencyInfo[toCurrency];
    return rate ? (amount * rate).toFixed(2) : "0.00";
  }, [amount, toCurrency, currencyInfo]);

  // -- Handlers ---------------------------------------------------------------

  // Swap the source and target currencies and update the amount to reflect
  // the previously converted value.
  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(Number(convertedAmount));
  }, [fromCurrency, toCurrency, convertedAmount]);

  // -- Render -----------------------------------------------------------------
  return (
    <main className="h-screen flex flex-col bg-[#EBECF0] justify-center items-center gap-0">
      {/* Source currency input */}
      <InputBox
        amount={amount}
        label="From"
        currenciesList={currencyOptions}
        selectedCurrency={fromCurrency}
        onAmountChange={setAmount}
        onCurrencyChange={setFromCurrency}
      />

      {/* Circular swap button positioned between the two input boxes */}
      <button
        className="bg-white rounded-full p-1.5 border-[#EBECF0] border-4 -my-4.5 z-10 cursor-pointer"
        onClick={handleSwap}
        aria-label="Swap currencies"
        type="button"
      >
        <img className="w-5" src={swapIcon} alt="" />
      </button>

      {/* Target currency input (read-only) */}
      <InputBox
        amount={convertedAmount}
        label="To"
        currenciesList={currencyOptions}
        selectedCurrency={toCurrency}
        onCurrencyChange={setToCurrency}
        disabled
      />

      {/* Error message shown when the API request fails */}
      {error && (
        <p className="text-red-500 text-sm mt-2 font-[Space_Grotesk]">
          {error}
        </p>
      )}

      {/* Loading indicator while rates are being fetched */}
      {isLoading && (
        <p className="text-gray-500 text-sm mt-2 font-[Space_Grotesk]">
          Loading rates...
        </p>
      )}

      <ButtonComp onClick={handleSwap}>Swap</ButtonComp>
    </main>
  );
}

export default App;
