import { ApplicationResolver } from '../../application/application.resolver';
import { EntityResolver } from '../../entity/entity.resolver';
import { AssetResolver } from '../../asset/asset.resolver';
import { DebtResolver } from '../../debt/debt.resolver';
import { IncomeResolver } from '../../income/income.resolver';

export const resolvers = [
  ApplicationResolver,
  EntityResolver,
  AssetResolver,
  DebtResolver,
  IncomeResolver,
];