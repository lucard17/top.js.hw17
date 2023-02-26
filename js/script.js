$(document).ready(function () {
    let counter = 0;
    $(".field").on('click', '.field-item', function () {
        counter += 1;
        if ($(this).hasClass('field-item_solved')) {
            return;
        }
        $(this).toggleClass('field-item_checked');
        let checked = $(this).closest('.field').find('.field-item_checked');
        if (checked.length == 2) {
            if (checked.children().eq(0).attr('class') == checked.children().eq(1).attr('class')) {
                checked.addClass('field-item_solved');
            }
            setTimeout(function () {
                checked.removeClass('field-item_checked');
            }, 1000);
        }
        if (checked.length == 3) {
            checked.removeClass('field-item_checked');
            $(this).addClass('field-item_checked')
        }

        if ($(this).closest('.field').find('[class="field-item"]').length == 0) {
            console.log('victory')
            modalToggle();
            $('.message__count').text(counter);
            counter = 0;
            $('.settings-bar__button').trigger('click');


        }


    })
    $('.settings-bar').on('click', '.settings-bar__button', btnHandler)
    let fieldItem = $("<div class=\"field-item\"><i></i></div>");


    function btnHandler() {
        let $field = $(".field")

        let $width = $('.settings-bar')
            .children('.settings-bar__width').val()
        if (isNaN($width)) $width = 4;
        if ($width > 8) $width = 8;
        if ($width < 2) $width = 2;

        $('.settings-bar')
            .children('.settings-bar__width').val($width)
        let $height = $('.settings-bar').children('.settings-bar__height').val()
        if (isNaN($height)) $height = 4;
        if ($height > 4) $height = 4;
        if ($height < 2) $height = 2;
        $('.settings-bar').children('.settings-bar__height').val($height)
        let randomColors = $('.settings-bar__color').is(':checked');
        // console.log(randomColors);

        if ($(this).hasClass('settings-bar__button_new')) {
            $field.animate({height: $height * 110 + "px"})
            $(this).text('Завершить игру')
            $field.css({'grid-template': `repeat(${$height}, 110px)/repeat(${$width}, 110px)`});
            $field.children().remove();
            let items = getIconsArray($width * $height);
            items.forEach(item => {
                let newFieldItem = fieldItem.clone();
                if (randomColors) {
                    newFieldItem.css({'--color': getRandomRGB()})
                }
                newFieldItem.children().attr({class: faIcons[item]});
                $(".field").append(newFieldItem);
            })

        } else {
            $field.animate({height: 0}, 500, 'swing', function () {
            })
            $(this).text('Новая игра')


        }
        $(this).toggleClass('settings-bar__button_new')
        // console.log($width)
        // console.log($height)
    }

    $('.modal').on('click', modalToggle);
    $('.modal__close-btn').on('click', modalToggle);

    function modalToggle() {
        $('.modal').toggleClass('modal_active')
    }
});

function getIconsArray(n) {
    const randomMax = faIcons.length - 1;
    let i = 0, iArr = new Array(n), randomInt;
    while (i < n) {
        randomInt = getRandomInt(0, randomMax);
        if (!iArr.find(item => item === randomInt)) {
            iArr[i] = randomInt;
            iArr[i + 1] = randomInt;
            i += 2;
        }
    }
    //shuffle
    for (i = 0; i < n * n * 2; i++) {
        randomInt = getRandomInt(0, n - 1);
        [iArr[0], iArr[randomInt]] = [iArr[randomInt], iArr[0]];
    }
    return iArr;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRGB() {
    return `rgb(${getRandomInt(0, 125)}, ${getRandomInt(0, 125)}, ${getRandomInt(0, 125)})`
}