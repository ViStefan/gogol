var room = 'Литературный чат';
var page = 1;
var counter = 0;
var string = 45;
var limit = 25;
var verbs = [];


// converts arabic numbers from 1 to 31 into romans
// used for decoration of dates
function d2Roman(n) {
  var r = [];
  while (n >= 10) {
    r.push('X');
    n -= 10;
  }
  if (n == 9) {
    r.push('IX');
  } else {
    if (n >= 5) {
      r.push('V');
      n -= 5;
    } else if (n == 4) {
      r.push('IV');
      n -= 4;
    }
    while (n > 0) {
      r.push('I');
      n -= 1;
    }
  }
  return r.join('');
}

function init(room, name, sex) {
  // rules for random verbs in chat
  verbs = [
    [
      [
        'сказал' + (sex ? '' : 'а'),
        'произнес' + (sex ? '' : 'ла'),
        'прогоровил' + (sex ? '' : 'а'),
        'заявил' + (sex ? '' : 'а'),
        'промолвил' + (sex ? '' : 'а'),
        'сообщил' + (sex ? '' : 'а'),
        'изрек' + (sex ? '' : 'ла'),
        'высказал' + (sex ? 'ся' : 'ась')
      ],
      [
        'улыбнул' + (sex ? 'ся' : 'ась'),
        'повеселел' + (sex ? '' : 'а'),
        'обрадовал' + (sex ? 'ся' : 'ась'),
        'порадовал' + (sex ? 'ся' : 'ась')
      ],
      [
        'огорчил' + (sex ? 'ся': 'ась'),
        'расстроил' + (sex ? 'ся' : 'ась'),
        'погрустил' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'спросил' + (sex ? '' : 'а'),
        'поинтересовал' + (sex ? 'ся' : 'ась'),
        'задал' + (sex ? '' : 'а') + ' вопрос'
      ],
      [
        'весело спросил' + (sex ? '' : 'а')
      ],
      [
        'грустно спросил' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'воскликнул' + (sex ? '' : 'а')
      ],
      [
        'радостно воскликнул' + (sex ? 'ся' : 'ась')
      ],
      [
        'вознегодовал' + (sex ? '' : 'а'),
        'рассердил' + (sex ? 'ся' : 'ась')
      ]
    ],
    [
      [
        'протянул' + (sex ? '' : 'а')
      ],
      [
        'расплыл' + (sex ? 'ся' : 'ась') + ' в улыбке'
      ],
      [
        'взгрустнул' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'задумчиво спросил' + (sex ? '' : 'а')
      ],
      [
        'с улыбкой спросил' + (sex ? '' : 'а')
      ],
      [
        'грустно спросил' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'вскрикнул' + (sex ? '' : 'а')
      ],
      [
        'посмеял' + (sex ? 'ся' : 'ась')
      ],
      [
        'прикрикнул' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'громко спросил' + (sex ? '' : 'а')
      ],
      [
        'рассмеял' + (sex ? 'ся' : 'ась')
      ],
      [
        'взорвал' + (sex ? 'ся' : 'ась')
      ]
    ],
    [
      [
        'крикнул' + (sex ? '' : 'а'),
        'прокричал' + (sex ? '' : 'а'),
        'громко крикнул' + (sex ? '' : 'а')
      ],
      [
        'громко рассмеял' + (sex ? 'ся' : 'ась'),
        'захохотал' + (sex ? '' : 'а'),
        'расхохотал' + (sex ? 'ся' : 'ась'),
      ],
      [
        'взорвал' + (sex ? 'ся' : 'ась'),
        'прогремел' + (sex ? '' : 'а'),
        'заорал' + (sex ? '' : 'а')
      ]
    ],
    [
      [
        'громко спросил' + (sex ? '' : 'а'),
        'прокричал' + (sex ? '' : 'а') + ' вопрос'
      ],
      [
        'сквозь смех спросил' + (sex ? '' : 'а'),
        'смеясь спросил' + (sex ? '' : 'а')
      ],
      [
        'недовольно спросил' + (sex ? '' : 'а')
      ]
    ]
  ];

  // first spacing after insertion of heared
  counter += 15;

  var now = new Date();
  // this mess is allowed in proof-of-concepts!
  // they told me!
  // anyway...
  var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  var $page = $('.page').last();

  $page.append($('<div></div>').addClass('title').text(room.toUpperCase()));
  $page.append($('<div></div>').addClass('subtitle').text(days[now.getDay()]));
  $page.append($('<div></div>').addClass('chapter').text('Глава ' + d2Roman(now.getDate())));
  postMessage([name + ' вош' + (sex ? 'ел': 'ла') +
                                  ' и осмотрел' + (sex ? 'ся' : 'ась') + '.']);

  setInterval(getMessages, 1000);
}

function getMessages() {
  $.post('server.php', {'action': 'get'}).done(function(m) {
    if (m.length) {
      printMessages(m);
    }
  });
}

function addMessage(m, name, sex) {
  m = bookificate(m, name, sex);
  if (!m) return false;
  postMessage(m);
}

function postMessage(m) {
  $.post('server.php', {'message[]': m, 'action': 'send'}).done(function(data) {
    console.log(data);
  });
  printMessages(m);
}

function printMessages(m) {
  if (counter >= limit) {
    counter = 0;

    $('.page').last().append($('<p></p>').addClass('pagination').text(page));
    page += 1;

    $('#wrapper').append($('<div></div>').addClass('page'));
  }

  var len = m[0].length + (m[1] ? m[1].length : 0);
  counter += m.length + Math.floor(len / string);

  m.map(function(msg) {
    $('.page').last().append($('<p></p>').html(msg));
  });
}

// main func of this POC
// it makes any text look awersome like in books
function bookificate(m, name, sex) {
  var result = [];
  
  // grab mood of message from smiles, that will be
  // ommited in best-look purposes
  var sad = (m.match(/\(/g) || []).length,
      happy = (m.match(/\)/g) || []).length,
      moody = (happy - sad) != 0,
      // of course there will be some meaninful CONSTANTS
      // for this mess, but now...
      // know, that it is just indexes of subarrays in verb rules
      mood = moody ? ((happy - sad) > 0 ? 1 : 2) : 0;

  var sentences = m.trim()
                          // preparation
                          .replace(/(ё)/g, 'е').replace(/(Ё)/g, 'Е')
                          .replace(/^[^"'\da-za-я]+/ig, '')
                          .replace(/[^"'\da-za-я\.\?!]+$/ig, '')
                          .replace(/[^\d\sa-zа-я,\.\?!"';:\-]+/ig, '')

                          //orphograpy
                          .replace(/([a-zа-я])\1{2,}/g, '$1-$1')
                          .replace(/(а)?(ха){2,}(x)*/ig, 'ха-ха-ха')

                          //punctuation
                          .replace(/[\s]+((\.\.\.|\.|\?|!|,|;|:)+)/g, '$1 ')
                          .replace(/-[\s]+-/g, '-')
                          .replace(/[-]{2,}/g, ' - ')
                          .replace(/[\.]{3,}/g, '...')
                          .replace(/[\.]{2,}([\s]|$)/g, '... ')
                          .replace(/([?]|,|;|:)\1{1,}/g, '$1')
                          .replace(/([!]+)\?/g, '?$1')
                          .replace(/([\.]+)([?!]+)/g, '$2$1')
                          .replace(/[!]{3,}/g, '!!!')
                          .replace(/\?[\.]+/, '?..')
                          .replace(/[!][\.]+/, '!..')
                          .replace(/[?]+[!] {2,}/g, '?!!')
                          .replace(/[?]+[!]+[\.]+/g, '?!.')

                          //typographic
                          .replace(/[\s]+/g, ' ')
                          .replace(/(\s-\s?|\s?-\s)/g, '&#8239;&mdash;&thinsp;')
                          .replace(/'/g, '&rsquo;')
                          .replace(/"(.+)"/g, '&#xab;$1&#xbb;')
                          .replace(/["]/g, '')
                          .replace(/\s([a-zа-я]{1,2})\s([a-zа-я]{3,})/ig, ' $1&nbsp;$2')

                          //finalisation
                          .replace(/((\.\.\.|\.|\?|!)+)/g, '$1|')
                          .split('|').filter(function (s) {
                            return s != '' && s != ' ';
                          })

  sentences = sentences.map(function (s) {
    s = s.trim();
    s = s[0].toUpperCase() + s.slice(1); 
    var end = s[s.length - 1];
    s = s.slice(0, -1) + (['.', '?', '!'].indexOf(end) > -1 ? end : end + '.');
    return s;
  }).filter(function (s) {
    return !(/^[\.,\?!;]+$/.test(s));
  });
  
  // select random verb according to verb rules declared before
  var num = sentences.length;
  var category = 0;

  if (num) {
    var end = sentences[0][sentences[0].length - 1];
    var preend = (sentences[0].length > 3 ? sentences[0].slice(-3, -1) : false);
    category = '.?!'.indexOf(end);

    if (category == 0) {
      if (preend) {
        if (['..', '?.', '!.', '?!'].indexOf(preend) > -1) {
          category = 3 + ['..', '?.', '!.', '?!'].indexOf(preend);
        } else {
          end = ',';
        }
      } else {
        end = ',';
      }
    } else if (category == 2) {
      if (preend) {
        if (['!!', '?!'].indexOf(preend) > -1) {
          category = 7 + ['!!', '?!'].indexOf(preend);
        }
      }
    }
  } else {
    if (!moody) {
      return false;
    }
  }

  var verb = verbs[category][mood][Math.floor(verbs[category][mood].length * Math.random())];

  if (!num) {
    result.push(name + ' ' + verb + '.');
  } else if (Math.random() < 0.1) {
    result.push(name + ' ' + verb + ':');
    result.push("&mdash;&#8196;" + sentences.join(' '));
  } else {
    result.push("&mdash;&#8196;" + sentences[0].slice(0, -1) +
                                  end + "&#8239;&mdash;&thinsp;" +
                                  verb + ' ' + name + '.' + (num > 1 ? '&#8239;&mdash;&thinsp;' +
                                  sentences.slice(1).join(' ') : ''));
  }

  return result;
}

$(function(){
  // load stored userdata
  var name = localStorage.name,
      sex = localStorage.sex;

  init(room, name, sex);

  // init UI behavior
  $(document).on('keydown', function(event) {
    $("html, body").scrollTop($(this).height());
    $('#message').focus();
  });

  $('#message').on('keyup', function(event) {
    if (event.which == 13) {
      addMessage(this.value, name, sex);
      this.value = '';
      $(this).css('transform', 'rotate(' + Math.floor(-1 + 3 * Math.random()) + 'deg)');
    }
    $("html, body").scrollTop($(document).height());
  });
});