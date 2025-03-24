
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./theme-provider.tsx";


export function MainProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            defaultTheme="light"
            defaultColor="default"
            storageKey="vite-ui-theme">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    );
}
