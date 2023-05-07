import logo from './logo.svg';
import './App.css';
import CustomWeb3Auth from './components/CustomWeb3Auth';
import CustomLINELogin from './components/CustomLINELogin';

import { ChakraProvider } from '@chakra-ui/react'


function App() {
    return (
        <>
            <ChakraProvider>
                {/* <CustomWeb3Auth /> */}
                <CustomLINELogin />
            </ChakraProvider>
        </>
    );
}

export default App;
