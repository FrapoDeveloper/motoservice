
$(function(){
  let edit = false
  hands_section()
  hands_Menu()
  search_client()
  function hands_section(){
  
    $('#Drivers_section').hide()
    $('#Reports_section').hide()
    $('#header_search').show()
    $('#Home_section').show() 
    list_Client()

    $('#Drivers').click(function(){
      $('#Home_section').hide()
      $('#Reports_section').hide()
      $('#Drivers_section').show()
      $('#header_search').hide()
      list_Drivers()
      delete_driver()
      edit_driver()
      register_driver()
    })

    $('#Home').click(function(){
      $('#Drivers_section').hide()
      $('#Reports_section').hide()
      $('#header_search').show()
      $('#Home_section').show()
      list_Client()
      delete_client()
      search_client()
    })
    
     $('#Reports').click(function(){
      $('#Drivers_section').hide()
      $('#Home_section').hide()
      $('#header_search').hide()
      $('#Reports_section').show()
    })
    
  }

  function hands_Menu(){
      $('#open-menu').hide()

      $( "#icon-menu" ).click(function() {
        if ($('#menu-bar').is(':visible')) {
          $('#open-menu').show()
          $('#menu-bar').hide()
          
      } else {
          $('#menu-bar').show()
          $('#open-menu').hide()
      }
        
      });

      $("#open-menu").click(function(){
      if ($('#menu-bar').is(':visible')) {
          $('#open-menu').show()
      } else {
          $('#menu-bar').fadeIn('20')
          $('#menu-bar').show()
          $('#open-menu').hide()
      }

      })

  }

  function list_Client(){
   
    $.ajax({
      url: '../../controller/list_client.php', 
      type: 'GET',
      success: function(response){ 
      let clientsObject = JSON.parse(response);
      let row_design = '' 
    
      clientsObject.forEach(client => {
            row_design += `<tr class="bg-light" client_id="${client.key_client_b}">
            <td style="display:none;">${client.key_client_b}</td>
            <td>${client.date_client_b}</td>
            <td>${client.phone_client_b}</td>
            <td>${client.name_client_b}</td>
            <td>${client.name_driver_b}</td>
            <td><p>S/${client.import_client_b}</p></td>
            <td>
            <button class="client-delete btn btn-danger" style="font-size:12px;">
            Eliminar
            </button>
            </td>
            </tr>`
       
      })
        $('#clients').html(row_design)
      }
    })
  }
  
  function delete_client(){

  $(document).on('click','.client-delete',function(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar cliente?',
      text: "Se borrará de la base base de datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Cliente eliminado satisfactoriamente.',
          'success'
        )
        let element = $(this)[0].parentElement.parentElement;
        let id_client_f =  $(element).attr('client_id');
        $.post('../../controller/delete_client.php',{id_client_f},function(response){
          list_Client()
    })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Operación cancelada.',
          'error'
        )
      }
    })
})

  }
  
  function list_Drivers(){

    $.ajax({
      url: '../../controller/list_driver.php',
      type: 'GET',
      success: function(response){
        let driversObject = JSON.parse(response);
        console.log(driversObject)
        let template_ui = ''
        driversObject.forEach(driver => {
          template_ui += `<tr class="bg-light" driver_id="${driver.key_driver_b}">
          <td style="display:none;">${driver.key_driver_b}</td>

          <td>
          <img style="width:120px; heigth: 120px;"
          src="../../resource/drivers_photo/${driver.photo__driver_b}">
          </td>
          <td>${driver.enrollment_driver_b}</td>
          <td>${driver.name_driver_b}</td>
          <td>${driver.dni_driver_b}</td>
          <td>${driver.phone_driver_b}</td>

          <td>
          <button class="driver-edit btn btn-primary" style="font-size:12px;">
          Editar
          </button>
          <button class="driver-delete btn btn-danger" style="font-size:12px;">
          Borrar
          </button>
          </td>
         
          </tr>`
        })
        
        $('#drivers').html(template_ui)
      }


    })


  }

  function delete_driver(){
    $(document).on('click','.driver-delete',function(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '¿Desea eliminar Chofer?',
        text: "Se borrará de la base base de datos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Chofer eliminado satisfactoriamente.',
            'success'
          )
          let element = $(this)[0].parentElement.parentElement;
          let id_driver_f =  $(element).attr('driver_id');
          console.log(id_driver_f);
          $.post('../../controller/delete_driver.php',{id_driver_f},function(response){
            list_Drivers()
      })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Operación cancelada.',
            'error'
          )
        }
      })









   
    })
  
  }

  function edit_driver(){
    $(document).on('click','.driver-edit',function(){
          edit = true
          let element = $(this)[0].parentElement.parentElement;
          let id_driver_f =  $(element).attr('driver_id');
          $.post('../../controller/single_driver.php',{id_driver_f},function(response){
            const driver = JSON.parse(response)
            $('#enrollment_driver').val(driver.enrollment_driver_b)
            $('#name_driver').val(driver.name_driver_b)
            $('#dni_driver').val(driver.dni_driver_b)
            $('#phone_driver').val(driver.phone_driver_b)
            $('#address_driver').val(driver.addres_driver_b)
          })

    })

  }


  function register_driver(){
    $('#drivers-form').submit(function(e){
      var parametros = new FormData($("#drivers-form")[0])
      //si edit es falso se enviará a driver_info de lo contrario a edit driver
      let url = edit === false ? '../../model/driver_info.php' : '../../controller/edit_driver.php'
      edit = false
      $.ajax({
        data: parametros,
        url: url,
        type: "POST",
        contentType: false,
        processData:false,
        success: function(response){
          list_Drivers()
          $('#drivers-form').trigger('reset')
         }
      })
      e.preventDefault()
    })
  }

  function search_client(){
    $('#search').keyup(function(){
      let search = $('#search').val()
      $.ajax({
        url: '../../controller/single_driver.php',
        type: 'POST',
        data: {search}, 
        success: function(response){
          console.log(response)
        }

      })
    })


  }


});