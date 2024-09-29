import { Field, InputType, Int } from '@nestjs/graphql';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class AnswerInput {
    @Field()
    @IsMongoId()
    routeId: string;

    @Field(() => Int)
    @IsNumber()
    pointIdx: number;

    @Field(() => Int)
    @IsNumber()
    answerIdx: number;
}