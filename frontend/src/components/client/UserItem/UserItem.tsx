import { Text } from "@/components/server";
import { User } from "@/types/user";
import { Button } from "@/components/client";
import styles from "./UserItem.module.scss";
import { useModal, useToast, useUser } from "@/hooks";
import { ConfirmationModal } from "../_modal";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const deleteModal = useModal();
  const {mutate:deleteUser} = useUser.deleteUser();
  const {mutate:updateAdminAccess} = useUser.updateAdminAccess();
  const removeAdminModal = useModal();
  const grantAdminModal = useModal();
  const toast = useToast();

  console.log(user);

  const handleDelete = () => {
    deleteUser(user.user_id,{
      onSuccess: () => {
        toast.successDelete(undefined, user.username || "Felhasználó");
      },
      onError: () => {
        toast.errorDelete(undefined,  user.username || "Felhasználó");
      }
    });
    deleteModal.close();
  }

  const handleAdminToggle = () => {
    if (user.isAdmin) {
      updateAdminAccess({ id: user.user_id ,values:false}, {
        onSuccess: () => {
          toast.success("Felhasználó admin jogosultsága eltávolítva");
        },
        onError: () => {
          toast.error("Hiba történt a jogosultság eltávolítása közben");
        }
      });
      removeAdminModal.close();
    } else {
      updateAdminAccess({ id: user.user_id, values: true }, {
        onSuccess: () => {
          toast.success("Felhasználó admin jogosultsága engedélyezve");
        },
        onError: () => {
          toast.error("Hiba történt a jogosultság engedélyezése közben");
        }
      });
      grantAdminModal.close();
    }
  };
  


  const handleChangeModalOpen = (isAdmin:boolean) => {
    if(isAdmin){
      removeAdminModal.open();
    }
    else{
      grantAdminModal.open();
    }
  }

  return (
    <div className={styles["user-item"]}>
    <Text>{user.email}</Text>
    <Text>{user.username}</Text>
    <Button
        color="secondary"
        rightIcon={user.isAdmin ? "MinusIcon" : "AddIcon"}
        onClick={() => handleChangeModalOpen(user.isAdmin)}
      >
        Admin hozzáférés
      </Button>
    <div className={styles["trash-icon"]}>
      <Button iconOnly noBackground leftIcon="TrashCanIcon" onClick={() => deleteModal.open()} />
    </div>
   
   
  
 
      <ConfirmationModal visible={deleteModal.visible} onConfirm={handleDelete} title="Biztos törli a felhasználót?" onCancel={deleteModal.close}/>
      <ConfirmationModal visible={grantAdminModal.visible} onConfirm={handleAdminToggle} title="Engedélyezed a felhasználó admin jogosúltságát?" onCancel={grantAdminModal.close}/>
      <ConfirmationModal visible={removeAdminModal.visible} onConfirm={handleAdminToggle} title="Biztos elveszed a felhasználó admin jogosúltságát?" onCancel={removeAdminModal.close}/>
    </div>
  );
};

export default UserItem;
