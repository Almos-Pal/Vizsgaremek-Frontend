"use client"

import React, { useState } from 'react';
import { Navbar, Pagination, SubHeader, UserItem, WelcomeLogin } from '@/components/client';
import { useRouter, useSearchParams } from 'next/navigation';
import {  useUser } from '@/hooks';
import ContentLayout from '@/components/server/Layout/ContentLayout/ContentLayout';
import UsersFilter from '@/components/client/_filters/UsersFilter/UsersFilter';
import { User } from '@/types/user';
const Admin: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);

  const filterValues = {
    isAdmin : searchParams.get("isAdmin") === "true" || undefined,
    email: searchParams.get("email")  || undefined,
    username: searchParams.get("username") || undefined,
  };

  const { data: users, isLoading } = useUser.getUsers({
    page,
    limit: 10,
    ...filterValues
  });

  console.log(users); 
  const handleFilterChange = (values: any) => {
    setPage(1); 
  };

    return (
      <ContentLayout 
      header="ADMIN OLDAL" 
      filter={<UsersFilter onFilterChange={handleFilterChange} />}
    >

      <div className={"flex flex-col gap-6 mb-12"}>
        {users?.items?.map((user: User) => (
          <UserItem key={user.email} user={user} />
        ))}
      </div>
     
      <Pagination
        value={page}
        total={users?.meta?.totalPages || 1}
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

export default Admin;