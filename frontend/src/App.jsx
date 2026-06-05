import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
function App() {

  return (
    <>
     <main className="min-h-[78vh] lg:px-5 lg:pb-5">
        <Outlet />
     </main>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        containerClassName=""
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  )
}

export default App
