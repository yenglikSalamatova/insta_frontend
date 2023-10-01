import "@/styles/globals.scss";
import ReduxProvider from "@/app/store/ReduxProvider";
import App from "./app";

export const metadata = {
  title: "Instagram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <App>{children}</App>
        </ReduxProvider>
      </body>
    </html>
  );
}
