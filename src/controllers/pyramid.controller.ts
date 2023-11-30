import { Controller, Body, Post, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Container } from 'typedi';
import { PyramidService } from '@services/pyramid.service';

@Controller()
export class PyramidController {
  public path = '/users';
  public pyramidService = Container.get(PyramidService);

  @Post('/pyramid')
  @HttpCode(201)
  @OpenAPI({ summary: 'Find solutions for Pyramid prolem' })
  async solvePyramidProblem(@Body() input) {
    const pyramidSolutions = await this.pyramidService.solvePyramidProblem(input);
    return { data: pyramidSolutions, message: 'pyramid problem solved!' };
  }
}
