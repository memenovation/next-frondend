type MongoAction =
  | "insertOne"
  | "insertMany"
  | "findOne"
  | "findMany"
  | "updateOne"
  | "updateMany"
  | "deleteOne"
  | "deleteMany";

interface MongoAPIParams {
  action: MongoAction;
  db: string;
  collection: string;
  document?: {};
  filter?: {};
  projection?: {};
  sort?: {};
  limit?: number;
  skip?: number;
}

export type MongoAPIFunction = (args: MongoAPIParams) => Promise<any>;
