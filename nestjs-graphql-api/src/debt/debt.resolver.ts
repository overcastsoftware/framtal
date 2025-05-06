import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { DebtService } from './debt.service';
import { Debt } from '../models/debt.model';
import { UpdateDebtInput } from '../graphql/dto/update-debt.input';
import { CreateDebtInput } from '../graphql/dto/create-debt.input';

@Resolver(() => Debt)
export class DebtResolver {
  constructor(private debtService: DebtService) {}

  @Query(() => [Debt])
  async debts(): Promise<Debt[]> {
    return this.debtService.findAll();
  }

  @Query(() => Debt, { nullable: true })
  async debt(@Args('id', { type: () => Int }) id: number): Promise<Debt> {
    return this.debtService.findOne(id);
  }

  @Query(() => [Debt])
  async debtsByApplication(
    @Args('applicationId', { type: () => Int }) applicationId: number,
  ): Promise<Debt[]> {
    return this.debtService.findByApplicationId(applicationId);
  }

  @Query(() => [Debt])
  async debtsByNationalId(
    @Args('nationalId') nationalId: string,
  ): Promise<Debt[]> {
    return this.debtService.findByNationalId(nationalId);
  }

  @Mutation(() => Debt)
  async updateDebt(
    @Args('updateDebtInput') updateDebtInput: UpdateDebtInput,
  ): Promise<Debt> {
    return this.debtService.update(updateDebtInput);
  }
  
  @Mutation(() => Debt)
  async createDebt(
    @Args('createDebtInput') createDebtInput: CreateDebtInput,
  ): Promise<Debt> {
    return this.debtService.create(createDebtInput);
  }
  
  @Mutation(() => Boolean)
  async deleteDebt(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.debtService.delete(id);
  }
}