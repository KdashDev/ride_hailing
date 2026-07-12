import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LocationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRide')
  handleJoinRide(
    @MessageBody() data: { rideId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.rideId);
    console.log(`Client ${client.id} joined ride ${data.rideId}`);
    return { status: 'joined', rideId: data.rideId };
  }

  @SubscribeMessage('updateLocation')
  handleUpdateLocation(
    @MessageBody() data: { rideId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast the location update to all clients in the ride room
    this.server.to(data.rideId).emit('locationUpdated', {
      lat: data.lat,
      lng: data.lng,
      timestamp: new Date().toISOString(),
    });
  }
}
