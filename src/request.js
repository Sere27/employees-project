// 4 işlemimiz olacak update delete get post

export class Request {
    //urlmiz endpointimiz
    constructor(url) {
        this.url = url;
    }

    async get() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData;
    }

    async post(data) {
        const reponse = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        const responseData = await reponse.json();
        return responseData;
    }

    async put(id, data) {
        const reponse = await fetch(this.url + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        const responseData = await reponse.json();
        return responseData;
    }

    async delete(id) {
        const reponse = await fetch(this.url + "/" + id, {
            method: "DELETE",
        });
        return "Veri Silindi";
    }
}