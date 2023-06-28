// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract IzanagiDAO is ReentrancyGuard, AccessControl {
    // Contract constants
    bytes32 public constant CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR"); // AccessControl bases on bytes32
    bytes32 public constant STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    uint32 constant minimumVotingPeriod = 1 weeks;
    uint256 numOfProposals; // Total

    // Contract core data
    struct InitiativeProposal {
        uint256 id;
        uint256 amount;
        uint256 livePeriod;
        uint256 votesFor;
        uint256 votesAgainst;
        string description;
        bool votingPassed;
        bool paid;
        address payable initiativeAddress;
        address proposer;
        address paidBy;
    }

    mapping(uint256 => InitiativeProposal) private initiativeProposals;
    mapping(address => uint256[]) private stakeholderVotes;
    mapping(address => uint256) private contributors;
    mapping(address => uint256) private stakeholders;

    // Contract events
    event ContributionReceived(address indexed fromAddress, uint256 amount);
    event NewInitiativeProposal(address indexed proposer, uint256 amount);
    event PaymentTransfered(
        address indexed stakeholder,
        address indexed initiativeAddress,
        uint256 amount
    );

    // Contract modifiers
    modifier onlyStakeholder(string memory message) {
        require(hasRole(STAKEHOLDER_ROLE, msg.sender), message);
        _;
    }

    modifier onlyContributor(string memory message) {
        require(hasRole(CONTRIBUTOR_ROLE, msg.sender), message);
        _;
    }

    // Functions
    function createProposal(string calldata description, address initiativeAddress, uint256 amount) external onlyStakeholder("Only stakeholders are allowed to create proposals") {
        uint256 proposalId = numOfProposals++;
        InitiativeProposal storage proposal = initiativeProposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = payable(msg.sender);
        proposal.description = description;
        proposal.initiativeAddress = payable(initiativeAddress);
        proposal.amount = amount;
        proposal.livePeriod = block.timestamp + minimumVotingPeriod;

        emit NewInitiativeProposal(msg.sender, amount);
    }

    function vote(uint256 proposalId, bool supportProposal) external onlyStakeholder("Only stakeholders are allowed to vote") {
        InitiativeProposal storage initiativeProposal = initiativeProposals[proposalId];

        votable(initiativeProposal);

        if (supportProposal) initiativeProposal.votesFor++;
        else initiativeProposal.votesAgainst++;

        stakeholderVotes[msg.sender].push(initiativeProposal.id);
    }

    function votable(InitiativeProposal storage initiativeProposal) private {
        if (
            initiativeProposal.votingPassed ||
            initiativeProposal.livePeriod <= block.timestamp
        ) {
            initiativeProposal.votingPassed = true;
            revert("Voting period has passed on this proposal");
        }

        uint256[] memory tempVotes = stakeholderVotes[msg.sender];
        for (uint256 votes = 0; votes < tempVotes.length; votes++) {
            if (initiativeProposal.id == tempVotes[votes])
                revert("This stakeholder already voted on this proposal");
        }
    }

    function payInitiative(uint256 proposalId) external onlyStakeholder("Only stakeholders are allowed to make payments") {
        InitiativeProposal storage initiativeProposal = initiativeProposals[proposalId];

        if (initiativeProposal.paid)
            revert("Payment has been made to this initiative");

        if (initiativeProposal.votesFor <= initiativeProposal.votesAgainst)
            revert(
                "The proposal does not have the required amount of votes to pass"
            );

        initiativeProposal.paid = true;
        initiativeProposal.paidBy = msg.sender;

        emit PaymentTransfered(msg.sender, initiativeProposal.initiativeAddress, initiativeProposal.amount);

        return initiativeProposal.initiativeAddress.transfer(initiativeProposal.amount);
    }

    receive() external payable {
        emit ContributionReceived(msg.sender, msg.value);
    }

    function makeStakeholder(uint256 amount) external {
        address account = msg.sender;
        uint256 amountContributed = amount;

        if (!hasRole(STAKEHOLDER_ROLE, account)) {
            uint256 totalContributed =
                contributors[account] + amountContributed;
            if (totalContributed >= 5 ether) {
                stakeholders[account] = totalContributed;
                contributors[account] += amountContributed;
                _setupRole(STAKEHOLDER_ROLE, account);
                _setupRole(CONTRIBUTOR_ROLE, account);
            } else {
                contributors[account] += amountContributed;
                _setupRole(CONTRIBUTOR_ROLE, account);
            }
        } else {
            contributors[account] += amountContributed;
            stakeholders[account] += amountContributed;
        }
    }

    function getProposals() public view returns (InitiativeProposal[] memory props) {
        props = new InitiativeProposal[](numOfProposals);

        for (uint256 index = 0; index < numOfProposals; index++) {
            props[index] = initiativeProposals[index];
        }
    }

    function getProposal(uint256 proposalId) public view returns (InitiativeProposal memory) {
        return initiativeProposals[proposalId];
    }

    function getStakeholderVotes() public view onlyStakeholder("User is not a stakeholder") returns (uint256[] memory) {
        return stakeholderVotes[msg.sender];
    }

    function getStakeholderBalance() public view onlyStakeholder("User is not a stakeholder") returns (uint256) {
        return stakeholders[msg.sender];
    }

    function isStakeholder() public view returns (bool) {
        return stakeholders[msg.sender] > 0;
    }

    function getContributorBalance() public view onlyContributor("User is not a contributor") returns (uint256) {
        return contributors[msg.sender];
    }

    function isContributor() public view returns (bool) {
        return contributors[msg.sender] > 0;
    }
}
