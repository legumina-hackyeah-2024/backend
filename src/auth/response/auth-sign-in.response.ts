import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthSignInResponse {
  @Field()
  sessionToken: string;
  @Field()
  refreshToken: string;
  constructor(sessionToken: string, refreshToken: string) {
    this.sessionToken = sessionToken;
    this.refreshToken = refreshToken;
  }
}
