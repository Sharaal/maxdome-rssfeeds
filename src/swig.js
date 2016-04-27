import co from 'co';
import render from 'koa-swig';

export default co.wrap(render({ writeBody: false }));
