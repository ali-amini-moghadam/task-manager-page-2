var rep_star = 'F'; // 'T' represent TRUE and 'F'represent FALSE repetation ...
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
// list part ...
var add_list = document.querySelector('.add-list');
var list_title_window = document.querySelector('.list-title-window');
add_list.addEventListener('click', open_list_title);
function open_list_title() {
    add_list.style.opacity = '0';
    add_list.style.display = 'none';
    list_title_window.style.display = 'block';
}
var close_title_list_btn = document.querySelector('.close-list-title');
close_title_list_btn.addEventListener('click', close_list_title);
function close_list_title() {
    list_title_window.style.display = 'none';
    add_list.style.opacity = '1';
    add_list.style.display = 'block';
}