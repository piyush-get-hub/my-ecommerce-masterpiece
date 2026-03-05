import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast'; // Notifications ke liye

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  )
}

export default App