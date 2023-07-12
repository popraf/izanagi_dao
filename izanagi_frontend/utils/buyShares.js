import { ethers } from "ethers";


const buyShares = async (_senderAddress, _contract, _amount) => {

    if(_senderAddress && _contract) {
        try {
            await _contract.call(
                "buyShares",
                [],
                {
                    gasLimit: 1000000,
                    value: ethers.utils.parseEther(_amount),
                    from: _senderAddress
                }
            )    
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default buyShares;