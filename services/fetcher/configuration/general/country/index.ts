import { PATH_COUNTRY } from '@constants/routes';
import { PaginationState } from '@tanstack/react-table';
import axios from 'axios';

const getCountry = async (pagination?: PaginationState) => {
  // console.log(pagination, "kljdskldj")
  // const dummyResponse = {
  //   status: '00',
  //   message: 'success',
  //   data: {
  //     results: [
  //       {
  //         country_code: 'ADR',
  //         country_name: 'Andorra',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //       {
  //         country_code: 'AFG',
  //         country_name: 'Afghanistan',
  //         create_date: '29 May 2015, 16:28',
  //       },
  //       {
  //         country_code: 'AG',
  //         country_name: 'ANTIGUA AND BARBUDA',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'AI',
  //         country_name: 'Anguilla',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ALB',
  //         country_name: 'Albania',
  //         create_date: '29 May 2015, 16:28',
  //       },
  //       {
  //         country_code: 'AO',
  //         country_name: 'Angola',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //       {
  //         country_code: 'AQ',
  //         country_name: 'Antarctica',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ARG',
  //         country_name: 'ARGENTINA',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ARM',
  //         country_name: 'ARMENIA',
  //         create_date: '29 May 2015, 16:31',
  //       },
  //       {
  //         country_code: 'ASM',
  //         country_name: 'American Samoa',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //       {
  //         country_code: 'ADR',
  //         country_name: 'Andorra',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //       {
  //         country_code: 'AFG',
  //         country_name: 'Afghanistan',
  //         create_date: '29 May 2015, 16:28',
  //       },
  //       {
  //         country_code: 'AG',
  //         country_name: 'ANTIGUA AND BARBUDA',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'AI',
  //         country_name: 'Anguilla',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ALB',
  //         country_name: 'Albania',
  //         create_date: '29 May 2015, 16:28',
  //       },
  //       {
  //         country_code: 'AO',
  //         country_name: 'Angola',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //       {
  //         country_code: 'AQ',
  //         country_name: 'Antarctica',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ARG',
  //         country_name: 'ARGENTINA',
  //         create_date: '29 May 2015, 16:30',
  //       },
  //       {
  //         country_code: 'ARM',
  //         country_name: 'ARMENIA',
  //         create_date: '29 May 2015, 16:31',
  //       },
  //       {
  //         country_code: 'ASM',
  //         country_name: 'American Samoa',
  //         create_date: '29 May 2015, 16:29',
  //       },
  //     ],
  //     total_records: 169,
  //     total_pages: 17,
  //     current_page: pagination?.pageIndex,
  //     page_size: pagination?.pageSize,
  //     has_next: true,
  //     has_previous: false,
  //   },
  // };

  // return { data: dummyResponse }
  const url = `${PATH_COUNTRY}?page_size=${
    pagination?.pageSize || ''
  }&current_page=${pagination?.pageIndex || ''}`;
  const res = await axios.get(url);
  return res;
};

export { getCountry };
