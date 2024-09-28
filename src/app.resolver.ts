import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  public hello(): string {
    return 'Hello World!';
  }
}
