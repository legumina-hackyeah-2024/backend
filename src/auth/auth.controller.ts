import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleOAuthGuard } from './guards/google.guard';

@Controller()
export class AuthController {
  @Get('google')
  @Public()
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}
}
