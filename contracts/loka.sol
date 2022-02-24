// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";

contract Loka is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;
	uint256 internal max_supply=0;
	uint256 public cost = 0.001 ether;
	uint256 private itemCounter;
	address [] public holderIndex;
	mapping(uint256 => string) public tokenAttribute;
	mapping(address => uint256) public claimableYield;
	function name() public view virtual override returns (string memory)
	{return("LoKa - Renewable Energy Blockchain Miner_V2");}
	// Ideally, you would pass in some sort of unique identifier to reference your token
	// for this demo we're just repurposing the token URI
	mapping(string => uint256) public _uriId;
	mapping(address => uint256) public _tokenOwned;
	mapping(address => bool) public _holderExists;
	uint256 currentYield = 0;
	address payable thisContract;
	bool internal disbursed=false;
	uint256 totalDisbursed = 0;
	
	constructor() ERC721("Loka", "LOKA") {
		thisContract=payable(address(this));
		currentYield = 0.005 ether;
		max_supply=10000;
	}
	
	function getHolderIndex(uint256 id) public view returns(address){
		return holderIndex[id];
	}
	function getCurrentYield() public view onlyOwner returns(uint256){
        return currentYield/1 gwei;
    }

	function setCurrentYield(uint256 yield) public onlyOwner{
        currentYield=yield*1 gwei;
		disbursed=false;
    }

	function disburseYield() public onlyOwner{
		require(!disbursed,"this yield has been disbursed");
		for(uint256 i=0;i<holderIndex.length;i++){
			claimableYield[holderIndex[i]]+=(tokenQuantity(holderIndex[i])*currentYield)/totalSupply();
		}
		disbursed=true;
	}

	function test_yield() public view returns(uint256){
		return (tokenQuantity(msg.sender)*currentYield)/totalSupply();
		
	}

	function getYield() public view returns(uint256) {
		return claimableYield[msg.sender]/1 gwei;
	}
	function claimYield() public payable {
        payable(msg.sender).transfer(claimableYield[msg.sender]);
		claimableYield[msg.sender]=0;
    }

	function receiveEth() public payable {
        
    }
	

	function mintNFT(string memory _tokenURI)
        public payable
        returns (uint256)
    {
		require(_uriId[_tokenURI] == 0, "This key is already minted");
		
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        setTokenUri(newItemId, _tokenURI);
        _setTokenURI(newItemId, _tokenURI);
		_tokenOwned[msg.sender]+=1;
        itemCounter = _tokenIds.current();
		if(!_holderExists[msg.sender]){
			_holderExists[msg.sender]=true;
			holderIndex.push(msg.sender);	
			claimableYield[msg.sender]=0 ether;
		}	
        return newItemId;
    }




		
	function _baseURI() internal pure override returns (string memory) {
		return "http://localhost:3000";
	}
	
	function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}
	
	function _beforeTokenTransfer(address from, address to, uint256 tokenId)
		internal
		override(ERC721, ERC721Enumerable)
	{
		super._beforeTokenTransfer(from, to, tokenId);
	}

	function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721, ERC721Enumerable)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}
	
	function tokenURI(uint256 id) public override(ERC721, ERC721URIStorage) view returns (string memory){
       
    	string memory encodedUri =  Base64.encode(
            bytes(string(
                abi.encodePacked(tokenAttribute[id])
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', encodedUri));
        //return theUri;
	}


	
  function setTokenUri(uint256 id, string memory attributeUri) internal{
        tokenAttribute[id]=attributeUri;
    }

	function tokenByUri(string memory _uri) external view returns(uint256) {
		return _uriId[_uri];
	}

	function tokenQuantity(address addr) public view returns(uint256) {
		return _tokenOwned[addr];
	}

	function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
		uint256 tokenCount = balanceOf(_owner);

		if (tokenCount == 0) {
			// Return an empty array
			return new uint256[](0);
		} else {
			uint256[] memory result = new uint256[](tokenCount);
			uint256 totalKeys = totalSupply();
			uint256 resultIndex = 0;

			// We count on the fact that all tokens have IDs starting at 1 and increasing
			// sequentially up to the totalSupply count.
			uint256 tokenId;

			for (tokenId = 1; tokenId <= totalKeys; tokenId++) {
				if (ownerOf(tokenId) == _owner) {
					result[resultIndex] = tokenId;
					resultIndex++;
				}
			}

			return result;
		}
	}
}
