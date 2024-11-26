import { redirect } from "next/navigation";

import routes from "@/config/routes";

const TabsPage = () => {
  return redirect(routes.MY_DASHBOARD.QUESTIONS);
};

export default TabsPage;
