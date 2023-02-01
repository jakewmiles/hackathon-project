import { Controller, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':address')
  makeTransaction(@Param('address') address: string): Promise<void> {
    return this.transactionService.makeTransaction(address);
  }
}
