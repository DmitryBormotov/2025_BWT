function find_edit(){
    const fname_node = document.getElementById('first_name')
    fname_node.innerHTML="<b> DMITRY</b>"
    
    const sname_node = document.getElementById('second_name')
    sname_node.innerHTML="<b>BORMOTOV</b>"
    
    const dtb_node = document.getElementById('date_of_birthday')
    dtb_node.innerHTML="<b> 27.05.2007</b>"
}

const node_for_click = document.getElementById("for_click")
node_for_click.addEventListener("click",find_edit)
