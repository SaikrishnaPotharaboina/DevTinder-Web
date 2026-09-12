import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from "./components/Body"
import Login from "./components/Login";
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import AppStore from './utils/AppStore';
import Feed from './components/feed';

function App() {
  return (
    <>
      <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />} >
              <Route path="/" element={<Feed />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}


export default App
