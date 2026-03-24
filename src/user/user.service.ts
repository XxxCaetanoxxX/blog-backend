import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService
  ) { }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {

    const exists = await this.userRepository.exists({
      where: {
        email: createUserDto.email
      }
    })

    if (exists) {
      throw new ConflictException('Email ja existe');
    }

    const hashedPassword = await this.hashingService.hash(createUserDto.password);
    const newUser: CreateUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword
    };

    const created = await this.userRepository.save(newUser);

    return created

  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id })
  }

  save(user: User) {
    return this.userRepository.save(user)
  }

}
