import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/throw'

describe('UsersComponent', () => {
  let usersComponent: UsersComponent;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(null);
    usersComponent = new UsersComponent(userService);
  });

  it('should set users property with the items returneed from the server', () => {
    let users = [1, 2, 3];
    spyOn(userService, 'getUsers').and.callFake(() => {
      return Observable.from([users]);
    });

    usersComponent.ngOnInit();

    expect(usersComponent.users).toBe(users);
  });

  describe('When deleting user', () => {
    let user;

    beforeEach(() => {
      usersComponent.users = [
        { id: 1 },
        { id: 2 },
      ];

      user = usersComponent.users[0];
    });

    it('should remove the selected user from the list if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).toBe(-1);
    });

    it('should NOT remove the seleted user from the list if the user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).toBeGreaterThan(-1);
    })

    it('should call the server to delete the selected user if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let serviceSpy = spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());

      usersComponent.deleteUser(user);

      expect(serviceSpy).toHaveBeenCalledWith(user.id);
    })

    it('should NOT call the server to delete the selected user if the user cancels deletion', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      let serviceSpy = spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());

      usersComponent.deleteUser(user);

      expect(serviceSpy).not.toHaveBeenCalled();
    })

    it('should undo deletion if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(window, 'alert').and.callFake(() => { });
      spyOn(userService, 'deleteUser').and.returnValue(Observable.throw('error from server'));

      usersComponent.deleteUser(user);

      expect(usersComponent.users.indexOf(user)).toBeGreaterThan(-1);
    })

    it('should display an error if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let alertSpy = spyOn(window, 'alert').and.callFake(() => { });
      spyOn(userService, 'deleteUser').and.returnValue(Observable.throw('error from server'));

      usersComponent.deleteUser(user);

      expect(alertSpy).toHaveBeenCalled();
    })

  })

})