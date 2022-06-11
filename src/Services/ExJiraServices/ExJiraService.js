import Axios from "axios";
import { DOMAIN_SIGNIN } from "../../Util/SystemSetting/SystemSetting";
class ExJiraService {
  siginJira = (userLogin) => {
    return Axios({
      url: `${DOMAIN_SIGNIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  };
}

const exJiraService = new ExJiraService();

export default exJiraService;
