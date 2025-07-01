import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique,
    Default
} from 'sequelize-typescript';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
    tableName: 'users',
    timestamps: true
})
class User extends Model<UserAttributes, UserCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare password: string;

    @AllowNull(false)
    @Default('user')
    @Column(DataType.ENUM('admin', 'user'))
    declare role: 'admin' | 'user';
}

export default User;
