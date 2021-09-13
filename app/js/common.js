"use strict";
document.addEventListener('DOMContentLoaded', () => {

    //modal window
    function modalWindow() {

        const modal = document.querySelector('.modal'),
              btnClose = document.querySelector('.close-js'),
              btnAccept = document.querySelector('.accept-js');

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        }

        btnClose.addEventListener('click', close);

        function close() {
            localStorage.setItem('lastUpdate', Date.now());
            closeModal();
        }

        const POPUP_SHOW_TIME = 1000*60*60*24*3;


        setInterval(()=>{
            const lastUpdate = localStorage.getItem('lastUpdate');
            if(!lastUpdate){
                localStorage.setItem('lastUpdate', Date.now());
            }
            if(Date.now()-lastUpdate >= POPUP_SHOW_TIME){
                openModal();
                localStorage.setItem('lastUpdate', Date.now());
            }
        }, 60 * 1000);

        btnAccept.addEventListener('click', accept);

        function accept(){
            localStorage.setItem('accept', 'true');
            closeModal();
        }

        if(!localStorage.getItem('accept')){
            if(Date.now()- localStorage.getItem('lastUpdate') >= POPUP_SHOW_TIME){
                openModal();
            }
        }


        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modal.addEventListener('click', (event) => {
            if(event.target === modal){
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if(event.code === "Escape" && modal.classList.contains('show')){
                closeModal();
            }
        });
    }
    modalWindow();

    //Slider
    function initSlider() {
        $(document).ready(function(){
            if($('.slider')){

                $('.slider').slick({
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
            }
        });
    }
    initSlider();


    //navbar toggler
    function navBarToggler() {
        const navbar = document.querySelector('.navbar-toggler-js'),
            headerBottomMenu = document.querySelector('.header-bottom__menu');

        navbar.addEventListener('click', function(){
            this.classList.toggle('active');
            headerBottomMenu.classList.toggle('active');
        });
    }
    navBarToggler();
});