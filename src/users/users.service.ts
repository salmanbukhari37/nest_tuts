import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    getUsers(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): any {
        try{
            if (role) {
                return this.users.filter(user => user.role === role);
            }
    
            return this.usersRepository.find();

        } catch (error) {
            console.log(error)
        }
    }

    findOne(id: number) {
        const user = this.usersRepository.find();

        return user;
    }

    async create(user: User) {
        // const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        // const newUser = {
        //     id: usersByHighestId[0].id + 1,
        //     ...user
        // }

        const newUser = await this.usersRepository.createQueryBuilder().insert().into(User)
            .values(user).execute();
        // this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
