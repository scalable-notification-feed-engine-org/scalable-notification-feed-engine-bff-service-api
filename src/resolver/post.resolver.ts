import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from '../types/post.model';
import { FeedService } from '../service/feed.service';
import { UserService } from '../service/user.service';
import { User } from '../types/user.model';
import * as postFromServiceInterface from '../interfaces/post-from-service.interface';
import * as graphqlContextInterface from '../interfaces/graphql-context.interface';
import { jwtDecode } from 'jwt-decode';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly feedService: FeedService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Post])
  async getFeed(@Context() context: graphqlContextInterface.GraphqlContext) {
    const authHeader = context.headers.authorization;
    if (!authHeader) {
      throw new Error('Unauthorized');
    }

    const decode = jwtDecode(authHeader);
    const userId: string = decode.sub!;


  const feeds = await this.feedService.getAllFeeds(authHeader || '', userId);
  return (feeds || []).map(feed => ({
    id: feed.id,
    content: feed.content,
    mediaUrls: feed.mediaUrls || [],
    createAt: new Date(feed.createAt),
    likeCount: feed.likeCount || 0,
    commentCount: feed.commentCount || 0,
    author: {
      id: feed.userId,
    }
  } ));
  }

  @ResolveField(() => User)
  async author(@Parent() post: postFromServiceInterface.PostFromService,@Context() context: graphqlContextInterface.GraphqlContext) {
    const authHeader = context.headers.authorization;
    console.log("Authorized", authHeader);
    if (!authHeader) {
      throw new Error('Unauthorized');
    }
    const { userId } = post;
    return await this.userService.getUserById(userId,authHeader);
  }
}
