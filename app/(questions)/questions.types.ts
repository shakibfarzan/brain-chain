import { Tag } from "@prisma/client";

export type AskQuestionCommonProps = {
  tags: Tag[];
  isLoading?: boolean;
};
