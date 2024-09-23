import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GSAPTransition from './components/GSAPTransition'
import { Provider } from 'react-redux';
import { store } from '../src/store/store'
function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <GSAPTransition />
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App