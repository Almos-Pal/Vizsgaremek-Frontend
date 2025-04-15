import { Gyakorlat } from '@/types';
import React, { useState } from 'react';
import { Text } from '@/components/server';
import styles from './GyakorlatComparisonBlock.module.scss';
import Link from 'next/link';

interface GyakorlatComparisonBlockProps {
  data: Gyakorlat;
}



const GyakorlatComparisonBlock: React.FC<GyakorlatComparisonBlockProps> = ({ data }) => {


  const previousHistoryArray = Array.isArray(data.previous_history) ? data.previous_history : [];

  const calculateWeightedImprovement = (currentSet: any, previousSet: any) => {
    if (!previousSet) return "var(--color-light)";

    const weightDifference = (currentSet.weight - previousSet.weight) * 1.5;
    const repsDifference = (currentSet.reps - previousSet.reps) * 1.2;

    const totalScore = weightDifference + repsDifference;
   
    if (totalScore > 0) return "var(--color-success)"; // Improvement
    if (totalScore < 0) return "var(--color-error)"; // Regression
    return "var(--color-light)"; // No change
  };


  
  return (
    <div className={styles["edzes-block"]}>
        <div className={styles["edzes-header"]}>
      <Link href={`/gyakorlatok/${data.gyakorlat.gyakorlat_id}`}>
          <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{data.gyakorlat.gyakorlat_neve}: </Text>
      </Link>
        </div>


      <div className={styles["content-wrapper"]}>

        <div className={styles["list"]}>
          <Text variant='subtitle-16'>Előző Alkalom</Text>

          <table className={styles["table"]}>
            <thead>
              <tr>
                <th><Text color='var(--color-grey-200)' variant='caption'>Szett</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>KG</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>Ism.</Text></th>
              </tr>
            </thead>
            <tbody>
              {previousHistoryArray.map((set, index) => (
                <tr key={index}>
                  <td>
                    <Text variant='body-16'>{index + 1}</Text>
                  </td>
                  <td>
                    <Text variant='body-16'>{set.weight}</Text>
                  </td>
                  <td>
                    <Text variant='body-16'>{set.reps}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className={styles["line"]}></div>



        {/* Problem Area                                                                   HERE */}
        <div className={styles["list"]}>
          <Text variant='subtitle-16'>Most</Text>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th><Text color='var(--color-grey-200)' variant='caption'>Szett</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>KG</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>Ism.</Text></th>
              </tr>
            </thead>
            <tbody>
              {data.szettek.map((set, index) => (
                <tr key={index}>
                  <td>
                    <Text variant="body-16">{set.set_szam}</Text>
                  </td>
                  <td>
                    <Text
                      variant="body-16"
                      style={{
                        color: previousHistoryArray[index]
                          ? calculateWeightedImprovement(set, previousHistoryArray[index])
                          : "var(--color-light)"
                      }}
                    >
                      {set.weight}
                    </Text>
                  </td>
                  <td>
                    <Text
                      variant="body-16"
                      style={{
                        color: previousHistoryArray[index]
                          ? calculateWeightedImprovement(set, previousHistoryArray[index])
                          : "var(--color-light)"
                      }}
                    >
                      {set.reps}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default GyakorlatComparisonBlock;