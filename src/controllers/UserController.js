var UserController = {
    authenticateUser() {
        const url = '/user';
        const request = new Request(url, {
            method: 'POST'
        });

        return fetch(request);
    }
};

export default UserController;
