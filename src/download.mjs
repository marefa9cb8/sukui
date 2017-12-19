'use strict';

import request from 'request-promise-native';
import fs from 'fs';
import path from 'path';

function download(url){
  let options = {
    method: 'GET',
    url: url,
    encoding: null
  };
  let filenName = path.basename(url);

  return request.get(options).pipe(fs.createWriteStream('./img/' + filenName));
}

export {download};
