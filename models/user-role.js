import { Model } from 'objection';

class UserRole extends Model {
  static get tableName() {
    return 'RolUsuario';
  }
}

export default UserRole;
