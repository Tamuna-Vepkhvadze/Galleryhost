
import AppNavigation from './MyApp/Navigation/AppNavigation'
import { ToastContainer } from 'react-toastify';



function App() {


  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
       
      />
      <AppNavigation/>
    </>
  )
}

export default App
