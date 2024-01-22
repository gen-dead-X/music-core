import { Field, InputType, ObjectType } from 'type-graphql';
// import { GraphQLUpload } from 'graphql-upload';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

@ObjectType()
export class Track {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  audioFile?: string;

  @Field(() => String)
  artist!: string;

  @Field(() => String)
  uploader!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  albumId!: string;

  @Field(() => String)
  genre!: string;

  @Field(() => String)
  release!: string;

  @Field(() => String, { nullable: true })
  albumArtWork?: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  tags?: string[];

  @Field(() => String)
  privacy!: string;
}

@ObjectType()
export class NewTrackResponse {
  @Field(() => String)
  message?: string;

  @Field(() => Boolean)
  success!: boolean;

  @Field(() => Track)
  data?: Track;
}

@InputType()
export class TrackInputs {
  @Field(() => String)
  title!: string;

  @Field(() => GraphQLUpload, { nullable: true })
  audioFile?: typeof GraphQLUpload;

  @Field(() => String)
  artist!: string;

  @Field(() => String)
  uploader!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  albumId!: string;

  @Field(() => String)
  genre!: string;

  @Field(() => String)
  release!: string;

  @Field(() => String, { nullable: true })
  albumArtWork?: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  tags?: string[];

  @Field(() => String)
  privacy!: string;
}
