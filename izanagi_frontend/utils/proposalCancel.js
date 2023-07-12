const proposalCancel = async (_senderAddress, _contract, _initiativeId) => {

    if(_senderAddress && _contract) {
        try {
            let transaction = await _contract.call(
                "cancelInitiative",
                [_initiativeId],
                {
                    gasLimit: 1000000,
                    from: _senderAddress, 
                }
            )
            receipt = await wait(transaction)
        } catch (error) {
            console.log('ERROR message proposalCancel: ', error.message);
        }
    }
}

export default proposalCancel;