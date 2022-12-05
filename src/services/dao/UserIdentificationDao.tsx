import axios from "axios";
import { User } from "../../interfaces/user";

export class UserIdentificationDao {
  static async getIP(): Promise<{ip: string}> {
    const { data } = await axios.get("https://api.ipify.org/?format=json");

    return data
  }

  static async getCurrentUser(): Promise<User> {
    const { data } = await axios.get("/users/current");

    return data
  }
}
