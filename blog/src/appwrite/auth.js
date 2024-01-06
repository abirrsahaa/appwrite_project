import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAcount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAcount) {
        // if i have got the user account then i will be logging in the user with the email and password
        return await this.login({ email, password });
      } else {
        throw new Error("userAccount not created thus could not login");
        //
      }
    } catch (error) {
      console.log("error while creating the user ", error);
      return null;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      return error;
    }
  }

  //   find this in the docs

  async getCurrentUser() {
    try {
      // this will let us know if the user is logged in or not
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      // will be deleting all the sessions of the user
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

// so what we have done is we have choosen appwrite as our backend service
// and we have created a class called authservice which will be used to login and logout the user and also to create the user account

// we have created a class so that all the methods are in one place and e can create a object of this class
// which can be exported and used in the other files seamlessly!!

const authservice = new Authservice();
export default authservice;
