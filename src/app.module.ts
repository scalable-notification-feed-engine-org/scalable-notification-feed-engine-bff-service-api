import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostResolver } from './resolver/post.resolver';
import { FeedService } from './service/feed.service';
import { UserService } from './service/user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  providers: [PostResolver,FeedService, UserService]
})
export class AppModule {}