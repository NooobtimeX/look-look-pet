import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get(":id/rewards")
  async getRedeemedRewards(@Param("id") id: string) {
    return this.usersService.getRedeemedRewards(id);
  }
}
