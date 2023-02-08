import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GeneralContextProvider from './store/GeneralContextProvider';
import Month from './Month';
import Home from './Home';
import Day from './Day';
import './App.css';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Home />,
 },
 {
  path: '/:month',
  element: <Month />,
 },
 {
  path: '/:month/:day',
  element: <Day />,
 },
]);

function App() {
 return (
  <div className="App">
   <GeneralContextProvider>
    <RouterProvider router={router} />
   </GeneralContextProvider>
  </div>
 );
}

export default App;
