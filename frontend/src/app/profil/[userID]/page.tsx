"use client";

import { Text } from "@/components/server";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { useToast, useUser } from "@/hooks";
import { useSession } from "next-auth/react";
import { use, useEffect, useRef } from "react";

interface PageParams {
  userID: string;
}

interface userPageProps {
  params: Promise<PageParams>;
}

const UserPage: React.FC<userPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const toast = useToast();
  const userID = parseInt(resolvedParams.userID);

  if (isNaN(userID)) {
    return (
      <div>
        <Text>Invalid userID</Text>
      </div>
    );
  }

const {data:userData, isLoading:isLoadingUser, error:errorUser} = useUser.getUser(userID);


const {data:session} = useSession();
console.log(session?.backendTokens.accessToken);

  const { data, isLoading, error } = useUser.getBmi(userID);

  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (error && (error as any).status === 400 && !hasShownToastRef.current) {
      toast.warning(
        "Nincs megadva súly vagy magasság. kérlek add meg az adataidat a BMI számításhoz"
      );
      hasShownToastRef.current = true;
    }
  }, [error, toast]);

if(isLoadingUser){
    return (
        <div>
        <Text>Loading...</Text>
        </div>
    );
}

  if (error && (error as any).status === 404) {
    return (
      <div>
        <Text>User not found</Text>
      </div>
    );
  }



  return (

    <ContentLayout header={userData?  userData.username + " Adatai": "Felhasználó Adatai"}  >

        {isLoading ? (
            <Text>Loading...</Text>
        ) : (
            <div>
                <Text variant="h2">BMI: {data ? data.bmi: "-"}</Text>
                <Text variant="h2">Type: {data ? data.type: "-"}</Text>
            </div>
        )}

        
    </ContentLayout>
  );
};

export default UserPage;
