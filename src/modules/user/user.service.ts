import { IsEmail } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user/registerUserDto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}
  //   async create(registerUserDto: RegisterUserDto): Promise<User> {
  //     const { companyName, address, email, password } = registerUserDto;

  //     const salt = await bcrypt.genSalt();
  //     const hashedPassword = await bcrypt.hash(password, salt);

  //     const user = new User();
  //     user.companyName = companyName;
  //     user.address = address;
  //     user.email = email;
  //     user.password = hashedPassword;

  //     return this._userRepository.save(user);
  //   }

  //   async findById(id: string): Promise<User> {
  //     return this._userRepository.findOneBy({ id });
  //   }

  //   async findByUsername(email: string): Promise<User> {
  //     return this._userRepository.findOne({ where: { email } });
  //   }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { companyName, address, email, password } = registerUserDto;

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.companyName = companyName;
    user.address = address;
    user.email = email;
    user.password = password;

    // console.log(user.companyName, user.address, user.email, user.password);
    const newUser = await this._userRepository.save(user);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this._userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this._userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this._userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUser): Promise<User> {
    const exsistingUser = await this._userRepository.findOneBy({ id });

    const updateUser = new User();
    updateUser.address = updateUserDto.address || exsistingUser.address;
    updateUser.companyName = updateUserDto.companyName || exsistingUser.companyName;
    updateUser.email = updateUserDto.email || exsistingUser.email;
    updateUser.password = updateUserDto.password || exsistingUser.password;
    updateUser.refreshToken =
      updateUserDto.refreshToken || exsistingUser.refreshToken;
    await this._userRepository.update(id, updateUser);
    const updatedUser = await this._userRepository.findOne({
      where: { id },
    });
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this._userRepository.delete(id);
  }
}
