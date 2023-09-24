// 3-TD PARTY MODULES
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast"; // TOAST-NOTIFICATIONS

// MY PAGES
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import Bookings from "./pages/Bookings.jsx";
import Cabins from "./pages/Cabins.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";
import Booking from "./pages/Booking.jsx";
import Checkin from "./pages/Checkin.jsx";

// MY COMPONENTS
import AppLayout from "./ui/AppLayout.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

// MY STYLES
import GlobalStyles from "./styles/GlobalStyles.js";
import DarkModeProvider from "../context/DarkModeContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // the amount of time data stays cached before refetching (second * milisecond = minutes)
      staleTime: 0, // always refetching
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              to="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center" // where on the screen the notification will be
          gutter={12} // space between the notificaion windows
          containerStyle={{ margin: "8px" }} // custom css
          toastOptions={{
            // Succesess options
            success: {
              duration: 3000, // How long successes stays on screen
            },

            // Error options
            error: {
              duration: 5000, // How long error stays on screen
            },

            // Custom CSS
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
