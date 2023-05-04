import logo from './logo.svg';
import './App.css';
import CustomWeb3Auth from './components/CustomWeb3Auth';


import { ChakraProvider } from '@chakra-ui/react'


function App() {
    return (
        <>
            <ChakraProvider>
                <CustomWeb3Auth />
            </ChakraProvider>
        </>
    );
}

export default App;
