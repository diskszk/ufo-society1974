import React, { Suspense } from "react";
import "./assets/styles/style.scss";
import "./reset.css";

import { BrowserRouter } from "react-router-dom";
import {
  QueryErrorResetBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import LoadingModal from "./components/LoadingModal";
import { ErrorModal } from "./components/ErrorModal";

import { Header } from "./components/header";
import Routes from "./Routes";
import MessageModal from "./components/MessageModal";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error }) => <ErrorModal error={error} />}
            >
              <Suspense fallback={<LoadingModal />}>
                <QueryClientProvider client={client}>
                  <MessageModal />
                  <Header />
                  <main>
                    <Routes />
                  </main>
                </QueryClientProvider>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
