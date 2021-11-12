import { Controller, Get, Param, Post, Response } from '@nestjs/common';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  findAllForUser(@Response() res) {
    res.send(this.dealsService.findAllForUser(res.locals.user.id));
  }

  @Get('stats')
  findAll() {
    return this.dealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(id);
  }

  @Post(':id/activate')
  activate(@Param('id') id: string, @Response() res) {
    this.dealsService.activate(id, res.locals.user.id);
    res.sendStatus(200);
  }

  @Get('domain/:domain')
  findAllByDomain(@Param('domain') domain: string) {
    return this.dealsService.findAllByDomain(domain);
  }
}
