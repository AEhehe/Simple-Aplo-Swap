// Swapper contract ABI
const Swapper_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "token0", "type": "address" },
      { "internalType": "address", "name": "token1", "type": "address" },
      { "internalType": "uint256", "name": "amount0", "type": "uint256" },
      { "internalType": "uint256", "name": "amount1", "type": "uint256" },
      { "internalType": "uint256", "name": "swapFee", "type": "uint256" }
    ],
    "name": "createPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "poolId", "type": "bytes32" },
      { "internalType": "address", "name": "tokenIn", "type": "address" },
      { "internalType": "uint256", "name": "amountIn", "type": "uint256" }
    ],
    "name": "swap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Add other functions...
];

// Set up the web3 provider (e.g., MetaMask)
let provider;
let signer;
if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get signer
    signer = provider.getSigner();  // This is the correct way, no need for `.then()`
    console.log("Signer is: ", signer);
  } catch (err) {
    console.error("User denied account access");
    alert("Please connect your MetaMask wallet.");
  }
} else {
  alert("Please install MetaMask!");
}

// Contract address (replace with the deployed contract address)
const swapperAddress = "0xYourContractAddressHere";  // Replace with actual contract address

// Create the contract instance
let swapperContract;
if (signer) {
  swapperContract = new ethers.Contract(swapperAddress, Swapper_ABI, signer);
}

// Elements from HTML
const token0AddressInput = document.getElementById("token0Address");
const token1AddressInput = document.getElementById("token1Address");
const amount0Input = document.getElementById("amount0");
const amount1Input = document.getElementById("amount1");
const swapButton = document.getElementById("swapButton");

// Add event listener for swapping
swapButton.addEventListener("click", async function() {
  const token0Address = token0AddressInput.value;
  const token1Address = token1AddressInput.value;
  const amount0 = ethers.utils.parseUnits(amount0Input.value, 18);  // Assuming 18 decimals for the token
  const amount1 = ethers.utils.parseUnits(amount1Input.value, 18);  // Assuming 18 decimals for the token

  try {
    // Approve tokens for the contract to transfer
    const token0Contract = new ethers.Contract(token0Address, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    const token1Contract = new ethers.Contract(token1Address, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    const approvalAmount0 = amount0;
    const approvalAmount1 = amount1;

    await token0Contract.approve(swapperAddress, approvalAmount0);
    await token1Contract.approve(swapperAddress, approvalAmount1);
    console.log("Tokens approved!");

    // Fetch the poolId using the two tokens
    const poolId = await swapperContract.getPoolId(token0Address, token1Address);

    // Perform the swap
    await swapperContract.swap(poolId, token0Address, amount0);
    alert("Swap successful!");
  } catch (error) {
    console.error("Swap failed:", error);
    alert("Swap failed: " + error.message);
  }
});

// Add Token to allowed tokens (for owner only)
async function addTokenToContract(tokenAddress) {
  try {
    await swapperContract.addToken(tokenAddress);
    alert("Token added successfully!");
  } catch (error) {
    console.error("Error adding token:", error);
    alert("Error adding token: " + error.message);
  }
}


// Set up the web3 provider (e.g., MetaMask)
let provider;
let signer;
if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get signer
    signer = provider.getSigner();  // This is the correct way, no need for `.then()`
    console.log("Signer is: ", signer);
  } catch (err) {
    console.error("User denied account access");
    alert("Please connect your MetaMask wallet.");
  }
} else {
  alert("Please install MetaMask!");
}

// Contract address (replace with the deployed contract address)
const swapperAddress = "0x857F841e2cd3adE01FcC63F4c9AEeBdAB659ebCB";  // Replace with actual contract address

// Create the contract instance
let swapperContract;
if (signer) {
  swapperContract = new ethers.Contract(swapperAddress, Swapper_ABI, signer);
}

// Elements from HTML
const token0AddressInput = document.getElementById("token0Address");
const token1AddressInput = document.getElementById("token1Address");
const amount0Input = document.getElementById("amount0");
const amount1Input = document.getElementById("amount1");
const swapButton = document.getElementById("swapButton");

// Add event listener for swapping
swapButton.addEventListener("click", async function() {
  const token0Address = token0AddressInput.value;
  const token1Address = token1AddressInput.value;
  const amount0 = ethers.utils.parseUnits(amount0Input.value, 18);  // Assuming 18 decimals for the token
  const amount1 = ethers.utils.parseUnits(amount1Input.value, 18);  // Assuming 18 decimals for the token

  try {
    // Approve tokens for the contract to transfer
    const token0Contract = new ethers.Contract(token0Address, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    const token1Contract = new ethers.Contract(token1Address, [
      "function approve(address spender, uint256 amount) public returns (bool)"
    ], signer);

    const approvalAmount0 = amount0;
    const approvalAmount1 = amount1;

    await token0Contract.approve(swapperAddress, approvalAmount0);
    await token1Contract.approve(swapperAddress, approvalAmount1);
    console.log("Tokens approved!");

    // Fetch the poolId using the two tokens
    const poolId = await swapperContract.getPoolId(token0Address, token1Address);

    // Perform the swap
    await swapperContract.swap(poolId, token0Address, amount0);
    alert("Swap successful!");
  } catch (error) {
    console.error("Swap failed:", error);
    alert("Swap failed: " + error.message);
  }
});

// Add Token to allowed tokens (for owner only)
async function addTokenToContract(tokenAddress) {
  try {
    await swapperContract.addToken(tokenAddress);
    alert("Token added successfully!");
  } catch (error) {
    console.error("Error adding token:", error);
    alert("Error adding token: " + error.message);
  }
}
