/**
 * 7*4 rect
 */
;(function(global){
    var zero = [];
    zero.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    },{
        x: 0,
        y: 4
    },{
        x: 0,
        y: 5
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    });
    var one = [];
    one.push({
        x: 3,
        y: 0
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 3,
        y: 6
    });
    var two = [];
    two.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 0,
        y: 4
    },{
        x: 0,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    });
    var three = [];
    three.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    });
    var four = [];
    four.push({
        x: 0,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 0,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 3,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 3,
        y: 6
    },{
        x: 3,
        y: 0
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    });
    var five = [];
    five.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    });
    var six = [];
    six.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    },{
        x: 0,
        y: 4
    },{
        x: 0,
        y: 5
    });
    var seven = [];
    seven.push({
        x: 3,
        y: 0
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 3,
        y: 6
    },{
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    });
    var eight = [];
    eight.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    },{
        x: 0,
        y: 4
    },{
        x: 0,
        y: 5
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    });
    var nine = [];
    nine.push({
        x: 0,
        y: 0
    },{
        x: 1,
        y: 0
    },{
        x: 2,
        y: 0
    },{
        x: 3,
        y: 0
    },{
        x: 0,
        y: 1
    },{
        x: 0,
        y: 2
    },{
        x: 3,
        y: 3
    },{
        x: 2,
        y: 3
    },{
        x: 1,
        y: 3
    },{
        x: 0,
        y: 3
    },{
        x: 3,
        y: 4
    },{
        x: 3,
        y: 5
    },{
        x: 0,
        y: 6
    },{
        x: 1,
        y: 6
    },{
        x: 2,
        y: 6
    },{
        x: 3,
        y: 6
    },{
        x: 3,
        y: 1
    },{
        x: 3,
        y: 2
    });
    global.numbers = [zero,one,two,three,four,five,six,seven,eight,nine];
})(window);
