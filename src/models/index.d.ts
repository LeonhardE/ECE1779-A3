import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type postdataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type postlikeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type postcommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class postdata {
  readonly id: string;
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly creator: string;
  readonly like: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<postdata, postdataMetaData>);
  static copyOf(source: postdata, mutator: (draft: MutableModel<postdata, postdataMetaData>) => MutableModel<postdata, postdataMetaData> | void): postdata;
}

export declare class postlike {
  readonly id: string;
  readonly key: string;
  readonly sender: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<postlike, postlikeMetaData>);
  static copyOf(source: postlike, mutator: (draft: MutableModel<postlike, postlikeMetaData>) => MutableModel<postlike, postlikeMetaData> | void): postlike;
}

export declare class postcomment {
  readonly id: string;
  readonly key: string;
  readonly content: string;
  readonly sender: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<postcomment, postcommentMetaData>);
  static copyOf(source: postcomment, mutator: (draft: MutableModel<postcomment, postcommentMetaData>) => MutableModel<postcomment, postcommentMetaData> | void): postcomment;
}