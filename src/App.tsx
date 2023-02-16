import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GeneralContextProvider from './store/GeneralContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
import Month from './Month/Month';
import Home from './HomePage/Home';
import './App.css';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Home />,
 },
 {
  path: '/months/:month',
  element: <Month />,
 },
]);

function App() {
 return (
  <div className="App">
   <GeneralContextProvider>
    <ChakraProvider>
     <RouterProvider router={router} />
    </ChakraProvider>
   </GeneralContextProvider>
  </div>
 );
}

export default App;
