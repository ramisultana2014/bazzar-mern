import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { StyleSheetManager } from "styled-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleSheetManager shouldForwardProp={() => true}>
      <Provider store={store}>
        <App />
      </Provider>
    </StyleSheetManager>
  </StrictMode>
);
