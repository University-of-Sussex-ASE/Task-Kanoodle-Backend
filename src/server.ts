import { App } from '@/app';
import { KanoodleController } from '@controllers/kanoodle.controller';
import { PyramidController } from '@controllers/pyramid.controller';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([KanoodleController, PyramidController]);
app.listen();
