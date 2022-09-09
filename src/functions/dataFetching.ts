import axios from "axios";

//types
import { MongoAPIFunction } from "@Types/Mongo";

export const mongoAPI: MongoAPIFunction = async ({
  action,
  db,
  collection,
  document = null,
  filter = null,
  projection = null,
  sort = null,
  limit = null,
  skip = null,
}) => {
  const data = Object.assign(
    {},
    { dataSource: "achp-applications" },
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
    url: `${process.env.ATLAS_DATA_API_URL}/action/${action}`,
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.ATLAS_DATA_API_KEY,
    },
    data: data,
  });

  return response.data;
};
