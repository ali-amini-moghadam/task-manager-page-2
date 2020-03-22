var rep_star = 'F'; // 'T' represent TRUE and 'F'represent FALSE repetation ...
var clicked_once = true;
var star_item = document.querySelector('.star_item');
star_item.addEventListener('click', star_click);
function star_click() {
    var star_icon = document.getElementsByClassName('fa-star')[0];
    if(rep_star == 'F') {
        star_icon.style.color = 'yellow';
        rep_star = 'T';
    }
    else {
        star_icon.style.color = 'white';
        rep_star = 'F';
    }
}
function create_team() {
    var input_name = document.getElementById('person_name'); //name input ...
    var text_des = document.getElementById('des');
    if(input_name.value != '' && text_des.value != '') {
        var create_btn = document.getElementsByClassName('create_team_btn')[0];
        var select_elem = document.getElementById('sel_team');
        var option_elem = document.createElement('option');
        var personal_item = document.getElementById('personal_item'); 
        select_elem.appendChild(option_elem);
        option_elem.innerHTML = input_name.value; 
        option_elem.setAttribute('selected', 'selected');
        personal_item.innerHTML = input_name.value;
        create_btn.setAttribute('data-dismiss','modal');
        input_name.value = '';
        text_des.value = '';
    }
}
function add_team() {
    var option;
        var select_elem = document.getElementById('sel_team');
        var personal_item = document.getElementById('personal_item');
        // Getting the selected option from user ...
        function getSelectedOption(sel) {
            for(var i=0, len = sel.options.length; i < len ; i++) {
                option = sel.options[i];
                if(option.selected === true)
                    break;
            }
            return option;
        }
        option = getSelectedOption(select_elem);
        if (option.text == 'تابلوی شخصی (بدون تیم)')
            personal_item.innerHTML = 'شخصی';
        else
            personal_item.innerHTML = option.text;
}
// Changing procedure of addEventListener next ... 
var pv_list = document.querySelectorAll('.pv_list');
for(var i = 0 ; i < pv_list.length ; i++) {
    pv_list[i].addEventListener('click', function(i) {
        change_tick(i);
    });
}
// sidebar menu
var sidebar = document.querySelector('.sidebar');
//open sidebar btn
var open_sidebar_btn = document.querySelector('.open-sidebar');
//close sidebar btn
var close_sidebar_btn = document.querySelector('.close_sidebar');
// add 'click' event to open and close btn
open_sidebar_btn.addEventListener('click', open_sidebar);
close_sidebar_btn.addEventListener('click', close_sidebar);
var right = -400;
function open_sidebar() 
{
    sidebar.style.display = 'flex';
    sidebar.style.right = `${right}px`;
    var id = setInterval(function(){
        if(right == 0) {
            clearInterval(id);
        }
        else {
            right += 100;
            sidebar.style.right = `${right}px`;
        }
    });
}
function close_sidebar()
{
    var id = setInterval(function() {
        if(right == -400) {
            clearInterval(id);
        }
        else {
            right -= 100;
            sidebar.style.right = `${right}px`;
        }
    });
}
// GLOBAL VARIABLES ELEMENTS
var board_canvas = document.querySelector('.board-canvas');
var add_list_btn_1 = document.querySelector('.add-list');
var each_list_col = document.querySelector('.each-list-col');
var list_name_input;
var list_title_window;
var list_header_name_input;
var card_composer_textarea;
var list_title_name;
var element_already_exist = false;
var continuous_list = false;
//Helper function for set multiple attributes to an element
function setAttributes(elem, obj) {
    for(var property in obj) {
        elem.setAttribute(property, obj[property]);
    }
}
// INCLUDE ALL OF THE DYNAMIC ELEMENTS
add_list_btn_1.addEventListener('click', open_list_title_window);
function open_list_title_window()
{
    if(!element_already_exist) {
        if(!continuous_list) {
            add_list_btn_1 = this;
            add_list_btn_1.classList.add('d-none');
        }
        list_title_window = document.createElement('div');
        list_title_window.setAttribute('class','card list-title-window text-right p-1');
        each_list_col.appendChild(list_title_window);
        list_name_input = document.createElement('input');
        // Call helper function
        setAttributes(list_name_input, {
            "class" : "list-name-input px-2",
            "placeholder" : "عنوان لیست را وارد کنید",
            "dir" : "auto"
        });
        list_title_window.appendChild(list_name_input);
        var list_title_footer = document.createElement('div');
        list_title_footer.setAttribute('class','card-footer list-title-footer p-0');
        list_title_window.appendChild(list_title_footer);
        var close_list_btn = document.createElement('button');
        close_list_btn.setAttribute('class','close close-list-title');
        close_list_btn.innerHTML = '&times;';
        list_title_footer.appendChild(close_list_btn);
        var add_list_btn_2 = document.createElement('button');
        add_list_btn_2.setAttribute('class','btn btn-success add-list-btn btn-sm');
        add_list_btn_2.textContent = 'اضافه کن';
        list_title_footer.appendChild(add_list_btn_2);
        // ADDING EVENT HANDLERS TO ELEMNTS <--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--
        list_name_input.addEventListener('keydown', function(event) {
            if (event.code == "Enter" && list_name_input.value != "") {
                    list_title_name = list_name_input.value;
                    add_list_btn_2.click();
                    list_name_input.value = "";
                }
                else 
                    list_name_input.focus();
            });
        add_list_btn_2.addEventListener('click', function() { // click to add list button 2
            if(list_name_input.value != "") {
                // CREATING LIST OF CARDS AREA -->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->
                add_list_btn_1.remove(); //Saving space
                list_title_window.remove(); // Saving space
                list_title_name = list_name_input.value;
                list_title_window.classList.add('d-none');
                var list_content_canvas = document.createElement('div');
                list_content_canvas.setAttribute('class', 'card list-content-canvas text-right');
                each_list_col.appendChild(list_content_canvas);
                var list_content_header = document.createElement('div');
                list_content_header.setAttribute('class', 'card-header list-content-header d-flex p-0');
                list_content_canvas.appendChild(list_content_header);
                list_header_name_input = document.createElement('input');
                setAttributes(list_header_name_input, {
                    "class": "list-header-name-input flex-grow-1",
                    "spellcheck": "false",
                    "dir": "auto"
                });
                list_header_name_input.value = list_title_name;
                list_content_header.appendChild(list_header_name_input);
                var extra_menu_icon = document.createElement('span');
                extra_menu_icon.setAttribute('class', 'extra-menu-icon px-2 ml-1');
                list_content_header.appendChild(extra_menu_icon);
                var card_items_container = document.createElement('div');
                card_items_container.setAttribute('class', 'card-body list-group p-0 mb-1');
                list_content_canvas.appendChild(card_items_container);
                const add_card_btn_1 = document.createElement('button');
                add_card_btn_1.setAttribute('class', 'btn btn-block add-card-btn py-1 px-2 text-right');
                add_card_btn_1.innerHTML = 'اضافه کردن کارت';
                list_content_canvas.appendChild(add_card_btn_1);
                const add_icon = document.createElement('span');
                add_icon.setAttribute('class', 'plus-icon ml-2');
                add_card_btn_1.appendChild(add_icon);
                // ADDING EVENT HANDLER TO ABOVE ELEMENTS <--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--<--
                list_header_name_input.addEventListener('click', function() {
                    list_header_name_input.classList.add('is-editing');
                    list_header_name_input.select();
                });
                list_header_name_input.addEventListener('keydown', function(event) {
                    if(event.code == 'Enter') {
                        list_header_name_input.classList.remove('is-editing');
                        list_header_name_input.blur();
                    }
                });
                add_card_btn_1.addEventListener('click', function() { // click to card button 1
                    this.classList.add('d-none');
                    var card_composer_container = document.createElement('div');
                    card_composer_container.setAttribute('class', 'card-composer-container');
                    list_content_canvas.appendChild(card_composer_container);
                    var card_body = document.createElement('div');
                    card_body.setAttribute('class', 'card-body p-0');
                    card_composer_container.appendChild(card_body);
                    card_composer_textarea = document.createElement('textarea');
                    setAttributes(card_composer_textarea, {
                        "class": "card-composer-textarea w-100 p-2",
                        "placeholder": "... عنوان کارت را وارد کنید"
                    });
                    card_body.appendChild(card_composer_textarea);
                    card_composer_textarea.focus();
                    var card_composer_footer = document.createElement('div');
                    card_composer_footer.setAttribute('class', 'card-footer card-composer-footer text-right p-0 mt-n2 border-0');
                    card_composer_container.appendChild(card_composer_footer);
                    var close_card_composer_btn = document.createElement('button');
                    close_card_composer_btn.setAttribute('class', 'close');
                    close_card_composer_btn.innerHTML = '&times;';
                    card_composer_footer.appendChild(close_card_composer_btn);
                    var add_card_btn_2 = document.createElement('button');
                    add_card_btn_2.setAttribute('class', 'btn btn-success btn-sm');;
                    add_card_btn_2.innerHTML = 'اضافه کن';
                    card_composer_footer.appendChild(add_card_btn_2);
                    // Add handlers to elements
                    card_composer_textarea.addEventListener('keydown', function(event) {
                        if(event.code == 'Enter' && card_composer_textarea.value != "") {
                            add_card_btn_2.click();
                            event.preventDefault();
                        }
                    });
                    add_card_btn_2.addEventListener('click', function() {
                        if(card_composer_textarea.value != "") {
                            var card_name = card_composer_textarea.value;
                            var card_items = document.createElement('a');
                            card_items.setAttribute('class', 'list-group-item list-group-item-action card-items mb-1');
                            card_items.innerHTML = card_name;
                            card_composer_textarea.value = "";
                            card_items_container.appendChild(card_items);
                            card_composer_textarea.value = "";
                        }
                    });
                    close_card_composer_btn.addEventListener('click', function() {
                        add_card_btn_1.classList.remove('d-none');
                        card_composer_container.classList.add('d-none');
                    });
                }); // END OF CLICK TO CARD BUTTON 1
                //CREATING NEW LIST AFTER PERIVIOUS LIST -->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->-->
                each_list_col = document.createElement('div');
                each_list_col.setAttribute('class', 'each-list-col ml-2');
                board_canvas.appendChild(each_list_col);
                add_list_btn_1 = document.createElement('button');
                add_list_btn_1.setAttribute('class', 'btn btn-block add-list text-right d-none py-1');
                add_list_btn_1.innerHTML = 'اضافه کردن لیست';
                add_list_btn_1.addEventListener('click', open_list_title_window);
                each_list_col.appendChild(add_list_btn_1);
                var plus_icon = document.createElement('span');
                plus_icon.setAttribute('class', 'plus-icon ml-1');
                add_list_btn_1.appendChild(plus_icon);
                element_already_exist = false;
                continuous_list = true;
                open_list_title_window();
            }
        }); // END OF CLICK TO ADD LIST BUTTON 2
        close_list_btn.addEventListener('click', function() {
            add_list_btn_1.classList.remove('d-none');
            list_title_window.classList.add('d-none');
        });
        element_already_exist = true;
    }
    else if(element_already_exist) {
        add_list_btn_1.classList.add('d-none');
        list_title_window.classList.remove('d-none');
    }
    list_name_input.focus();
}
// document.addEventListener('click', function(event) {
//     if(element_already_exist)
//     {
//         if(event.target != list_header_name_input) {
//             list_header_name_input.classList.remove('is-editing');
//         }
//     }
// });
