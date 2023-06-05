import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Can not find app root.");
}

ReactDOM.createRoot(container).render(<App />);
