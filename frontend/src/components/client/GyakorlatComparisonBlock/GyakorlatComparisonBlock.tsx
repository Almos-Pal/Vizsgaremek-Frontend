import { Gyakorlat } from '@/types';
import React from 'react';
import { Text } from '@/components/server';
import styles from './GyakorlatComparisonBlock.module.scss';

interface GyakorlatComparisonBlockProps {
  data: Gyakorlat;
}



const GyakorlatComparisonBlock: React.FC<GyakorlatComparisonBlockProps> = ({ data }) => {

  const previousHistoryArray = Array.isArray(data.previous_history) ? data.previous_history : [];

  console.log(data);
  return (
    <div className={styles["edzes-block"]}>
      <div className={styles["edzes-header"]}>
        <Text style={{ marginLeft: '2rem' }} variant='subtitle-16'>{data.gyakorlat.gyakorlat_neve}: </Text>
      </div>
      <div className={styles["content-wrapper"]}>

        <div className={styles["list"]}>
          <Text variant='subtitle-16'>Előző Alkalom</Text>

          <table className={styles["table"]}>
            <thead>
              <tr>
                <th><Text color='var(--color-grey-200)' variant='caption'>Set</Text></th>
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
                <th><Text color='var(--color-grey-200)' variant='caption'>Set</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>KG</Text></th>
                <th><Text color='var(--color-grey-200)' variant='caption'>Ism.</Text></th>
              </tr>
            </thead>
            <tbody>
              {data.szettek.map((set, index) => (
                <tr key={index}>
                  <td>
                    <Text variant='body-16'>{set.set_szam}</Text>
                  </td>
                  <td>
                    <Text variant='body-16' style={{ color: set.weight > previousHistoryArray[index] ? 'green' : 'red' }}>{set.weight}</Text>
                  </td>
                  <td>
                    <Text variant='body-16'>{set.reps}</Text>
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