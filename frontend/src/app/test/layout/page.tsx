"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useGyakorlat from "@/hooks/useGyakorlat";
import { Text } from "@/components/server";
import { Button, Pagination } from "@/components/client";

const GyakorlatApp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract `page` from the URL or default to 1
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  const { data: gyakorlatok, isLoading } = useGyakorlat.getGyakorlatok({
    page,
    limit: 10,
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

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Gyakorlatok</h1>
      <ul>
        {gyakorlatok?.items?.map((gyakorlat: any) => (
          <li key={gyakorlat.gyakorlat_id}>
            <Text>{gyakorlat.gyakorlat_neve}</Text>
            <Button onClick={() => handleDelete(gyakorlat.gyakorlat_id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <input
        value={newGyakorlat}
        onChange={(e) => setNewGyakorlat(e.target.value)}
        placeholder="New Gyakorlat"
      />
      <Button onClick={handleCreate}>Add Gyakorlat</Button>
      <Pagination
        value={page}
        total={gyakorlatok?.meta?.totalPages || 1}
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default GyakorlatApp;
