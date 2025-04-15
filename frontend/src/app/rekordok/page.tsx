"use client";
import {
  SubHeader,
  Pagination,
  RecordCard,
  RecordsFilter,
} from "@/components/client";
import { Loading } from "@/components/client/Loading/Loading";
import ContentLayout from "@/components/server/Layout/ContentLayout/ContentLayout";
import useUserGyakorlat from "@/hooks/useUserGyakorlat";
import exp from "constants";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { Text } from "@/components/server";
import ErrorPage from "@/components/client/ErrorPage/Error";

interface PageParams {
  userID: string;
}

interface RekordokPageProps {
  params: Promise<PageParams>;
}

const RecordsPage: React.FC<RekordokPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userId = session?.user?.user_id;
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const search = searchParams.get("search") || undefined;

  const {
    data: records,
    isLoading,
    isError,
  } = useUserGyakorlat.getRecords({
    isRecord: true,
    userId,
    page,
    search,
    limit: 12,
  });
  const handleFilterChange = (values: any) => {
    setPage(1);
  };

  if (isError) {
    return <ErrorPage />;
  }

  //   if (isLoading) return <Loading />;
  return (
    <ContentLayout
      header="Rekordok"
      filter={<RecordsFilter onFilterChange={handleFilterChange} />}
      //   filter={<GyakorlatFilter onFilterChange={handleFilterChange} />
      // }
    >
      {isLoading && <Loading hasParent />}
      <div className={"flex flex-row gap-6 mb-12 flex-wrap justify-center"}>
        {records &&
          records.items.map((record) => (
            <div key={record.gyakorlat.gyakorlat_neve}>
              <RecordCard record={record} />
            </div>
          ))}

        {records?.items.length === 0 && <Text>Nincs találat</Text>}
      </div>
      {!isLoading && (
        <Pagination
          value={page}
          total={records?.meta?.totalPages || 1}
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
export default RecordsPage;
