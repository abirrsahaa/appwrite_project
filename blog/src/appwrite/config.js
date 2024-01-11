import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   create post ,get post ,get posts,update post ,delete post
  // so get on with all the end points and implement the crud in the appwrite service

  async createPost({ title, slug, content, featuredImage, status, user_id }) {
    try {
      return await this.database.createDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          user_id,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatepost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: deletepost :: error", error);
    }
  }

  //   read operations are left which will be consisting of reading one document and reading many deocuments
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getpost :: error", error);
    }
  }

  //   now in order to get all the post i need to know about quesries and how are we using it in the appwrite
  // one thing to keep in mind while we use the queries is that we need tp create index and hence we have created one
  // now we will be using the query to get the posts

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getallposts :: error", error);
    }
  }

  //   now we will need to implement the storage service that is basiclaly the bucket service
  // which is basically where we upload file and images and maybe videos !
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_storage_id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwrite_storage_id, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwrite_storage_id, fileId);
  }
}

const service = new Service();

export default service;
