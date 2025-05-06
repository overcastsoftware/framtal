import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { IncomeService } from './income.service';
import { Income } from '../models/income.model';
import { UpdateIncomeInput } from '../graphql/dto';

@Resolver(() => Income)
export class IncomeResolver {
  constructor(private incomeService: IncomeService) {}

  @Query(() => [Income])
  async incomes(): Promise<Income[]> {
    return this.incomeService.findAll();
  }

  @Query(() => Income, { nullable: true })
  async income(@Args('id', { type: () => Int }) id: number): Promise<Income> {
    return this.incomeService.findOne(id);
  }

  @Query(() => [Income])
  async incomesByApplication(
    @Args('applicationId', { type: () => Int }) applicationId: number,
  ): Promise<Income[]> {
    return this.incomeService.findByApplicationId(applicationId);
  }

  @Query(() => [Income])
  async incomesByNationalId(
    @Args('nationalId') nationalId: string,
  ): Promise<Income[]> {
    return this.incomeService.findByNationalId(nationalId);
  }
  
  @Query(() => [Income])
  async incomesByPayor(
    @Args('payorId') payorId: string,
  ): Promise<Income[]> {
    return this.incomeService.findByPayorId(payorId);
  }

  @Mutation(() => Income)
  async updateIncome(
    @Args('updateIncomeInput') updateIncomeInput: UpdateIncomeInput,
  ): Promise<Income> {
    const { id, ...updateData } = updateIncomeInput;
    return this.incomeService.updateIncome(id, updateData);
  }
}