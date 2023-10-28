import { Tag } from "~/components/icons";
import { Tag as TagEnum } from "~/utils/constants";

export const getTagIcons = (tag: string) => {
  let icon;
  switch (tag) {
    case TagEnum.BUG:
      icon = <Tag strokeColor="#ff4f4f" />;
      break;
    case TagEnum.FEATURE:
      icon = <Tag strokeColor="#f2913d" />;
      break;
    case TagEnum.IMPROVEMENT:
      icon = <Tag strokeColor="#ffc42f" />;
      break;
    case TagEnum.REFACTOR:
      icon = <Tag strokeColor="#28e29e" />;
      break;
    case TagEnum.OTHER:
      icon = <Tag />;
      break;
    default:
      break;
  }

  return icon;
};
