import test, { expect } from "@playwright/test";
import { bookingDetails } from "../test-data/booking_details.json"


test.describe('API Testing - CRUD', () => {
    test('should be able to create a booking', async ({ request }) => {
        const response = await request.post("/booking", {
            data: {
                "firstname": "John",
                "lastname": "Britt Bat",
                "totalprice": 121,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2023-06-01",
                    "checkout": "2023-06-15"
                },
                "additionalneeds": "Breakfast"
            }
        });
        console.log("Response in JSON : ....." + await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json()
        console.log("responseBody......" + responseBody.booking.firstname)
        expect(responseBody.booking).toHaveProperty("firstname", "John");
        expect(responseBody.booking).toHaveProperty("lastname", "Britt Bat");
        expect(responseBody.booking).toHaveProperty("totalprice", 121);
        expect(responseBody.booking).toHaveProperty("depositpaid", true);
    });

    test.only('should be able to create a booking with JSON', async ({ request }) => {
        console.log(bookingDetails)
        const response = await request.post("/booking", {
            data: bookingDetails,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const responseBody = await response.json();
        expect(responseBody.booking).toHaveProperty("lastname", "Thomas");
        expect(responseBody.booking).toHaveProperty("totalprice", 131);
        expect(responseBody.booking).toHaveProperty("depositpaid", true);
    })

    test('To get all the booking details', async ({ request }) => {
        const response = await request.get("/booking");
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    })

    test('To get specific booking details', async ({ request }) => {
        const response = await request.get('/booking/1', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const respBody = await response.json();
        expect(respBody.firstname).toBe('Jim')
    })

    test('To get subset of booking details using query parameters', async ({ request }) => {
        const response = await request.get('/booking', {
            params: {
                firstname: "Susan",
                lastname: "Jackson"
            },
        });
        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    })

    test('To get subset of booking details using query parameters - checkin date example', async ({ request }) => {
        const response = await request.get('/booking', {
            params: {
                checkin: "2021-01-15",
                checkout: "2023-03-25"
            },
        });

        console.log(await response.json());
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    })



    test('To update the booking details', async ({ request }) => {

        const updateRequest = await request.put('/booking/172', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Cookie': `token=$'{ token }'`,
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
            },
            data: {
                "firstname": "James",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2023-06-01",
                    "checkout": "2023-06-15"
                },
                "additionalneeds": "Breakfast"
            }
        });
        console.log("Response Body...." + await updateRequest.body());
        await expect(updateRequest.ok()).toBeTruthy();
        await expect(updateRequest.status()).toBe(200);
        const updatedResponseBody = await updateRequest.json()
        expect(updatedResponseBody).toHaveProperty("firstname", "James");
        expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
        expect(updatedResponseBody).toHaveProperty("totalprice", 111);
        expect(updatedResponseBody).toHaveProperty("depositpaid", true);
    })


    test('To delete the booking details', async ({ request }) => {

        const deleteRequest = await request.delete('/booking/1', {
            headers: {
                'Content-Type': 'application/json',
                // 'Cookie': 'token=${token}'
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
            }
        });
        expect(deleteRequest.status()).toEqual(201);
        expect(deleteRequest.statusText()).toBe('Created');
    })

})