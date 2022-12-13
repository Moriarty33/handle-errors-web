import { AxiosResponse, isAxiosError } from "axios";
import { UserIdentificationDao } from "./services/dao/UserIdentificationDao";

function App() {
  async function getUserIp() {
    const { ip } = await UserIdentificationDao.getIP();
    console.log("ip", ip);
  }

  async function getCurrentUser() {
    try {
      const user = await UserIdentificationDao.getCurrentUser();
      console.log("user", user);
    } catch (e) {
      if (isAxiosError(e) && (e.response as AxiosResponse)?.status === 500) {
        console.log("Server Internal Error. Please try again later");
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <button onClick={getUserIp}>Get User Ip</button>
      <button onClick={getCurrentUser}>Get Current User</button>
    </div>
  );
}

export default App;
