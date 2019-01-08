const baseUrl = 'http://localhost:3000/api';

export const apiUrl = {
    //Clinic
    clinicUrl : `${baseUrl}/clinic`,
    clinicUrlWithId : `${baseUrl}/clinic/{0}`,
    clinicUrlWithSearch : `${baseUrl}/clinic/search/{0}`,

    //operation
    operationUrl : `${baseUrl}/operation`,
    operationUrlWithId : `${baseUrl}/operation/{0}`,
    operationUrlWithSearch : `${baseUrl}/operation/search/{0}`,

    // student
    studentUrl: `${baseUrl}/student`,
    studentUrlWithId: `${baseUrl}/student/{0}`,
    studentUrlWithSearch : `${baseUrl}/student/search/{0}`,

    //order
    orderUrl:`${baseUrl}/order`,
    orderUrlWithId: `${baseUrl}/order/{0}`,
    orderUrlWithSearch : `${baseUrl}/order/search/{0}`,
    orderFinishedUrl : `${baseUrl}/order/finished`,
    orderUrlwithType:`${baseUrl}/order/{0}/type/{1}`,

    // ext-order
    extOrderUrl: `${baseUrl}/ext-order`,
    extOrderUrlWithId: `${baseUrl}/ext-order/{0}`,
    extOrderUrlWithSearch : `${baseUrl}/ext-order/search/{0}`,


    //technician
    technicianUrl: `${baseUrl}/technician`,
    technicianUrlWithId: `${baseUrl}/technician/{0}`,
    technicianUrlWithSearch : `${baseUrl}/technician/search/{0}`,

    //item
    itemUrl:`${baseUrl}/item`,
    itemUrlWithId:`${baseUrl}/item/{0}`,
    itemUrlWithSearch : `${baseUrl}/item/search/{0}`,

    //store
    storeUrl:`${baseUrl}/store`

}