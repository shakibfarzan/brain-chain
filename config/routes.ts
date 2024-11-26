const HOME = "/";
const QUESTIONS = { ASK_QUESTION: "/ask-question" };
const AUTH = {
  LOG_IN: "/log-in",
  SIGN_UP: "/sign-up",
};
const MY_DASHBOARD = {
  BASE: "/my-dashboard",
  QUESTIONS: "/my-dashboard/questions",
};

const JUST_AUTHENTICATED_USER_ROUTES = [MY_DASHBOARD] as const;
const JUST_NOT_AUTHENTICATED_USER_ROUTES = [AUTH.LOG_IN, AUTH.SIGN_UP] as const;

export default {
  AUTH,
  HOME,
  QUESTIONS,
  MY_DASHBOARD,
  JUST_AUTHENTICATED_USER_ROUTES,
  JUST_NOT_AUTHENTICATED_USER_ROUTES,
};
