"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Button, GyakorlatFilter, Pagination } from "@/components/client";
import { GyakorlatItem } from "@/components/client/GyakorlatItem/GyakorlatItem";
import { Text } from "@/components/server";

import styles from "./page.module.scss";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { SubHeader } from "@/components/client/_common";
import { Loading } from "@/components/client/Loading/Loading";
import { useSession } from "next-auth/react";
import ErrorPage from "@/components/client/ErrorPage/Error";

const GyakorlatPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const session = useSession();
  const isOfAdminHeritageUser = session?.data?.user?.isAdmin;

  // Get filter values from URL
  const filterValues = {
    nev: searchParams.get("nev") || undefined,
    izomcsoportId: searchParams.get("izomcsoportId")
      ? Number(searchParams.get("izomcsoportId"))
      : undefined,
    izomcsoportok:
      searchParams
        .get("izomcsoportok")
        ?.split(",")
        .map(Number)
        .filter(Boolean) || undefined,
    eszkoz: searchParams.get("eszkoz") || undefined,
  };

  const {
    data: gyakorlatok,
    isLoading,
    isError,
  } = useGyakorlat.getGyakorlatok({
    page,
    limit: 10,
    ...filterValues,
  });

  const handleFilterChange = (values: any) => {
    setPage(1);
  };

  if (isError) {
    return <ErrorPage />;
  }


  return (
    <ContentLayout
      header="Gyakorlatok"
      filter={<GyakorlatFilter onFilterChange={handleFilterChange} />}
    >
      {isOfAdminHeritageUser && (
        <Button
          additionalClassName={styles.newGyak}
          href={"/gyakorlatok/uj/szerkeszt"}
          rightIcon="AddIcon"
        >
          Új gyakorlat
        </Button>
      )}
      <SubHeader header="Gyakorlatok" />
      {isLoading && <Loading hasParent />}

      <div className={"flex flex-col gap-6 mb-12"}>
        {gyakorlatok?.items?.map((gyakorlat: any) => (
          <GyakorlatItem key={gyakorlat.gyakorlat_id} gyakorlat={gyakorlat} />
        ))}
      </div>

      {gyakorlatok?.items.length === 0 && <Text>Nincs találat</Text>}
      {!isLoading && (
        <Pagination
          value={page}
          total={gyakorlatok?.meta?.totalPages || 1}
          onChange={(newPage) => {
            setPage(newPage);
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`);
          }}
        />
      )}
    </ContentLayout>
  );
};

export default GyakorlatPage;
