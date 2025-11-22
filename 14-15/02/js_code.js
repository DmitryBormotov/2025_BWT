function find_edit(){
    const new_node_1  = document.getElementById('first_name')
    new_node_1.innerHTML="<b> DMITRY </b>"
    const new_node_2  = document.getElementById('second_name')
    new_node_2.innerHTML="<b> BORMOTOV </b>"
    const new_node_3  = document.getElementById('date_of_birthday')
    new_node_3.innerHTML="<b> 27.05.2007 </b>"
}

const node_for_click = document.getElementById("for_click")
node_for_click.addEventListener("click",find_edit)
