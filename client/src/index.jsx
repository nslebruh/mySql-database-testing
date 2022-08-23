import { createRoot } from 'react-dom/client'
import App from "./app.jsx"
const el = document.getElementById("root");
const root = createRoot(el)
root.render(<App />)
