import { RecordItem } from '@/types';
import styles from './RecordCard.module.scss';
import { Text } from '@/components/server'
import Flag from '@/components/server/Flags/Flag';

interface RecordCardProps {
    record: RecordItem;
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
    
    return (
    <div className={styles.cardContainer}>
        <div className={styles.cardText}>
            <Text variant='body-16' className='w-[180px]'>{record.gyakorlat.gyakorlat_neve}:</Text>
            <Text variant='h4' className='w-[120px]'>  {record.personal_best} KG</Text>
        </div>
        <Flag foizomcsoport={record.gyakorlat.fo_izomcsoport} izomcsoportok={record.gyakorlat.izomcsoportok.map(izomcsoport => izomcsoport.izomcsoport_id)}/>
    </div>
    )
}
export default RecordCard;