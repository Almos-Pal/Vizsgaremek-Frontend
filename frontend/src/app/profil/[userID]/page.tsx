"use client";

import { Text } from "@/components/server";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { useToast, useUser } from "@/hooks";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useRef } from "react";
import styles from "./page.module.scss";
import { Form, Formik } from "formik";
import FormField from "@/components/client/_forms/FormField/FormField";
import { Input } from "@/components/client/_inputs";
import { BMITable, Button } from "@/components/client";
import { bmiSchema } from "@/utils/Validations";
import { Loading } from "@/components/client/Loading/Loading";
import { useRouter } from "next/navigation";

interface PageParams {
  userID: string;
}

interface UserPageProps {
  params: Promise<PageParams>;
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const toast = useToast();
  const router = useRouter();
  const userID = parseInt(resolvedParams.userID);

  if (isNaN(userID)) {
    return (
      <div>
        <Text>Invalid userID</Text>
      </div>
    );
  }

  const { data: userData, isLoading: isLoadingUser, error: errorUser } = useUser.getUser(userID);
  const { data, isLoading, error, refetch } = useUser.getBmi(userID);
  const { data: session } = useSession();

  const hasShownToastRef = useRef(false);


  useEffect(() => {
    if (errorUser) {
      if ((errorUser as any).status === 401 && !hasShownToastRef.current) {
        hasShownToastRef.current = true;
        toast.error("Nincs jogosultság a megtekintéshez. Átirányítás a főoldalra...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else if ((errorUser as any).status === 400 && !hasShownToastRef.current) {
        hasShownToastRef.current = true;
        toast.warning("Nincs megadva súly vagy magasság. Kérlek add meg az adataidat a BMI számításhoz.");
      }
    }
  }, [errorUser, toast, router]);



  if (isLoadingUser) {
    return <Loading />;
  }


  if (errorUser && (errorUser as any).status === 404) {
    return (
      <div>
        <Text>User not found</Text>
      </div>
    );
  }


  if (!userData) {
    return <Loading />;
  }

  return (
    <ContentLayout header={`${userData.username} Adatai`}>
      <div className={styles.buttonContainer}>
        {session?.user.isAdmin && (
          <Button color="secondary" href={"/admin"} rightIcon="ProfileIcon">
            Admin felület
          </Button>
        )}
        <Button rightIcon="FavoriteIcon" href={"#"}> Kedvenc edzések </Button>
        <Button color="secondary" href={"#"} rightIcon="PenPaperIcon">
          Edzéstervező
        </Button>
      </div>

      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <BMISmallContainer data={userData} bmi={data ? data.bmi : "-"} />
          <EditUserData
            suly={userData.suly ?? null}
            magassag={userData.magassag ?? null}
            user_id={userID}
            isDisabled={isLoading}
          />
        </div>

        <div className={styles.rightPanel}>
          {isLoading ? <Loading hasParent /> : <BMITable bmi={parseFloat(data?.bmi ?? "-")} />}
        </div>
      </div>
    </ContentLayout>
  );
};


interface BMISmallContainerProps {
  data: any;
  bmi: string;
}

const BMISmallContainer: React.FC<BMISmallContainerProps> = ({ data, bmi }) => {
  return (
    <div className={styles.bmiContainer}>
      <Text variant="h4">Adatok</Text>
      <div className={styles.bmiSmallItemContainer}>
        <div className={styles.item}>
          <Text variant="subtitle-15">Testsúly</Text>
          <Text variant="body-15">{data.suly !== null ? `${data.suly}kg` : "-"}</Text>
        </div>
        <div className={styles.item}>
          <Text variant="subtitle-15">Magasság</Text>
          <Text variant="body-15">{data.magassag !== null ? `${data.magassag}cm` : "-"}</Text>
        </div>
        <div className={styles.item}>
          <Text variant="subtitle-15">BMI</Text>
          <Text variant="body-15">{bmi}</Text>
        </div>
      </div>
    </div>
  );
};


interface UserData {
  suly: number | null;
  magassag: number | null;
  user_id: number;
}

const EditUserData: React.FC<UserData & { isDisabled: boolean }> = (userData) => {
  const initialValues = {
    suly: userData.suly || "",
    magassag: userData.magassag || "",
  };

  const { mutate: updateUser } = useUser.updateUser();
  const toast = useToast();
  const refetch = useUser.getBmi(userData.user_id).refetch;

  const onSubmit = async (values: { suly: number; magassag: number }) => {
    try {
      updateUser(
        {
          values: {
            suly: values.suly || undefined,
            magassag: values.magassag || undefined,
          },
          id: userData.user_id,
        },
        {
          onSuccess: () => {
            refetch();
            toast.success("Sikeres adatmódosítás");
          },
          onError: (error: any) => {
            if (error?.status === 400) {
              toast.warning("Nincs megadva súly vagy magasság. Kérlek add meg az adataidat a BMI számításhoz.");
            } else {
              toast.error("Hiba történt az adatmódosítás során");
            }
          },
        }
      );
    } catch (e) {
      toast.error("Hiba történt az adatmódosítás során");
    }
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bmiSchema}
      onSubmit={(values) => onSubmit({ ...values, user_id: userData.user_id, suly: Number(values.suly), magassag: Number(values.magassag) })}
    >
      <div className={styles.bmiContainer}>
        <Text variant="h4">Adatok módosítása</Text>
        <Form>
          <div className="flex flex-col gap-4">
            <FormField name="suly" label="Testsúly" type="number" as={Input} disabled={userData.isDisabled} />
            <FormField name="magassag" label="Magasság" type="number" as={Input} disabled={userData.isDisabled} />
          </div>
          <div className="pt-10">
            <Button additionalClassName="w-full " type="submit">
              Mentés
            </Button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default UserPage;
