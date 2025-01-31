"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Text } from "@/components/server";
import { Button, GyakorlatFilter, Pagination } from "@/components/client";
import { GyakorlatItem } from "@/components/client/GyakorlatItem/GyakorlatItem";

import styles from "./page.module.scss";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import { SubHeader } from "@/components/client/_common";

const GyakorlatPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  // Get filter values from URL
  const filterValues = {
    nev: searchParams.get("nev") || undefined,
    izomcsoportId: searchParams.get("izomcsoportId") ? Number(searchParams.get("izomcsoportId")) : undefined,
    izomcsoportok: searchParams.get("izomcsoportok")?.split(",").map(Number).filter(Boolean) || undefined,
    eszkoz: searchParams.get("eszkoz") || undefined,
  };

  const { data: gyakorlatok, isLoading } = useGyakorlat.getGyakorlatok({
    page,
    limit: 10,
    ...filterValues
  });
  const { mutate: createGyakorlat } = useGyakorlat.createGyakorlat();
  const { mutate: deleteGyakorlat } = useGyakorlat.deleteGyakorlat();
  const [newGyakorlat, setNewGyakorlat] = useState("");

  const handleCreate = () => {
    createGyakorlat({ name: newGyakorlat });
    setNewGyakorlat("");
  };

  const handleDelete = (id: number) => {
    deleteGyakorlat(id);
  };

  const handleFilterChange = (values: any) => {
    // The URL update is handled in the GyakorlatFilter component
    setPage(1); // Reset to first page when filters change
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <ContentLayout 
      header="Gyakorlatok" 
      filter={<GyakorlatFilter onFilterChange={handleFilterChange} />}
    >
      <SubHeader header="Gyakorlatok" />

      <div className={"flex flex-col gap-6 mb-12"}>
        {gyakorlatok?.items?.map((gyakorlat: any) => (
          <GyakorlatItem key={gyakorlat.gyakorlat_id} gyakorlat={gyakorlat} />
        ))}
      </div>
     
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
    </ContentLayout>
  );
};

export default GyakorlatPage;
