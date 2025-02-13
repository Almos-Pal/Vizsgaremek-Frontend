import edzesAPI from '@/lib/api/edzesAPI'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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


  getEdzes: (id: number) => {
    return useQuery({
      queryKey: ['edzes', id],
      queryFn: () => edzesAPI.fetchEdzes(id),
    });
  },


  createEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newEdzes: any) => edzesAPI.createEdzes(newEdzes),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzesek'] });
      },
    });
  },

  updateEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, updatedEdzes }: { id: number; updatedEdzes: any }) =>
        edzesAPI.updateEdzes(id, updatedEdzes),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzesek'] }); 
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
      },
    });
  },

  deleteEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => edzesAPI.deleteEdzes(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzesek'] }); 
      },
    });
  },

  addSetToGyakorlatInEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzes_id,
        gyakorlatId,
        userId,
        setDetails,
      }: {
        edzes_id: number;
        gyakorlatId: number;
        userId: number;
        setDetails: { set_szam: number; weight: number; reps: number };
      }) =>
        edzesAPI.addSetToGyakorlatInEdzes(
          edzes_id,
          gyakorlatId,
          userId,
          setDetails
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
      },
    });
  },

  updateSetInGyakorlatInEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzes_id,
        gyakorlatId,
        setId,
        userId,
        updateDetails,
      }: {
        edzes_id: number;
        gyakorlatId: number;
        setId: number;
        userId: number;
        updateDetails: { weight: number; reps: number };
      }) =>
        edzesAPI.updateSetInGyakorlatInEdzes(
          edzes_id,
          gyakorlatId,
          setId,
          userId,
          updateDetails
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
      },
    });
  },

  deleteSetFromGyakorlatInEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzes_id,
        gyakorlatId,
        setId,
        userId,
      }: {
        edzes_id: number;
        gyakorlatId: number;
        setId: number;
        userId: number;
      }) =>
        edzesAPI.deleteSetFromGyakorlatInEdzes(
          edzes_id,
          gyakorlatId,
          setId,
          userId
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
      },
    });
  },

};

export default useEdzes;
