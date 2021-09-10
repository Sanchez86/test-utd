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

    function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

});