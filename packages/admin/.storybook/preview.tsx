import type { Preview } from "@storybook/react";
import "../src/assets/styles/style.scss";
import { initialize, mswLoader } from "msw-storybook-addon";

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

// mswをinitする
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    loaders: [mswLoader],
  },
  decorators: [
    (Story) => (
      <ErrorBoundary fallback={<p>Something Error</p>}>
        <MemoryRouter>
          <QueryClientProvider client={client}>
            <Story />
          </QueryClientProvider>
        </MemoryRouter>
      </ErrorBoundary>
    ),
  ],
};

export default preview;
