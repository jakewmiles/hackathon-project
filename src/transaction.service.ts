import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Alchemy, Network, Utils, Wallet } from 'alchemy-sdk';

dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const wallet = new Wallet(PRIVATE_KEY);

@Injectable()
export class TransactionService {
  async makeTransaction(address: string): Promise<void> {
    const nonce = await alchemy.core.getTransactionCount(
      wallet.address,
      'latest',
    );

    const transaction = {
      to: address,
      value: Utils.parseEther('0.001'),
      gasLimit: '21000',
      maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
      maxFeePerGas: Utils.parseUnits('20', 'gwei'),
      nonce: nonce,
      type: 2,
      chainId: 5,
    };

    try {
      const rawTransaction = await wallet.signTransaction(transaction);
      const tx = await alchemy.core.sendTransaction(rawTransaction);
      console.log('Sent transaction', tx);
    } catch (e) {
      throw new Error(e);
    }
  }
}
