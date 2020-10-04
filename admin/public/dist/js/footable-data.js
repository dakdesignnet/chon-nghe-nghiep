/*FooTable Init*/
$(function () {
	"use strict";
	
	/*Init FooTable*/
	$('#footable_1,#footable_3').footable();
	
	/*Editing FooTable*/
	
	var $modal = $('#editor-modal'),
	$editor = $('#editor'),
	$editorTitle = $('#editor-title'),
	ft = FooTable.init('#footable_2', {
		editing: {
			enabled: true,
			addRow: function(){
				$modal.removeData('row');
				$editor[0].reset();
				$editorTitle.text('Add a new row');
				$modal.modal('show');
			},
			editRow: function(row){
				var values = row.val();
				$editor.find('#id').val(values.id);
				$editor.find('#meta_title').val(values.meta_title);
				$editor.find('#short_url').val(values.short_url);
				$editor.find('#create_day').val(values.create_day);
				$editor.find('#image_url').val(values.image_url);
				$editor.find('#content').val(values.content);
				$editor.find('#like').val(values.like);
								$editor.find('#tag').val(values.tag);
				$modal.data('row', row);
				$editorTitle.text('Edit row #' + values.id);
				$modal.modal('show');
			},
			deleteRow: function(row){
				if (confirm('bạn muốn xóa chứ?')){


 $.post("/api/removenews/"+row.val().id,function(data,status){

                  swal({   
			title: "đã xóa 1!",   
             type: "success", 
			text: data.meta_title,
			confirmButtonColor: "#469408", 
                 timer: 1000  
        });
        });	
					row.delete();
				}
			}
		}
	}),
	uid = 10;

	$editor.on('submit', function(e){
		if (this.checkValidity && !this.checkValidity()) return;
		e.preventDefault();
		var row = $modal.data('row');

		if($editor.find('#id').val()=='')	{
		$modal.modal('hide');

 $.post("/api/news",$("#editor").serialize(),function(data,status){
                  swal({   
			title: "thêm mới hoàn thành!",   
             type: "success", 
			text: data.meta_title,
			confirmButtonColor: "#469408", 
                 timer: 1000  
        });
                   data.id=data._id;
                  ft.rows.add(data);
                 

			console.log("xem "+data.id);
        });


}else{
	$modal.modal('hide');
 $.post("/api/updatenews/"+$editor.find('#id').val(),$("#editor").serialize(),function(data,status){

                  swal({   
			title: "update hoàn thành!",   
             type: "success", 
			text: data.meta_title,
			confirmButtonColor: "#469408", 
                 timer: 1000  
        });
                      var dataval=data;
                     dataval.id=data._id;
                   
 row.val(dataval);

        });	
}
		
		$modal.modal('hide');
	});
});
		