import {
    PATH_CITY,
    // PATH_COA,
    PATH_COUNTRY,
    PATH_PROVINCE,
    PATH_SITE,
} from "@constants/routes";
import axios from "axios";
import { FetcherOptions } from "../../../../types/client/fetcher";

const getCountry = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_COUNTRY}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createCountry = async (body: CountryFormBody) => {
    try {
        const res = await axios.post(PATH_COUNTRY, body);
        return res.data;
    } catch (error) {
        console.error("Error creating country:", error);
        throw error;
    }
};

const editCountry = async (body: CountryFormBody) => {
    try {
        const res = await axios.put(
            `${PATH_COUNTRY}/${body.country_code}`,
            body
        );
        return res.data;
    } catch (error) {
        console.error("Error editing country:", error);
        throw error;
    }
};

const getProvince = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_PROVINCE}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createProvince = async (body: ProvinceFormBody) => {
    try {
        const res = await axios.post(PATH_PROVINCE, body);
        return res.data;
    } catch (error) {
        console.error("Error creating city:", error);
        throw error;
    }
};

const editProvince = async (body: ProvinceFormBody) => {
    try {
        const res = await axios.put(
            `${PATH_PROVINCE}/${body.province_code}`,
            body
        );
        return res.data;
    } catch (error) {
        console.error("Error editing country:", error);
        throw error;
    }
};

const getCity = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_CITY}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createCity = async (body: CityFormBody) => {
    try {
        const res = await axios.post(PATH_CITY, body);
        return res.data;
    } catch (error) {
        console.error("Error creating city:", error);
        throw error;
    }
};

const editCity = async (body: CityFormBody) => {
    try {
        const res = await axios.put(`${PATH_CITY}/${body.city_code}`, body);
        return res.data;
    } catch (error) {
        console.error("Error editing city:", error);
        throw error;
    }
};

// const getCoa = async (option?: FetcherOptions) => {
//   try {
//     const res = await axios.get(`${PATH_COA}`, {
//       params: {
//         all: option?.all,
//         page_size: !option?.all ? option?.pagination?.pageSize : undefined,
//         current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
//         search: option?.search,
//       },
//     });

//     return res;
//   } catch (error) {
//     console.error("Error fetching log history:", error);
//     throw error;
//   }
// };

const getSite = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_SITE}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createSite = async (body: SiteFormBody) => {
    try {
        const res = await axios.post(PATH_SITE, body);
        return res.data;
    } catch (error) {
        console.error("Error creating site:", error);
        throw error;
    }
};

const editSite = async (body: SiteFormBody) => {
    try {
        const res = await axios.put(`${PATH_SITE}/${body.site_code}`, body);
        return res.data;
    } catch (error) {
        console.error("Error editing site:", error);
        throw error;
    }
};

export {
    getCountry,
    createCountry,
    editCountry,
    getCity,
    createCity,
    editCity,
    getProvince,
    createProvince,
    editProvince,
    // getCoa,
    getSite,
    createSite,
    editSite,
};
