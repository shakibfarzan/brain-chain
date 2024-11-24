const HOME = "/";
const QUESTIONS = { ASK_QUESTION: "/ask-question" };
const AUTH = {
  LOG_IN: "/log-in",
  SIGN_UP: "/sign-up",
};
const MY_PROFILE = "/my-profile";

const JUST_AUTHENTICATED_USER_ROUTES = [MY_PROFILE] as const;
const JUST_NOT_AUTHENTICATED_USER_ROUTES = [AUTH.LOG_IN, AUTH.SIGN_UP] as const;

export default {
  AUTH,
  HOME,
  QUESTIONS,
  MY_PROFILE,
  JUST_AUTHENTICATED_USER_ROUTES,
  JUST_NOT_AUTHENTICATED_USER_ROUTES,
};
