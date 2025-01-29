import { gyakorlatApi } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';



const useGyakorlat = {
  getGyakorlatok: ({ page = 1, limit = 10, userId = null } = {}) => {
    return useQuery({
      queryKey: ['gyakorlatok', { page, limit, userId }],
      queryFn: () => gyakorlatApi.fetchGyakorlatok({ page, limit, userId }),
    });
  },

  getGyakorlat: (id: number) => {
    return useQuery({
      queryKey: ['gyakorlat', id],
      queryFn: () => gyakorlatApi.getGyakorlat(id),
    });
  },

  createGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['createGyakorlat'],
      mutationFn: gyakorlatApi.createGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },

  updateGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['updateGyakorlat'],
      mutationFn: gyakorlatApi.updateGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },

  deleteGyakorlat: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ['deleteGyakorlat'],
      mutationFn: gyakorlatApi.deleteGyakorlat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['gyakorlatok'] });
      },
    });
  },
};

export default useGyakorlat;
