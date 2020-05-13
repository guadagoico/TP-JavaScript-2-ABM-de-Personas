const addUser = document.getElementById("addUser")
const modal = document.getElementById("modal")


const userForm = (userList) => {
    let acc = "";
    const employee = document.getElementById("employeeslist")
    // console.log(userList)
    userList.forEach(employee => {
        let name = employee.fullname
        let email = employee.email
        let address = employee.address
        let phone = employee.phone

        acc += `<tr>
        <td>${name}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td> 
        <i class="material-icons icon-edit" id="edit-${employee.id}">&#xE254;</i>
        <i class="material-icons icon-delete" title="Delete" id="${employee.id}">&#xE872;</i>
      
        </td>
       <tr>`
        listemployee.innerHTML = ` <thead><td>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead> ` + acc;
    })
}


const viewuser = () => {
    fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
        .then(data => data.json())
        .then(userList => {
            viewuser(userList)



            const editIcon = document.getElementsByName("icon-edit")
            const del = document.getElementsByName("icon-delete")

            for (let i = 0; i < editIcon.length; i++) {
                edit[i].onclick = () => {
                    const edit = editIcon[i].id
                    userList.forEach(element => {
                        if (element.id == edit.split('-')[1]) {
                            modal.classList.remove('nomostrar')
                            mostrarModal(element.fullname, element.email, element.address, element.phone)

                            const save = document.getElementById('edit')

                            save.onclick = () => {
                                const name = document.getElementById("new-name").value
                                const email = document.getElementById("new-email").value
                                const address = document.getElementById("new-adress").value
                                const phone = document.getElementById("new-phone").value
                                const newEmployee = {
                                    fullname: name,
                                    email: email,
                                    address: address,
                                    phone: phone,
                                };
                                //Editar usuario
                                fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${element.id}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(newEmployee),
                                    })
                                    .then(data => data.json())
                                    .then(result => {
                                        modal.classList.add('nomostrar')
                                        viewuser();
                                    })
                            }
                        }
                    });
                }
            }

            //borrar usuario
            for (let i = 0; i < del.length; i++) {
                del[i].onclick = () => {
                    const remove = del[i].id
                    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${remove}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                        .then(dataDel => dataDel.json())
                        .then(resultDel => {
                            fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
                                .then(infoDel => infoDel.json())
                                .then(resultadoDel => {
                                    userForm(resultadoDel)

                                })
                        })
                }
            }
        })
}



const mostrarModal = () => {
    modal.innerHTML = `<div class="modal-head">
    <h2>Add Empleyee</h2>
    </div>
    <form action="" method="get" class="modal-form">
    <label>Name</label>
    <input type="text" id="new-name" value=${name}>
    <label>Email</label>
    
    <label>Address</label>
    <textarea name="address" rows="2" cols="30" id="new-address"> ${address}> </textarea>
    <label>Phone</label>
    <input type="text" id="new-phone" value=${phone}>
    <div class="modal-footer">
    <button id="cancel">Cancel</button>

    ${name ? '<button id="edit">sAVE</button></div>' :
    '<button id="add"> Add </button></div>'}
</form>`
    

const cancel = document.getElementsById("cancel")

cancel.onclick = () => {
    modal.classList.add('nomostrar')
}
}


addUser.onclick = () => {
    modal.classList.remove("nomostrar")
    mostrarModal()
  
    const add = document.getElementById("add")
  
    add.onclick = () => {
      const name = document.getElementById("new-name").value
      const email = document.getElementById("new-email").value
      const address = document.getElementById("new-adress").value
      const phone = document.getElementById("new-phone").value
      const newEmployee = {
        fullname: name,
        email: email,
        address: address,
        phone: phone,
      };
  
  
      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEmployee),
        })
        .then(data => data.json())
        .then(userList => {
          modal.classList.add('nomostrar')
          userForm();
        })
    }
  }
  userForm()