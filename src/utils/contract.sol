// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract FeedbackRewardsV2 {
    address public owner;
    IERC20 public usdc;
    uint256 public constant REWARD_AMOUNT = 100000; // 0.10 USDC reward
    uint256 public constant MAX_SUBMISSIONS = 2; // Maximum feedback submissions allowed per address

    mapping(address => uint256) public submissionCount;
    mapping(bytes32 => bool) public validHashedTokens; // Mapping to store valid hashed tokens

    constructor(address _usdcAddress) {
        owner = msg.sender;
        usdc = IERC20(_usdcAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function addValidHashedToken(bytes32 _hashedToken) public onlyOwner {
        validHashedTokens[_hashedToken] = true;
    }

    function rewardUser(address _user, bytes32 _hashedToken) public onlyOwner {
        require(validHashedTokens[_hashedToken], "Invalid or no interaction token provided.");
        require(submissionCount[_user] < MAX_SUBMISSIONS, "Submission limit reached.");
        require(usdc.transfer(_user, REWARD_AMOUNT), "Failed to transfer USDC.");
        submissionCount[_user] += 1; // Increment the submission count for the user
    }

    function isHashedTokenValid(bytes32 _hashedToken) public view returns (bool) {
        return validHashedTokens[_hashedToken];
    }

    // Function to check the contract's USDC balance, restricted to the owner
    function checkUSDCBalance() public view onlyOwner returns (uint256) {
        return usdc.balanceOf(address(this));
    }

    // Function to change the owner
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address.");
        owner = newOwner;
    }
}