import edzesAPI from "@/lib/api/edzesAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get } from "http";
import { useSession } from "next-auth/react";
import { start } from "repl";

export const useToken = () => {
  const { data: session } = useSession();
  return session?.backendTokens?.accessToken;
};

const useEdzes = {
  getEdzesek: (
    params: {
      page?: number;
      limit?: number;
      user_id?: number | null;
      isTemplate?: boolean;
      orderBy?: string;
      edzes_neve?: string;
      favoriteExercises?: boolean;
      gyakorlatok?: number[];
      gyakorlat_id?: number | null;
    } = {}
  ) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzesek", params],
      queryFn: () => edzesAPI.fetchEdzesek({ ...params, token }),
    });
  },

  getEdzes: (id: number) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzes", id],
      queryFn: () => edzesAPI.fetchEdzes(id, token),
      retry: 2,
    });
  },

  createEdzes: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newEdzes: any) => edzesAPI.createEdzes(newEdzes, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzesek"] });
      },
    });
  },

  updateEdzes: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, updatedEdzes }: { id: number; updatedEdzes: any }) =>
        edzesAPI.updateEdzes(id, updatedEdzes, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzesek"] });
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  deleteEdzes: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => edzesAPI.deleteEdzes(id, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzesek"] });
      },
    });
  },

  addGyakorlatToEdzes: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        edzesId,
        userId,
        gyakorlatId,
      }: {
        edzesId: number;
        userId: number;
        gyakorlatId: number;
      }) => edzesAPI.addGyakorlatToEdzes(edzesId, userId, gyakorlatId, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  deleteGyakorlatFromEdzes: () => {
    const token = useToken();
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
        edzesAPI.deleteGyakorlatFromEdzes(edzesId, gyakorlatId, userId, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  addSetToGyakorlatInEdzes: () => {
    const token = useToken();
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
          setDetails,
          token
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  updateSetInGyakorlatInEdzes: () => {
    const token = useToken();
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
          updateDetails,
          token
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  deleteSetFromGyakorlatInEdzes: () => {
    const token = useToken();
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
          userId,
          token
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },
  createEdzesFromTemplate: () => {
    const token = useToken();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        templateId,
        userId,
        date,
      }: {
        templateId: number;
        userId: number;
        date: string;
      }) => edzesAPI.createEdzesTemplate(templateId, userId, date, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
      },
    });
  },

  changeEdzesFinalizedStatus: () => {
    const token = useToken();
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
        edzesAPI.changeEdzesFinalizedStatus(edzesId, userId, finalized, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["edzes"] });
        queryClient.invalidateQueries({ queryKey: ["edzesek"] });
      },
    });
  },

  getEdzesekIntervallum: (id: number, startDate: string, endDate: string) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzes/intervallum", id, startDate, endDate],
      queryFn: () =>
        edzesAPI.fetchEdzesIntervallum(id, startDate, endDate, token),
    });
  },

  getTenDayEdzesek: (userId: number, gyakorlat: number) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzes/ten", userId, gyakorlat],
      queryFn: () => edzesAPI.fetchTenDays(userId, gyakorlat, token),
    });
  },

  getEdzesByType: (id: number, type: string) => {
    const token = useToken();

    return useQuery({
      queryKey: ["edzes", id, type],
      queryFn: () => edzesAPI.fetchEdzesekChosenDate(id, type, token),
    });
  },
  getCurrentWeekEdzesek: (userId: number) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzes", userId],
      queryFn: () => edzesAPI.fetchCurrentWeek(userId, token),
    });
  },

  findOneByDate: (userId: number, date: string) => {
    const token = useToken();
    return useQuery({
      queryKey: ["edzes", userId, date],
      queryFn: () => edzesAPI.findOneByDate(userId, date, token),
    });
  },
};
export default useEdzes;
