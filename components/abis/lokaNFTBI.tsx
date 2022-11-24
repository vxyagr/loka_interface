export const contractAbi = [
    "constructor(string,uint256,uint256,uint256)",
    "event Approval(address indexed,address indexed,uint256 indexed)",
    "event ApprovalForAll(address indexed,address indexed,bool)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "event Paused(address)",
    "event Transfer(address indexed,address indexed,uint256 indexed)",
    "event Unpaused(address)",
    "event devWalletUpdated(address indexed,address indexed)",
    "event treasuryWalletUpdated(address indexed,address indexed)",
    "function _tokenCounter() view returns (uint256)",
    "function approve(address,uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function blacklist(address)",
    "function burnLoka(uint256)",
    "function checkWallet(address,uint256) view returns (bool)",
    "function enablePublicMint()",
    "function getApproved(uint256) view returns (address)",
    "function getLokaOwnedBy(address) view returns (uint256[])",
    "function getPrice() view returns (uint256)",
    "function isApprovedForAll(address,address) view returns (bool)",
    "function isBlacklisted(address) view returns (bool)",
    "function mintLoka(uint256) payable",
    "function name() view returns (string)",
    "function nextOwnerToExplicitlySet() view returns (uint256)",
    "function owner() view returns (address)",
    "function ownerOf(uint256) view returns (address)",
    "function pause()",
    "function paused() view returns (bool)",
    "function receiveEth() payable",
    "function renounceOwnership()",
    "function safeTransferFrom(address,address,uint256)",
    "function safeTransferFrom(address,address,uint256,bytes)",
    "function setApprovalForAll(address,bool)",
    "function setBaseURI(string)",
    "function setLokaWallet(address)",
    "function supportsInterface(bytes4) view returns (bool)",
    "function symbol() view returns (string)",
    "function tokenByIndex(uint256) view returns (uint256)",
    "function tokenOfOwnerByIndex(address,uint256) view returns (uint256)",
    "function tokenURI(uint256) view returns (string)",
    "function totalMinted() view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function transferFrom(address,address,uint256)",
    "function transferOwnership(address)",
    "function unblacklist(address)",
    "function unpause()",
    "function withdrawMoney()",
];