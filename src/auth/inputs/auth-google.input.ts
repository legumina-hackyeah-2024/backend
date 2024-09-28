import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class GoogleAuthInput {
  @Field({ nullable: true })
  @IsOptional()
  code?: string;

  @Field({ nullable: true })
  @IsOptional()
  accessToken?: string;

  @Field({ nullable: true })
  username?: string;
}
