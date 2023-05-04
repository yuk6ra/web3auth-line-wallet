import { Button, Card, CardBody, CardHeader, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { Web3Auth } from "@web3auth/modal";
// import { ethers } from "ethers";

const CustomWeb3Auth = () => {

    const handleTest = async () => {

        // const ethers = window.ethers;

        // const web3auth = new Web3Auth({
        //     clientId: "BGEXcv9LdMrzGAYlBufDI0MWzgeGGXi5jN_zqIf_nYAKhDUDCF2xQZJ2zPISVQH-pm1LY3iXG7IChwteVCOdI", // get it from Web3Auth Dashboard
        //     web3AuthNetwork: "Testnet",
        //     chainConfig: {
        //         chainNamespace: "eip155",
        //         chainId: "80001", // hex of 80001, polygon testnet
        //         rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
        //         // Avoid using public rpcTarget in production.
        //         // Use services like Infura, Quicknode etc
        //         displayName: "Polygon Mumbai Testnet",
        //         blockExplorer: "https://mumbai.polygonscan.com/",
        //         ticker: "MATIC",
        //         tickerName: "Matic",
        //     },
        // });

        // await web3auth.initModal();

        // const web3authProvider = web3auth.connect();

        // const provider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider

        // const signer = provider.getSigner();

        // // Get user's Ethereum public address
        // const address = await signer.getAddress();

        // // Get user's balance in ether
        // const balance = ethers.utils.formatEther(
        //     await provider.getBalance(userAddress) // Balance is in wei
        // );

        // console.log("address", address)
        // console.log("balance", balance)

        const web3auth = new Web3Auth({
            clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Get your Client ID from Web3Auth Dashboard
            chainConfig: {
              chainNamespace: "eip155",
              chainId: "0x89", // Use 0x13881 for Mumbai Testnet
            },
          });
          
          await web3auth.initModal();

          await web3auth.connect();



          
    }


    return (
        <Center>
            <Card
                mt={10}
            >
                <CardHeader>Header</CardHeader>
                <CardBody>
                    <Button
                        onClick={handleTest}
                    >
                        create
                    </Button>
                </CardBody>
            </Card>

        </Center>
    )
}

export default CustomWeb3Auth