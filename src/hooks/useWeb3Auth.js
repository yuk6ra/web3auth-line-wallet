import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";

const useWeb3Auth = (chainId) => {
    const [web3auth, setWeb3auth] = useState(null); // Add this line
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const initWeb3Auth = async () => {
            try {
                const web3auth = new Web3Auth({
                    clientId: "BPpL74wzkFk1rIhUnWVwHlDCFgPzd6-a9vfLYjiaDIcm8ccTtkvmp17FcUu6wV0qKHJNcdlYgA9HNWKlxzpZMao", // get it from Web3Auth Dashboard
                    web3AuthNetwork: "testnet",
                    chainConfig: {
                        chainNamespace: "eip155",
                        chainId: chainId,
                        rpcTarget: "https://rpc.ankr.com/eth",
                        displayName: "Ethereum",
                        blockExplorer: "https://etherscan.io",
                        ticker: "ETH",
                        tickerName: "Ethereum",
                    },
                    enableLogging: true,
                });
                await web3auth.initModal();
        
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
      const web3authProvider = await web3auth.connect();
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

    return { web3, error, isModalOpen, openModal, closeModal, handleConnect  };
};

export default useWeb3Auth;
