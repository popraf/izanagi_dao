import { useContext } from "react";
import { AddressContext } from "../context/AddressContext";
import { ethers } from "ethers";

const buyShares = async (_address, _contract, _amount) => {
    console.log("Waiting for contract...");
    
    if(_address && _contract) {
        try {
            await _contract.call(
                "buyShares",
                [],
                {
                    gasLimit: 1000000,
                    value: ethers.utils.parseEther(_amount),
                }
            )    
        } catch (error) {
            console.log(error);
        }
    }
}

export default buyShares;