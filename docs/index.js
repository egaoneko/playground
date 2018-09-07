import * as _pg_util from './pg/util';
import * as _pg_utils_image from './pg/utils/image';

var pg = window['pg'] = {};

pg.util = {};
pg.utils = {};
pg.utils.image = {};
pg.util.getUid = _pg_util.getUid;
pg.utils.image.getRandomDummyImages = _pg_utils_image.getRandomDummyImages;
pg.utils.image.getRandomHexColor = _pg_utils_image.getRandomHexColor;
