import { PATH_COUNTRY } from '@constants/routes';
import axios from 'axios';
import { TableOptionState } from '../../../../types/client/table';

const getCountry = async (option: TableOptionState) => {
  console.log(option);
  const url = `${PATH_COUNTRY}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option.search || ''
  }`;
  const res = await axios.get(url);
  console.log('getCountry => ', res.data);
  return res;
  // if(option.search){
  //   const dummySearch = {
  //     "status": "00",
  //     "message": "success",
  //     "data": {
  //       "results": [
  //         {
  //           "country_code": "ADR",
  //           "country_name": "Andorra",
  //           "create_date": "29 May 2015, 16:29"
  //         }
  //       ],
  //       "total_records": 169,
  //       "total_pages": 17,
  //       "current_page": 1,
  //       "page_size": 10,
  //       "has_next": true,
  //       "has_previous": false
  //     }
  //   }
  //   return { data: dummySearch }
  // }
  // const dummy = {
  //   "status": "00",
  //   "message": "success",
  //   "data": {
  //     "results": [
  //       {
  //         "country_code": "ADR",
  //         "country_name": "Andorra",
  //         "create_date": "29 May 2015, 16:29"
  //       },
  //       {
  //         "country_code": "AFG",
  //         "country_name": "Afghanistan",
  //         "create_date": "29 May 2015, 16:28"
  //       },
  //       {
  //         "country_code": "AG",
  //         "country_name": "ANTIGUA AND BARBUDA",
  //         "create_date": "29 May 2015, 16:30"
  //       },
  //       {
  //         "country_code": "AI",
  //         "country_name": "Anguilla",
  //         "create_date": "29 May 2015, 16:30"
  //       },
  //       {
  //         "country_code": "ALB",
  //         "country_name": "Albania",
  //         "create_date": "29 May 2015, 16:28"
  //       },
  //       {
  //         "country_code": "AO",
  //         "country_name": "Angola",
  //         "create_date": "29 May 2015, 16:29"
  //       },
  //       {
  //         "country_code": "AQ",
  //         "country_name": "Antarctica",
  //         "create_date": "29 May 2015, 16:30"
  //       },
  //       {
  //         "country_code": "ARG",
  //         "country_name": "ARGENTINA",
  //         "create_date": "29 May 2015, 16:30"
  //       },
  //       {
  //         "country_code": "ARM",
  //         "country_name": "ARMENIA",
  //         "create_date": "29 May 2015, 16:31"
  //       },
  //       {
  //         "country_code": "ASM",
  //         "country_name": "American Samoa",
  //         "create_date": "29 May 2015, 16:29"
  //       }
  //     ],
  //     "total_records": 169,
  //     "total_pages": 17,
  //     "current_page": 1,
  //     "page_size": 10,
  //     "has_next": true,
  //     "has_previous": false
  //   }
  // }
  // return { data: dummy }
};

export { getCountry };
