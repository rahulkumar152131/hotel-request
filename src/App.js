import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Hotel from './pages/Hotel';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={
              <Hotel />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
