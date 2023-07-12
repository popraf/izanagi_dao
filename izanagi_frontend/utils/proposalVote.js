
const proposalVote = async (_senderAddress, _contract, _proposalId, _supportProposal) => {

    if(_senderAddress && _contract) {
        try {
            await _contract.call(
                "vote",
                [_proposalId, _supportProposal],
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

export default proposalVote;