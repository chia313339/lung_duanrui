$(document).ready(function () {
    AOS.init({
        duration: 800
    });

    var swiperCards = new Swiper('.swiperCards', {
        spaceBetween: 20,
        speed: 800,
        autoplay: true,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    })
    $('.volume a').click(function (e) {
        e.preventDefault();
        $('.volume a').removeClass('hide');
        $(this).addClass('hide');
        if ($("video").prop('muted')) {
            $("video").prop('muted', false);
        } else {
            $("video").prop('muted', true);
        }
    });
});

$(window).scroll(function () {
    if ($(window).scrollTop() - $('.hero .nav_link').offset().top >= 0) {
        $('.navbar').addClass('show')
    } else {
        $('.navbar').removeClass('show')
    }
    if ($(window).scrollTop() - $('.section01').offset().top >= 0) {
        $('.totop').addClass('show')
    } else {
        $('.totop').removeClass('show')
    }
});

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

let submitted = false;

function showSuccessMessage() {
    Swal.fire({
        title: "表單送出成功！",
        text: "我們將由專人盡快與您聯繫",
        icon: "success",
        confirmButtonColor: "#b0964e",
        confirmButtonText: '關閉',
    });
}

$('#sendMail').click(function (e) {
    e.preventDefault();
    if ($('#name').val() == '') {
        Swal.fire({
            title: '請輸入姓名',
            icon: 'warning',
            confirmButtonText: '繼續填寫',
            confirmButtonColor: "#b0964e",
        });
    } else {
        let phone = $('#phone').val();
        let iphone = parseInt(phone);
        if (isNaN(iphone)) {
            Swal.fire({
                title: '請輸入正確的電話號碼',
                icon: 'warning',
                confirmButtonText: '繼續填寫',
                confirmButtonColor: "#b0964e",
            });
        } else {
            if ($('#terms').is(':checked')) {
                let formData = {
                    "entry.382814644": $('#name').val(),  // Google表單中“姓名”字段的name屬性值
                    "entry.672329361": $('#phone').val()  // Google表單中“手機”字段的name屬性值
                };
                $.ajax({
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeALi1BoHo602sBtfJ--kFs4f5dA1gBNFLsmNJ_omk7EAdzWQ/formResponse',
                    type: 'POST',
                    data: formData,
                    dataType: 'xml',
                    complete: function() {
                        Swal.fire({
                            title: "表單送出成功！",
                            text: "我們將由專人盡快與您聯繫",
                            icon: "success",
                            confirmButtonColor: "#b0964e",
                            confirmButtonText: '關閉',
                        });
                    },
                    error: function() {
                        Swal.fire({
                            title: '送出失敗',
                            text: '請稍後再試',
                            icon: 'error',
                            confirmButtonText: '繼續填寫',
                            confirmButtonColor: "#b0964e",
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: '未勾選同意書',
                    text: '請閱讀並勾選「個資告知事項聲明」同意書',
                    icon: 'warning',
                    confirmButtonText: '繼續填寫',
                    confirmButtonColor: "#b0964e",
                });
            }
        }
    }
});

