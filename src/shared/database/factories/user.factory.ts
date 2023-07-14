import { User } from '@app/user/model/user.model';
import { setSeederFactory } from 'typeorm-extension';
import { Role } from '@shared/enums/role.enum';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.name.fullName();
  user.mail = user.password = faker.internet.email();
  user.createdAt = new Date();
  user.role = Role.User;
  return user;
});
