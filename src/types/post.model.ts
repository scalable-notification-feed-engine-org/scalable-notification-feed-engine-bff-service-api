import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { User } from './user.model';


@ObjectType()
export class PostComment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  userId: string;
}

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => [String])
  mediaUrls: string[];

  @Field()
  createAt: Date;

  @Field(() => Int)
  likeCount: number;

  @Field(() => Int)
  commentCount: number;

  @Field(() => User)
  author: User;

  @Field(() => [PostComment], { nullable: true })
  comments?: PostComment[];
}

