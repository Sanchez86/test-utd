"use strict";

document.addEventListener('DOMContentLoaded', () => {

    //modal window

    const interval =  86400000 * 3;

    const btnsOpen = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          btnAccept = document.querySelector('.accept');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    const modalTimerId = setInterval(openModal, interval);

    btnAccept.addEventListener('click', clearModal);

    function clearModal(){
        clearInterval(modalTimerId);
        closeModal();
    }

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    openModal();

    btnsOpen.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    //show modal window if the scroll reaches the end of the page
    /*function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);*/

    //Slider
    $(document).ready(function(){
        $('.slider').slick({
            'setting-name': 'setting-value',
            'draggable': false,
            responsive: [
                {
                    breakpoint: 540,
                    settings: {
                        'draggable': true,
                        'arrows': false
                    }
                }
            ]
        });


        $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

            $('.slider video').each(function(){
                this.pause();
            });

            if($(`#video-${nextSlide}`)[0])
                $(`#video-${nextSlide}`)[0].play();
        });

    });


});