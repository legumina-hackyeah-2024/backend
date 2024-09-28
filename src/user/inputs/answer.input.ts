import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class AnswerInput {
    @Field()
    @IsMongoId()
    routeId: string;

    @Field()
    @IsNumber()
    pointIdx: number;

    @Field()
    @IsNumber()
    answerIdx: number;
}