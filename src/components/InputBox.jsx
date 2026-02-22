import { useId } from "react";
import chevronDown from "../assets/chevron-down.svg";

/**
 * Reusable input row for a currency converter.
 * Displays a numeric text field alongside a currency dropdown.
 *
 * @param {Object}   props
 * @param {string}   props.label            - Descriptive label ("From" / "To").
 * @param {number}   props.amount           - Current numeric value.
 * @param {string[]} props.currenciesList   - Available currency codes for the dropdown.
 * @param {string}   props.selectedCurrency - Currently selected currency code.
 * @param {Function} props.onAmountChange   - Called with the new numeric value on input.
 * @param {Function} props.onCurrencyChange - Called with the new currency code on selection.
 * @param {boolean}  props.disabled         - When true, the amount input is read-only.
 */
function InputBox({
  label,
  amount,
  currenciesList = [],
  selectedCurrency = "",
  onAmountChange,
  onCurrencyChange,
  disabled = false,
}) {
  // useId generates a unique, stable ID for associating the label with the input.
  const inputId = useId();

  return (
    <div className="bg-white w-xs rounded-3xl p-3 flex flex-col gap-3">
      <label htmlFor={inputId} className="font-[Space_Grotesk] text-gray-400">
        {label}
      </label>

      <div className="flex flex-row w-full items-center justify-between">
        {/* Numeric amount input */}
        <input
          id={inputId}
          className="font-bold text-3xl font-[Space_Grotesk] w-[60%] outline-none border-none"
          type="text"
          inputMode="decimal"
          value={amount}
          disabled={disabled}
          onChange={(e) => {
            // Only propagate valid numeric values to the parent.
            const value = Number(e.target.value);
            if (!Number.isNaN(value)) {
              onAmountChange?.(value);
            }
          }}
        />

        {/* Currency selector dropdown */}
        <select
          className="bg-[#f3f3f3] rounded-full font-[Space_Grotesk] pl-3 pr-8 py-1.5 appearance-none bg-no-repeat bg-position-[right_0.5rem_center] bg-size-[17px]"
          style={{ backgroundImage: `url("${chevronDown}")` }}
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
          aria-label={`${label} currency`}
        >
          {currenciesList.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
