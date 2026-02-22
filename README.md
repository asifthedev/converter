# Currency Converter

A minimal, real-time currency converter built with React 19 and Tailwind CSS 4. Exchange rates are pulled from a free public API and the UI updates instantly as you type.

<p align="center">
  <img src="docs/screenshot.png" alt="Currency Converter Screenshot" style="border-radius: 12px;" />
</p>

## Features

- **Live exchange rates** sourced from [fawazahmed0/currency-api](https://github.com/fawazahmed0/currency-api)
- **150+ currencies** available in the dropdown
- **Instant conversion** as you type — no submit button needed
- **Swap** source and target currencies with one click
- **Responsive** and centered layout that works on desktop and mobile
- **Accessible** — proper labels, ARIA attributes, and keyboard support
- **Error & loading states** surfaced in the UI

## Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Framework  | React 19                 |
| Build Tool | Vite 7                   |
| Styling    | Tailwind CSS 4           |
| Linting    | ESLint 9 + React plugins |
| Deployment | Vercel                   |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or any compatible package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/converter.git
cd converter

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with hot-module replacement.

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/             # Static assets (SVG icons)
├── components/
│   ├── ButtonComp.jsx  # Reusable gradient button
│   └── InputBox.jsx    # Currency input + dropdown row
├── hooks/
│   └── useCurrencyInfo.js  # Custom hook — fetches exchange rates
├── App.jsx             # Root component — converter logic & layout
├── main.jsx            # React DOM entry point
└── index.css           # Tailwind CSS import
```

## How It Works

1. `useCurrencyInfo` fetches rates for the selected **source currency** using `AbortController` to cancel stale requests.
2. The converted amount is derived via `useMemo` — no extra state or effects needed.
3. Swapping currencies flips both codes and sets the input to the previously converted value.

## License

This project is open-source and available under the [MIT License](LICENSE).
