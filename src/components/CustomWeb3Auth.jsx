import { Button, Card, CardBody, CardHeader, Center, Flex, Text } from '@chakra-ui/react'
import React, {useState} from 'react'
import useWeb3Auth from '../hooks/useWeb3Auth'

const CustomWeb3Auth = () => {

    const [account, setAccount] = useState("");
    const { web3, error, isModalOpen, openModal, closeModal } = useWeb3Auth(
      "0x1" // Mainnet chain ID
    );

  const handleConnect = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  };

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
                    <Button
                        colorScheme='green'
                        onClick={handleConnect}
                    >
                        LINE Login
                    </Button>
                </CardBody>
            </Card>

        </Flex>
    )
}

export default CustomWeb3Auth