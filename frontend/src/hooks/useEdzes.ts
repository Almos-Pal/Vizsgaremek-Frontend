import edzesAPI from '@/lib/api/edzesAPI'
import { useQuery } from '@tanstack/react-query';

const useEdzes = {
  getEdzesek: (params: {
    page?: number;
    limit?: number;
    userId?: number | null;
    edzes_neve?: string;
    gyakorlatok?: number[];
  } = {}) => {
    return useQuery({
      queryKey: ['edzesek', params],
      queryFn: () => edzesAPI.fetchEdzesek(params),
    });
  },
};

export default useEdzes;