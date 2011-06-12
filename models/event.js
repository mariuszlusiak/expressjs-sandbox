var ids = 0;

var db = {};

var Event = exports = module.exports = function Event(title, start, end, allDay) {
  this.id = ++ids;
  this.title = title;
  this.start = start;
  this.end = end;
  this.allDay = allDay;
}

exports.all = function(fn){
  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
  fn(null, arr);
};

var e1 = new Event('Test 1', '2011-06-12 10:00:00', '2011-06-12 11:00:00', false);
db[e1.id] = e1;
var e2 = new Event('Test 2', '2011-06-12 13:00:00', '2011-06-12 14:00:00', false);
db[e2.id] = e2;
