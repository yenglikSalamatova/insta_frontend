import "@/styles/globals.scss";
import ReduxProvider from "./store/ReduxProvider";

export const metadata = {
  title: "Instagram",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
