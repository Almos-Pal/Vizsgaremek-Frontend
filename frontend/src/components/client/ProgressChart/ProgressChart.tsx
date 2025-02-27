"use client"

import useEdzes from "@/hooks/useEdzes";
import { useSession } from "next-auth/react";
import React, { useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Text } from "@/components/server";
import dateParse from "@/utils/dateParse";
import { useUserGyakorlat } from "@/hooks";
import { UserGyakorlatGyakorlat } from "@/types";
import { Formik, Form, useFormikContext } from "formik";
import { FormikSelect } from "../_inputs";
import { it } from "node:test";

export default function ProgressChart() {
  interface gyakorlatProps {
    gyakorlat_id: number;
    gyakorlat_neve: string;
  }
  interface chartDataProps {
    id: number;
    date: string;
    weight: number;
  }

  const { data: session } = useSession();

  const userId = session?.user.user_id;

  const { data: userGyakorlatData, isLoading: isloadingGyak } = useUserGyakorlat.getUserGyakorlatok({
    userId: userId!,
    page: 1,
    limit: 1000
  });
  let typedUserGyakorlatData: UserGyakorlatGyakorlat[] = [];
  if(userGyakorlatData===undefined){
    typedUserGyakorlatData = []
  }
  else{
    userGyakorlatData?.items.map((item) => {
      typedUserGyakorlatData.push(item);
    }
    );
  }
  let gyakorlats: gyakorlatProps[] = [];
  userGyakorlatData?.items.map((item) => {
    
    gyakorlats.push({ gyakorlat_id: item.gyakorlat.gyakorlat_id, gyakorlat_neve: item.gyakorlat.gyakorlat_neve });
  });

  
  let items: chartDataProps[] = [];
  const { data: tenDayData, isLoading: isLoadingUser, refetch,error } = useEdzes.getTenDayEdzesek(userId!,gyakorlats[0]?.gyakorlat_id);
  
  tenDayData && tenDayData.map((edzes) => {
    let help: number = 0;
    edzes.gyakorlatok.map((gyakorlat) => {
      if (gyakorlat.gyakorlat.gyakorlat_neve === "Ab Roller") {
        gyakorlat.szettek.map((set) => {
          if (set.weight > help) {
            help = set.weight;
          }
        });
        items.push({ id: edzes.edzes_id, date: dateParse(new Date(edzes.datum)), weight: help });
      }
    });
  });

  const gyakorlatsOptions = gyakorlats.map((gyakorlat) => ({
    value: gyakorlat.gyakorlat_id.toString(),
    label: gyakorlat.gyakorlat_neve
  }));



  if (isLoadingUser || !userId) {
    return <Text>Loading...</Text>;
  }

  if (error && (error as any).status === 404) {
    return (
      <div>
        <Text>User not found</Text>
      </div>
    );
  }

 

  return (
    <div>
      <Formik initialValues={{ gyakorlat: 0}} onSubmit={() => {}}>
        {({ setFieldValue,values }) => (
          <>

          <Form >
            <FormikSelect   name="gyakorlat" options={gyakorlatsOptions}  />
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart
                width={1100}
                height={400}
                data={items}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" stroke="var(--color-light)" />
                <YAxis stroke="var(--color-light)" />
                <Tooltip cursor={{ fill: 'none' }} />
                <Bar radius={[5, 5, 0, 0]} dataKey="weight" barSize={60} fill="var(--color-primary-50)" activeBar={<Rectangle fill="var(--color-primary-10)" />} />
              </BarChart>
            </ResponsiveContainer>
          </Form>

          <div>
            <Text>
            {values.gyakorlat}
            </Text>
          </div>
          </>
        )}
      </Formik>

    </div>
  );
}

function UseState(arg0: number): { setId: any; id: any; } {
  throw new Error("Function not implemented.");
}
