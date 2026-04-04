import { test, request, expect } from '@playwright/test';
import dataFile from "../Utilities/data.json"
test("Booking - Heroku" ,async({ request })=>{

    // new auth token
    let r1=await request.post(`${dataFile.baseUrl}/auth`,{
        headers:{
            "Content-Type":"application/json"
        },
        data:{
            "username":dataFile.login.username,
            "password":dataFile.login.password
        },
        ignoreHTTPSErrors:true
    });

    const body= await r1.json();
    expect(r1.status()).toBe(200);
    const token=body.token;
    console.log(body);
    expect(body).toHaveProperty("token");

    // Create booking 
    const r2=await request.post(`${dataFile.baseUrl}/booking`,{
        headers:{
            "Content-Type":"application/json"
        },
        data:{
             "firstname" : dataFile.createBooking.firstname,
             "lastname" : dataFile.createBooking.lastname,
             "totalprice" : dataFile.createBooking.totalprice,
             "depositpaid" : dataFile.createBooking.depositpaid,
             "bookingdates" : {
                "checkin" :dataFile.createBooking.bookingdates.checkin,
                "checkout" : dataFile.createBooking.bookingdates.checkout
                },
                "additionalneeds" :dataFile.createBooking.additionalneeds
        },
        ignoreHTTPSErrors:true
    })
    const data=await r2.json();
    console.log(data);
    expect(r2.status()).toBe(200);
    const bookingid=data.bookingid
    console.log(bookingid);
    expect(data).toEqual(
        {
        "bookingid": bookingid,
        "booking": {
       "firstname" : dataFile.createBooking.firstname,
        "lastname" : dataFile.createBooking.lastname,
        "totalprice" : dataFile.createBooking.totalprice,
        "depositpaid" : dataFile.createBooking.depositpaid,
        "bookingdates" : {
            "checkin" :dataFile.createBooking.bookingdates.checkin,
            "checkout" : dataFile.createBooking.bookingdates.checkout
        },
        "additionalneeds" :dataFile.createBooking.additionalneeds
        }
        }
    )

    // getBooking id
    // 1st - all id
    const r3=await request.get(`${dataFile.baseUrl}/booking`,{
        ignoreHTTPSErrors:true
    })
    const dataF= await r3.json();
    expect(r3.status()).toBe(200);
    console.log(dataF);

    // 2nd - filter name
    const r4=await request.get(`${dataFile.baseUrl}/booking?firstname=${dataFile.createBooking.firstname}&lastname=${dataFile.createBooking.lastname}`)
    const data4=await r4.json();
    expect(r4.status()).toBe(200);

    // 3rd - filter by checkindate and checkpout date
    const r5=await request.get(`${dataFile.baseUrl}/booking?checkin=${dataFile.createBooking.bookingdates.checkin}&checkout=${dataFile.createBooking.bookingdates.checkout}`)
    const data5=await r4.json();
    expect(r5.status()).toBe(200);
    console.log(data5);

    // Update 
    const r6=await request.put(`${dataFile.baseUrl}/booking/${bookingid}`,{
        headers:{
            "Cookie":`token=${token}`,
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        data:{
             "firstname" : dataFile.createBooking.firstname,
             "lastname" : dataFile.createBooking.lastname,
             "totalprice" : dataFile.createBooking.totalprice,
             "depositpaid" : dataFile.createBooking.depositpaid,
             "bookingdates" : {
                "checkin" :dataFile.createBooking.bookingdates.checkin,
                "checkout" : dataFile.createBooking.bookingdates.checkout
                },
                "additionalneeds" :"dinnernight",
      
        ignoreHTTPSErrors:true
        }
    })
    expect(r6.status()).toBe(200);
    const data6=await r6.json();
    console.log(data6.additionalneeds);
    
// Partial Update
const r7 = await request.patch(`${dataFile.baseUrl}/booking/${bookingid}`, {
    headers: {
        "Cookie": `token=${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    data: dataFile.partialUpdate,
    ignoreHTTPSErrors: true
})

expect(r7.status()).toBe(200);
const data7 = await r7.json();
console.log(data7);

expect(data7.firstname).toBe(dataFile.partialUpdate.firstname);
expect(data7.lastname).toBe(dataFile.partialUpdate.lastname);


// Delete Booking
const r8 = await request.delete(`${dataFile.baseUrl}/booking/${bookingid}`, {
    headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
    },
    ignoreHTTPSErrors: true
})

expect(r8.status()).toBe(201);
console.log("Booking Deleted Successfully");

})