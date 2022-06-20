import baseServices from "../BaseServices";

class PriorityService extends baseServices {
  constructor() {
    super();
  }
  getLstPriority = () => {
    return this.get("Priority/getAll?id=0");
  };
}

let priorityService = new PriorityService();

export default priorityService;
