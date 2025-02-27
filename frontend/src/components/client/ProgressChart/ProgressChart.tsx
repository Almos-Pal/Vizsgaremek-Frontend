"use client"

import useEdzes from "@/hooks/useEdzes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Text } from "@/components/server";
import dateParse from "@/utils/dateParse";
import { useUserGyakorlat } from "@/hooks";
import { UserGyakorlatGyakorlat } from "@/types";
import { Formik, Form } from "formik";
import { FormikSelect } from "../_inputs";

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

  let gyakorlats: gyakorlatProps[] = [];
  userGyakorlatData?.items.map((item) => {
    gyakorlats.push({ gyakorlat_id: item.gyakorlat.gyakorlat_id, gyakorlat_neve: item.gyakorlat.gyakorlat_neve });
  });

  const gyakorlatsOptions = gyakorlats.map((gyakorlat) => ({
    value: gyakorlat.gyakorlat_id.toString(),
    label: gyakorlat.gyakorlat_neve
  }));

  const [selectedGyakorlat, setSelectedGyakorlat] = useState<number>(0);
  const [items, setItems] = useState<chartDataProps[]>([]);

  const { data: tenDayData, isLoading: isLoadingUser, refetch, error } = useEdzes.getTenDayEdzesek(userId!, selectedGyakorlat);

  useEffect(() => {
    if (selectedGyakorlat !== null) {
      refetch().then((response) => {
        let newItems: chartDataProps[] = [];
        response.data && response.data.map((edzes) => {
          let help: number = 0;
          edzes.gyakorlatok.map((gyakorlat) => {
            if (gyakorlat.gyakorlat.gyakorlat_id===selectedGyakorlat) {
              gyakorlat.szettek.map((set) => {
                if (set.weight > help) {
                  help = set.weight;
                }
              });
              newItems.push({ id: edzes.edzes_id, date: dateParse(new Date(edzes.datum)), weight: help });
            }
          });
        });
        setItems(newItems);
      });
    }
  }, [selectedGyakorlat, refetch]);

  if (isloadingGyak || !userId) {
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
      <Formik
        initialValues={{ gyakorlat: "" }}
        onSubmit={() => {}}
      >
        {({ setFieldValue, values }) => {
          useEffect(() => {
            if (values.gyakorlat) {
              setSelectedGyakorlat(parseInt(values.gyakorlat));
            }
          }, [values.gyakorlat]);

          return (
            <>
              <Form>
                <FormikSelect
                  name="gyakorlat"
                  options={gyakorlatsOptions}
                />
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
          );
        }}
      </Formik>
    </div>
  );
}