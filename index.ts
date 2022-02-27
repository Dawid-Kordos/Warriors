import * as express from 'express';
import 'express-async-errors';
import { json, static as staticFolder, urlencoded } from 'express';
import * as methodOverride from 'method-override';
import { engine } from 'express-handlebars';
import { homeRouter } from './routers/home';
import { warriorRouter } from './routers/warrior';
import { arenaRouter } from './routers/arena';
import { hallOfFameRouter } from './routers/hall-of-fame';
import './utils/db';
import { handleError } from './utils/errors';

const app = express();

app.use(methodOverride('_method'));
app.use(staticFolder('public'));
app.use(urlencoded({
  extended: true,
}));
app.use(json());
app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: ?,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

app.use(handleError);

app.listen(3000, () => console.log('Server is listenning on port 3000'));
