import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class HeroInput {
    @Field({ nullable: true })
    @IsMongoId()
    @IsOptional()
    id?: string;
}