import axios from "axios";

//types
import { MongoAPIFunction } from "@Types/Mongo";

export const mongoAPI: MongoAPIFunction = async ({
  DATA_API_URL,
  DATA_API_KEY,
  dataSource,
  db,
  collection,
  action,
  document = null,
  filter = null,
  projection = null,
  sort = null,
  limit = null,
  skip = null,
}) => {
  const data = Object.assign(
    {},
    { dataSource: dataSource },
    { database: db },
    { collection: collection },
    document && { document: document },
    filter && { filter: filter },
    projection && { projection: projection },
    sort && { sort: sort },
    limit && { limit: limit },
    skip && { skip: skip }
  );
  const response = await axios({
    method: "POST",
    url: `${DATA_API_URL}/action/${action}`,
    headers: {
      "Content-Type": "application/json",
      "api-key": DATA_API_KEY,
    },
    data: data,
  });

  return response.data;
};
