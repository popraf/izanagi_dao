
const proposalTransfer = async (_senderAddress, _contract, _initiativeId) => {

    if(_senderAddress && _contract) {
        try {
            await _contract.call(
                "payInitiative",
                [_initiativeId],
                {
                    gasLimit: 1000000,
                    from: _senderAddress, 
                }
            )    
        } catch (error) {
            console.log('ERROR: ', error.message);
        }
    }
}

export default proposalTransfer;