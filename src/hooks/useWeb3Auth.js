import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";

const useWeb3Auth = (chainId) => {
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
            // Avoid using public rpcTarget in production.
            // Use services like Infura, Quicknode etc
            displayName: "Ethereum",
            blockExplorer: "https://etherscan.io",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
        });
        await web3auth.initModal();
        const web3authProvider = await web3auth.connect();
        const web3 = new Web3(web3authProvider);
        setWeb3(web3);
      } catch (err) {
        setError(err);
      }
    };

    initWeb3Auth();
  }, [chainId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { web3, error, isModalOpen, openModal, closeModal };
};

export default useWeb3Auth;
