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
  DATA_API_URL: string;
  DATA_API_KEY: string;
  action: MongoAction;
  dataSource: string;
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
