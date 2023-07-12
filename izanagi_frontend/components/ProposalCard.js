import { useContext, useMemo, useState, useLayoutEffect, useRef } from 'react';
import styles from '../styles/ProposalCard.module.css';
import { ethers, utils } from 'ethers';
import truncateEthAddress from 'truncate-eth-address';
import moment from 'moment';
import proposalVote from '../utils/proposalVote';
import { AddressContext } from '../context/AddressContext';
import { useContractRead } from '@thirdweb-dev/react';
import proposalTransfer from '../utils/proposalTransfer';
import proposalCancel from '../utils/proposalCancel';

const useTruncatedElement = ({ ref }) => {
    const [isTruncated, setIsTruncated] = useState(false);
    const [readMore, setReadMore] = useState(false);
  
    useLayoutEffect(() => {
      const { offsetHeight, scrollHeight } = ref.current || {};
  
      if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
        setIsTruncated(true);
      } else {
        setIsTruncated(false);
      }
    }, [ref]);

    const toggleReadMore = () => setReadMore(!readMore);
  
    return {
      isTruncated,
      readMore,
      toggleReadMore,
    };
  };

const ProposalCard = ({ proposal }) => {
  const {address, contract} = useContext(AddressContext);
  const { data: getStakeholderVotesData, isLoading: getStakeholderVotesIsLoading, error: getStakeholderVotesError } = useContractRead(contract,'getStakeholderVotes',[],{from:address});

  const ref = useRef(null);
  const { isTruncated, readMore, toggleReadMore } = useTruncatedElement({ ref, });
  const alreadyVoted = !getStakeholderVotesIsLoading?getStakeholderVotesData.map(data => utils.hexValue(data)).includes(utils.hexValue(proposal.id)):null;

//   useMemo(() => {
//     setStatus()
//   }, [statusText, statusColor, proposal.state])

  return (
    <div className={styles.card}>

      <div className={styles.top}>
            <div className={styles.top__left}>
                <div className={styles.proposer}>
                    Proposer: {truncateEthAddress(proposal.proposer)}
                    <br />
                    Initiative: {truncateEthAddress(proposal.initiativeAddress)}
                    <br />
                    Amount: {utils.formatEther(proposal.amount)} MATIC

                    {proposal.proposer == address?
                    // This is redundant as everyone can transfer, but only owner can cancel
                      <div className={styles.containerTransferCancel}>
                        <button className={styles.buttonTransferCancel} onClick={e => proposalTransfer(address, contract, proposal.id)}>
                          Transfer
                        </button>
                        <button className={styles.buttonTransferCancel} onClick={e => proposalCancel(address, contract, proposal.id)}>
                          Cancel
                        </button>
                      </div>:
                      null
                    }
                    
                </div>
            </div>
            <div>
            </div>

            <div className={styles.top__middle}>
                <div className={styles.description}>
                    <p ref={ref} className={`${styles.shorten__text} ${!readMore && styles.line_clamp_3}`}>
                        {proposal?.description}
                    </p>
                </div>

                <div className={styles.mid__bottom}>
                    {proposal?.description.length>328?
                    (<button className={styles.readMoreButton} onClick={toggleReadMore}>
                        {readMore?'Read Less':'Read More'}
                    </button>):
                    null}
                </div>

            </div>

            <div className={styles.top__right}>
                <div>
                    <button className={alreadyVoted?styles.voteForInactive:styles.voteForButton} onClick={e => proposalVote(address, contract, proposal.id, true)}>
                        {parseInt(parseInt(utils.hexValue(proposal.votesFor),16))} Votes For
                    </button>
                </div>
                <br/>
                <div>
                    <button className={alreadyVoted?styles.voteAgainstInactive:styles.voteAgainstButton} onClick={e => proposalVote(address, contract, proposal.id, false)}>
                        {parseInt(parseInt(utils.hexValue(proposal.votesAgainst),16))} Votes Against
                    </button>
                </div>
                <div>
                  {moment.unix(parseInt(utils.hexValue(proposal.livePeriod),16)).isAfter(moment())?
                  `Valid until ${moment.unix(parseInt(utils.hexValue(proposal.livePeriod),16)).format("DD MMM YYYY")}`:
                  'Voting period finished'
                  }
                    
                </div>
                <div>{alreadyVoted?'Already voted':null}</div>
            </div>
      </div>

    </div>
  )
}

export default ProposalCard