import { useContext, useEffect, useMemo, useState } from 'react';
import styles from '../styles/ProposalCard.module.css';
import { ethers, utils } from 'ethers';
// import { ProposalContext } from '../context/ProposalContext';
import truncateEthAddress from 'truncate-eth-address';
import moment from 'moment';

const ProposalCard = ({ proposal }) => {
//   const { address, voteFor, executeProposal } = useContext(ProposalContext)
  const [statusText, setStatusText] = useState('')
  const [statusColor, setStatusColor] = useState('#fff')

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

//   useMemo(() => {
//     setStatus()
//   }, [statusText, statusColor, proposal.state])

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div>
          <div className={styles.proposer}>
            Proposer: {truncateEthAddress(proposal.proposer)}
          </div>
          <div className={styles.proposer}>
            Amount: {utils.formatEther(proposal.amount)}
          </div>

          <div className={styles.description}>
            {proposal.description}
          </div>
        </div>
        <div className={styles.status}>
            {parseInt(parseInt(utils.hexValue(proposal.votesFor),16))} Votes For
            <br />
            {parseInt(parseInt(utils.hexValue(proposal.votesAgainst),16))} Votes Against
            <br />
            Valid until {moment.unix(parseInt(utils.hexValue(proposal.livePeriod),16)).format("DD MMM YYYY")}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.results}>
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
