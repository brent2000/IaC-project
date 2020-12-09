var sql = "sql"
    (function () {

        var Memory = {

            init: function (cards) {
                this.$game = $(".game");
                this.$modal = $(".modal");
                this.$overlay = $(".modal-overlay");
                this.$restartButton = $("button.restart");
                this.cardsArray = $.merge(cards, cards);
                this.shuffleCards(this.cardsArray);
                this.setup();
            },

            shuffleCards: function (cardsArray) {
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            setup: function () {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card");
                this.paused = false;
                this.guess = null;
                this.binding();
            },

            binding: function () {
                this.$memoryCards.on("click", this.cardClicked);
                this.$restartButton.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () {
                var _ = Memory;
                var $card = $(this);
                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                    $card.find(".inside").addClass("picked");
                    if (!_.guess) {
                        _.guess = $(this).attr("data-id");
                    } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                        $(".picked").addClass("matched");
                        _.guess = null;
                    } else {
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                        }, 600);
                    }
                    if ($(".matched").length == $(".card").length) {
                        _.win();
                    }
                }
            },

            win: function () {
                this.paused = true;
                setTimeout(function () {
                    Memory.showModal();
                    Memory.$game.fadeOut();
                }, 1000);
            },

            showModal: function () {
                this.$overlay.show();
                this.$modal.fadeIn("slow");
            },

            hideModal: function () {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show("slow");
            },

            // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
            shuffle: function (array) {
                var counter = array.length,
                    temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {
                var frag = '';
                this.$cards.each(function (k, v) {
                    frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"\
				alt="Codepen" /></div></div>\
				</div>';
                });
                return frag;
            }
        };


        var dbConnection = sql.connect({
            Host: "192.168.56.5",
            Port: 8081,
            Database: "ShippingChallenge    ",
            UserName: "root",
            Password: "abc1234!"
        });

        var php1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 1"
        var php2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 1"
        var css31 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 2"
        var css32 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 2"
        var html51 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 3"
        var html52 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 3"
        var jquery1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 4"
        var jquery2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 4"
        var javascript1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 5"
        var javascript2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 5"
        var node1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 6"
        var node2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 6"
        var photoshop1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 7"
        var photoshop2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 7"
        var python1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 8"
        var python2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 8"
        var rails1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 9"
        var rails2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 9"
        var sass1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 10"
        var sass2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 10"
        var sublime1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 11"
        var sublime2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 11"
        var wordpress1 = "SELECT 'name' FROM 'FotoLinks' WHERE 'id' = 12"
        var wordpress2 = "SELECT 'link' FROM 'FotoLinks' WHERE 'id' = 12"



        var cards = [
            {
                name: dbConnection.query(php1),
                img: dbConnection.query(php2),
                id: 1,
		},
            {
                name: dbConnection.query(css31),
                img: dbConnection.query(css32),
                id: 2
		},
            {
                name: dbConnection.query(html51),
                img: dbConnection.query(html52),
                id: 3
		},
            {
                name: dbConnection.query(jquery1),
                img: dbConnection.query(jquery2),
                id: 4
		},
            {
                name: dbConnection.query(javascript1),
                img: dbConnection.query(javascript2),
                id: 5
		},
            {
                name: dbConnection.query(node1),
                img: dbConnection.query(node2),
                id: 6
		},
            {
                name: dbConnection.query(photoshop1),
                img: dbConnection.query(photoshop2),
                id: 7
		},
            {
                name: dbConnection.query(python1),
                img: dbConnection.query(python2),
                id: 8
		},
            {
                name: dbConnection.query(rails1),
                img: dbConnection.query(rails2),
                id: 9
		},
            {
                name: dbConnection.query(sass1),
                img: dbConnection.query(sass2),
                id: 10
		},
            {
                name: dbConnection.query(sublime1),
                img: dbConnection.query(sublime2),
                id: 11
		},
            {
                name: dbConnection.query(wordpress1),
                img: dbConnection.query(wordpress2),
                id: 12
		},
	];

        Memory.init(cards);


    })();
