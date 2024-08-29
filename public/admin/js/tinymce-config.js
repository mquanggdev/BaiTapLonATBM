tinymce.init({
    selector: 'textarea[textarea-mce]',
    plugins: 'lists link image table', // Thêm plugin nếu cần
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    menubar: false
  });