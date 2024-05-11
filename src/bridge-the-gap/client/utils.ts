import { PacketId } from "../enums";
import { type Packet } from "../Packet";
import {
  ClientConnectPacket,
  ClientDisconnectPacket,
  UserConnectPacket,
  UserDisconnectPacket,
  ClientMessagePacket,
  UserMessagePacket,
  ClientWhisperPacket,
  UserWhisperPacket,
  UsersRequestPacket,
  UsersResponsePacket,
} from "./Packet";

interface WebsocketData {
  id: number;
  payload: object;
}

export function parseClientPacket(websocketData: WebsocketData): Packet {
  const packetId = websocketData.id;
  switch (packetId) {
    case PacketId.ClientDisconnect:
      return new ClientDisconnectPacket(websocketData.payload, packetId);
    case PacketId.ClientConnect:
      return new ClientConnectPacket(websocketData.payload, packetId);
    case PacketId.UserConnect:
      return new UserConnectPacket(websocketData.payload, packetId);
    case PacketId.UserDisconnect:
      return new UserDisconnectPacket(websocketData.payload, packetId);
    case PacketId.ClientMessage:
      return new ClientMessagePacket(websocketData.payload, packetId);
    case PacketId.UserMessage:
      return new UserMessagePacket(websocketData.payload, packetId);
    case PacketId.ClientWhisper:
      return new ClientWhisperPacket(websocketData.payload, packetId);
    case PacketId.UserWhisper:
      return new UserWhisperPacket(websocketData.payload, packetId);
    case PacketId.UsersRequest:
      return new UsersRequestPacket(websocketData.payload, packetId);
    case PacketId.UsersResponse:
      return new UsersResponsePacket(websocketData.payload, packetId);
    default:
      throw new Error(`Unknown packet id: ${packetId}`);
  }
}
