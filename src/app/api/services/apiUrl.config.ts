const baseUrl = 'http://localhost:3000/api';

export const apiUrl = {
    //Clinic
    clinicUrl : `${baseUrl}/clinic`,
    clinicUrlWithId : `${baseUrl}/clinic/{0}`,

    // student
    studentUrl: `${baseUrl}/student`,

    //order
    orderUrl:`${baseUrl}/order`,

    // ext-order
    extOrderUrl: `${baseUrl}/ext-order`,

    //technician
    tecnicianUrl: `${baseUrl}/technician`,

    //item
    itemUrl:`${baseUrl}/item`,

}