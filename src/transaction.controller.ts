import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

export interface TransactionDto {
  address: string;
  amount: string;
}
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  makeTransaction(@Body() transaction: TransactionDto): Promise<void> {
    console.log(transaction);

    return this.transactionService.makeTransaction(transaction);
  }
}
