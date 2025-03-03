import { Text } from "@/components/server";
import { User } from "@/types/user";
import { Button } from "@/components/client";
import styles from "./UserItem.module.scss";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className={styles["user-item"]}>
      <Text>{user.email}</Text>
      <Text>{user.username}</Text>
      <Button
        color="secondary"
        rightIcon={user.isAdmin ? "MinusIcon" : "AddIcon"}
      >
        Admin hozzáférés
      </Button>
      <div className={styles["trash-icon"]}>

      <Button iconOnly noBackground leftIcon="TrashCanIcon" />
      </div>
    </div>
  );
};

export default UserItem;
