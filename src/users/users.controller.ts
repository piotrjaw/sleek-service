import { Controller, Get, Post, Body, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  findOne(@Response() res) {
    res.send(this.usersService.findOne(res.locals.user.id));
  }

  @Post('login')
  logIn(@Body() loginDto: LoginDto, @Response() res) {
    res.status(200).send(this.usersService.logIn(loginDto.email));
  }
}
