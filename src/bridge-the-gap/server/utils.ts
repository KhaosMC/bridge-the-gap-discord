import { ClientPacketId, ServerPacketId } from "./enums";
import { type Packet } from "./Packet";

interface WebsocketData {
  id: number;
  payload: object;
}

export function parseClientPacket(websocketData: WebsocketData): Packet {
  const packetId = websocketData.id;
  switch (packetId) {
    case ClientPacketId.ClientDisconnect:
      return new ClientClientDisconnectPacket(websocketData.payload, packetId);
    case ClientPacketId.ClientConnect:
      return new ClientConnectPacket(websocketData.payload, packetId);
    case ClientPacketId.UserConnect:
      return new UserConnectPacket(websocketData.payload, packetId);
    case ClientPacketId.UserDisconnect:
      return new UserDisconnectPacket(websocketData.payload, packetId);
    case ClientPacketId.ClientMessage:
      return new ClientMessagePacket(websocketData.payload, packetId);
    case ClientPacketId.UserMessage:
      return new UserMessagePacket(websocketData.payload, packetId);
    case ClientPacketId.ClientWhisper:
      return new ClientWhisperPacket(websocketData.payload, packetId);
    case ClientPacketId.UserWhisper:
      return new UserWhisperPacket(websocketData.payload, packetId);
    case ClientPacketId.UsersRequest:
      return new UsersRequestPacket(websocketData.payload, packetId);
    case ClientPacketId.UsersResponse:
      return new UsersResponsePacket(websocketData.payload, packetId);
    default:
      throw new Error(`Unknown packet id: ${packetId}`);
  }
}
