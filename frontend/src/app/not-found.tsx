"use client";
import React from "react";
import Image from "next/image";
import { Text } from "@/components/server";
import { Button } from "@/components/client";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <main className={styles.notFoundMain}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <Text variant="h1">Hoppá</Text>
            <div className={styles.textGroup}>
              <Text className="pt-8" color="var(--color-grey-100)">
                A keresett oldal nem található
              </Text>
            </div>
            <div className={styles.linkGroup}>
              <Button color="secondary" href={"/"} leftIcon="ArrowLeftIcon">
                Vissza a főoldalra
              </Button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/not-found.svg"
              alt="belsőtéri bicikli"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
