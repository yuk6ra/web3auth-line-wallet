import { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES } from "@web3auth/base";
import Web3 from "web3";

const useLINELogin = (chainId) => {
    const [web3auth, setWeb3auth] = useState(null); // Add this line
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const initWeb3Auth = async () => {
            try {
                const web3auth = new Web3AuthNoModal({
                    clientId: "BPpL74wzkFk1rIhUnWVwHlDCFgPzd6-a9vfLYjiaDIcm8ccTtkvmp17FcUu6wV0qKHJNcdlYgA9HNWKlxzpZMao", // Get your Client ID from Web3Auth Dashboard
                    chainConfig: {
                        chainNamespace: "eip155",
                        chainId: "0x1", // Please use 0x5 for Goerli Testnet
                    },
                });

                await web3auth.init();

                setWeb3auth(web3auth); // Add this line
            } catch (err) {
                setError(err);
            }
        };

        initWeb3Auth();
    }, [chainId]);

    // Add this new function
    const handleConnect = async () => {
        if (!web3auth) {
            console.error("Web3Auth is not initialized");
            return;
        }

        try {
            const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
                loginProvider: "Line",
                extraLoginOptions: {
                    verifierIdField: "sub", // same as your JWT Verifier ID
                    domain: "https://dev-0rxu4kq1iwie2xir.us.auth0.com", // your Auth0 domain
                },
            });
            console.log("Web3Auth provider:", web3authProvider);
            const web3 = new Web3(web3authProvider);
            setWeb3(web3);
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

    return { web3, error, isModalOpen, openModal, closeModal, handleConnect };
};

export default useLINELogin;
