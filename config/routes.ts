const HOME = "/";
const QUESTIONS = {
  ASK_QUESTION: "/ask-question",
  DETAIL: "/questions/[slug]",
};
const AUTH = {
  LOG_IN: "/log-in",
  SIGN_UP: "/sign-up",
};
const MY_DASHBOARD = {
  BASE: "/my-dashboard",
  QUESTIONS: "/my-dashboard/questions",
  ANSWERS: "/my-dashboard/answer",
  COMMENTS: "/my-dashboard/comment",
  EDIT_PROFILE: "/edit-profile",
};

const JUST_AUTHENTICATED_USER_ROUTES = [
  ...Object.values(MY_DASHBOARD),
] as const;
const JUST_NOT_AUTHENTICATED_USER_ROUTES = [AUTH.LOG_IN, AUTH.SIGN_UP] as const;

export default {
  AUTH,
  HOME,
  QUESTIONS,
  MY_DASHBOARD,
  JUST_AUTHENTICATED_USER_ROUTES,
  JUST_NOT_AUTHENTICATED_USER_ROUTES,
};
