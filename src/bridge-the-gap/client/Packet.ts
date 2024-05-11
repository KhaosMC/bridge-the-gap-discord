import { z, type ZodSchema } from "zod";
import { type Packet } from "../Packet";

const eightBitSchema = z
  .number()
  .min(0)
  .max(Math.pow(2, 8) - 1);

const fourByteSchema = z
  .number()
  .min(0)
  .max(Math.pow(2, 32) - 1);

const messageSchema = z.string().min(1).max(1024);

export class ClientConnectPacket implements Packet {
  payload: object;
  id: number = 0;
  platform: number = 0;
  name: string = "";
  color: number = 0;

  parseOptions: ZodSchema = z.object({
    platform: eightBitSchema,
    name: z.string().min(1).max(32),
    color: fourByteSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.platform = parsedData.data.platform;
    this.name = parsedData.data.name;
    this.color = parsedData.data.color;
  }
}

export class ClientDisconnectPacket implements Packet {
  payload: object;
  id: number = 0;
  platform: number = 0;
  name: string = "";
  color: number = 0;

  parseOptions: ZodSchema = z.object({
    platform: eightBitSchema,
    name: z.string().min(1).max(32),
    color: fourByteSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.platform = parsedData.data.platform;
    this.name = parsedData.data.name;
    this.color = parsedData.data.color;
  }
}

export class UserConnectPacket implements Packet {
  payload: object;
  id: number = 0;
  name: string = "";
  color: number = 0;

  parseOptions: ZodSchema = z.object({
    name: z.string().min(1).max(32),
    color: fourByteSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.name = parsedData.data.name;
    this.color = parsedData.data.color;
  }
}

export class UserDisconnectPacket implements Packet {
  payload: object;
  id: number = 0;
  userId: number = 0;

  parseOptions: ZodSchema = z.object({
    userId: fourByteSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.userId = parsedData.data.userId;
  }
}

export class ClientMessagePacket implements Packet {
  payload: object;
  id: number = 0;
  message: string = "";

  parseOptions: ZodSchema = z.object({
    message: messageSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.message = parsedData.data.message;
  }
}

export class UserMessagePacket implements Packet {
  payload: object;
  id: number = 0;
  user: string = "";
  message: string = "";

  parseOptions: ZodSchema = z.object({
    user: z.string().min(1).max(32),
    message: messageSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.user = parsedData.data.user;
    this.message = parsedData.data.message;
  }
}

export class ClientWhisperPacket implements Packet {
  payload: object;
  id: number = 0;
  targetClient: string = "";
  targetUser: string = "";
  message: string = "";

  parseOptions: ZodSchema = z.object({
    targetClient: z.string().min(1).max(32),
    targetUser: z.string().min(1).max(32),
    message: messageSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.targetClient = parsedData.data.targetClient;
    this.targetUser = parsedData.data.targetUser;
    this.message = parsedData.data.message;
  }
}

export class UserWhisperPacket implements Packet {
  payload: object;
  id: number = 0;
  user: string = "";
  targetClient: string = "";
  targetUser: string = "";
  message: string = "";

  parseOptions: ZodSchema = z.object({
    user: z.string().min(1).max(32),
    targetClient: z.string().min(1).max(32),
    targetUser: z.string().min(1).max(32),
    message: messageSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.user = parsedData.data.user;
    this.targetClient = parsedData.data.targetClient;
    this.targetUser = parsedData.data.targetUser;
    this.message = parsedData.data.message;
  }
}

export class UsersRequestPacket implements Packet {
  payload: object;
  id: number = 0;
  client: string = "";
  selection: number = 0;

  parseOptions: ZodSchema = z.object({
    client: z.string().min(1).max(32),
    selection: eightBitSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.client = parsedData.data.client;
    this.selection = parsedData.data.selection;
  }
}

export class UsersResponsePacket implements Packet {
  payload: object;
  id: number = 0;
  granted: boolean = false;
  reason: string = "";

  parseOptions: ZodSchema = z.object({
    granted: z.coerce.boolean(),
    reason: messageSchema,
  });

  constructor(payload: object, id: number) {
    this.payload = payload;
    this.id = id;
    this.parseData();
  }

  parseData() {
    const parsedData = this.parseOptions.safeParse(this.payload);
    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0].message);
    }
    this.granted = parsedData.data.granted;
    this.reason = parsedData.data.reason;
  }
}
