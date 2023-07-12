import { ethers } from "ethers";

const SubmitProposal = async (_senderAddress, _contract, _description, _initiativeAddress, _amount) => {

    if(_senderAddress && _contract) {
        try {
            await _contract.call(
                "createProposal",
                [_description, _initiativeAddress],
                {
                    gasLimit: 1000000,
                    value: ethers.utils.parseEther(_amount),
                    from: _senderAddress, 
                }
            )    
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default SubmitProposal;