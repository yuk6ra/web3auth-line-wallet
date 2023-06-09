import { Button, ButtonGroup, Card, CardBody, CardHeader, Center, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useWeb3Auth from '../hooks/useWeb3Auth'
// import useLINELogin from '../hooks/useLINELogin.js'

const CustomWeb3Auth = () => {

    const [account, setAccount] = useState("");

    // const { web3, error, isModalOpen, openModal, closeModal, handleConnect } = useWeb3Auth(
    //     "0x1" // Mainnet chain ID
    // );
    const { web3, error, isModalOpen, openModal, closeModal, handleConnect } = useWeb3Auth(
        "0x1" // Mainnet chain ID
    );

    const handleAccount = async () => {
        try {
            const accounts = await web3?.eth?.getAccounts();
            if (accounts && accounts.length > 0) {
                setAccount(accounts[0]);
            } else {
                console.log("No accounts found.");
            }
        } catch (err) {
            console.log("Error retrieving accounts: ", err);
        }
    };
    useEffect(() => {
        if (web3) {
            handleAccount();
            console.log("web3 is loaded");
        }
    }, [web3]);


    return (


        <Flex
            h={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
        >

            <Card
                mt={10}
                boxShadow={'xl'}
            >
                <CardHeader>
                    {!account && (
                    <Center>
                        Let's get started
                    </Center>
                    )}
                    {account && (
                    <Center>
                        Welcome back
                    </Center>
                    )}                    
                </CardHeader>
                <CardBody>
                    {!account && (
                        <Button
                            onClick={() => handleConnect()}
                        >
                            Create Wallet
                        </Button>
                    )}
                    {account && <Text>Account: {account}</Text>}
                </CardBody>
            </Card>

        </Flex>
    )
}

export default CustomWeb3Auth