import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App
