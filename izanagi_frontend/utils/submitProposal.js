import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';

const SubmitProposal = async (_senderAddress, _contract, _description, _initiativeAddress, _amount) => {

    if(_senderAddress && _contract) {
        try {
            let contractCall = await _contract.call(
                "createProposal",
                [_description, _initiativeAddress],
                {
                    gasLimit: 1000000,
                    value: ethers.utils.parseEther(_amount),
                    from: _senderAddress, 
                }
            )
            return contractCall;
        } catch (error) {
            console.log(error.message);
            // toast.error(error.message);
        }
    }
}

export default SubmitProposal;