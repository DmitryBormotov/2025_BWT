function find_edit(){
    const new_node_1  = document.getElementById('first_name')
    new_node_1.innerHTML="<b> DMITRY </b>"
}

const node_for_click = document.getElementById("for_click")
node_for_click.addEventListener("click",find_edit)
