import { Button, ButtonGroup, Card, CardBody, CardHeader, Center, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import useWeb3Auth from '../hooks/useWeb3Auth'
import useLINELogin from '../hooks/useLINELogin.js'

const CustomWeb3Auth = () => {

    const [account, setAccount] = useState("");

    // const { web3, error, isModalOpen, openModal, closeModal, handleConnect } = useWeb3Auth(
    //     "0x1" // Mainnet chain ID
    // );
    const { web3, web3auth, error, isModalOpen, openModal, closeModal, handleConnect } = useLINELogin(
        "0x1" // Mainnet chain ID
    );
    const handleAccount = async () => {
        try {
            const accounts = await web3auth?.eth?.getAccounts();
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
        if (web3auth) {
            handleAccount();
            console.log("web3 is loaded");
        }
    }, [web3auth]);


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
                    <Center>
                        Let's get started
                    </Center>
                </CardHeader>
                <CardBody>
                    <ButtonGroup>

                        <Button
                            onClick={() => handleConnect()}
                            colorScheme='green'
                        >
                            LINE Login
                        </Button>

                        {isModalOpen && (
                            <Button
                                onClick={() => closeModal()}
                                colorScheme='red'
                            >
                                Close
                            </Button>
                        )
                        }

                        <Button

                            onClick={() => handleAccount()}
                            colorScheme='green'
                        >
                            Get Account
                        </Button>
                    </ButtonGroup>


                    {/* <Button
                        colorScheme='green'
                        onClick={() => handleConnect()}
                    >
                        create Account
                    </Button> */}
                    {account && <Text>Account: {account}</Text>}
                    {error && `Error: ${error}`}

                </CardBody>
            </Card>

        </Flex>
    )
}

export default CustomWeb3Auth