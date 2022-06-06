// SPDX-License-Identifier: MIT
/**
 *Submitted for verification at BscScan.com on 2022-04-14
*/

// File: node_modules\openzeppelin-solidity\contracts\utils\Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.9;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: openzeppelin-solidity\contracts\access\Ownable.sol

 
// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: openzeppelin-solidity\contracts\utils\Strings.sol

 
// OpenZeppelin Contracts v4.4.1 (utils/Strings.sol)


/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}

// File: contracts\LokaStaking.sol

 
//not using SafeMath for Solidity 0.8.9++
contract LokaStaking is Ownable {
    struct LokaStake{
        uint256 stakeStartTime;
        uint256 lastRewardCalculationSecond;
        uint256 claimableRewards;
        uint256 claimedRewards;
        bool staked;
        uint256 yieldEffectivity;
    }
    uint256 lastRewardCalculationTime;
    uint256 timeStart;
    //uint8 monthCounter;
    uint256 timeCheckPoint;
    uint256 daysOfMonth;
    //uint256 []monthlyPoolAllocation;
    //uint8 currentMonthlyAllocationIndex;
    //uint8 currentMonth;
    uint8 today;
    mapping (uint256 => LokaStake) public stakes;
    uint[] stakingIndex;
    uint256[] lokaIndex;

    mapping (uint256 => uint256) internal stakingIndexMap;
    LokaNFT lokaNFT;
    IGatewayRegistry public registry;

    struct lokaNFTDetail {
		uint256 yieldEffectivity;
		bool isSet;
	}
    lokaNFTDetail[] public lokaNFTs;
    //time tool
    struct _DateTime {
            uint16 year;
            uint8 month;
            uint8 day;
            uint8 hour;
            uint8 minute;
            uint8 second;
            uint8 weekday;
    }
    
    uint constant DAY_IN_SECONDS = 86400;
    uint constant YEAR_IN_SECONDS = 31536000;
    uint constant LEAP_YEAR_IN_SECONDS = 31622400;
    uint constant HOUR_IN_SECONDS = 3600;
    uint constant MINUTE_IN_SECONDS = 60;
    uint16 constant ORIGIN_YEAR = 1970;

    event TokenStaked(address indexed address_, uint256 tokenId_);
    event TokenUnStaked(address indexed address_, uint256 tokenId_);
    event RewardClaimed(address indexed address_, uint256 tokenAmount_);

    constructor()  {
        lokaNFT = LokaNFT(0x90c42b627Fc618e7b4ED5D730d97868dB7c7bD30);
        timeStart=block.timestamp;
        lastRewardCalculationTime = timeStart;
        //currentMonthlyAllocationIndex= getMonth(timeStart);
        //currentMonth =  getMonth(timeStart);
        today= getDay(timeStart);
        daysOfMonth =  getDaysInMonth( getMonth(timeStart), getYear(timeStart))- getDay(timeStart);
        //adjusting manual allocation based on Whitepaper
       // monthlyPoolAllocation =  [2240000000, 1680000000, 140000000,560000000,280000000];
    }
  
    function addNFT(uint256 tokenId, uint8 yieldEffectivity){
        
    }

    function stakeLoka(uint256 [] memory tokenIds_)public  {
        for(uint256 i=0;i<tokenIds_.length;i++){
            require(lokaNFT.ownerOf(tokenIds_[i])==msg.sender,"Not the owner");
            require(!stakes[tokenIds_[i]].staked,"Already being staked");
            lokaNFT.safeTransferFrom(msg.sender,address(this),tokenIds_[i]);
            stakes[tokenIds_[i]].stakeStartTime = block.timestamp;
            stakes[tokenIds_[i]].yieldEffectivity = lokaNFT.yieldEffectivityOf(tokenIds_[i]);
            stakes[tokenIds_[i]].staked = true;
            stakes[tokenIds_[i]].lastRewardCalculationSecond =  getSecond(stakes[tokenIds_[i]].stakeStartTime);
            stakes[tokenIds_[i]].claimableRewards = 0;
            stakingIndex.push(tokenIds_[i]);
            stakingIndexMap[tokenIds_[i]]=stakingIndex.length-1;
            //Emit Staked
        }
    
    }
    
    function unstakeLoka(uint256 [] memory tokenIds_)public {
         for(uint256 i=0;i<tokenIds_.length;i++){
            require(lokaNFT.ownerOf(tokenIds_[i])==msg.sender,"Not the owner");
            require(stakes[tokenIds_[i]].staked,"not staked");
            lokaNFT.safeTransferFrom(address(this),msg.sender,tokenIds_[i]);
            delete stakes[tokenIds_[i]];
            stakingIndex[stakingIndexMap[tokenIds_[i]]]=stakingIndex[stakingIndex.length-1];
            delete stakingIndexMap[tokenIds_[i]];
            stakingIndex.pop();
        }
    }

    function isStaked(uint256 tokenId) public view returns(bool){
        return stakes[tokenId].staked;
    }
    function getStakeStartTime(uint256 tokenId) public view returns(uint256){
        return stakes[tokenId].stakeStartTime;
    }
    function getClaimableRewards(uint256 tokenId) public view returns(uint256){
        return stakes[tokenId].claimableRewards;
    }
    function getClaimedRewards(uint256 tokenId) public view returns(uint256){
        return stakes[tokenId].claimedRewards;
    }

    function calculate24HoursRewards(uint256 miningYield) external onlyOwner{
        //getALLLokaDetailNFT
        uint256 currentTime = block.timestamp;
        require( getDay(currentTime)!=today,"Still within 24 hours since last disbursement");
        //require( getHour(currentTime)==0,"Disbursement at 00:01");
        today= getDay(currentTime);
         //variable to show how many hours x each NFTs being staked
        uint256 totalSeconds = 0;
        for(uint256 i=0;i<stakingIndex.length;i++){
            uint256 secondsStaked = (86400-stakes[stakingIndex[i]].lastRewardCalculationSecond);
            totalSeconds+=secondsStaked;
        }
        for(uint256 i=0;i<stakingIndex.length;i++){
            //uint speciesYield = stakes[stakingIndex[i]].yieldEffectivity
            stakes[stakingIndex[i]].claimableRewards += stakes[stakingIndex[i]].yieldEffectivity*((24-stakes[stakingIndex[i]].lastRewardCalculationSecond)/totalSeconds)*miningYield;
            //stakes[stakingIndex[i]].claimableRewards += ((24-stakes[stakingIndex[i]].lastRewardCalculationSecond)/totalSeconds)*miningYield;
            stakes[stakingIndex[i]].lastRewardCalculationSecond=0;
        }
        lastRewardCalculationTime = currentTime;
        //Emit Calculated
    }

    function claimLokaNFTYieldRewards() public {
        //requires stakes.claiming false
        //stakes.claiming true
        //lokaBridge.transferFrom(alamat ini, alamat tukang claim);
        //stakes[index].claimedRewards+=stakes[index].claimableRewards
        //stakes[index].claimableRewards=0
        
        //stakes.claiming false
        //Emit claimed
    }

  

    function getTimeStamp() public view returns(uint256){
        return block.timestamp;
    }

    function isLeapYear(uint16 year) public pure returns (bool) {
            if (year % 4 != 0) {
                    return false;
            }
            if (year % 100 != 0) {
                    return true;
            }
            if (year % 400 != 0) {
                    return false;
            }
            return true;
    }

    function leapYearsBefore(uint year) public pure returns (uint) {
            year -= 1;
            return year / 4 - year / 100 + year / 400;
    }

    function getDaysInMonth(uint8 month, uint16 year) public pure returns (uint8) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    return 31;
            }
            else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    return 30;
            }
            else if (isLeapYear(year)) {
                    return 29;
            }
            else {
                    return 28;
            }
    }

    function parseTimestamp(uint timestamp) internal pure returns (_DateTime memory) {
            uint secondsAccountedFor = 0;
            uint buf;
            uint8 i;
            _DateTime memory dt;
            // Year
            dt.year = getYear(timestamp);
            buf = leapYearsBefore(dt.year) - leapYearsBefore(ORIGIN_YEAR);

            secondsAccountedFor += LEAP_YEAR_IN_SECONDS * buf;
            secondsAccountedFor += YEAR_IN_SECONDS * (dt.year - ORIGIN_YEAR - buf);

            // Month
            uint secondsInMonth;
            for (i = 1; i <= 12; i++) {
                    secondsInMonth = DAY_IN_SECONDS * getDaysInMonth(i, dt.year);
                    if (secondsInMonth + secondsAccountedFor > timestamp) {
                            dt.month = i;
                            break;
                    }
                    secondsAccountedFor += secondsInMonth;
            }

            // Day
            for (i = 1; i <= getDaysInMonth(dt.month, dt.year); i++) {
                    if (DAY_IN_SECONDS + secondsAccountedFor > timestamp) {
                            dt.day = i;
                            break;
                    }
                    secondsAccountedFor += DAY_IN_SECONDS;
            }

            // Hour
            dt.hour = getHour(timestamp);

            // Minute
            dt.minute = getMinute(timestamp);

            // Second
            dt.second = getSecond(timestamp);

            // Day of week.
            dt.weekday = getWeekday(timestamp);
            return dt;
    }

    function getYear(uint timestamp) public pure returns (uint16) {
            uint secondsAccountedFor = 0;
            uint16 year;
            uint numLeapYears;

            // Year
            year = uint16(ORIGIN_YEAR + timestamp / YEAR_IN_SECONDS);
            numLeapYears = leapYearsBefore(year) - leapYearsBefore(ORIGIN_YEAR);

            secondsAccountedFor += LEAP_YEAR_IN_SECONDS * numLeapYears;
            secondsAccountedFor += YEAR_IN_SECONDS * (year - ORIGIN_YEAR - numLeapYears);

            while (secondsAccountedFor > timestamp) {
                    if (isLeapYear(uint16(year - 1))) {
                            secondsAccountedFor -= LEAP_YEAR_IN_SECONDS;
                    }
                    else {
                            secondsAccountedFor -= YEAR_IN_SECONDS;
                    }
                    year -= 1;
            }
            return year;
    }

    function getMonth(uint timestamp) public pure returns (uint8) {
            return parseTimestamp(timestamp).month;
    }

    function getDay(uint timestamp) public pure returns (uint8) {
            return parseTimestamp(timestamp).day;
    }

    function getHour(uint timestamp) public pure returns (uint8) {
            return uint8((timestamp / 60 / 60) % 24);
    }

    function getMinute(uint timestamp) public pure returns (uint8) {
            return uint8((timestamp / 60) % 60);
    }

    function getSecond(uint timestamp) public pure returns (uint8) {
            return uint8(timestamp % 60);
    }

    function getWeekday(uint timestamp) public pure returns (uint8) {
            return uint8((timestamp / DAY_IN_SECONDS + 4) % 7);
    }

       
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}


interface IGateway {
    function mint(bytes32 _pHash, uint256 _amount, bytes32 _nHash, bytes calldata _sig) external returns (uint256);
    function burn(bytes calldata _to, uint256 _amount) external returns (uint256);
}

interface LokaNFT{

  function ownerOf(uint256 tokenId_) external returns(address);
  function yieldEffectivityOf(uint256 tokenId_) external returns(uint256);
  function levelOf(uint256 tokenId_) external returns(uint256);
  function safeTransferFrom(address from, address to, uint256 tokenId) external;
}	
    
interface IGatewayRegistry {
    function getGatewayBySymbol(string calldata _tokenSymbol) external view returns (IGateway);
    function getTokenBySymbol(string calldata _tokenSymbol) external view returns (IERC20);
}
