import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import Web3 from "web3";

const useLINELogin = (chainId) => {
    const [web3auth, setWeb3auth] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const initWeb3Auth = async () => {
            try {
                const openloginAdapter = new OpenloginAdapter({
                    adapterSettings: {
                        clientId: "BNkTbjwjc5O9d51IeDo6KGy3OakY7C3_q5LNQ1b7xz6_ySUwVHa5Nnjs7DCfOWwaA_lYnEJ5nnVpbOl-WzPZJ1Q",
                        uxMode: "popup",
                        loginConfig: {
                            line: {
                                name: "web3auth-line-bbb",
                                verifier: "web3auth-line-bbb",
                                typeOfLogin: "line",
                                clientId: "W4sB9iEwGzUIHnTbB8xQx00SIflU8dau", // LINE Login channel ID
                            },
                        },
                    },
                });

                const web3auth = new Web3AuthNoModal({
                    web3AuthNetwork: "testnet",                 
                    clientId: "BNkTbjwjc5O9d51IeDo6KGy3OakY7C3_q5LNQ1b7xz6_ySUwVHa5Nnjs7DCfOWwaA_lYnEJ5nnVpbOl-WzPZJ1Q",
                    chainConfig: {
                        chainNamespace: "eip155",
                        chainId: "0x1",
                    },
                });
                
                // Add OpenLogin wallet adapter
                web3auth.configureAdapter(openloginAdapter);
                await web3auth.init();
                console.log("Web3Auth initialized")
                setWeb3auth(web3auth);
            } catch (err) {
                console.log(err);
                setError(err);
            }
        };

        initWeb3Auth();
    }, [chainId]);

const handleConnect = async () => {
    if (!web3auth) {
        console.error("Web3Auth is not initialized");
        
        return;
    }

    try {
        const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "line",
            extraLoginOptions: {
                verifierIdField: "sub",
                domain: "https://dev-0rxu4kq1iwie2xir.us.auth0.com",
                //   domain: "dev-0rxu4kq1iwie2xir.us.auth0.com",
            },
        });
        console.log("Web3Auth provider:", web3authProvider);
        const web3 = new Web3(web3authProvider);
        setWeb3(web3);
        setWeb3auth(web3auth); // Set web3auth here
    } catch (err) {            
        setError(err);
    }
};

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return { web3, web3auth, error, isModalOpen, openModal, closeModal, handleConnect };
};

export default useLINELogin;
