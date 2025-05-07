import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class LoginResolver {
  @Mutation(() => Boolean)
  login(@Args('phoneNumber') phoneNumber: string): boolean {
    console.log(`Login attempt with phone number: ${phoneNumber}`);
    if (phoneNumber !== '7728391') {
      throw new Error('Not a valid phone number');
    }
    return true; // Always return success for demonstration purposes
  }
}