"use client";

import useEdzes from "@/hooks/useEdzes";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Text } from "@/components/server";
import dateParse from "@/utils/dateParse";
import { useUserGyakorlat } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import { FormikSelect } from "../_inputs";
import styles from "./ProgressChart.module.scss";
import { time } from "@/utils";

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
  const router = useRouter();
  const searchParams = useSearchParams();


  const { data: userGyakorlatData, isLoading: isLoadingGyak } =
    useUserGyakorlat.fetchUserGyakorlatokAll({
      userId: userId!,
      page: 1,
      limit: 1000,
    });

  const gyakorlats: gyakorlatProps[] =
    userGyakorlatData?.items.map((item) => ({
      gyakorlat_id: item.gyakorlat.gyakorlat_id,
      gyakorlat_neve: item.gyakorlat.gyakorlat_neve,
    })) || [];

  const gyakorlatsOptions = gyakorlats.map((gyakorlat) => ({
    value: gyakorlat.gyakorlat_id.toString(),
    label: gyakorlat.gyakorlat_neve,
  }));


  const initialGyakorlat =
    searchParams.get("gyakorlat_id") || (gyakorlatsOptions[0]?.value || "");

  const [selectedGyakorlat, setSelectedGyakorlat] = useState<number>(
    parseInt(initialGyakorlat) || 0
  );
  const [items, setItems] = useState<chartDataProps[]>([]);

  const { data: tenDayData, refetch, error } = useEdzes.getTenDayEdzesek(
    userId!,
    selectedGyakorlat
  );


  useEffect(() => {
    if (!searchParams.get("gyakorlat_id") && gyakorlatsOptions.length > 0) {
      const firstGyakorlat = gyakorlatsOptions[0].value;
      setSelectedGyakorlat(parseInt(firstGyakorlat));
      router.push(`?gyakorlat_id=${firstGyakorlat}`, { scroll: false });
    }
  }, [gyakorlatsOptions, router]);

 
  useEffect(() => {
    if (selectedGyakorlat !== 0) {
      refetch().then((response) => {
        const newItems: chartDataProps[] = [];
        response.data?.forEach((edzes) => {
          let maxWeight = 0;
          edzes.gyakorlatok.forEach((gyakorlat) => {
            if (gyakorlat.gyakorlat.gyakorlat_id === selectedGyakorlat) {
              gyakorlat.szettek.forEach((set) => {
                if (set.weight > maxWeight) {
                  maxWeight = set.weight;
                }
              });

              newItems.push({
                id: edzes.edzes_id,
                date: time.DateParse(new Date(edzes.datum)),
                weight: maxWeight,
              });
            }
          });
        });
        setItems(newItems);
      });
    }
  }, [selectedGyakorlat, refetch]);

  if (isLoadingGyak || !userId) {
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
    <div className={styles.container}>
      <Text style={{ textAlign: "center" }} variant="h4">
        Fejlődési idővonal
      </Text>
      <div className={styles.main}>
        <Formik
          initialValues={{ gyakorlat: initialGyakorlat }}
          enableReinitialize
          onSubmit={() => {}}
        >
          {({ setFieldValue, values }) => {
            useEffect(() => {
              if (values.gyakorlat) {
                const updatedParams = new URLSearchParams(
                  window.location.search
                );
                updatedParams.set("gyakorlat_id", values.gyakorlat);

                router.push(`?${updatedParams.toString()}`, { scroll: false });
                setSelectedGyakorlat(parseInt(values.gyakorlat));
              }
            }, [values.gyakorlat]);

            return (
              <>
                <Form className={styles.form}>
                  <label>
                    <Text variant="caption">Gyakorlat:</Text>
                  </label>
                  <FormikSelect name="gyakorlat" options={gyakorlatsOptions} />
                </Form>

                <ResponsiveContainer
                  className={styles.bar}
                  width={"100%"}
                  height={400}
                >
                  {items.length === 0 ? (
                    <div className={styles["no-data"]}>
                      <Text variant="h1">Jelenleg nincsenek adatok</Text>
                    </div>
                  ) : (
                    <BarChart
                      width={1100}
                      height={400}
                      data={items}
                      className={styles["bar-chart"]}
                      margin={{
                        top: 5,
                        left: 0,
                        right: 15,
                        bottom: 5,
                      }}
                    >
                      <XAxis
                        reversed
                        dataKey="date"
                        className={styles["date"]}
                        interval={0}
                        height={46}
                        fontFamily="manrope"
                        angle={30}
                        tickMargin={17}
                        stroke="var(--color-light)"
                      />
                      <YAxis stroke="var(--color-light)" />
                      <Tooltip cursor={{ fill: "none" }} />
                      <Bar
                        radius={[5, 5, 0, 0]}
                        dataKey="weight"
                        barSize={"5%"}
                        fill="var(--color-primary-50)"
                        activeBar={<Rectangle fill="var(--color-primary-10)" />}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
