import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GeneralContextProvider from './store/GeneralContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
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
]);

function App() {
 return (
  <div className="App">
   <ChakraProvider>
    <GeneralContextProvider>
     <RouterProvider router={router} />
    </GeneralContextProvider>
   </ChakraProvider>
  </div>
 );
}

export default App;
