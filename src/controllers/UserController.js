/* Controller for performing user related API requests */
var UserController = {
    /* Fetches basic user information from the database */
    authenticateUser() {
        const url = '/user';
        const request = new Request(url, {
            method: 'POST'
        });

        return fetch(request);
    }
};

export default UserController;
