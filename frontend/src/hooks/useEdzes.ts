import edzesAPI from '@/lib/api/edzesAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get } from 'http';
import { start } from 'repl';

const useEdzes = {
  getEdzesek: (params: {
    page?: number;
    limit?: number;
    user_id?: number | null;
    orderBy?: string;
    edzes_neve?: string;
    favoriteExercises?: boolean;
    gyakorlatok?: number[];
  } = {}) => {
    return useQuery(
      {
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

  addGyakorlatToEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ edzesId, userId, gyakorlatId }: { edzesId: number; userId: number; gyakorlatId: number }) =>
        edzesAPI.addGyakorlatToEdzes(edzesId, userId, gyakorlatId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
      },
    });
  },

  deleteGyakorlatFromEdzes: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzesId,
        gyakorlatId,
        userId,
      }: {
        edzesId: number;
        gyakorlatId: number;
        userId: number;
      }) =>
        edzesAPI.deleteGyakorlatFromEdzes(edzesId, gyakorlatId, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
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

  changeEdzesFinalizedStatus: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzesId,
        userId,
        finalized,
      }: {
        edzesId: number;
        userId: number;
        finalized: boolean;
      }) =>
        edzesAPI.changeEdzesFinalizedStatus(edzesId, userId, finalized),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['edzes'] });
        queryClient.invalidateQueries({ queryKey: ['edzesek'] });
      },
    });
  },
  getEdzesekIntervallum: (id:number,startDate:string,endDate:string) => {
    return useQuery({
        queryKey: ['edzes/intervallum', id,startDate,endDate],
        queryFn: () => edzesAPI.fetchEdzesIntervallum(id,startDate,endDate),
      });
  },
  getTenDayEdzesek: (userId:number,gyakorlat:number) => {
    return useQuery({
        queryKey: ['edzes/ten', userId,gyakorlat],
        queryFn: () => edzesAPI.fetchTenDays(userId,gyakorlat),
      });
  },
  getEdzesByType:(id:number,type:string) =>{
    return useQuery({
      queryKey: ['edzes', id,type],
      queryFn: () => edzesAPI.fetchEdzesekChosenDate(id,type),
    });

},
}
export default useEdzes;
