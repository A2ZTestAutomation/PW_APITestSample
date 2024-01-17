import { expect, test } from "@playwright/test";

test.describe('API Testing - CRUD', () => {
    test('Fetch list of  users', async ({ request }) => {
        const response = await request.get("/api/users");
        const resData = JSON.parse(await response.text())
        console.log(resData)
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await resData.data[0].first_name).toBe('George')
        expect(await resData.data).toHaveLength(6)
    })

    test('Fetch the details of a particular user', async ({ request }) => {
        const response = await request.get("/api/users/6");
        const resData = JSON.parse(await response.text())
        console.log(resData)
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await resData.data.first_name).toBe('Tracey')
    })

    test('Add a new User', async ({ request }) => {
        const response = await request.post("/api/users", {
            data: {
                "name": "Anandhi",
                "job": "TestLeader"
            }
        })
        const resData = JSON.parse(await response.text())
        expect(response.status()).toBe(201);
        expect(await resData.name).toContain('Anandhi')
        expect(await resData.job).toContain('TestLeader')
    })

    test('Update an existing User', async ({ request }) => {
        const response = await request.put("/api/users/2", {
            data: {
                "name": "Anandhi",
                "job": "TestManager"
            }
        })
        const resData = JSON.parse(await response.text())
        expect(response.status()).toBe(200);
        expect(await resData.name).toContain('Anandhi')
        expect(await resData.job).toContain('TestManager')
    })

    test('Delete an existing user', async ({ request }) => {
        const deleteRequest = await request.delete('/api/users/2')
        expect(deleteRequest.status()).toEqual(204);
    })

    //With Basic Auth Token
    test('To update the booking details', async ({ request }) => {
        const updateRes = await request.put('https://restful-booker.herokuapp.com/booking/1', {
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
        console.log("Response Body...." + await updateRes.body());
        // await expect(updateRes.status()).toBe(200);
        const updatedResponseBody = await updateRes.json()
        expect(updatedResponseBody).toHaveProperty("firstname", "James");
        expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
        expect(updatedResponseBody).toHaveProperty("totalprice", 111);
        expect(updatedResponseBody).toHaveProperty("depositpaid", true);
    })

})