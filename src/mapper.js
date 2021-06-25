const mapper = {
  a: '😀',
  b: '😃',
  c: '😄',
  d: '😁',
  e: '😆',
  f: '😅',
  g: '😂',
  h: '🤣',
  i: '🥲',
  j: '☺️',
  k: '😊',
  l: '😇',
  m: '🙂',
  n: '🙃',
  o: '😉',
  p: '😌',
  q: '😍',
  r: '🥰',
  s: '😘',
  t: '😗',
  u: '😙',
  v: '😚',
  w: '😋',
  x: '😛',
  y: '😝',
  z: '😜',
  ' ': '.',
};

const TelexType = [
  'aws',
  'awf',
  'awr',
  'awx',
  'awj',
  'aas',
  'aaf',
  'aar',
  'aax',
  'aaj',
  'ees',
  'eef',
  'eer',
  'eex',
  'eej',
  'oos',
  'oof',
  'oor',
  'oox',
  'ooj',
  'ows',
  'owf',
  'owr',
  'owx',
  'owj',
  'uws',
  'uwf',
  'uwr',
  'uwx',
  'uwj',
  'as',
  'af',
  'ar',
  'ax',
  'aj',
  'aw',
  'aa',
  'dd',
  'es',
  'ef',
  'er',
  'ex',
  'ej',
  'ee',
  'is',
  'if',
  'ir',
  'ix',
  'ij',
  'os',
  'of',
  'or',
  'ox',
  'oj',
  'oo',
  'ow',
  'us',
  'uf',
  'ur',
  'ux',
  'uj',
  'uw',
  'ys',
  'yf',
  'yr',
  'yx',
  'yj',
];
const CharCode = [
  7855, 7857, 7859, 7861, 7863, 7845, 7847, 7849, 7851, 7853, 7871, 7873, 7875,
  7877, 7879, 7889, 7891, 7893, 7895, 7897, 7899, 7901, 7903, 7905, 7907, 7913,
  7915, 7917, 7919, 7921, 225, 224, 7843, 227, 7841, 259, 226, 273, 233, 232,
  7867, 7869, 7865, 234, 237, 236, 7881, 297, 7883, 243, 242, 7887, 245, 7885,
  244, 417, 250, 249, 7911, 361, 7909, 432, 253, 7923, 7927, 7929, 7925,
];

function telexConverter(text) {
  const textArr = text.split('');

  return textArr
    .map((word) => {
      const code = word.charCodeAt(0);
      if (CharCode.indexOf(code) !== -1) {
        return TelexType[CharCode.indexOf(code)];
      }
      return word;
    })
    .join('');
}

function telexReverter(text) {
  let result = text;

  TelexType.map((telex, index) => {
    result = result.replaceAll(telex, String.fromCharCode(CharCode[index]));
  });

  return result;
}

export { telexConverter, telexReverter };
export default mapper;
