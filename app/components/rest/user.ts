/// <reference path="../../../typings/tsd.d.ts" />

export class UserService {
    rest: restangular.IService;
    restFull: restangular.IService;
    static $inject: Array<string> = ['Restangular'];
    
    constructor(rest: restangular.ICollection) {
        this.rest = rest.withConfig((RestangularConfigurer) => {
            RestangularConfigurer.setBaseUrl('/api/v1/');
        });
        this.restFull = rest.withConfig((RestangularConfigurer) => {
            RestangularConfigurer.setBaseUrl('/api/v1/');
            RestangularConfigurer.setFullResponse(true);
        });
    }

    // **get**
    // **@returns** a promise with a user with specific id.
    get(id) {
        return this.rest.one('users', id).get().then(function(user) {
            return user;
        });
    }

    // **login**
    // **@returns** a promise with user login.
    login(user: { username: string, password: string }) {
        return this.rest.one('auth').post('login', user);
    }

    // **logout**
    // **@returns** a promise with a user logout.
    logout() {
        return this.rest.one('auth').post('logout');
    }
    
    // **getUsers**
    // **@returns** a promise with list of users
    getUsers(){
        return this.rest.all('users').getList().then(function(users){
            return users;
        });
    }

    // **addUser**
    // **@returns** a promise with status code
    addUser(user){
        return this.restFull.all('users').post(user);
    }
}
