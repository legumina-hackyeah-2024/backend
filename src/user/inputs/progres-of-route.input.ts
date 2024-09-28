import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';

@InputType()
export class ProgresOfRouteInput {
    @Field()
    @IsMongoId()
    routeId: string;
}