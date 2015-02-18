if (Meteor.isClient) {
    notDen = 1284, denChamDoi = notDen * 1.5, mocDon = notDen / 2, trangChamDoi = notDen * 2.5, notTrang = notDen * 2;
    Template.karaoke.helpers({
        game: function () {
            $(document).ready(function () {
                game = new Phaser.Game(1024, 600, Phaser.AUTO, "game", {
                    preload: preload,
                    create: create,
                    update: update
                });

                return game;
            })
        }
    });

    var preload = function () {
        game.load.spritesheet('play', 'assets/play.png');
    }

    var create = function () {
        /*var notes = ['Đồ','Rê','Mi','Fa','Son','La','Si','Đố'];
         var text = "- phaser -\n with a sprinkle of \n pixi dust.";
         var style = { font: "25px Arial", fill: "#ff0044", align: "center" };



         var t = game.add.text(100, 200, text, style);
         Meteor.setTimeout(function(){
         t.addColor('green',12)
         },4500);
         var step = 10;
         var noteTexts = [];
         _.each(notes,function(n){
         step+=40;
         var t = game.add.text(step,100,n,{font : '16px Arial',fill : 'white',align : 'left'});
         noteTexts.push(t);
         })
         var waitTime = 52;
         _.each(noteTexts,function(t){
         waitTime+=(1339 - 52);
         Meteor.setTimeout(function(){
         t.fill = "red";
         },waitTime)
         })*/
        button = game.add.button(50, 10, 'play', actionOnClick, this);
        _phachBatDau = game.add.text(50, 180, '0', {font: '64px Arial', fill: 'green', align: 'left'});
        var notes = [
            {id: 0, text: "|", tab: ''},
            {id: 1, text: 'Đồ', tab: 4},
            {id: 2, text: 'Rê', tab: -4},
            {id: 3, text: 'Mi', tab: 5},
            {id: 4, text: 'Fa', tab: -5},
            {id: 5, text: 'Son', tab: 6},
            {id: 6, text: 'La', tab: -6},
            {id: 7, text: 'Si', tab: -7},
            {id: 8, text: 'Đố', tab: 7}
        ];


        ohSusanaNotes = [
            [
                {id: 1, wait: notDen},
                {id: 2, wait: notDen},
                {id: 3, wait: notDen},
                {id: 5, wait: notDen},
                {id: 5, wait: notDen},
                {id: 6, wait: denChamDoi},
                {id: 5, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 1, wait: notDen},
                {id: 2, wait: denChamDoi},
                {id: 3, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 2, wait: notDen},
                {id: 1, wait: notDen},
                {id: 2, wait: notDen}
            ],
            [
                {id: 1, wait: trangChamDoi},
                {id: 2, wait: mocDon},
                {id: 3, wait: mocDon},
                {id: 5, wait: notDen},
                {id: 5, wait: notDen},
                {id: 6, wait: denChamDoi},
                {id: 5, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 1, wait: notDen},
                {id: 2, wait: denChamDoi},
                {id: 3, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 2, wait: notDen},
                {id: 2, wait: notDen},
                {id: 1, wait: notDen},
                {id: 0, wait: trangChamDoi},
            ],
            [
                {id: 4, wait: notDen},
                {id: 4, wait: notTrang},
                {id: 6, wait: notTrang},
                {id: 6, wait: notDen},
                {id: 6, wait: notTrang},
                {id: 5, wait: notDen},
                {id: 5, wait: notDen},
                {id: 3, wait: notDen},
                {id: 1, wait: notDen},
                {id: 2, wait: notDen},
            ],
            [
                {id: 1, wait: trangChamDoi},
                {id: 2, wait: mocDon},
                {id: 3, wait: mocDon},
                {id: 5, wait: notDen},
                {id: 5, wait: notDen},
                {id: 6, wait: denChamDoi},
                {id: 5, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 1, wait: notDen},
                {id: 2, wait: denChamDoi},
                {id: 3, wait: mocDon},
                {id: 3, wait: notDen},
                {id: 2, wait: notDen},
                {id: 2, wait: notDen},
                {id: 2, wait: notDen},
                {id: 0, wait: trangChamDoi},
            ]
        ];
        var totalTime = notDen * 6;
        var Y = 250;

        var noteDisplay = _.template("<%=t%> &nbsp;");
        _ohSusanaWait = [];
        _.each(ohSusanaNotes, function (ohX, i) {
            var step = 10;
            _.each(ohX, function (oh) {
                totalTime += oh.wait;
                var note = notes[oh.id];
                var str = note.tab + note.text;
                step += 40 + str.length;
                var t = game.add.text(step, Y, str, {font: '16px Arial', fill: 'white', align: 'left'});
                _ohSusanaWait.push(
                    {
                        id: oh.id,
                        wait: totalTime,
                        text: t
                    }
                )
            })
            Y += 50;
        });

    }

    var actionOnClick = function () {
        var totalTime = 0;
        _(4).times(function (i) {
            console.log(i)
            totalTime += i * notDen;
            _.delay(function () {
                _phachBatDau.text = ++i;
            }, totalTime);
        });

        _.each(_ohSusanaWait, function (oh) {
            Meteor.setTimeout(function () {
                oh.text.fill = "red";
            }, oh.wait)
        })
    }
    var update = function () {

    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
