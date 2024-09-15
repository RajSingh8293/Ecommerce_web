
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    < ToastContainer position='bottom-right' theme='dark' autoClose={5000} />
    <App />
  </Provider>,
)
