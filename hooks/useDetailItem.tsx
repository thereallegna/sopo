// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useDrawerStore } from '@stores/useDrawerStore';
import { AxiosResponse } from 'axios';
// import { GET_DETAIL_MASTER_ITEM } from '@constants/queryKey';

type UseDetailItemHookProps<T> = {
  code: keyof T;
  queryFn: (itemCode: string) => Promise<AxiosResponse<BasicResponse<T>>>;
};

export function useDetailItem<T>({}: // code,
// queryFn,
UseDetailItemHookProps<T>) {
  // const { detail_data, setDetailData } = useDrawerStore();

  // const { isLoading } = useQuery({
  //   queryKey: [GET_DETAIL_MASTER_ITEM],
  //   queryFn: async () => {
  //     if (detail_data) {
  //     }
  //     const res = await queryFn((detail_data as any)[code] || "");
  //     setDetailData({ ...detail_data, ...res.data.data });
  //     return res;
  //     return {};
  //   },
  //   placeholderData: keepPreviousData,
  // });

  return { isLoading: true };
}
