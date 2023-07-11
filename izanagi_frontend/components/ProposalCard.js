import { useContext, useEffect, useMemo, useState, useLayoutEffect, useRef } from 'react';
import styles from '../styles/ProposalCard.module.css';
import { ethers, utils } from 'ethers';
// import { ProposalContext } from '../context/ProposalContext';
import truncateEthAddress from 'truncate-eth-address';
import moment from 'moment';

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
//   const { address, voteFor, executeProposal } = useContext(ProposalContext)
  const [statusText, setStatusText] = useState('')
  const [statusColor, setStatusColor] = useState('#fff')
//   const [readMore, setReadMore] = useState(false)
//   const [isTruncated, setIsTruncated] = useState(false)

  const setStatus = () => {
    switch (proposal.state) {
      case 0:
        setStatusText('Pending')
        setStatusColor('#48494a')
      case 1:
        setStatusText('Active')
        setStatusColor('#21b66f')
        break
      case 3:
        setStatusText('Defeated')
        setStatusColor('#f44336')
        break
      case 7:
        setStatusText('Executed')
        setStatusColor('#0011ff')
        break
      case 4:
        setStatusText('Successful')
        setStatusColor('#21b66f')
        break
      default:
        setStatusText('Unknown')
        setStatusColor('#fff')
    }
  }


  const ref = useRef(null);
  const { isTruncated, readMore, toggleReadMore } = useTruncatedElement({ ref, });

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
                    Amount: {utils.formatEther(proposal.amount)}
                </div>
            </div>

            <div className={styles.top__middle}>
                {/* <div className={styles.description}>
                    {proposal.description}
                </div> */}
                <div className={styles.description}>
                    {/* {proposal.description} */}

                    <p ref={ref} //className={`shorten__text ${!readMore && 'line-clamp-3'}`}
                    className={`${styles.shorten__text} ${!readMore && styles.line_clamp_3}`}
                    >
                        {proposal?.description}
                    </p>
                </div>

                <div className={styles.mid__bottom}>
                    <button className={styles.readMoreButton} onClick={toggleReadMore}>
                    {readMore?'Read Less':'Read More'}
                    </button>
                </div>

            </div>

            <div className={styles.top__right}>
                <div>
                    <button className={styles.voteForButton}>
                        {parseInt(parseInt(utils.hexValue(proposal.votesFor),16))} Votes For
                    </button>
                </div>
                <br/>
                <div>
                    <button className={styles.voteAgainstButton}>
                        {parseInt(parseInt(utils.hexValue(proposal.votesAgainst),16))} Votes Against
                    </button>
                </div>
                <div>
                    Valid until {moment.unix(parseInt(utils.hexValue(proposal.livePeriod),16)).format("DD MMM YYYY")}
                </div>
            </div>
      </div>

    </div>
  )
}

export default ProposalCard



{/* <li>Proposal amount: {utils.formatEther(proposal.amount)}</li>
<li>Proposal description: {proposal.description}</li>
<li>Proposal id: {utils.formatEther(proposal.id)}</li>
<li>Proposal initiative Address: {proposal.initiativeAddress}</li>
<li>Proposal live Period: {utils.formatEther(proposal.livePeriod)}</li>
<li>Proposal paid: {proposal.paid.toString()}</li>
<li>Proposal paid By: {proposal.paidBy}</li>
<li>Proposal proposer: {proposal.proposer}</li>
<li>Proposal votes Against: {utils.formatEther(proposal.votesAgainst)}</li>
<li>Proposal votes For: {utils.formatEther(proposal.votesFor)}</li>
<li>Proposal voting Passed: {proposal.votingPassed.toString()}</li> */}
