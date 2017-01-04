/**
 * Author: Michael Faber
 * Date Created: 12/30/2016
 * text-banner jQuery Plugin
 */

(function ( $ ) {

    $.fn.textbanner = function(options) {

        //initializing
        var index = 1;
        var id = $(this)[0].id;

        //set text length and enforce character limit
        var text = $(this).text();
        $(this).text("");

        if(text.length < 2) 
        {
            console.log("textbanner.js: you need a larger string");
            return this;
        }
        

        //set growth and step values (in terms of percentage of parent element font-size)
        //defaults to 120%
        var growth = 120;
        try 
        {
            if(options.growth != undefined) 
            {
                growth = options.growth;
            }
        } 
        catch(e) { };

        var step = growth-100;
        step = step/2;
        step = step+100;

        growth = growth + '%';
        step = step + '%';

        //set number of cycles. cycle: index goes from 0 to 0.
        //defaults to indefinite
        var cycles = -1;
        try 
        {
            if(options.cycles > 0 && options.cycles != undefined)
            {
                if(options.cycles%1 == 0) 
                {
                    cycles = options.cycles;
                }
                else
                {
                    console.log("textbanner.js: invalid input for cycles");
                }
            }
        }
        catch(e) { };

        //set speed (in terms of three options)
        //defaults to intermediate
        var speed = 100;
        try 
        {
            if(options.speed != undefined) {

                if(options.speed == "slow") 
                {
                    speed = 180;
                } 
                if(options.speed == "intermediate")
                {
                    speed = 100;
                }
                if(options.speed == "fast")
                {
                    speed = 60;
                }
                if(options.speed > 0)
                {
                    speed = options.speed;
                }
            }
        }
        catch(e) { };

        //create spans of individual characters
        for(i = 0; i < text.length; i++)
        {
            var letter = "<span id='letter" + i + "'>" + text.charAt(i) + "</span>"
            $(this).append(letter)
        }

        //manipulate letters indefinitely
        if(cycles == -1) 
        {
            setInterval(function() {
                if(index == 0) 
                {
                    $('#'+ id + ' #letter' + (text.length-2)).css('font-size', '100%');
                    $('#'+ id + ' #letter' + (text.length-1)).css('font-size', step);
                }
                if(index == 1) {
                    $('#'+ id + ' #letter' + (text.length-1)).css('font-size', '100%');
                    $('#'+ id + ' #letter0').css('font-size', step);
                }
                else
                {
                    $('#'+ id + ' #letter' + (index-2)).css('font-size', '100%');
                    $('#'+ id + ' #letter' + (index-1)).css('font-size', step);
                }

                $('#'+ id + ' #letter' + index).css('font-size', growth);

                if(index == text.length-1)
                {
                    index = 0;
                }
                else
                {
                    index++;
                }

            }, speed);
        }
        //manipulate letters n cycles
        else
        {
            var n = setInterval(function() {

                if(index == 0) 
                {
                    $('#'+ id + ' #letter' + (text.length-2)).css('font-size', '100%');
                    $('#'+ id + ' #letter' + (text.length-1)).css('font-size', step);
                }
                if(index == 1) {
                    $('#'+ id + ' #letter' + (text.length-1)).css('font-size', '100%');
                    $('#'+ id + ' #letter0').css('font-size', step);
                }
                else
                {
                    $('#'+ id + ' #letter' + (index-2)).css('font-size', '100%');
                    $('#'+ id + ' #letter' + (index-1)).css('font-size', step);
                }

                $('#'+ id + ' #letter' + index).css('font-size', growth);
                
                if(index == text.length-1)
                {
                    index = 0;
                    cycles--;
                }
                else
                {
                    index++;
                }

                if(cycles == 0) 
                {
                    setTimeout(function() 
                    {
                        $('#'+ id + ' #letter' + (text.length-2)).css('font-size', '100%');
                        $('#'+ id + ' #letter' + (text.length-1)).css('font-size', step);
                    }, speed);
                    setTimeout(function() 
                    {
                        $('#'+ id + ' #letter' + (text.length-1)).css('font-size', '100%');
                    }, speed);

                    //end the setInterval
                    clearInterval(n);
                }

            }, speed);
        }

        return this;
    }
}( jQuery ));
