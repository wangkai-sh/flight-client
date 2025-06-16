import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { FlightProvider } from './context/FlightContext'
import Navbar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import MyBookingsPage from './pages/MyBookingsPage'
import RegisterPage from './pages/RegisterPage'
import SearchResultPage from './pages/SearchResultPage'
import BookingReviewPage from './pages/BookingReviewPage'
import BookingConfirmation from './pages/BookingConfirmation'

function App() {

  return (
    <>
      <AuthProvider>
        <FlightProvider>
          <BookingProvider>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <HomePage />
                  </>
                }
              />
              <Route
                path='/login'
                element={
                  <>
                    <LoginPage />
                  </>
                }
              />
              <Route
                path='/logout'
                element={
                  <>
                    <LogoutPage />
                  </>
                }
              />
              <Route
                path='/register'
                element={
                  <>
                    <RegisterPage />
                  </>
                }
              />
              <Route
                path='/flights'
                element={
                  <>
                    <SearchResultPage />
                  </>
                }
              />
              {/* <Route
              path='/flights/details'
              element={
                <>
                  <FlightDetailPage />
                </>
              }
            /> */}
              <Route
                path='/bookingReview'
                element={
                  <PrivateRoute>
                    <BookingReviewPage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/bookingConfirm'
                element={
                  <BookingConfirmation />
                }
              />
              <Route
                path='/mybookings'
                element={
                  <PrivateRoute>
                    <MyBookingsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BookingProvider>
        </FlightProvider>
      </AuthProvider>
    </>
  )
}

export default App;
