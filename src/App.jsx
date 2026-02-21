import { useEffect, useState } from "react";
import "./App.css";
import swap_icon from "./assets/swap-icon.svg";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  function swap() {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  useEffect(() => {
    function convert() {
      let value = amount * currencyInfo[to];
      setConvertedAmount(value.toFixed(2));
    }

    if (currencyInfo[to]) {
      convert();
    }
  }, [amount, to, currencyInfo]);

  return (
    <>
      <div className="h-screen flex flex-col bg-[#EBECF0] justify-center items-center gap-0">
        <InputBox
          amount={amount}
          label="From"
          currenciesList={options}
          selectedCurrency={from}
          onAmountChange={(val) => setAmount(val)}
          onCurrencyChange={(cur) => setFrom(cur)}
        />

        <div
          className="bg-white rounded-full p-1.5 border-[#EBECF0] border-4 -my-4.5 z-10"
          onClick={() => swap()}
        >
          <img className="w-5" src={swap_icon} alt="" />
        </div>
        <InputBox
          amount={convertedAmount}
          label="To"
          currenciesList={options}
          selectedCurrency={to}
          onCurrencyChange={(cur) => setTo(cur)}
          disabledField={true}
        />
      </div>
    </>
  );
}
export default App;
