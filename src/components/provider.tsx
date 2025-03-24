
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./theme-provider.tsx";
import { HelmetProvider } from "react-helmet-async";


export function MainProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            defaultTheme="light"
            defaultColor="default"
            storageKey="vite-ui-theme">
            <Provider store={store}>
                <HelmetProvider>
                    <PersistGate loading={null} persistor={persistor}>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </PersistGate>
                </HelmetProvider>
            </Provider>
        </ThemeProvider>
    );
}
