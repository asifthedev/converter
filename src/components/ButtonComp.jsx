/**
 * General-purpose button with a dark gradient style.
 * Uses the `children` prop for content, following standard React composition.
 *
 * @param {Object}   props
 * @param {React.ReactNode} props.children  - Button label or nested elements.
 * @param {string}          props.className - Additional Tailwind classes to merge.
 * @param {Function}        props.onClick   - Click handler.
 */
function ButtonComp({ children, className = "", onClick }) {
  return (
    <button
      type="button" // Prevents accidental form submission.
      className={`w-xs font-[Space_Grotesk] font-semibold text-white px-6 py-3 rounded-full cursor-pointer
        bg-linear-to-b from-[#3a3a3a] to-[#1a1a1a]
        border border-[#555]
        hover:from-[#444] hover:to-[#222]
        transition-all duration-150 mt-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonComp;
