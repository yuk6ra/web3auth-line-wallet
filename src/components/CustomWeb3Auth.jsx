import { Button, Card, CardBody, CardHeader, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
// import { Web3Auth } from "@web3auth/modal";
// import { ethers } from "ethers";

const CustomWeb3Auth = () => {

    const handleTest = async () => {

    }


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
                        onClick={handleTest}
                    >
                        LINE Login
                    </Button>
                </CardBody>
            </Card>

        </Flex>
    )
}

export default CustomWeb3Auth