function InputBox({
  label,
  amount,
  currenciesList = [],
  selectedCurrency = "",
  onAmountChange,
  onCurrencyChange,
  disabledField = false,
}) {
  return (
    <>
      <div className="bg-white w-xs rounded-3xl p-3 flex flex-col gap-1 active:outline-0 active:border-0">
        <p className="font-[Space_Grotesk] text-gray-400">{label}</p>
        <div className="flex flex-row w-full items-center justify-between">
          <input
            className="
                      font-bold text-2xl font-[Space_Grotesk] w-[60%] outline-none border-none"
            type="text"
            value={amount}
            disabled={disabledField}
            onInput={(e) =>
              onAmountChange && onAmountChange(Number(e.target.value))
            }
          />
          <select
            className="bg-[#f3f3f3] rounded-full font-[Space_Grotesk] pl-3 pr-8 py-1.5 appearance-none bg-no-repeat bg-position-[right_0.5rem_center] bg-size-[17px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30px' height='30px' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            }}
            value={selectedCurrency}
            onChange={(e) =>
              onCurrencyChange && onCurrencyChange(e.target.value)
            }
          >
            {currenciesList.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default InputBox;
