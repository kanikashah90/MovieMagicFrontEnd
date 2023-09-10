/* eslint-disable no-mixed-spaces-and-tabs */
// import { useCallback, useState } from 'react';
import { useState } from 'react';
// import { useCosmWasmClient, useSigningCosmWasmClient, useWallet, WalletConnectButton } from '@sei-js/react';
import { useSigningCosmWasmClient, useWallet, WalletConnectButton } from '@sei-js/react';

const CONTRACT_ADDRESS = 'sei16etkm8jsxhfnycdwt8ckylsgpmw68nkrw2ew0kyd05rkcka9nlqsftuw0m'; // (atlantic-2 example) sei18g4g35mhy5s88nshpa6flvpj9ex6u88l6mhjmzjchnrfa7xr00js0gswru
const PLAYER_STAKE = 20;

function Home() {
	const [error, setError] = useState<string>('');
  const [gameName, setGameName] = useState<string>('');
  const [adventureNumber, setAdventureNumber] = useState<number>(0);


	// Helpful hook for getting the currently connected wallet and chain info
	const { connectedWallet, accounts } = useWallet();

	// For querying cosmwasm smart contracts
	// const { cosmWasmClient: queryClient } = useCosmWasmClient();
	
	// For executing messages on cosmwasm smart contracts
	const { signingCosmWasmClient: signingClient } = useSigningCosmWasmClient();
  
  const initGame = async () => {
    try {
      const senderAddress = accounts[0].address;
      
      // Build message content
      const msg = {
        init_game:{
          name: gameName,
          player: senderAddress,
          game_stake: PLAYER_STAKE,
          num_of_adventures: 5
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }
  }

  const joinGame = async () => {
    try {
      const senderAddress = accounts[0].address;
      
      // Build message content
      const msg = {
        add_game_player:{
          name: gameName,
          player: senderAddress,
          game_stake: PLAYER_STAKE,
          num_of_adventures: 5
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending Add Player to the game message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }
  }

  const startGame = async () => {
    try {
      const senderAddress = accounts[0].address;

      // Build message content
      const msg = {
        start_game:{
          name: gameName,
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending start game message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }
  }

  const makeHappyVote = async () => {
    try {
      const senderAddress = accounts[0].address;

      // Build message content
      const msg = {
        vote_for_adventure:{
          name: gameName,
          player: senderAddress,
          vote: 1,
          adventure_number: adventureNumber
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending vote message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);

      setAdventureNumber(adventureNumber + 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }

  }

  const makeSadVote = async () => {
    try {
      const senderAddress = accounts[0].address;

      // Build message content
      const msg = {
        vote_for_adventure:{
          name: gameName,
          player: senderAddress,
          vote: 2,
          adventure_number: adventureNumber
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending vote message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);

      setAdventureNumber(adventureNumber + 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }

  }

  const endGame = async () => {
    try {
      const senderAddress = accounts[0].address;

      // Build message content
      const msg = {
        end_game:{
          name: gameName,
        }
      };

      // Define gas price and limit
      const fee = {
        amount: [{ amount: '20000', denom: 'usei' }],
        gas: '200000'
      };

      console.log(`Sending end game message ${JSON.stringify(msg)} to contract ${CONTRACT_ADDRESS}`)

      // Call smart contract execute msg
      await signingClient?.execute(senderAddress, CONTRACT_ADDRESS, msg, fee);

      setAdventureNumber(adventureNumber + 1);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('unknown error');
      }
    }

  }
  

	// Helpful component for wallet connection
	if (!connectedWallet) return <WalletConnectButton />;

	return (
    <div>
      <input type="text" placeholder='Enter game name' onChange={(e) => setGameName(e.target.value)} />

      <div>
        <button onClick={initGame}>Start New Game</button>
        <button onClick={joinGame}>Join Game</button>
      </div>
      <div>
        <button onClick={startGame}>Game Start</button>
        <button onClick={makeHappyVote}>Happy</button>
        <button onClick={makeSadVote}>Sad</button>
      </div>
      <button onClick={endGame}>End Game</button>
		{error && <p style={{ color: 'red' }}>{error}</p>}
	    </div>
	);
}

export default Home;