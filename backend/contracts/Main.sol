// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract IzanagiDAO is ReentrancyGuard, AccessControl {

    constructor() {
        owner = msg.sender;
    }

    // Contract constants
    bytes32 public constant CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR"); // AccessControl bases on bytes32
    bytes32 public constant STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    uint32 constant minimumVotingPeriod = 1 weeks;
    uint256 numOfProposals; // Total
    // uint256 votePrice = 100000000000000000; // In WEI, 0.1ETH

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
    mapping(address => uint256) private shares;
    uint256 private ownerShares;

    // Contract events
    event ContributionReceived(address indexed fromAddress, uint256 amount);
    event NewInitiativeProposal(address indexed proposer, uint256 amount);
    event PaymentTransfered(
        address indexed stakeholder,
        address indexed initiativeAddress,
        uint256 amount
    );
    event BuyShares(address _buyer, uint256 _amountOfMATIC);

    // Contract modifiers
    modifier onlyStakeholder(string memory message) {
        (bool checked) = checkStakeholderStatus(msg.sender);
        require(checked, "Failed to check account status");
        require(hasRole(STAKEHOLDER_ROLE, msg.sender), message);
        _;
    }

    modifier onlyContributor(string memory message) {
        (bool checked) = checkStakeholderStatus(msg.sender);
        require(checked, "Failed to check account status");
        require(hasRole(CONTRIBUTOR_ROLE, msg.sender), message);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not a contract owner");
        _;
    }

    // Functions
    function createProposal(string calldata description, address initiativeAddress) payable external onlyStakeholder("Only stakeholders are allowed to create proposals") {
        require(msg.value>0, "Invalid amount");

        uint256 proposalId = numOfProposals++;
        InitiativeProposal storage proposal = initiativeProposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = payable(msg.sender);
        proposal.description = description;
        proposal.initiativeAddress = payable(initiativeAddress);
        proposal.amount = msg.value;
        proposal.livePeriod = block.timestamp + minimumVotingPeriod;

        emit NewInitiativeProposal(msg.sender, msg.value);
    }

    function vote(uint256 proposalId, bool supportProposal) external onlyStakeholder("Only stakeholders are allowed to vote") {
        require(proposalId <= numOfProposals, "Invalid proposal ID");
        InitiativeProposal storage initiativeProposal = initiativeProposals[proposalId];

        votable(initiativeProposal);

        if (supportProposal) {
            initiativeProposal.votesFor++;
        } else {
            initiativeProposal.votesAgainst++;
        }

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

    function payInitiative(uint256 _proposalId) external onlyStakeholder("Only stakeholders are allowed to make payments") {
        InitiativeProposal storage initiativeProposal = initiativeProposals[_proposalId];

        if (initiativeProposal.votingPassed || initiativeProposal.livePeriod <= block.timestamp) {
            initiativeProposal.votingPassed = true;
        } else {
            revert("Voting period is not finished yet");
        }

        if (initiativeProposal.paid) {
            revert("Payment has been made to this initiative");
        }

        if (initiativeProposal.votesFor <= initiativeProposal.votesAgainst) {
            revert(
                "The proposal does not have the required amount of votes to pass"
            );
        }

        initiativeProposal.paid = true;
        initiativeProposal.paidBy = msg.sender;

        emit PaymentTransfered(msg.sender, initiativeProposal.initiativeAddress, initiativeProposal.amount);

        return initiativeProposal.initiativeAddress.call{value: initiativeProposal.amount}("");
        //transfer(initiativeProposal.amount);
    }

    function cancelInitiative(uint256 _proposalId) external {
        InitiativeProposal storage initiativeProposal = initiativeProposals[_proposalId];

        if (initiativeProposal.votingPassed || initiativeProposal.livePeriod <= block.timestamp) {
            initiativeProposal.votingPassed = true;
        } else {
            revert("Voting period is not finished yet");
        }

        if (initiativeProposal.paid) {
            revert("Payment has been made to this initiative");
        }

        if (initiativeProposal.proposer != msg.sender) {
            revert("Not owner of a proposal");
        }

        initiativeProposal.paid = true;
        initiativeProposal.paidBy = msg.sender;

        emit PaymentTransfered(msg.sender, initiativeProposal.proposer, initiativeProposal.amount);
        return initiativeProposal.proposer.call{value: initiativeProposal.amount}("");
        //transfer(initiativeProposal.amount);
    }

    function checkStakeholderStatus(address _address) private returns (bool success) {
        uint256 totalContributed = shares[_address];

        if (!hasRole(STAKEHOLDER_ROLE, _address)) {

            if (totalContributed >= 5 ether) {
                _setupRole(STAKEHOLDER_ROLE, _address);
                _setupRole(CONTRIBUTOR_ROLE, _address);
            } else {
                _setupRole(CONTRIBUTOR_ROLE, _address);
            }
        }

        return true;
    }

    function buyShares() external payable returns (bool success) {
        require(msg.value > 0, "Not enough MATIC on account balance or MATIC not sent.");
        shares[msg.sender] += msg.value;
        ownerShares += msg.value;
        emit BuyShares(msg.sender, msg.value);
        return true;
    }

    function ownerWithdrawShares() external onlyOwner {
        // uint256 ownerBalance = address(this).balance;
        uint256 ownerBalance = ownerShares;
        require(ownerBalance > 0, "No MATIC present in Vendor for owner");
        (bool sent,) = msg.sender.call{value: ownerBalance}("");
        require(sent, "Failed to withdraw");
        ownerShares = 0;
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

    function getBalance() public view returns (uint256) {
        return shares[msg.sender];
    }

    function isStakeholder() public view returns (bool) {
        return stakeholders[msg.sender] > 0;
    }

    function isContributor() public view returns (bool) {
        return shares[msg.sender] > 0;
    }
}
