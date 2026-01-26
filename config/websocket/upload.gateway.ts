import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { RedisPubSubService } from 'config/redis/ioredis/redis-pubsub.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: true,
    transports: ['websocket'],
})
export class UploadGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly redis: RedisPubSubService) {}

    async afterInit(server: Server) {

        await this.redis.sub.psubscribe('upload:*');

        this.redis.sub.on('pmessage', (_, channel, message) => {
            const uploadId = channel.split(':')[1];

            server
                .to(uploadId)
                .emit('upload-progress', JSON.parse(message));
        });
    }

    handleConnection(client: Socket) {
        const uploadId = client.handshake.query.uploadId as string;

        if (!uploadId) {
            client.disconnect();
            return;
        }

        client.join(uploadId);
    }

    handleDisconnect(_: Socket) { }
}
