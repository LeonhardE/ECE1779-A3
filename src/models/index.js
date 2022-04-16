// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { postdata, postlike, postcomment } = initSchema(schema);

export {
  postdata,
  postlike,
  postcomment
};