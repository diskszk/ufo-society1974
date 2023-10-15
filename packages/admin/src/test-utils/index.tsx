import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { ErrorModal } from "../components/ErrorModal";
import MessageModal from "../components/MessageModal";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false, // fetch に対応しない
      suspense: true,
      retry: false,
    },
  },
});

const clientWithFetch = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      suspense: true,
      retry: false,
    },
  },
});

type Props = {
  children: ReactNode;
  memoryRouterOptions?: MemoryRouterProps;
};

export const Wrapper: React.FC<Props> = ({ children, memoryRouterOptions }) => (
  <MemoryRouter {...memoryRouterOptions}>
    <ErrorBoundary fallbackRender={({ error }) => <ErrorModal error={error} />}>
      <QueryClientProvider client={client}>
        <>
          <MessageModal />
          {children}
        </>
      </QueryClientProvider>
    </ErrorBoundary>
  </MemoryRouter>
);

export const WrapperWithFetch: React.FC<Props> = ({
  children,
  memoryRouterOptions,
}) => (
  <MemoryRouter {...memoryRouterOptions}>
    <ErrorBoundary fallbackRender={({ error }) => <ErrorModal error={error} />}>
      <QueryClientProvider client={clientWithFetch}>
        <>
          <MessageModal />
          {children}
        </>
      </QueryClientProvider>
    </ErrorBoundary>
  </MemoryRouter>
);
