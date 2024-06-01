import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ChatModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true, // Eklenmez ise  client tarafından bağlantı  dinlenemiyor hata  fırlatmıyor
        },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GRAPHQL_PLAYGROUND: Joi.number(),
      }),
    }),
    PubSubModule,
    MessagesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
